const express = require("express");
const router = express.Router();
const {
  getUserEverydays,
  addNewEveryday,
  markAsComplete,
  deleteEveryday,
} = require("../Queries/everydays");

router.get("/geteverydays/userid/:userid", async (req, res) => {
  try {
    const everydaysdata = await getUserEverydays(req.params.userid);
    res.status(200).json(everydaysdata);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/markeverydayascomplete", async (req, res) => {
  try {
    await markAsComplete(req.body.hmy);
    const everydaysdata = await getUserEverydays(req.body.userid);
    res.status(200).json(everydaysdata);
  } catch (err) {
    res.status(500);
  }
});

router.post("/deleteeveryday", async (req, res) => {
  try {
    const response = await deleteEveryday(req.body.userid, req.body.hmy);
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

router.get(
  "/addNewEveryday/userid/:userid/sname/:sname/dtend/:dtend",
  async (req, res) => {
    try {
      const everydaysdata = await addNewEveryday(
        req.params.userid,
        req.params.sname,
        req.params.dtend
      );
      res.status(200).json(everydaysdata);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

module.exports = router;
