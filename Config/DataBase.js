require("dotenv").config();
const pkg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { TasksTable, UsersTable } = require("../Model/Tables");
const { Pool } = pkg;

// Build PostgreSQL connection URL from environment variables
const connectionString = `postgresql://${encodeURIComponent(
  process.env.DB_USER
)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${
  process.env.DB_PORT
}/${process.env.DB_NAME}`;

// Create a pg Pool with SSL disabled (or configure SSL as needed)
const pool = new Pool({
  connectionString,
  ssl: false, // or { rejectUnauthorized: false } if your server supports SSL
});

// Initialize Drizzle with the pool
const db = drizzle({ client: pool });

// Test connection
(async () => {
  try {
    await pool.query("select 1"); // simple test query
    console.log("Database connection successful");
    await pool.query(UsersTable); // user table creation
    await pool.query(TasksTable); // task table creation
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

module.exports = db;
