require("dotenv").config();
const pkg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
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
    await pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`); // user table creation
    await pool.query(`
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  due_date VARCHAR(50) NOT NULL,
  priority VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`); // task table creation
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

module.exports = db;
