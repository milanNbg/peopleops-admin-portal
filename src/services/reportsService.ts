import { reports } from '@/data/reports'
import { mockDelay } from '@/utils/mockDelay'

export const getReports = async () => {
  await mockDelay()

  return reports
}
