import { useMemo, useState } from 'react'

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
  StatusBadge,
} from '@/components/ui'
import { getDepartments } from '@/services/departmentsService'
import { useAsyncData } from '@/hooks/useAsyncData'

import type { DataTableColumn } from '@/components/ui'
import type { Department } from '@/types/department'

import { DepartmentDetailPanel } from './components/DepartmentDetailPanel'

const departmentColumns: DataTableColumn<Department>[] = [
  {
    header: 'Department',
    key: 'name',
    render: (department) => department.name,
  },
  {
    header: 'Lead',
    key: 'lead',
    render: (department) => department.lead,
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
    header: 'Region',
    key: 'location',
    render: (department) => department.location,
  },
  {
    header: 'Status',
    key: 'status',
    render: (department) => (
      <StatusBadge className="department-status" status={department.status} />
    ),
  },
]

const DepartmentsSkeleton = () => (
  <div className="departments-skeleton" role="status" aria-live="polite">
    <span className="visually-hidden">Loading department data...</span>
    <PageHeaderSkeleton />
    <SkeletonCardGrid />
    <Card labelledBy="departments-skeleton-table-title">
      <span className="visually-hidden" id="departments-skeleton-table-title">
        Loading department overview
      </span>
      <div className="departments-skeleton-heading" aria-hidden="true">
        <SkeletonBlock className="skeleton-eyebrow" />
        <SkeletonBlock className="skeleton-heading" />
      </div>
      <SkeletonTable
        columns={[
          'skeleton-cell-wide',
          'skeleton-cell-medium',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-medium',
          'skeleton-cell-short',
        ]}
        rowClassName="departments-row"
        tableClassName="departments-table"
      />
    </Card>
  </div>
)

export const DepartmentsPage = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null)
  const {
    data: departments,
    error,
    isLoading,
  } = useAsyncData(getDepartments, {
    errorMessage: 'Department data could not be loaded. Please try again later.',
    initialData: [],
  })

  const departmentSummary = useMemo(() => {
    const totalHeadcount = departments.reduce(
      (total, department) => total + department.headcount,
      0,
    )
    const openRoles = departments.reduce(
      (total, department) => total + department.openRoles,
      0,
    )
    const hiringDepartments = departments.filter(
      (department) => department.status === 'Hiring',
    ).length
    const highPriorityDepartments = departments.filter(
      (department) => department.hiringPriority === 'High',
    ).length
    const largestHiringNeed = departments.reduce<Department | null>(
      (largestDepartment, department) => {
        if (!largestDepartment || department.openRoles > largestDepartment.openRoles) {
          return department
        }

        return largestDepartment
      },
      null,
    )

    return {
      highPriorityDepartments,
      hiringDepartments,
      largestHiringNeed,
      openRoles,
      totalDepartments: departments.length,
      totalHeadcount,
    }
  }, [departments])
  const selectedVisibleDepartment = selectedDepartment
    ? departments.find((department) => department.id === selectedDepartment.id)
    : null

  return (
    <div className="departments-page">
      {isLoading ? (
        <DepartmentsSkeleton />
      ) : (
        <>
          <PageHeader
            eyebrow="Organization"
            title="Departments"
            titleId="departments-title"
          >
            Review department ownership, headcount distribution, and hiring needs
            across the organization.
          </PageHeader>

          {error ? (
            <ErrorState message={error} title="Department data unavailable" />
          ) : (
            <>
              <section className="metric-grid" aria-label="Department summary">
                <MetricCard
                  label="Departments"
                  trend="Active operating groups"
                  value={String(departmentSummary.totalDepartments)}
                />
                <MetricCard
                  label="Total headcount"
                  trend="Across all departments"
                  value={String(departmentSummary.totalHeadcount)}
                />
                <MetricCard
                  label="Open roles"
                  trend="Approved hiring plan"
                  value={String(departmentSummary.openRoles)}
                />
                <MetricCard
                  label="Hiring departments"
                  trend="Currently recruiting"
                  value={String(departmentSummary.hiringDepartments)}
                />
              </section>

              <Card labelledBy="department-insights-title">
                <SectionHeader
                  eyebrow="Staffing"
                  title="Staffing insights"
                  titleId="department-insights-title"
                />
                <div className="department-insights">
                  <div className="department-insight">
                    <span>Highest open-role demand</span>
                    <strong>
                      {departmentSummary.largestHiringNeed?.name ?? 'No demand'}
                    </strong>
                    <p>
                      {departmentSummary.largestHiringNeed
                        ? `${departmentSummary.largestHiringNeed.openRoles} open roles`
                        : 'No open roles currently tracked'}
                    </p>
                  </div>
                  <div className="department-insight">
                    <span>High-priority hiring</span>
                    <strong>{departmentSummary.highPriorityDepartments}</strong>
                    <p>Departments marked high priority</p>
                  </div>
                  <div className="department-insight">
                    <span>Open-role density</span>
                    <strong>
                      {departmentSummary.totalHeadcount > 0
                        ? `${Math.round(
                            (departmentSummary.openRoles /
                              departmentSummary.totalHeadcount) *
                              100,
                          )}%`
                        : '0%'}
                    </strong>
                    <p>Open roles relative to headcount</p>
                  </div>
                </div>
              </Card>

              <Card labelledBy="department-list-title">
                <SectionHeader
                  eyebrow="Structure"
                  title="Department overview"
                  titleId="department-list-title"
                />

                <DataTable
                  ariaLabel="Departments overview"
                  className="departments-table"
                  columns={departmentColumns}
                  data={departments}
                  emptyMessage="No departments found."
                  getRowKey={(department) => department.id}
                  getRowLabel={(department) =>
                    `View details for ${department.name}`
                  }
                  headerRowClassName="departments-row departments-row-header"
                  rowControlsId={
                    selectedVisibleDepartment
                      ? 'department-detail-panel'
                      : undefined
                  }
                  rowClassName="departments-row departments-row-selectable"
                  selectedRowKey={selectedVisibleDepartment?.id}
                  onRowSelect={setSelectedDepartment}
                />

                {selectedVisibleDepartment ? (
                  <DepartmentDetailPanel
                    department={selectedVisibleDepartment}
                    onClose={() => setSelectedDepartment(null)}
                  />
                ) : null}
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}
