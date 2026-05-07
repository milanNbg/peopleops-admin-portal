import { Link } from 'react-router-dom'
import { Card, PageHeader } from '../../components/ui'

export const NotFoundPage = () => (
  <div className="not-found-page">
    <PageHeader eyebrow="404" title="Page not found" titleId="not-found-title">
      The page you are looking for does not exist or may have been moved.
    </PageHeader>

    <Card labelledBy="not-found-help-title">
      <div className="not-found-card">
        <p className="eyebrow">Navigation</p>
        <h3 id="not-found-help-title">Return to your PeopleOps workspace</h3>
        <p>
          Go back to the dashboard to continue reviewing workforce metrics,
          employee records, departments, roles, and reports.
        </p>
        <Link className="not-found-action" to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </Card>
  </div>
)
