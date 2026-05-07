import { useMemo } from 'react'

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
import { getDepartments } from '@/services/departmentsService'
import { useAsyncData } from '@/hooks/useAsyncData'

import type { DataTableColumn } from '@/components/ui'
import type { Department, DepartmentStatus } from '@/types/department'

const departmentStatusClassNames: Record<DepartmentStatus, string> = {
  Active: 'active',
  Hiring: 'hiring',
  Planning: 'planning',
}

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
      <span
        className={`department-status department-status-${
          departmentStatusClassNames[department.status]
        }`}
      >
        {department.status}
      </span>
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

    return {
      hiringDepartments,
      openRoles,
      totalDepartments: departments.length,
      totalHeadcount,
    }
  }, [departments])

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
                  headerRowClassName="departments-row departments-row-header"
                  rowClassName="departments-row"
                />
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}
