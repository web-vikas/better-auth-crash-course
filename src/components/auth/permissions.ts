import { createAccessControl } from "better-auth/plugins/access"
import {
  defaultStatements,
  userAc,
  adminAc,
} from "better-auth/plugins/admin/access"

const statement = {
  ...defaultStatements,
  organization: ["create", "list", "update", "get", "delete"],
  systemPrompt: ["create", "list", "update", "get", "delete"],
  rolePlay: ["create", "list", "update", "get", "delete"],
  avatar: ["create", "list", "update", "get", "delete"],
  voices: ["create", "list", "update", "get", "delete"],
  rolePlayPrompt: ["create", "list", "update", "get", "delete"],
  rolePlayPromptBlock: ["create", "list", "update", "get", "delete"],
  rolePlayPromptVariable: ["create", "list", "update", "get", "delete"],
  rolePlayPromptVariableOption: ["create", "list", "update", "get", "delete"],
  assessmentCriteria: ["create", "list", "update", "get", "delete"],
} as const;

export const ac = createAccessControl(statement)

export const user = ac.newRole({
  rolePlay: ["get"]
})

export const manager = ac.newRole({
  user: ["create", "list", "update", "get", "ban", "impersonate", "set-password"],
  rolePlay: ["create", "list", "update", "get", "delete"],
})

export const superAdmin = ac.newRole({
  organization: ["create", "list", "update", "get", "delete"],
  systemPrompt: ["create", "list", "update", "get", "delete"],
  rolePlay: ["create", "list", "update", "get", "delete"],
  avatar: ["create", "list", "update", "get", "delete"],
  voices: ["create", "list", "update", "get", "delete"],
  rolePlayPrompt: ["create", "list", "update", "get", "delete"],
  rolePlayPromptBlock: ["create", "list", "update", "get", "delete"],
  rolePlayPromptVariable: ["create", "list", "update", "get", "delete"],
  rolePlayPromptVariableOption: ["create", "list", "update", "get", "delete"],
  assessmentCriteria: ["create", "list", "update", "get", "delete"],
  ...adminAc.statements,
  ...userAc.statements,
})

export const admin = ac.newRole({
  ...adminAc.statements,
})

