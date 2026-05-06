import { departments } from '../data/departments'
import { mockDelay } from '../utils/mockDelay'

export const getDepartments = async () => {
  await mockDelay()

  return departments
}
