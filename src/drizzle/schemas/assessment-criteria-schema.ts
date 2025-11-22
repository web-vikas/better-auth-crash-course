import {
    pgTable,
    text,
    timestamp, index,
    primaryKey
} from "drizzle-orm/pg-core";
import { organization } from "./auth-schema";



export const assessmentCriteria = pgTable(
    "assessment_criteria",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        description: text("description"),
        status: text("status").default("draft").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
);

export const assessmentCriteriaToOrganizations = pgTable(
    "assessment_criteria_to_organizations",
    {
        assessmentCriteriaId: text("assessment_criteria_id")
            .notNull()
            .references(() => assessmentCriteria.id, { onDelete: "cascade" }),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
    },
    (table) => [
        primaryKey({
            columns: [table.assessmentCriteriaId, table.organizationId],
        }),
        index(
            "assessment_criteria_to_orgs_assessment_criteria_id_idx",
        ).on(table.assessmentCriteriaId),
        index(
            "assessment_criteria_to_orgs_organization_id_idx",
        ).on(table.organizationId),
    ],
);
