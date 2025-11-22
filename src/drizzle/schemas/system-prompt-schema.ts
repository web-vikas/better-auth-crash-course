import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
    index,
} from "drizzle-orm/pg-core";


export const systemPrompt = pgTable("system_prompt", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    status: text("status").default("draft").notNull(),
    promptCode: text("prompt_code").notNull().unique(),
    promptText: text("prompt_text").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
