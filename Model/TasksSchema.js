const { pgTable, varchar } = require("drizzle-orm/pg-core");

const TasksSchema = pgTable("tasks", {
  title: varchar("title", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  due_date: varchar("due_date", { length: 50 }).notNull(),
  priority: varchar("priority", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull(),
});

module.exports = TasksSchema;
