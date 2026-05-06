import { useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { DataTable, type DataTableColumn } from '../../components/ui/DataTable'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { MetricCard } from '../../components/ui/MetricCard'
import { PageHeader } from '../../components/ui/PageHeader'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { getRoles } from '../../services/rolesService'
import type { Role, RoleStatus } from '../../types/role'

const roleStatusClassNames: Record<RoleStatus, string> = {
  Active: 'active',
  Draft: 'draft',
  Review: 'review',
}

const roleColumns: DataTableColumn<Role>[] = [
  {
    header: 'Role',
    key: 'name',
    render: (role) => role.name,
  },
  {
    header: 'Department',
    key: 'department',
    render: (role) => role.department,
  },
  {
    header: 'Access level',
    key: 'accessLevel',
    render: (role) => role.accessLevel,
  },
  {
    header: 'Assigned',
    key: 'assignedEmployees',
    render: (role) => role.assignedEmployees,
  },
  {
    header: 'Permissions',
    key: 'permissionsCount',
    render: (role) => role.permissionsCount,
  },
  {
    header: 'Status',
    key: 'status',
    render: (role) => (
      <span
        className={`role-status role-status-${
          roleStatusClassNames[role.status]
        }`}
      >
        {role.status}
      </span>
    ),
  },
  {
    header: 'Last updated',
    key: 'lastUpdated',
    render: (role) => role.lastUpdated,
  },
]

export const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const roleSummary = useMemo(() => {
    const assignedEmployees = roles.reduce(
      (total, role) => total + role.assignedEmployees,
      0,
    )
    const permissionsCount = roles.reduce(
      (total, role) => total + role.permissionsCount,
      0,
    )
    const rolesInReview = roles.filter((role) => role.status === 'Review').length

    return {
      assignedEmployees,
      permissionsCount,
      rolesInReview,
      totalRoles: roles.length,
    }
  }, [roles])

  useEffect(() => {
    let isMounted = true

    const loadRoles = async () => {
      try {
        const roleData = await getRoles()

        if (isMounted) {
          setRoles(roleData)
          setError(null)
        }
      } catch {
        if (isMounted) {
          setError('Role data could not be loaded. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRoles()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="roles-page">
      <PageHeader eyebrow="Access" title="Roles" titleId="roles-title">
        Review role definitions, access levels, and permission coverage across
        the PeopleOps workspace.
      </PageHeader>

      {isLoading ? (
        <LoadingState message="Loading role data..." />
      ) : error ? (
        <ErrorState message={error} title="Role data unavailable" />
      ) : (
        <>
          <section className="metric-grid" aria-label="Role summary">
            <MetricCard
              label="Configured roles"
              trend="Access profiles"
              value={String(roleSummary.totalRoles)}
            />
            <MetricCard
              label="Assigned employees"
              trend="Across active roles"
              value={String(roleSummary.assignedEmployees)}
            />
            <MetricCard
              label="Permissions"
              trend="Total permission rules"
              value={String(roleSummary.permissionsCount)}
            />
            <MetricCard
              label="In review"
              trend="Needs access audit"
              value={String(roleSummary.rolesInReview)}
            />
          </section>

          <Card labelledBy="role-list-title">
            <SectionHeader
              eyebrow="Role catalog"
              title="Roles overview"
              titleId="role-list-title"
            />

            <DataTable
              ariaLabel="Roles overview"
              className="roles-table"
              columns={roleColumns}
              data={roles}
              emptyMessage="No roles found."
              getRowKey={(role) => role.id}
              headerRowClassName="roles-row roles-row-header"
              rowClassName="roles-row"
            />
          </Card>
        </>
      )}
    </div>
  )
}
