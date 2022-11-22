const { pool, client } = require("../db");

const getUserEverydays = async (userid) => {
  await generateTodaysEverydays(userid);
  const res = await pool.query(
    `select ed.hmy, e.sname, ed.bcompleted
    from everydays e 
      join everydaydetail ed on ed.heverydays = e.hmy
    where e.dtstartdate < current_timestamp
      and coalesce(dtenddate, '12/31/2099'::timestamp) > current_timestamp
      and ed.dtlogged = date_trunc('day', current_timestamp)
      and e.happuser = ${userid}
      and e.bremoved = false
    order by ed.hmy`
  );
  return res.rows;
};

const generateTodaysEverydays = async (userid) => {
  try {
    await pool.query(`DO $$
      DECLARE
      everydayid int;
      BEGIN
      FOR everydayid IN (select hmy FROM everydays e where bremoved = false and happuser = 1 and not exists (select * from everydaydetail ed where ed.heverydays = e.hmy and ed.dtlogged = date_trunc('day', current_timestamp)) and coalesce(dtenddate, '12/31/2099'::timestamp) > current_timestamp and current_timestamp > dtstartdate)
      LOOP
        INSERT INTO everydaydetail (heverydays, dtlogged, bcompleted)
          VALUES (everydayid, date_trunc('day', current_timestamp), false);
      END LOOP;
      END$$;`);
  } catch (err) {
    throw new Error("Could not generate today's everydays");
  }
};

const addNewEveryday = async (userid, sname, dtend) => {
  try {
    const res = await pool.query(
      `insert into everydays (happuser, sname, dtstartdate, dtenddate) values (${userid}, '${sname}', date_trunc('day', current_timestamp), date_trunc('day', '${dtend}'::timestamp))`
    );
  } catch (err) {
    throw new Error("Failed to insert new everyday task");
  } finally {
    return await getUserEverydays(userid);
  }
};

const markAsComplete = async (hmy) => {
  try {
    const res = await pool.query(
      `update everydaydetail set bcompleted = true where hmy = ${hmy}`
    );
  } catch (err) {
    throw new Error("Error updating everyday as complete");
  }
};

module.exports = {
  getUserEverydays,
  addNewEveryday,
  markAsComplete,
};
