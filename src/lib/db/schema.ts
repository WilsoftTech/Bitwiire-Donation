import { pgTable, serial, text, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  goal: integer("goal").notNull(),
  raised: integer("raised").default(0),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  frequency: text("frequency").notNull(), // 'one-time' | 'monthly'
  campaignId: integer("campaign_id").references(() => campaigns.id),
  email: text("email").notNull(),
  name: text("name"),
  anonymous: boolean("anonymous").default(false),
  message: text("message"),
  stripeId: text("stripe_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const impactMetrics = pgTable("impact_metrics", {
  key: text("key").primaryKey(),
  value: integer("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
