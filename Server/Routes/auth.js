const express = require("express");
const router = express.Router();
const passport = require("passport");
const Auth = require("../Auth");

const whoopAuthorizationStrategy = Auth.CreateAuthStrategy();
whoopAuthorizationStrategy.userProfile = Auth.fetchProfile;

passport.use("withWhoop", whoopAuthorizationStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

router.use(passport.initialize());
router.use(passport.session());

router.get("/authenticatewithwhoop", passport.authenticate("withWhoop"));

router.get(
  "/authenticatewithwhoop/callback",
  passport.authenticate("withWhoop", {
    failureRedirect: "/whoopauthenticationfailure",
    failureMessage: true,
  }),
  function (req, res) {
    Auth.isuserauthenticated = true;
    res.send("Please close this tab now, Thank you");
  }
);

router.post("/authenticateuser", async (req, res) => {
  const authres = await Auth.UserAuthFlow(req.body.username, req.body.password);
  res.status(200).json(authres);
});

router.post("/validaterefreshtoken", async (req, res) => {
  try {
    const validationdata = await Auth.refreshWhoopTokens(req.body.refreshtoken);
    res.status(200).json({ newtoken: validationdata.refresh_token });
  } catch (err) {
    res.status(500).json({ message: "token not valid" });
  }
});

router.get("/whoopauthenticationfailure", async (req, res) => {
  res.send("Whoop Authentication Failed");
});

router.get("/isuserauthenticated", (req, res) => {
  res.send(JSON.stringify({ Authenticated: Auth.isuserauthenticated }));
});

router;

module.exports = router;
