import { StatusBadge } from '../../../components/ui/StatusBadge'
import type { Employee } from '../../../types/employee'

type EmployeeTableProps = {
  employees: Employee[]
}

export const EmployeeTable = ({ employees }: EmployeeTableProps) => (
  <div className="employee-table" role="table" aria-label="Employee directory">
    <div className="employee-row employee-row-header" role="row">
      <span role="columnheader">Employee name</span>
      <span role="columnheader">Department</span>
      <span role="columnheader">Role</span>
      <span role="columnheader">Location</span>
      <span role="columnheader">Status</span>
      <span role="columnheader">Start date</span>
    </div>

    {employees.map((employee) => (
      <div className="employee-row" role="row" key={employee.id}>
        <span role="cell">
          <strong>{employee.name}</strong>
          <small>{employee.email}</small>
        </span>
        <span role="cell">{employee.department}</span>
        <span role="cell">{employee.role}</span>
        <span role="cell">{employee.location}</span>
        <span role="cell">
          <StatusBadge status={employee.status} />
        </span>
        <span role="cell">{employee.startDate}</span>
      </div>
    ))}
  </div>
)
