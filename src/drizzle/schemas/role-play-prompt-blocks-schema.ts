import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp, primaryKey
} from "drizzle-orm/pg-core";
import { rolePlayPrompt } from "./role-play-prompt-schema";
import { rolePlayPromptVariable } from "./role-play-prompt-variables-schema";

export const rolePlayPromptBlock = pgTable("role_play_prompt_block", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    status: text("status").default("draft").notNull(),
    promptText: text("prompt_text"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const rolePlayPromptBlockToRolePlayPrompt = pgTable(
    "role_play_prompt_block_to_role_play_prompt",
    {
        blockId: text("block_id")
            .notNull()
            .references(() => rolePlayPromptBlock.id),
        promptId: text("prompt_id")
            .notNull()
            .references(() => rolePlayPrompt.id),
    },
    (t) => ([
        primaryKey({ columns: [t.blockId, t.promptId] }),
    ]),
);

export const rolePlayPromptBlockToRolePlayPromptVariable = pgTable(
    "role_play_prompt_block_to_role_play_prompt_variable",
    {
        blockId: text("block_id")
            .notNull()
            .references(() => rolePlayPromptBlock.id),
        variableId: text("variable_id")
            .notNull()
            .references(() => rolePlayPromptVariable.id),
    },
    (t) => ([
        primaryKey({ columns: [t.blockId, t.variableId] }),
    ]),
);
