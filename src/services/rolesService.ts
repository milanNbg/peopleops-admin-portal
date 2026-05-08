import { rolePermissionsMatrix, roles } from '@/data/roles'
import { mockDelay } from '@/utils/mockDelay'

export const getRoles = async () => {
  await mockDelay()

  return roles
}

export const getRolePermissionsMatrix = async () => {
  await mockDelay()

  return rolePermissionsMatrix
}
