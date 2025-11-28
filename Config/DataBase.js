require("dotenv").config();
const { Client } = require("pg");
const db = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB error:", err));

module.exports = db;
