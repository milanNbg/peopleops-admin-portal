import { useEffect, useMemo, useState } from 'react'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { MetricCard } from '../../components/ui/MetricCard'
import { getDepartments } from '../../services/departmentsService'
import type { Department, DepartmentStatus } from '../../types/department'

const departmentStatusClassNames: Record<DepartmentStatus, string> = {
  Active: 'active',
  Hiring: 'hiring',
  Planning: 'planning',
}

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
      <section className="welcome-panel" aria-labelledby="departments-title">
        <p className="eyebrow">Organization</p>
        <h2 id="departments-title">Departments</h2>
        <p className="intro">
          Review department ownership, headcount distribution, and hiring needs
          across the organization.
        </p>
      </section>

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

          <section
            className="dashboard-card"
            aria-labelledby="department-list-title"
          >
            <div className="section-heading">
              <p className="eyebrow">Structure</p>
              <h3 id="department-list-title">Department overview</h3>
            </div>

            <div
              className="departments-table"
              role="table"
              aria-label="Departments overview"
            >
              <div className="departments-row departments-row-header" role="row">
                <span role="columnheader">Department</span>
                <span role="columnheader">Lead</span>
                <span role="columnheader">Headcount</span>
                <span role="columnheader">Open roles</span>
                <span role="columnheader">Region</span>
                <span role="columnheader">Status</span>
              </div>

              {departments.map((department) => (
                <div className="departments-row" role="row" key={department.id}>
                  <span role="cell">{department.name}</span>
                  <span role="cell">{department.lead}</span>
                  <span role="cell">{department.headcount}</span>
                  <span role="cell">{department.openRoles}</span>
                  <span role="cell">{department.location}</span>
                  <span role="cell">
                    <span
                      className={`department-status department-status-${
                        departmentStatusClassNames[department.status]
                      }`}
                    >
                      {department.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
