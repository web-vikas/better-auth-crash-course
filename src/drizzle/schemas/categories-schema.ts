import {
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";

export const category = pgTable("category", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    status: text("status").default("draft").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
