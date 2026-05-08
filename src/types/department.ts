export type DepartmentStatus = 'Active' | 'Hiring' | 'Planning'

export type DepartmentHiringPriority = 'High' | 'Medium' | 'Low'

export type Department = {
  headcount: number
  hiringPriority: DepartmentHiringPriority
  id: string
  lead: string
  location: string
  name: string
  note: string
  openRoles: number
  status: DepartmentStatus
}
