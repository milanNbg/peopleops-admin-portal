export type DashboardMetric = {
  label: string
  trend: string
  value: string
}

export type WorkforceOverviewItem = {
  label: string
  value: string
}

export type RecentActivity = {
  description: string
  time: string
}

export type DepartmentSummary = {
  headcount: number
  lead: string
  name: string
  openRoles: number
}
