import {
    pgTable,
    text,
    timestamp, serial
} from "drizzle-orm/pg-core";


export const rolePlayPromptVariable = pgTable("role_play_prompt_variable", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    code: serial("code").notNull().unique(),
    description: text("description"),
    type: text("type").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
