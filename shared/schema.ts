import { pgTable, text, serial, integer, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Fighter schema
export const fighters = pgTable("fighters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  creator: text("creator").notNull(),
  record: text("record").notNull(),
  description: text("description"),
});

export const insertFighterSchema = createInsertSchema(fighters).omit({
  id: true,
});

export type InsertFighter = z.infer<typeof insertFighterSchema>;
export type Fighter = typeof fighters.$inferSelect;

// Fight schema
export const fights = pgTable("fights", {
  id: serial("id").primaryKey(),
  fighter1Id: integer("fighter1_id").notNull(),
  fighter2Id: integer("fighter2_id").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  weightClass: text("weight_class").notNull(),
  featured: integer("featured").default(0),
});

export const insertFightSchema = createInsertSchema(fights).omit({
  id: true,
});

export type InsertFight = z.infer<typeof insertFightSchema>;
export type Fight = {
  id: number;
  fighter1: {
    id: number;
    name: string;
    creator: string;
    record: string;
  };
  fighter2: {
    id: number;
    name: string;
    creator: string;
    record: string;
  };
  date: string;
  location: string;
  weightClass: string;
  featured: number;
};

// Event schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  type: text("type").default("MAIN EVENT"),
  description: text("description"),
  mainEvent: integer("main_event").default(0),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Result schema
export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  event: text("event").notNull(),
  fighter1: text("fighter1").notNull(),
  fighter2: text("fighter2").notNull(),
  winner: text("winner").notNull(),
  method: text("method").notNull(),
  round: integer("round").notNull(),
  date: timestamp("date").notNull(),
});

export const insertResultSchema = createInsertSchema(results).omit({
  id: true,
});

export type InsertResult = z.infer<typeof insertResultSchema>;
export type Result = typeof results.$inferSelect;

// Video schema
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  youtubeId: text("youtube_id"),
  date: timestamp("date").notNull(),
  views: integer("views").default(0),
  comments: integer("comments").default(0),
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

// Subscription schema
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  interests: text("interests").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
});

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

// Additional types for frontend rendering
export type MainEvent = {
  id: number;
  date: string;
  fighter1: {
    id: number;
    name: string;
    creator: string;
    record: string;
  };
  fighter2: {
    id: number;
    name: string;
    creator: string;
    record: string;
  };
};
