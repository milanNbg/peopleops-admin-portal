import { roles } from '@/data/roles'
import { mockDelay } from '@/utils/mockDelay'

export const getRoles = async () => {
  await mockDelay()

  return roles
}
