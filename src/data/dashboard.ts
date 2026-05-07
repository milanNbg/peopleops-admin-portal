import type {
  DashboardMetric,
  DepartmentSummary,
  RecentActivity,
  WorkforceOverviewItem,
} from '@/types/dashboard'

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total employees', trend: '+12 this quarter', value: '248' },
  { label: 'Open roles', trend: '8 priority hires', value: '18' },
  { label: 'Time to hire', trend: '3 days faster', value: '24d' },
  { label: 'Retention rate', trend: '+2.4% year over year', value: '94%' },
]

export const workforceOverview: WorkforceOverviewItem[] = [
  { label: 'Full-time employees', value: '221' },
  { label: 'Contractors', value: '27' },
  { label: 'New hires this month', value: '9' },
  { label: 'Upcoming reviews', value: '34' },
]

export const recentActivities: RecentActivity[] = [
  {
    description: 'Maya Chen completed onboarding for Product Operations.',
    time: '09:45',
  },
  {
    description: 'Engineering opened three senior roles for Q2 hiring.',
    time: '11:10',
  },
  {
    description: 'Finance approved the updated compensation bands.',
    time: '13:25',
  },
]

export const departmentSummaries: DepartmentSummary[] = [
  { headcount: 72, lead: 'Nina Patel', name: 'Engineering', openRoles: 7 },
  { headcount: 38, lead: 'Owen Brooks', name: 'Sales', openRoles: 4 },
  { headcount: 31, lead: 'Avery Stone', name: 'Customer Success', openRoles: 3 },
  { headcount: 24, lead: 'Lena Ortiz', name: 'People', openRoles: 1 },
]
