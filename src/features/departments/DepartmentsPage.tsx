import { useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { DataTable, type DataTableColumn } from '../../components/ui/DataTable'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { MetricCard } from '../../components/ui/MetricCard'
import { PageHeader } from '../../components/ui/PageHeader'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { getDepartments } from '../../services/departmentsService'
import type { Department, DepartmentStatus } from '../../types/department'

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

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    let isMounted = true

    const loadDepartments = async () => {
      try {
        const departmentData = await getDepartments()

        if (isMounted) {
          setDepartments(departmentData)
          setError(null)
        }
      } catch {
        if (isMounted) {
          setError('Department data could not be loaded. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDepartments()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="departments-page">
      <PageHeader
        eyebrow="Organization"
        title="Departments"
        titleId="departments-title"
      >
        Review department ownership, headcount distribution, and hiring needs
        across the organization.
      </PageHeader>

      {isLoading ? (
        <LoadingState message="Loading department data..." />
      ) : error ? (
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
    </div>
  )
}
