export type ReportCategory =
  | 'Workforce'
  | 'Compliance'
  | 'Hiring'
  | 'Retention'
  | 'Payroll readiness'

export type ReportStatus = 'Ready' | 'Scheduled' | 'Review'

export type Report = {
  category: ReportCategory
  description: string
  generatedDate: string
  id: string
  name: string
  owner: string
  period: string
  schedule: string
  status: ReportStatus
}
