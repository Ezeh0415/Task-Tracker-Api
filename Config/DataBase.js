require("dotenv").config();
const pkg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { TasksTable, UsersTable } = require("../Model/Tables");
const { Pool } = pkg;

// Parse numeric port (fall back to 5432)
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

// Create a pg Pool with explicit fields (more robust than a built connection string)
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: dbPort,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false,
  max: 10,
  idleTimeoutMillis: 30000,
});

// Initialize Drizzle with the pool
const db = drizzle({ client: pool });

// Test connection and create tables with clearer logging
(async () => {
  try {
    console.log("DB connect attempt:", {
      host: pool.options.host,
      port: pool.options.port,
      database: pool.options.database,
      user: pool.options.user,
    });

    await pool.query("SELECT 1");
    console.log("Database connection successful");

    // Create tables and log results/errors explicitly
    await pool.query(UsersTable);
    console.log("Users table creation attempted");

    await pool.query(TasksTable);
    console.log("Tasks table creation attempted");
  } catch (err) {
    console.error("Database connection or setup failed:", err);
  }
})();

module.exports = db;
