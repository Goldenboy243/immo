import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  phone: text("phone"),
  avatar: text("avatar"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  name: true,
  phone: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Properties table
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  priceType: text("price_type").notNull().default("sale"), // 'sale' | 'rent'
  location: text("location").notNull(),
  city: text("city").notNull(),
  type: text("type").notNull(), // 'maison' | 'appartement' | 'terrain' | 'villa' | 'studio'
  status: text("status").notNull().default("vente"), // 'vente' | 'location'
  bedrooms: integer("bedrooms").default(0),
  bathrooms: integer("bathrooms").default(0),
  area: integer("area").notNull(), // in m²
  yearBuilt: integer("year_built"),
  images: jsonb("images").$type<string[]>().default([]),
  features: jsonb("features").$type<string[]>().default([]),
  amenities: jsonb("amenities").$type<{ icon: string; label: string }[]>().default([]),
  ownerId: varchar("owner_id").references(() => users.id),
  isVerified: boolean("is_verified").default(false),
  isNew: boolean("is_new").default(true),
  isPopular: boolean("is_popular").default(false),
  views: integer("views").default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Favorites table
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  propertyId: varchar("property_id").references(() => properties.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Favorite = typeof favorites.$inferSelect;

// Inquiries/Messages table
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").references(() => properties.id).notNull(),
  senderId: varchar("sender_id").references(() => users.id),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  senderPhone: text("sender_phone"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
