const express = require("express");
const router = express.Router();
const {
  getTodaysRecoveryData,
} = require("../Queries/UserInfo");

router.get("/gettodayswhoopdata/userid/:userid", async (req, res) => {
  try {
    const resdata = await getTodaysRecoveryData(req.params.userid);
    res.status(200).json(resdata);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;