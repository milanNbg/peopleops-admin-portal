export type RoleAccessLevel = 'Executive' | 'Manager' | 'Contributor' | 'Support'

export type RoleStatus = 'Active' | 'Review' | 'Draft'

export type RolePermissionLevel = 'Full' | 'Manage' | 'View' | 'None'

export type Role = {
  accessLevel: RoleAccessLevel
  assignedEmployees: number
  department: string
  id: string
  lastUpdated: string
  name: string
  permissionsCount: number
  status: RoleStatus
}

export type RolePermission = {
  description: string
  id: string
  label: string
}

export type RolePermissionMatrixRow = {
  permissionId: string
  roleAccess: Record<string, RolePermissionLevel>
}

export type RolePermissionsMatrix = {
  permissions: RolePermission[]
  rows: RolePermissionMatrixRow[]
  roles: Array<Pick<Role, 'id' | 'name'>>
}
