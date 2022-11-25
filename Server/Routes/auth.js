const express = require("express");
const router = express.Router(); 

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

router

module.exports = router