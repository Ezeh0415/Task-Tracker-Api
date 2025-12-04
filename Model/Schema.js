const { sql } = require("drizzle-orm");
const {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} = require("drizzle-orm/pg-core");

const UsersSchema = pgTable("users", {
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

const TasksSchema = pgTable("tasks", {
  title: varchar("title", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }).notNull(),
  due_date: varchar("due_date", { length: 50 }).notNull(),
  priority: varchar("priority", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
});

module.exports = { UsersSchema, TasksSchema };
