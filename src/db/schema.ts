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

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id").notNull(), // Clerk User ID
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id").notNull(), // Clerk User ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Recipient Clerk User ID
  actorId: text("actor_id").notNull(), // Actor Clerk User ID
  type: text("type").notNull(), // 'like', 'comment', 'sale'
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }),
  read: integer("read").default(0).notNull(), // 0 for unread, 1 for read
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
