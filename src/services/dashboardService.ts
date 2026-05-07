import {
  dashboardMetrics,
  departmentSummaries,
  recentActivities,
  workforceOverview,
} from '@/data/dashboard'
import { mockDelay } from '@/utils/mockDelay'

export const getDashboardMetrics = async () => {
  await mockDelay()

  return dashboardMetrics
}

export const getWorkforceOverview = async () => {
  await mockDelay()

  return workforceOverview
}

export const getRecentActivities = async () => {
  await mockDelay()

  return recentActivities
}

export const getDepartmentSummaries = async () => {
  await mockDelay()

  return departmentSummaries
}
