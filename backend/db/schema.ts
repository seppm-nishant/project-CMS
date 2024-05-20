import {
  pgTable,
  serial,
  timestamp,
  text,
  boolean,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const Tables = pgTable("tables", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const fieldTypes = pgEnum("field_type", [
  "numeric",
  "timestamp",
  "date",
  "time",
  "boolean",
  "varchar",
  "text",
]);

export const Feilds = pgTable("fields", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  isPrimary: boolean("is_primary").notNull().default(false),
  type: fieldTypes("type").notNull(),
  tableId: integer("table_id")
    .notNull()
    .references(() => Tables.id),
});
