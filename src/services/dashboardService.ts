import {
  dashboardMetrics,
  departmentSummaries,
  recentActivities,
  workforceOverview,
  workforceTrend,
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

export const getWorkforceTrend = async () => {
  await mockDelay()

  return workforceTrend
}

export const getRecentActivities = async () => {
  await mockDelay()

  return recentActivities
}

export const getDepartmentSummaries = async () => {
  await mockDelay()

  return departmentSummaries
}
