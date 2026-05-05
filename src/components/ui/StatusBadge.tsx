import type { EmployeeStatus } from '../../types/employee'

type StatusBadgeProps = {
  status: EmployeeStatus
}

const statusClassNames: Record<EmployeeStatus, string> = {
  Active: 'active',
  Inactive: 'inactive',
  'On Leave': 'on-leave',
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`status-badge status-badge-${statusClassNames[status]}`}>
    {status}
  </span>
)
