import type { Department } from '@/types/department'

type DepartmentDetailPanelProps = {
  department: Department
  onClose: () => void
}

export const DepartmentDetailPanel = ({
  department,
  onClose,
}: DepartmentDetailPanelProps) => (
  <aside
    className="department-detail-panel"
    aria-label={department.name}
    aria-labelledby="department-detail-title"
  >
    <div className="department-detail-header">
      <div>
        <p className="eyebrow">Department detail</p>
        <h3 id="department-detail-title">{department.name}</h3>
      </div>
      <button className="detail-close-button" type="button" onClick={onClose}>
        Close
      </button>
    </div>

    <p className="department-detail-note">{department.note}</p>

    <dl className="department-detail-list">
      <div className="department-detail-item">
        <dt>Lead</dt>
        <dd>{department.lead}</dd>
      </div>
      <div className="department-detail-item">
        <dt>Headcount</dt>
        <dd>{department.headcount}</dd>
      </div>
      <div className="department-detail-item">
        <dt>Open roles</dt>
        <dd>{department.openRoles}</dd>
      </div>
      <div className="department-detail-item">
        <dt>Region</dt>
        <dd>{department.location}</dd>
      </div>
      <div className="department-detail-item">
        <dt>Staffing status</dt>
        <dd>{department.status}</dd>
      </div>
      <div className="department-detail-item">
        <dt>Hiring priority</dt>
        <dd>{department.hiringPriority}</dd>
      </div>
    </dl>
  </aside>
)
