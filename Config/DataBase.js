require("dotenv").config();
const { Client } = require("pg");
const db = new Client({
  host: "localhost",
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB error:", err));

module.exports = db;
