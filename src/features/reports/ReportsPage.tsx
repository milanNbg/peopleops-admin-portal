import { useMemo } from 'react'

import {
  Card,
  DataTable,
  ErrorState,
  MetricCard,
  PageHeader,
  SectionHeader,
  SkeletonBlock,
  SkeletonCardGrid,
  SkeletonTable,
} from '@/components/ui'
import { getReports } from '@/services/reportsService'
import { useAsyncData } from '@/hooks/useAsyncData'

import type { DataTableColumn } from '@/components/ui'
import type { Report, ReportStatus } from '@/types/report'

const reportStatusClassNames: Record<ReportStatus, string> = {
  Ready: 'ready',
  Review: 'review',
  Scheduled: 'scheduled',
}

const reportColumns: DataTableColumn<Report>[] = [
  {
    header: 'Report',
    key: 'name',
    render: (report) => report.name,
  },
  {
    header: 'Category',
    key: 'category',
    render: (report) => report.category,
  },
  {
    header: 'Owner',
    key: 'owner',
    render: (report) => report.owner,
  },
  {
    header: 'Status',
    key: 'status',
    render: (report) => (
      <span
        className={`report-status report-status-${
          reportStatusClassNames[report.status]
        }`}
      >
        {report.status}
      </span>
    ),
  },
  {
    header: 'Generated',
    key: 'generatedDate',
    render: (report) => report.generatedDate,
  },
  {
    header: 'Period',
    key: 'period',
    render: (report) => report.period,
  },
]

const ReportsSkeleton = () => (
  <div className="reports-skeleton" role="status" aria-live="polite">
    <span className="visually-hidden">Loading report data...</span>
    <SkeletonCardGrid />
    <Card labelledBy="reports-skeleton-table-title">
      <span className="visually-hidden" id="reports-skeleton-table-title">
        Loading reports overview
      </span>
      <div className="reports-skeleton-heading" aria-hidden="true">
        <SkeletonBlock className="skeleton-eyebrow" />
        <SkeletonBlock className="skeleton-heading" />
      </div>
      <SkeletonTable
        columns={[
          'skeleton-cell-wide',
          'skeleton-cell-medium',
          'skeleton-cell-medium',
          'skeleton-cell-short',
          'skeleton-cell-medium',
          'skeleton-cell-medium',
        ]}
        rowClassName="reports-row"
        tableClassName="reports-table"
      />
    </Card>
  </div>
)

export const ReportsPage = () => {
  const {
    data: reports,
    error,
    isLoading,
  } = useAsyncData(getReports, {
    errorMessage: 'Report data could not be loaded. Please try again later.',
    initialData: [],
  })

  const reportSummary = useMemo(() => {
    const readyReports = reports.filter(
      (report) => report.status === 'Ready',
    ).length
    const reportsInReview = reports.filter(
      (report) => report.status === 'Review',
    ).length
    const categories = new Set(reports.map((report) => report.category)).size

    return {
      categories,
      readyReports,
      reportsInReview,
      totalReports: reports.length,
    }
  }, [reports])

  return (
    <div className="reports-page">
      <PageHeader eyebrow="Insights" title="Reports" titleId="reports-title">
        Track recurring PeopleOps reports across workforce, compliance, hiring,
        retention, and payroll readiness workflows.
      </PageHeader>

      {isLoading ? (
        <ReportsSkeleton />
      ) : error ? (
        <ErrorState message={error} title="Report data unavailable" />
      ) : (
        <>
          <section className="metric-grid" aria-label="Report summary">
            <MetricCard
              label="Reports"
              trend="Available report views"
              value={String(reportSummary.totalReports)}
            />
            <MetricCard
              label="Ready"
              trend="Generated and available"
              value={String(reportSummary.readyReports)}
            />
            <MetricCard
              label="In review"
              trend="Awaiting validation"
              value={String(reportSummary.reportsInReview)}
            />
            <MetricCard
              label="Categories"
              trend="Coverage areas"
              value={String(reportSummary.categories)}
            />
          </section>

          <Card labelledBy="report-list-title">
            <SectionHeader
              eyebrow="Report catalog"
              title="Reports overview"
              titleId="report-list-title"
            />

            <DataTable
              ariaLabel="Reports overview"
              className="reports-table"
              columns={reportColumns}
              data={reports}
              emptyMessage="No reports found."
              getRowKey={(report) => report.id}
              headerRowClassName="reports-row reports-row-header"
              rowClassName="reports-row"
            />
          </Card>
        </>
      )}
    </div>
  )
}
