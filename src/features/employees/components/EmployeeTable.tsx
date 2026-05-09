import { DataTable, StatusBadge } from '@/components/ui'

import type { DataTableColumn } from '@/components/ui'
import type { Employee } from '@/types/employee'

type EmployeeTableProps = {
  employees: Employee[]
  selectedEmployeeId?: string
  onSelectEmployee: (employee: Employee) => void
}

const employeeColumns: DataTableColumn<Employee>[] = [
  {
    header: 'Employee name',
    key: 'name',
    render: (employee) => (
      <>
        <strong>{employee.name}</strong>
        <small>{employee.email}</small>
      </>
    ),
  },
  {
    header: 'Department',
    key: 'department',
    render: (employee) => employee.department,
  },
  {
    header: 'Role',
    key: 'role',
    render: (employee) => employee.role,
  },
  {
    header: 'Location',
    key: 'location',
    render: (employee) => employee.location,
  },
  {
    header: 'Status',
    key: 'status',
    render: (employee) => <StatusBadge status={employee.status} />,
  },
  {
    header: 'Start date',
    key: 'startDate',
    render: (employee) => employee.startDate,
  },
]

export const EmployeeTable = ({
  employees,
  selectedEmployeeId,
  onSelectEmployee,
}: EmployeeTableProps) => (
  <DataTable
    ariaLabel="Employee directory"
    className="employee-table"
    columns={employeeColumns}
    data={employees}
    emptyMessage="No employees found."
    getRowLabel={(employee) => `View details for ${employee.name}`}
    getRowKey={(employee) => employee.id}
    headerRowClassName="employee-row employee-row-header"
    rowControlsId={selectedEmployeeId ? 'employee-detail-panel' : undefined}
    rowClassName="employee-row employee-row-selectable"
    selectedRowKey={selectedEmployeeId}
    onRowSelect={onSelectEmployee}
  />
)
