import {
  Card,
  DataTable,
  ErrorState,
  MetricCard,
  PageHeader,
  PageHeaderSkeleton,
  SectionHeader,
  SkeletonBlock,
  SkeletonCardGrid,
  SkeletonTable,
} from '@/components/ui'
import {
  getDashboardMetrics,
  getDepartmentSummaries,
  getRecentActivities,
  getWorkforceOverview,
  getWorkforceTrend,
} from '@/services/dashboardService'
import { useAsyncData } from '@/hooks/useAsyncData'

import type { DataTableColumn } from '@/components/ui'
import type {
  DashboardMetric,
  DepartmentSummary,
  RecentActivity,
  WorkforceOverviewItem,
  WorkforceTrendItem,
} from '@/types/dashboard'

import { WorkforceTrendChart } from './components/WorkforceTrendChart'

const departmentSummaryColumns: DataTableColumn<DepartmentSummary>[] = [
  {
    header: 'Department',
    key: 'name',
    render: (department) => department.name,
  },
  {
    header: 'Headcount',
    key: 'headcount',
    render: (department) => department.headcount,
  },
  {
    header: 'Open roles',
    key: 'openRoles',
    render: (department) => department.openRoles,
  },
  {
    header: 'Lead',
    key: 'lead',
    render: (department) => department.lead,
  },
]

type DashboardPageData = {
  dashboardMetrics: DashboardMetric[]
  departmentSummaries: DepartmentSummary[]
  recentActivities: RecentActivity[]
  workforceOverview: WorkforceOverviewItem[]
  workforceTrend: WorkforceTrendItem[]
}

const initialDashboardData: DashboardPageData = {
  dashboardMetrics: [],
  departmentSummaries: [],
  recentActivities: [],
  workforceOverview: [],
  workforceTrend: [],
}

const loadDashboardData = async (): Promise<DashboardPageData> => {
  const [
    dashboardMetrics,
    workforceOverview,
    workforceTrend,
    recentActivities,
    departmentSummaries,
  ] = await Promise.all([
    getDashboardMetrics(),
    getWorkforceOverview(),
    getWorkforceTrend(),
    getRecentActivities(),
    getDepartmentSummaries(),
  ])

  return {
    dashboardMetrics,
    departmentSummaries,
    recentActivities,
    workforceOverview,
    workforceTrend,
  }
}

const DashboardSkeleton = () => (
  <div className="dashboard-skeleton" role="status" aria-live="polite">
    <span className="visually-hidden">Loading dashboard data...</span>
    <PageHeaderSkeleton />

    <SkeletonCardGrid />

    <Card labelledBy="dashboard-skeleton-trend-title">
      <span className="visually-hidden" id="dashboard-skeleton-trend-title">
        Loading workforce trend
      </span>
      <div className="dashboard-skeleton-heading" aria-hidden="true">
        <SkeletonBlock className="skeleton-eyebrow" />
        <SkeletonBlock className="skeleton-heading" />
      </div>
      <div className="dashboard-skeleton-chart" aria-hidden="true">
        {['trend-1', 'trend-2', 'trend-3', 'trend-4', 'trend-5', 'trend-6'].map(
          (item) => (
            <SkeletonBlock className="skeleton-chart-bar" key={item} />
          ),
        )}
      </div>
    </Card>

    <div className="dashboard-grid" aria-hidden="true">
      <Card labelledBy="dashboard-skeleton-workforce-title">
        <span className="visually-hidden" id="dashboard-skeleton-workforce-title">
          Loading workforce overview
        </span>
        <div className="dashboard-skeleton-heading">
          <SkeletonBlock className="skeleton-eyebrow" />
          <SkeletonBlock className="skeleton-heading" />
        </div>
        <div className="dashboard-skeleton-list">
          {['workforce-1', 'workforce-2', 'workforce-3', 'workforce-4'].map(
            (item) => (
              <div className="dashboard-skeleton-row" key={item}>
                <SkeletonBlock className="skeleton-row-label" />
                <SkeletonBlock className="skeleton-row-value" />
              </div>
            ),
          )}
        </div>
      </Card>

      <Card labelledBy="dashboard-skeleton-activity-title">
        <span className="visually-hidden" id="dashboard-skeleton-activity-title">
          Loading recent activity
        </span>
        <div className="dashboard-skeleton-heading">
          <SkeletonBlock className="skeleton-eyebrow" />
          <SkeletonBlock className="skeleton-heading" />
        </div>
        <div className="dashboard-skeleton-list">
          {['activity-1', 'activity-2', 'activity-3'].map((item) => (
            <div className="dashboard-skeleton-row" key={item}>
              <SkeletonBlock className="skeleton-time" />
              <SkeletonBlock className="skeleton-activity" />
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Card labelledBy="dashboard-skeleton-table-title">
      <span className="visually-hidden" id="dashboard-skeleton-table-title">
        Loading department summary
      </span>
      <div className="dashboard-skeleton-heading" aria-hidden="true">
        <SkeletonBlock className="skeleton-eyebrow" />
        <SkeletonBlock className="skeleton-heading" />
      </div>
      <SkeletonTable
        columns={[
          'skeleton-cell-wide',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-medium',
        ]}
        rowClassName="department-row"
        tableClassName="department-table"
      />
    </Card>
  </div>
)

export const DashboardPage = () => {
  const {
    data: {
      dashboardMetrics,
      departmentSummaries,
      recentActivities,
      workforceOverview,
      workforceTrend,
    },
    error,
    isLoading,
  } = useAsyncData(loadDashboardData, {
    errorMessage: 'Dashboard data could not be loaded. Please try again later.',
    initialData: initialDashboardData,
  })

  return (
    <div className="dashboard-page">
      {isLoading ? (
        <DashboardSkeleton />
      ) : error ? (
        <>
          <PageHeader
            eyebrow="Overview"
            title="PeopleOps Admin Portal"
            titleId="portal-title"
          >
            Monitor workforce health, staffing momentum, and department activity
            from one front-end admin dashboard.
          </PageHeader>
          <ErrorState message={error} title="Dashboard data unavailable" />
        </>
      ) : (
        <>
          <PageHeader
            eyebrow="Overview"
            title="PeopleOps Admin Portal"
            titleId="portal-title"
          >
            Monitor workforce health, staffing momentum, and department activity
            from one front-end admin dashboard.
          </PageHeader>

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

          <Card labelledBy="workforce-trend-title">
            <SectionHeader
              eyebrow="Trend"
              title="Workforce trend"
              titleId="workforce-trend-title"
            />
            <p className="trend-summary">
              Six-month headcount movement across the organization.
            </p>
            <WorkforceTrendChart workforceTrend={workforceTrend} />
          </Card>

          <div className="dashboard-grid">
            <Card labelledBy="workforce-title">
              <SectionHeader
                eyebrow="Workforce"
                title="Workforce overview"
                titleId="workforce-title"
              />
              <div className="overview-list">
                {workforceOverview.map((item) => (
                  <div className="overview-row" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </Card>

            <Card labelledBy="activity-title">
              <SectionHeader
                eyebrow="Activity"
                title="Recent activity"
                titleId="activity-title"
              />
              <ul className="activity-list">
                {recentActivities.map((activity) => (
                  <li key={`${activity.time}-${activity.description}`}>
                    <span>{activity.time}</span>
                    <p>{activity.description}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card labelledBy="departments-title">
            <SectionHeader
              eyebrow="Departments"
              title="Department summary"
              titleId="departments-title"
            />
            <DataTable
              ariaLabel="Department summary"
              className="department-table"
              columns={departmentSummaryColumns}
              data={departmentSummaries}
              emptyMessage="No department summaries found."
              getRowKey={(department) => department.name}
              headerRowClassName="department-row department-row-header"
              rowClassName="department-row"
            />
          </Card>
        </>
      )}
    </div>
  )
}
