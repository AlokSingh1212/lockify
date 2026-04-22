import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Clerk User ID
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  themeColor: text("theme_color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id")
    .references(() => stores.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  type: text("type").notNull(),
  features: jsonb("features").notNull().$type<string[]>(), // Array of strings stored as JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
