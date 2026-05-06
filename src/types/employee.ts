export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave'

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contractor'

export type Employee = {
  department: string
  email: string
  employmentType: EmploymentType
  id: string
  location: string
  manager: string
  name: string
  role: string
  startDate: string
  status: EmployeeStatus
}
