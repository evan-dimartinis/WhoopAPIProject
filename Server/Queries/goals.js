const { pool } = require("../db");

const insertNewGoal = async (data) => {
  try {
    const res =
      await pool.query(`insert into goals (happuser, dtcreated, dtend, sname, bcompleted, dtcompleted, bremoved, inumextensions, idaysextended)
                 values (${data.userid}, current_timestamp, '${data.dtend}'::timestamptz, '${data.sname}', false, null, false, 0, 0)`);
    const resdata = await getUserGoals(data.userid);
    return resdata;
  } catch (err) {
    throw new Error("Could not insert user goal");
  }
};

const getUserGoals = async (userid) => {
  try {
    const res =
      await pool.query(`select hmy, sname, bcompleted, dtcompleted, date_part('day', dtend - dtcreated) as totaldays, date_part('day', current_timestamp::timestamptz - dtcreated) as dayselapsed, date_part('day', dtend - current_timestamp) as daystogo 
        from goals where bremoved = false and happuser = ${userid} order by bcompleted, dtend`);
    return res.rows;
  } catch (err) {
    throw new Error("Could not get user goals");
  }
};

const markAsComplete = async (data) => {
  try {
    const res = await pool.query(`update goals set bcompleted = true, dtcompleted = current_timestamp where hmy = ${data.hmy}`)
    return await getUserGoals(data.userid)
  } catch (err) {
    throw new Error("Could not mark goal as complete") 
  }
}

const extendGoal = async (data) => {
  try {
    const q = `update goals set dtend = '${data.dtend}'::timestamptz, inumextensions = inumextensions + 1, idaysextended = idaysextended + date_part('day', '${data.dtend}'::timestamptz - dtend) where hmy = ${data.hmy}`
    const res = pool.query(q)
    return await getUserGoals(data.userid)
  } catch (err) {
    throw new Error("could not extend goal")
  }
}

module.exports = {
    getUserGoals,
    insertNewGoal,
    markAsComplete,
    extendGoal
}