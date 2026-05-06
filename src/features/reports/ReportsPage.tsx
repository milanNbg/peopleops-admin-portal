import { useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { MetricCard } from '../../components/ui/MetricCard'
import { PageHeader } from '../../components/ui/PageHeader'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { getReports } from '../../services/reportsService'
import type { Report, ReportStatus } from '../../types/report'

const reportStatusClassNames: Record<ReportStatus, string> = {
  Ready: 'ready',
  Review: 'review',
  Scheduled: 'scheduled',
}

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

            <div
              className="reports-table"
              role="table"
              aria-label="Reports overview"
            >
              <div className="reports-row reports-row-header" role="row">
                <span role="columnheader">Report</span>
                <span role="columnheader">Category</span>
                <span role="columnheader">Owner</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Generated</span>
                <span role="columnheader">Period</span>
              </div>

              {reports.map((report) => (
                <div className="reports-row" role="row" key={report.id}>
                  <span role="cell">{report.name}</span>
                  <span role="cell">{report.category}</span>
                  <span role="cell">{report.owner}</span>
                  <span role="cell">
                    <span
                      className={`report-status report-status-${
                        reportStatusClassNames[report.status]
                      }`}
                    >
                      {report.status}
                    </span>
                  </span>
                  <span role="cell">{report.generatedDate}</span>
                  <span role="cell">{report.period}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
