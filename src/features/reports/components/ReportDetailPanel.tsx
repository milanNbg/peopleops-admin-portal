import { StatusBadge } from '@/components/ui'

import type { Report } from '@/types/report'

type ReportDetailPanelProps = {
  report: Report
  onClose: () => void
  onExportReport: () => void
}

export const ReportDetailPanel = ({
  report,
  onClose,
  onExportReport,
}: ReportDetailPanelProps) => (
  <aside
    className="report-detail-panel"
    id="report-detail-panel"
    aria-labelledby="report-detail-title"
  >
    <div className="report-detail-header">
      <div>
        <p className="eyebrow">{report.category}</p>
        <h3 id="report-detail-title">{report.name}</h3>
      </div>
      <button
        className="detail-close-button"
        type="button"
        onClick={onClose}
        aria-label={`Close details for ${report.name}`}
      >
        Close
      </button>
    </div>

    <p className="report-detail-description">{report.description}</p>

    <dl className="report-detail-list">
      <div className="report-detail-item">
        <dt>Owner</dt>
        <dd>{report.owner}</dd>
      </div>
      <div className="report-detail-item">
        <dt>Status</dt>
        <dd>
          <StatusBadge status={report.status} />
        </dd>
      </div>
      <div className="report-detail-item">
        <dt>Last generated</dt>
        <dd>{report.generatedDate}</dd>
      </div>
      <div className="report-detail-item">
        <dt>Schedule</dt>
        <dd>{report.schedule}</dd>
      </div>
      <div className="report-detail-item">
        <dt>Period</dt>
        <dd>{report.period}</dd>
      </div>
      <div className="report-detail-item">
        <dt>Category</dt>
        <dd>{report.category}</dd>
      </div>
    </dl>

    <div className="report-detail-actions">
      <button
        className="export-report-button"
        type="button"
        onClick={onExportReport}
      >
        Download CSV
      </button>
    </div>
  </aside>
)
