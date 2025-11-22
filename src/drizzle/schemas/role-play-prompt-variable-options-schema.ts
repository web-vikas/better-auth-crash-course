import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { rolePlayPromptVariable } from "./role-play-prompt-variables-schema";

export const rolePlayPromptVariableOption = pgTable("role_play_prompt_variable_option", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    value: text("value").notNull().default(""),
    rolePlayPromptVariableId: text("role_play_prompt_variable_id").notNull().references(() => rolePlayPromptVariable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
