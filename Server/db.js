const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "EvanWhoopData",
  password: "Sinitramid19",
  port: 2000,
});

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "EvanWhoopData",
  password: "Sinitramid19",
  port: 2000,
})

module.exports = {
    pool,
    client
}