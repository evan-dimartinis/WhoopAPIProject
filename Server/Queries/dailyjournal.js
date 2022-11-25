const { pool } = require("../db");

const getUserJournal = async (userid, daysprior) => {
  try {
    const res = await pool.query(
      `select * from dailyentry where happuser = ${userid} and dtofentry = (date_trunc('day', current_timestamp) - INTERVAL '${daysprior} day')`
    );
    if (res.rowCount > 0) {
        return {
            completed: true,
            result: res.rows[0]
        }
    } else {
        return {
            completed: false,
            result: null
        }
    }
  } catch (err) {
    throw new Error("Could not get user daily entry")
  }
};

const insertUserJournal = async (data) => {
  try {
    const res = await pool.query(`insert into dailyentry (happuser, dtofentry, balcohol, bmarijuana, irecovery, dstrain, iminutesofsleep, bwfh, bsocial, imentalwellness, iproductivity, bworkout, iworkouttype, btraveling, iwhoopcycleid)
      values (${data.userid}, date_trunc('day', '${data.dtofentry}'::timestamp), ${data.balcohol}, ${data.bmarijuana}, ${data.irecovery}, ${data.dstrain}, ${data.iminutesofsleep}, ${data.bwfh}, ${data.bsocial}, ${data.imentalwellness}, ${data.iproductivity}, false, ${data.iworkouttype}, ${data.btraveling}, ${data.iwhoopcycleid})
    `)
  } catch (err) {
    throw new Error("Could not insert daily entry")
  }
}

const updateUserJournal = async (data) => {
  try {
    const res = await pool.query(`update dailyentry set balcohol = ${data.balcohol}, bmarijuana = ${data.bmarijuana}, irecovery = ${data.irecovery}, dstrain = ${data.dstrain}, iminutesofsleep = ${data.iminutesofsleep}, bwfh = ${data.bwfh}, bsocial = ${data.bsocial}, imentalwellness = ${data.imentalwellness}, iproductivity = ${data.iproductivity}, iworkouttype = ${data.iworkouttype}, btraveling = ${data.btraveling}, iwhoopcycleid = ${data.iwhoopcycleid}
      where happuser = ${data.userid} and dtofentry = date_trunc('day', '${data.dtofentry}'::timestamp)
    `)
  } catch (err) {
    throw new Error("Error updating Journal")
  }
}

module.exports = {
    getUserJournal,
    insertUserJournal,
    updateUserJournal
}