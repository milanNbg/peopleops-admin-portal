import { MetricCard } from '../../components/ui/MetricCard'
import {
  getDashboardMetrics,
  getDepartmentSummaries,
  getRecentActivities,
  getWorkforceOverview,
} from '../../services/dashboardService'

export const DashboardPage = () => {
  const dashboardMetrics = getDashboardMetrics()
  const workforceOverview = getWorkforceOverview()
  const recentActivities = getRecentActivities()
  const departmentSummaries = getDepartmentSummaries()

  return (
    <div className="dashboard-page">
      <section className="welcome-panel" aria-labelledby="portal-title">
        <p className="eyebrow">Overview</p>
        <h2 id="portal-title">PeopleOps Admin Portal</h2>
        <p className="intro">
          Monitor workforce health, staffing momentum, and department activity
          from one front-end admin dashboard.
        </p>
      </section>

      <section className="metric-grid" aria-label="Key PeopleOps metrics">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            trend={metric.trend}
            value={metric.value}
          />
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-card" aria-labelledby="workforce-title">
          <div className="section-heading">
            <p className="eyebrow">Workforce</p>
            <h3 id="workforce-title">Workforce overview</h3>
          </div>
          <div className="overview-list">
            {workforceOverview.map((item) => (
              <div className="overview-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-card" aria-labelledby="activity-title">
          <div className="section-heading">
            <p className="eyebrow">Activity</p>
            <h3 id="activity-title">Recent activity</h3>
          </div>
          <ul className="activity-list">
            {recentActivities.map((activity) => (
              <li key={`${activity.time}-${activity.description}`}>
                <span>{activity.time}</span>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="dashboard-card" aria-labelledby="departments-title">
        <div className="section-heading">
          <p className="eyebrow">Departments</p>
          <h3 id="departments-title">Department summary</h3>
        </div>
        <div
          className="department-table"
          role="table"
          aria-label="Department summary"
        >
          <div className="department-row department-row-header" role="row">
            <span role="columnheader">Department</span>
            <span role="columnheader">Headcount</span>
            <span role="columnheader">Open roles</span>
            <span role="columnheader">Lead</span>
          </div>
          {departmentSummaries.map((department) => (
            <div className="department-row" role="row" key={department.name}>
              <span role="cell">{department.name}</span>
              <span role="cell">{department.headcount}</span>
              <span role="cell">{department.openRoles}</span>
              <span role="cell">{department.lead}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
