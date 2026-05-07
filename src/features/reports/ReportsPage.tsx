import { useEffect, useMemo, useState } from 'react'
import {
  Card,
  DataTable,
  type DataTableColumn,
  ErrorState,
  LoadingState,
  MetricCard,
  PageHeader,
  SectionHeader,
} from '@/components/ui'
import { getReports } from '@/services/reportsService'
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

export const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    let isMounted = true

    const loadReports = async () => {
      try {
        const reportData = await getReports()

        if (isMounted) {
          setReports(reportData)
          setError(null)
        }
      } catch {
        if (isMounted) {
          setError('Report data could not be loaded. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadReports()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="reports-page">
      <PageHeader eyebrow="Insights" title="Reports" titleId="reports-title">
        Track recurring PeopleOps reports across workforce, compliance, hiring,
        retention, and payroll readiness workflows.
      </PageHeader>

      {isLoading ? (
        <LoadingState message="Loading report data..." />
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
