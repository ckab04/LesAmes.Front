export const Roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TUTEUR: 'TUTEUR',
} as const

export type Role = (typeof Roles)[keyof typeof Roles]

export const RoleLabels: Record<Role, string> = {
  [Roles.SUPER_ADMIN]: 'Super Admin',
  [Roles.ADMIN]: 'Admin',
  [Roles.TUTEUR]: 'Tuteur',
}
