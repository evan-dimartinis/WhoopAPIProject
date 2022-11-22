const OAuth2Strategy = require("passport-oauth2");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { pool } = require("./db");

let isuserauthenticated = false;

const whoopOAuthConfig = {
  authorizationURL: `https://api.prod.whoop.com/oauth/oauth2/auth`,
  tokenURL: `https://api.prod.whoop.com/oauth/oauth2/token`,
  clientID: "34ec09da-a29a-4197-8281-6e02a4c45487",
  clientSecret:
    "95054a6a0a71fbf78f15efc6e6eb253d3eec7f671c7a49acb24a132bbfa64169",
  callbackURL: "http://localhost:8080/authenticatewithwhoop/callback",
  state: true,
  scope: [
    "offline",
    "read:profile",
    "read:recovery",
    "read:cycles",
    "read:workout",
    "read:sleep",
  ],
};

async function DoesUserExist(whoopid) {
  try {
    const exists = await pool.query(
      `select case when ${whoopid} in (select iwhoopid from appuser) then 1 else 0 end as exi`
    );
    return exists.rows[0].exi == 1;
  } catch (err) {
  }
}

function CreateAuthStrategy() {
  return new OAuth2Strategy(
    whoopOAuthConfig,
    // BEGIN FUNCTION TO STORE REFRESH TOKEN IN DATABASE
    async (accessToken, refreshToken, { expires_in }, profile, done) => {
      /* 
        CHECK IF WHOOP ID EXISTS IN APPUSER TABLE
        IF EXISTS - INSERT NEW REFRESH TOKEN
        ELSE - INSERT NEW USER WITH RELEVANT DATA
      */
      const userexists = await DoesUserExist(profile.user_id);
      try {
        if (userexists) {
          await updateRefreshToken(refreshToken, profile.user_id);
        } else {
          await pool.query(`insert into appuser (sfirstname, slastname, semail, iwhoopid, slastrefreshtoken, dtlastmodified)
        values (${profile.first_name}, ${profile.last_name}, ${
            profile.email
          }, ${
            profile.user_id
          }, ${refreshToken}, '${new Date().toLocaleString()}')`);
        }
      } catch (err) {
        
      }

      return done(null, profile);
    }
  );
}

const fetchProfile = async (accessToken, done) => {
  const profileResponse = await fetch(
    `https://api.prod.whoop.com/developer/v1/user/profile/basic`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const profile = await profileResponse.json();

  done(null, profile);
};

async function getLastRefreshToken(username) {
  try {
    const res = await pool.query(
      `SELECT * FROM appuser WHERE susername = '${username}' LIMIT 1`
    );
    return {
      refreshtoken: res.rows[0].slastrefreshtoken,
      whoopid: res.rows[0].iwhoopid,
    };
  } catch (err) {
    throw new Error("Could not get last refresh token");
  }
}

async function getLastRefreshTokenWithID(userid) {
  try {
    const res = await pool.query(
      `SELECT * FROM appuser WHERE "hMy" = ${userid} LIMIT 1`
    );
    return {
      refreshtoken: res.rows[0].slastrefreshtoken,
      whoopid: res.rows[0].iwhoopid,
    };
  } catch (err) {
    throw new Error("Could not get last refresh token");
  }
}

async function getAccessTokenWithRefreshTokenAndID(refreshtoken, userid) {
  let body = await new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshtoken,
    client_id: whoopOAuthConfig.clientID,
    client_secret: whoopOAuthConfig.clientSecret,
    scope: "offline",
  });
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const res = await fetch(whoopOAuthConfig.tokenURL, {
    body,
    headers,
    method: "POST",
  });
  const ResData = await res.json();
  await updateRefreshTokenWithUserID(ResData.refresh_token, userid);
  return ResData.access_token;
}

async function updateRefreshTokenWithUserID(refreshtoken, userID) {
  try {
    let q = `UPDATE appuser set slastrefreshtoken = '${refreshtoken}' where "hMy" = ${userID}`;
    const updateres = await pool.query(q);
  } catch (err) {
  }
}

async function getAccessToken(username) {
  let whoopdata = await getLastRefreshToken(username);
  let refreshtoken = whoopdata.refreshtoken;
  let whoopid = whoopdata.whoopid;
  let body = await new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshtoken,
    client_id: whoopOAuthConfig.clientID,
    client_secret: whoopOAuthConfig.clientSecret,
    scope: "offline",
  });
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const res = await fetch(whoopOAuthConfig.tokenURL, {
    body,
    headers,
    method: "POST",
  });
  const ResData = await res.json();
  await updateRefreshToken(ResData.refresh_token, whoopid);
  return ResData.access_token;
}

async function getUserIDWithRefreshToken(refreshtoken) {
  const res = await pool.query(`SELECT hmy FROM appuser WHERE srefreshtoken = ${refreshtoken}`)
  return res.rows[0].hmy
}

async function refreshWhoopTokens(refreshtoken) {
  try {
    let body = await new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshtoken,
      client_id: whoopOAuthConfig.clientID,
      client_secret: whoopOAuthConfig.clientSecret,
      scope: "offline",
    });
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const res = await fetch(whoopOAuthConfig.tokenURL, {
      body,
      headers,
      method: "POST",
    });
    const ResData = await res.json();
    return ResData;
  } catch (err) {
    throw new Error("refresh token is not valid");
  }
}

async function updateRefreshToken(refreshtoken, whoopid) {
  try {
    let q = `UPDATE appuser set slastrefreshtoken = '${refreshtoken}', dtlastmodified = '${new Date().toLocaleString()}' where iwhoopid = ${whoopid}`;
    const updateres = await pool.query(q);
  } catch (err) {
  }
}

async function UsernameAndPasswordAuthenticated(username, password) {
  const id = await pool.query(
    `select "hMy", iwhoopid from appuser where susername = '${username}' and spassword = '${password}'`
  );
  if (id.rows.length > 0) {
    return { whoopid: id.rows[0].iwhoopid, userid: id.rows[0].hMy };
  } else {
    return "user does not exist";
  }
}

async function UserAuthFlow(username, password) {
  try {
    const authdata = await UsernameAndPasswordAuthenticated(
      username,
      password
    );
    const userwhoopid = authdata.whoopid
    const userid = authdata.userid
    if (userwhoopid !== "user does not exist") {
      const lastRefreshTokenData = await getLastRefreshToken(username);
      const lastRefreshToken = lastRefreshTokenData.refreshtoken;
      if (lastRefreshToken !== null) {
        try {
          const TokenData = await refreshWhoopTokens(lastRefreshToken);
          const refreshtoken = await TokenData.refresh_token;
          await updateRefreshToken(refreshtoken, userwhoopid);
          return {
            refresh_token: TokenData.refresh_token,
            username: username,
            userid: userid
          };
        } catch (err) {
          return 3;
        }
      } else {
        return 2;
      }
    } else {
      return 1;
    }
  } catch (err) {
  }
}

module.exports = {
  whoopOAuthConfig,
  CreateAuthStrategy,
  fetchProfile,
  getAccessToken,
  isuserauthenticated,
  UserAuthFlow,
  refreshWhoopTokens,
  getUserIDWithRefreshToken,
  getAccessTokenWithRefreshTokenAndID,
  getLastRefreshTokenWithID
};
