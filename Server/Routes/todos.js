const express = require("express");
const router = express.Router();
const {
  getUserTodos,
  addTodoItem,
  markTodoAsComplete,
  removeTodo,
} = require("../Queries/todolist");
const {
  addTomorrowTodoItem,
  getTomorrowUserTodos,
  removeTomorrowTodoItem,
} = require("../Queries/tomorrowtodolist");

router.get("/gettodos/userid/:userid", async (req, res) => {
  try {
    const todos = await getUserTodos(req.params.userid);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500);
  }
});

router.post("/addnewtodo", async (req, res) => {
  try {
    const todos = await addTodoItem(req.body.userid, req.body.stitle);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500);
  }
});

router.post("/marktodoascomplete", async (req, res) => {
  try {
    const response = await markTodoAsComplete(req.body.userid, req.body.hmy);
    res.status(200).json(response);
  } catch (err) {}
});

router.post("/removetodoitem", async (req, res) => {
  try {
    const response = await removeTodo(req.body.userid, req.body.hmy);
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

router.post("/addtomorrowtodo", async (req, res) => {
  try {
    const response = await addTomorrowTodoItem(
      req.body.userid,
      req.body.stitle
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

router.get("/gettomorrowtodos/userid/:userid", async (req, res) => {
  try {
    const response = await getTomorrowUserTodos(req.params.userid);
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

router.post("/removetomorrowtodo", async (req, res) => {
  try {
    const response = await removeTomorrowTodoItem(
      req.body.userid,
      req.body.hmy
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
