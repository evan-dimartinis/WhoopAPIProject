const express = require("express");
const router = express();
const {
  getUserJournal,
  insertUserJournal,
  updateUserJournal,
  postUserJournalEntry,
  getUserJournalEntry
} = require("../Queries/dailyjournal");

router.get(
  "/getdailyentry/userid/:userid/daysprior/:daysprior",
  async (req, res) => {
    try {
      const response = await getUserJournal(
        req.params.userid,
        req.params.daysprior
      );
      res.status(200).json(response);
    } catch (err) {
      res.status(500);
    }
  }
);

router.post("/insertdailyentry", async (req, res) => {
  try {
    const response = await insertUserJournal(req.body);
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});

router.post("/updatedailyentry", async (req, res) => {
  try {
    const response = await updateUserJournal(req.body);
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});

router.get("/getjournalentry/userid/:userid", async (req, res) => {
  try {
    const response = await getUserJournalEntry(req.params.userid);
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

router.post(`/postjournalentry`, async (req, res) => {
  try {
    const response = await postUserJournalEntry(req.body);
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
