const { pool } = require("../db");

const getUserJournal = async (userid, daysprior) => {
  try {
    const res = await pool.query(
      `select * from dailyentry where happuser = ${userid} and dtofentry = (date_trunc('day', current_timestamp) - INTERVAL '${daysprior} day')`
    );
    if (res.rowCount > 0) {
      return {
        completed: true,
        result: res.rows[0],
      };
    } else {
      return {
        completed: false,
        result: null,
      };
    }
  } catch (err) {
    throw new Error("Could not get user daily entry");
  }
};

const insertUserJournal = async (data) => {
  try {
    const res =
      await pool.query(`insert into dailyentry (happuser, dtofentry, balcohol, bmarijuana, irecovery, dstrain, iminutesofsleep, bwfh, bsocial, imentalwellness, iproductivity, bworkout, iworkouttype, btraveling, iwhoopcycleid)
      values (${data.userid}, date_trunc('day', '${data.dtofentry}'::timestamp), ${data.balcohol}, ${data.bmarijuana}, ${data.irecovery}, ${data.dstrain}, ${data.iminutesofsleep}, ${data.bwfh}, ${data.bsocial}, ${data.imentalwellness}, ${data.iproductivity}, false, ${data.iworkouttype}, ${data.btraveling}, ${data.iwhoopcycleid})
    `);
  } catch (err) {
    throw new Error("Could not insert daily entry");
  }
};

const updateUserJournal = async (data) => {
  try {
    const res =
      await pool.query(`update dailyentry set balcohol = ${data.balcohol}, bmarijuana = ${data.bmarijuana}, irecovery = ${data.irecovery}, dstrain = ${data.dstrain}, iminutesofsleep = ${data.iminutesofsleep}, bwfh = ${data.bwfh}, bsocial = ${data.bsocial}, imentalwellness = ${data.imentalwellness}, iproductivity = ${data.iproductivity}, iworkouttype = ${data.iworkouttype}, btraveling = ${data.btraveling}, iwhoopcycleid = ${data.iwhoopcycleid}
      where happuser = ${data.userid} and dtofentry = date_trunc('day', '${data.dtofentry}'::timestamp)
    `);
  } catch (err) {
    throw new Error("Error updating Journal");
  }
};

const getUserJournalEntry = async (data) => {
  try {
    const res = await pool.query(
      `select * from journalentry where date_trunc('day', dtentry) = date_trunc('day', current_timestamp)`
    );
    if (res.rowCount > 0) {
      return {
        bcompleted: true,
        stext: res.rows[0].stext,
      };
    } else {
      return {
        bcompleted: false,
        stext: "",
      };
    }
  } catch (err) {
    throw new Error("could not get journal entry");
  }
};

const postUserJournalEntry = async (data) => {
  try {
    const res =
      await pool.query(`select hmy from journalentry where huser = ${data.userid} and
    date_part('day', current_timestamp) = date_part('day', dtentry) and
    date_part('month', current_timestamp) = date_part('month', dtentry) and
    date_part('year', current_timestamp) = date_part('year', dtentry)`);
    if (res.rowCount > 0) {
      const updateres = await pool.query(
        `update journalentry set stext = '${data.stext}' where hmy = ${res.rows[0].hmy}`
      );
    } else {
      const insertres = await pool.query(
        `insert into journalentry (stext, dtentry, huser) values ('${data.stext}', current_timestamp, ${data.userid})`
      );
    }
  } catch (err) {
    throw new Error("Could not update/insert journal entry");
  }
};

module.exports = {
  getUserJournal,
  insertUserJournal,
  updateUserJournal,
  postUserJournalEntry,
  getUserJournalEntry,
};
