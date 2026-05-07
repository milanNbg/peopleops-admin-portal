import {
  Card,
  PageHeaderSkeleton,
  SkeletonBlock,
  SkeletonCardGrid,
  SkeletonTable,
} from '@/components/ui'

export const DashboardSkeleton = () => (
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
