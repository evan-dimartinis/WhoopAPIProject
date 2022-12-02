const express = require("express");
const router = express.Router();
const { insertNewGoal, getUserGoals } = require("../Queries/goals");

router.get("/getusergoals/userid/:userid", async (req, res) => {
  try {
    console.log(req.params.userid)
    const response = await getUserGoals(req.params.userid);
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

router.post("/insertnewgoal", async (req, res) => {
  try {
    const response = await insertNewGoal(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;