import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    index,
    primaryKey,
} from "drizzle-orm/pg-core";
import { organization } from "./auth-schema";


export const rolePlayPrompt = pgTable("role_play_prompt", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    status: text("status").default("draft").notNull(),
    coverImage: text("cover_image"),
    coverImageAltText: text("cover_image_alt_text"),
    // organizationId removed as it will be handled by the join table
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const rolePlayPromptToOrganizations = pgTable(
    "role_play_prompt_to_organizations",
    {
        rolePlayPromptId: text("role_play_prompt_id")
            .notNull()
            .references(() => rolePlayPrompt.id, { onDelete: "cascade" }),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
    },
    (table) => [
        primaryKey({ columns: [table.rolePlayPromptId, table.organizationId] }),
        index("role_play_prompt_organization_prompt_id_idx").on(table.rolePlayPromptId),
        index("role_play_prompt_organization_organization_id_idx").on(table.organizationId),
    ]
);


