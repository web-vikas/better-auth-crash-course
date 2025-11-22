import { relations } from "drizzle-orm";
import { assessmentCriteria, assessmentCriteriaToOrganizations } from "./assessment-criteria-schema";
import { account, invitation, member, organization, passkey, session, twoFactor, user } from "./auth-schema";
import { organizationContact } from "./organization-contacts-schema";
import { rolePlayPromptBlock, rolePlayPromptBlockToRolePlayPrompt, rolePlayPromptBlockToRolePlayPromptVariable } from "./role-play-prompt-blocks-schema";
import { rolePlayPrompt, rolePlayPromptToOrganizations } from "./role-play-prompt-schema";
import { rolePlayPromptVariable } from "./role-play-prompt-variables-schema";
import { rolePlayPromptVariableOption } from "./role-play-prompt-variable-options-schema";

export const assessmentCriteriaRelations = relations(
    assessmentCriteria,
    ({ many }) => ({
        assessmentCriteriaToOrganizations: many(assessmentCriteriaToOrganizations),
    }),
);

export const organizationRelationsWithAssessmentCriteria = relations(organization, ({ many }) => ({
    assessmentCriteriaToOrganizations: many(assessmentCriteriaToOrganizations),
}));

export const assessmentCriteriaToOrganizationsRelations = relations(
    assessmentCriteriaToOrganizations,
    ({ one }) => ({
        assessmentCriteria: one(assessmentCriteria, {
            fields: [assessmentCriteriaToOrganizations.assessmentCriteriaId],
            references: [assessmentCriteria.id],
        }),
        organization: one(organization, {
            fields: [assessmentCriteriaToOrganizations.organizationId],
            references: [organization.id],
        }),
    }),
);



export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
    twoFactors: many(twoFactor),
    passkeys: many(passkey),
    members: many(member),
    invitations: many(invitation),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

export const twoFactorRelations = relations(twoFactor, ({ one }) => ({
    user: one(user, {
        fields: [twoFactor.userId],
        references: [user.id],
    }),
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
    user: one(user, {
        fields: [passkey.userId],
        references: [user.id],
    }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
    members: many(member),
    invitations: many(invitation),
}));

export const memberRelations = relations(member, ({ one }) => ({
    organization: one(organization, {
        fields: [member.organizationId],
        references: [organization.id],
    }),
    user: one(user, {
        fields: [member.userId],
        references: [user.id],
    }),
}));

export const invitationRelations = relations(invitation, ({ one }) => ({
    organization: one(organization, {
        fields: [invitation.organizationId],
        references: [organization.id],
    }),
    user: one(user, {
        fields: [invitation.inviterId],
        references: [user.id],
    }),
}));


// Relations - Organization Contact can have only one organization
export const organizationContactRelationsWithOrganization = relations(
    organizationContact,
    ({ one }) => ({
        organization: one(organization, {
            fields: [organizationContact.organizationId],
            references: [organization.id],
        }),
    })
);

export const organizationContactOrganizationRelationsWithOrganizationContact = relations(organization, ({ many }) => ({
    organizationContacts: many(organizationContact),
}));


export const rolePlayPromptBlockRelations = relations(rolePlayPromptBlock, ({ many }) => ({
    rolePlayPrompts: many(rolePlayPromptBlockToRolePlayPrompt),
    rolePlayPromptVariables: many(rolePlayPromptBlockToRolePlayPromptVariable),
}));

export const rolePlayPromptBlockToRolePlayPromptRelations = relations(
    rolePlayPromptBlockToRolePlayPrompt,
    ({ one }) => ({
        rolePlayPromptBlock: one(rolePlayPromptBlock, {
            fields: [rolePlayPromptBlockToRolePlayPrompt.blockId],
            references: [rolePlayPromptBlock.id],
        }),
        rolePlayPrompt: one(rolePlayPrompt, {
            fields: [rolePlayPromptBlockToRolePlayPrompt.promptId],
            references: [rolePlayPrompt.id],
        }),
    }),
);

export const rolePlayPromptBlockToRolePlayPromptVariableRelations = relations(
    rolePlayPromptBlockToRolePlayPromptVariable,
    ({ one }) => ({
        rolePlayPromptBlock: one(rolePlayPromptBlock, {
            fields: [rolePlayPromptBlockToRolePlayPromptVariable.blockId],
            references: [rolePlayPromptBlock.id],
        }),
        rolePlayPromptVariable: one(rolePlayPromptVariable, {
            fields: [rolePlayPromptBlockToRolePlayPromptVariable.variableId],
            references: [rolePlayPromptVariable.id],
        }),
    }),
);


export const rolePlayPromptRelations = relations(rolePlayPrompt, ({ many }) => ({
    rolePlayPromptToOrganizations: many(rolePlayPromptToOrganizations),
}));

export const organizationRelationsWithRolePlayPrompt = relations(organization, ({ many }) => ({
    rolePlayPromptToOrganizations: many(rolePlayPromptToOrganizations),
}));

export const rolePlayPromptToOrganizationsRelations = relations(
    rolePlayPromptToOrganizations,
    ({ one }) => ({
        rolePlayPrompt: one(rolePlayPrompt, {
            fields: [rolePlayPromptToOrganizations.rolePlayPromptId],
            references: [rolePlayPrompt.id],
        }),
        organization: one(organization, {
            fields: [rolePlayPromptToOrganizations.organizationId],
            references: [organization.id],
        }),
    })
);


export const rolePlayPromptVariableOptionRelations = relations(
    rolePlayPromptVariableOption,
    ({ one }) => ({
        rolePlayPromptVariable: one(rolePlayPromptVariable, {
            fields: [rolePlayPromptVariableOption.rolePlayPromptVariableId],
            references: [rolePlayPromptVariable.id],
        }),
    })
);
