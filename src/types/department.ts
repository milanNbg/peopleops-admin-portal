export type DepartmentStatus = 'Active' | 'Hiring' | 'Planning'

export type Department = {
  headcount: number
  id: string
  lead: string
  location: string
  name: string
  openRoles: number
  status: DepartmentStatus
}
