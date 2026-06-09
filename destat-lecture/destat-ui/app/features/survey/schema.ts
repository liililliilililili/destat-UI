import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const surveys = pgTable("surveys", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  contractAddress: text("contract_address").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
