import {
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";

export const avatar = pgTable("avatar", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    displayName: text("display_name").notNull(),
    provider: text("provider").notNull(),
    providerId: text("provider_id").notNull(),
    variantName: text("variant_name").notNull(),
    gender: text("gender").notNull().default("male"),
    imageUrl: text("image_url"),
    status: text("status").default("draft").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
