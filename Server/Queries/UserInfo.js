const {
  getAccessToken,
  getLastRefreshTokenWithID,
  getAccessTokenWithRefreshTokenAndID,
} = require("../Auth");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { pool } = require("../db");

async function getTodaysRecoveryData(userid) {
  try {
    const data = await getLastRefreshTokenWithID(userid);
    const token = await getAccessTokenWithRefreshTokenAndID(
      data.refreshtoken,
      userid
    );
    let query = new URLSearchParams({
      limit: "1",
    });
    const res = await fetch(
      `https://api.prod.whoop.com/developer/v1/recovery?${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    const ResData = await res.json();
    const strainres = await fetch(
      `https://api.prod.whoop.com/developer/v1/cycle/${ResData.records[0].cycle_id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    const strainResData = await strainres.json();
    let midnighttoday = new Date();
    midnighttoday.setHours(0,0,0,0);
    midnighttoday = midnighttoday.toISOString()
    query = new URLSearchParams({
      limit: "1",
      start: midnighttoday,
    });
    const sleepres = await fetch(
      `https://api.prod.whoop.com/developer/v1/activity/sleep?${query}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "GET",
      }
    );
    const sleepResData = await sleepres.json();
    console.log(sleepResData)
    let rv = null;
    if (typeof sleepResData.records[0] != undefined) {
      const start = new Date(sleepResData.records[0].start);
      const end = new Date(sleepResData.records[0].end);
      const minutesAsleep = (end.getTime() - start.getTime()) / 1000 / 60;
      rv = {
        recovery: ResData.records[0].score.recovery_score,
        strain: strainResData.score.strain,
        minutesAsleep: minutesAsleep,
        cycle_id: ResData.records[0].cycle_id
      };
    } else {
      rv = {
        recovery: ResData.records[0].score.recovery_score,
        strain: strainResData.score.strain,
        minutesAsleep: 0,
        cycle_id: ResData.records[0].cycle_id
      };
    }
    return rv;
  } catch (err) {
    console.log('Error from getwhoopdata funtion: ', err);
    return {
      recovery: ResData.records[0].score.recovery_score,
      strain: strainResData.score.strain,
      minutesAsleep: minutesAsleep,
    };
  }
}

async function InsertUserData(
  firstname,
  lastname,
  email,
  refresh_token,
  whoopid
) {}

module.exports = {
  getTodaysRecoveryData,
};
