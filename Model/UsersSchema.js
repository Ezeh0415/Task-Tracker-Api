const { pgTable, varchar, pgEnum } = require("drizzle-orm/pg-core");

const userRole = pgEnum("user_role", ["user", "admin"]);

const UsersSchema = pgTable("users", {
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRole("role", { length: 255 }).notNull().default("user"),
});

module.exports = UsersSchema;
