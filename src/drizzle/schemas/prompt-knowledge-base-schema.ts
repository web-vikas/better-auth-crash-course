import {
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";


export const promptKnowledgeBase = pgTable("prompt_knowledge_base", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    fileUrl: text("file_url").notNull(),
    fileFormat: text("file_format").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});