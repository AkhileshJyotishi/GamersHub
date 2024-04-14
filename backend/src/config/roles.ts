import { RoleType } from '@prisma/client'

const allRoles = {
  ['USER']: [],
  [RoleType.MOD]: [],
  [RoleType.ADMIN]: ['getUsers', 'manageUsers']
}

export const roles = Object.keys(allRoles)
export const roleRights = new Map(Object.entries(allRoles))
