const { pool } = require("../db");

const getUserTodos = async (userid) => {
  try {
    const res = await pool.query(
      `select stitle, bcompleted, hmy from todoitems where happuser = ${userid} and tododate = date_trunc('day', current_timestamp) and bremoved = false order by hmy`
    );
    return res.rows;
  } catch (err) {
    throw new Error("Could not get user todos");
  }
};

const addTodoItem = async (userid, stitle) => {
  try {
    const res =
      await pool.query(`insert into todoitems (happuser, tododate, stitle, bcompleted, bremoved)
            values (${userid}, date_trunc('day', current_timestamp), '${stitle}', false, false)`);
    return getUserTodos(userid);
  } catch (err) {
    throw new Error("Could not insert new todo item");
  }
};

const markTodoAsComplete = async (userid, hmy) => {
  try {
    const res = await pool.query(
      `update todoitems set bcompleted = true where hmy = ${hmy}`
    );
    return getUserTodos(userid);
  } catch (err) {
    return false;
  }
};

const removeTodo = async (userid, hmy) => {
  try {
    const res = await pool.query(`update todoitems set bremoved = true where hmy = ${hmy}`)
    return getUserTodos(userid)
  } catch (err) {
    throw new Error("Could not remove todo item")
  }
}

module.exports = {
  getUserTodos,
  addTodoItem,
  markTodoAsComplete,
  removeTodo
};
