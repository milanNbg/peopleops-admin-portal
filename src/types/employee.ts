export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave'

export type Employee = {
  department: string
  email: string
  id: string
  location: string
  name: string
  role: string
  startDate: string
  status: EmployeeStatus
}
