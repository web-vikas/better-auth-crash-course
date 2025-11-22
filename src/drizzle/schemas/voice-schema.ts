import {
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";


export const voice = pgTable("voice", {
    id: text("id").primaryKey(),
    displayName: text("display_name").notNull(),
    status: text("status").default("draft").notNull(),
    provider: text("provider").notNull(),
    providerId: text("provider_id").notNull(),
    variantName: text("variant_name").notNull(),
    sampleUrl: text("sample_url"),
    gender: text("gender").notNull().default("male"),
    language: text("language"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
