import {
    pgTable,
    text,
    timestamp, index,
    primaryKey,
    jsonb
} from "drizzle-orm/pg-core";
import { organization } from "./auth-schema";



export const servicesUsage = pgTable("services_usage", {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").references(() => organization.id),
    serviceName: text("service_name").notNull(),
    usage: text("usage").notNull(),
    unit: text("unit").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
});