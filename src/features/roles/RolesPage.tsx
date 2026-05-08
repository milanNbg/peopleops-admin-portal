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
import { getRolePermissionsMatrix, getRoles } from '@/services/rolesService'
import { useAsyncData } from '@/hooks/useAsyncData'

import type { DataTableColumn } from '@/components/ui'
import type {
  Role,
  RolePermissionsMatrix as RolePermissionsMatrixData,
  RoleStatus,
} from '@/types/role'

import { RolePermissionsMatrix } from './components/RolePermissionsMatrix'

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

const RolesSkeleton = () => (
  <div className="roles-skeleton" role="status" aria-live="polite">
    <span className="visually-hidden">Loading role data...</span>
    <PageHeaderSkeleton />
    <SkeletonCardGrid />
    <Card labelledBy="roles-skeleton-table-title">
      <span className="visually-hidden" id="roles-skeleton-table-title">
        Loading roles overview
      </span>
      <div className="roles-skeleton-heading" aria-hidden="true">
        <SkeletonBlock className="skeleton-eyebrow" />
        <SkeletonBlock className="skeleton-heading" />
      </div>
      <SkeletonTable
        columns={[
          'skeleton-cell-wide',
          'skeleton-cell-medium',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-medium',
        ]}
        rowClassName="roles-row"
        tableClassName="roles-table"
      />
    </Card>
    <Card labelledBy="roles-skeleton-permissions-title">
      <span className="visually-hidden" id="roles-skeleton-permissions-title">
        Loading role permissions matrix
      </span>
      <div className="roles-skeleton-heading" aria-hidden="true">
        <SkeletonBlock className="skeleton-eyebrow" />
        <SkeletonBlock className="skeleton-heading" />
      </div>
      <SkeletonTable
        columns={[
          'skeleton-cell-wide',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-short',
          'skeleton-cell-short',
        ]}
        rowClassName="role-permissions-skeleton-row"
        rows={5}
        tableClassName="role-permissions-skeleton-table"
      />
    </Card>
  </div>
)

type RolesPageData = {
  permissionsMatrix: RolePermissionsMatrixData
  roles: Role[]
}

const initialRolesPageData: RolesPageData = {
  permissionsMatrix: {
    permissions: [],
    roles: [],
    rows: [],
  },
  roles: [],
}

const loadRolesPageData = async (): Promise<RolesPageData> => {
  const [roles, permissionsMatrix] = await Promise.all([
    getRoles(),
    getRolePermissionsMatrix(),
  ])

  return {
    permissionsMatrix,
    roles,
  }
}

export const RolesPage = () => {
  const {
    data: { permissionsMatrix, roles },
    error,
    isLoading,
  } = useAsyncData(loadRolesPageData, {
    errorMessage: 'Role data could not be loaded. Please try again later.',
    initialData: initialRolesPageData,
  })

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

  return (
    <div className="roles-page">
      {isLoading ? (
        <RolesSkeleton />
      ) : (
        <>
          <PageHeader eyebrow="Access" title="Roles" titleId="roles-title">
            Review role definitions, access levels, and permission coverage
            across the PeopleOps workspace.
          </PageHeader>

          {error ? (
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

              <Card labelledBy="role-permissions-title">
                <SectionHeader
                  eyebrow="Permissions"
                  title="Role permissions matrix"
                  titleId="role-permissions-title"
                />
                <p className="role-permissions-intro">
                  Compare role access across core PeopleOps permissions.
                </p>

                <RolePermissionsMatrix matrix={permissionsMatrix} />
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}
