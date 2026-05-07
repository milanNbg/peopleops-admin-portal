import { employees } from '@/data/employees'
import { mockDelay } from '@/utils/mockDelay'

export const getEmployees = async () => {
  await mockDelay()

  return employees
}
