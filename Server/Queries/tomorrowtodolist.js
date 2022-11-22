const { pool } = require("../db");

const getTomorrowUserTodos = async (userid) => {
  try {
    const res = await pool.query(
      `select stitle, bcompleted, hmy from todoitems where happuser = ${userid} and tododate = (date_trunc('day', current_timestamp) + INTERVAL '1 day' ) and bremoved = false order by hmy`
    );
    return res.rows;
  } catch (err) {
    throw new Error("Could not get user todos");
  }
};

const addTomorrowTodoItem = async (userid, stitle) => {
  try {
    const res =
      await pool.query(`insert into todoitems (happuser, tododate, stitle, bcompleted, bremoved)
            values (${userid}, (date_trunc('day', current_timestamp) + INTERVAL '1 day'), '${stitle}', false, false)`);
    return getTomorrowUserTodos(userid);
  } catch (err) {
    throw new Error("Could not insert new todo item");
  }
};

const removeTomorrowTodoItem = async (userid, hmy) => {
  try {
    const res = await pool.query(`update todoitems set bremoved = true where hmy = ${hmy}`)
    return getTomorrowUserTodos(userid)
  } catch (err) {
    throw new Error("Could not remove todo item")
  }
}

module.exports = {
  getTomorrowUserTodos,
  addTomorrowTodoItem,
  removeTomorrowTodoItem
};
