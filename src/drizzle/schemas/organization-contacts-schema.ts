import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { organization } from "./auth-schema";

export const organizationContact = pgTable("organization_contact", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
    phoneNumber: text("phone_number"),
    email: text("email"),
    address: text("address"),
    remarks: text("remarks"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

