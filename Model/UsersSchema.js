const { pgTable, varchar } = require("drizzle-orm/pg-core");
const UsersSchema = pgTable("users", {
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

module.exports = UsersSchema;
