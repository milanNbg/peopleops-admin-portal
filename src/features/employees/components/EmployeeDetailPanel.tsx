import { StatusBadge } from '@/components/ui'

import type { Employee } from '@/types/employee'

type EmployeeDetailPanelProps = {
  employee: Employee
  onClose: () => void
}

const detailItems = (employee: Employee) => [
  { label: 'Email', value: employee.email },
  { label: 'Department', value: employee.department },
  { label: 'Role', value: employee.role },
  { label: 'Location', value: employee.location },
  { label: 'Start date', value: employee.startDate },
  { label: 'Manager', value: employee.manager },
  { label: 'Employment type', value: employee.employmentType },
]

export const EmployeeDetailPanel = ({
  employee,
  onClose,
}: EmployeeDetailPanelProps) => (
  <aside className="employee-detail-panel" aria-labelledby="employee-detail-title">
    <div className="employee-detail-header">
      <div>
        <p className="eyebrow">Employee profile</p>
        <h3 id="employee-detail-title">{employee.name}</h3>
      </div>
      <button
        className="detail-close-button"
        type="button"
        onClick={onClose}
        aria-label={`Close details for ${employee.name}`}
      >
        Close
      </button>
    </div>

    <div className="employee-detail-status">
      <span>Employment status</span>
      <StatusBadge status={employee.status} />
    </div>

    <dl className="employee-detail-list">
      {detailItems(employee).map((item) => (
        <div className="employee-detail-item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  </aside>
)
