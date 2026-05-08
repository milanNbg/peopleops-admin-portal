import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as rolesService from '@/services/rolesService'

import type { Role, RolePermissionsMatrix } from '@/types/role'

import { RolesPage } from './RolesPage'

vi.mock('@/services/rolesService', () => ({
  getRolePermissionsMatrix: vi.fn(),
  getRoles: vi.fn(),
}))

const roles: Role[] = [
  {
    accessLevel: 'Manager',
    assignedEmployees: 14,
    department: 'People',
    id: 'role-001',
    lastUpdated: 'Apr 12, 2026',
    name: 'People Operations Lead',
    permissionsCount: 22,
    status: 'Review',
  },
]

const permissionsMatrix: RolePermissionsMatrix = {
  permissions: [
    {
      description: 'Review core employee profile details.',
      id: 'employee-records',
      label: 'Employee records',
    },
    {
      description: 'Create and approve compensation changes.',
      id: 'compensation',
      label: 'Compensation',
    },
  ],
  roles: [
    {
      id: 'role-001',
      name: 'People Operations Lead',
    },
    {
      id: 'role-002',
      name: 'Payroll Support',
    },
  ],
  rows: [
    {
      permissionId: 'employee-records',
      roleAccess: {
        'role-001': 'Manage',
        'role-002': 'View',
      },
    },
    {
      permissionId: 'compensation',
      roleAccess: {
        'role-001': 'Manage',
        'role-002': 'Full',
      },
    },
  ],
}

const createDeferred = <TData,>() => {
  let resolve!: (value: TData) => void
  const promise = new Promise<TData>((promiseResolve) => {
    resolve = promiseResolve
  })

  return { promise, resolve }
}

describe('RolesPage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the role skeleton while data is loading', () => {
    const rolesRequest = createDeferred<Role[]>()
    const permissionsRequest = createDeferred<RolePermissionsMatrix>()

    vi.mocked(rolesService.getRoles).mockReturnValue(rolesRequest.promise)
    vi.mocked(rolesService.getRolePermissionsMatrix).mockReturnValue(
      permissionsRequest.promise,
    )

    render(<RolesPage />)

    expect(screen.getByText('Loading role data...')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Roles' }),
    ).not.toBeInTheDocument()

    rolesRequest.resolve(roles)
    permissionsRequest.resolve(permissionsMatrix)
  })

  it('shows role content and permissions matrix after data loads successfully', async () => {
    vi.mocked(rolesService.getRoles).mockResolvedValue(roles)
    vi.mocked(rolesService.getRolePermissionsMatrix).mockResolvedValue(
      permissionsMatrix,
    )

    render(<RolesPage />)

    expect(
      await screen.findByRole('heading', { name: 'Roles' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Assigned employees')).toBeInTheDocument()
    expect(screen.getByText('Across active roles')).toBeInTheDocument()
    expect(screen.getAllByText('People Operations Lead')[0]).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Roles overview' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Role permissions matrix' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Employee records')).toBeInTheDocument()
    expect(screen.getByText('Compensation')).toBeInTheDocument()
    expect(screen.getByText('Payroll Support')).toBeInTheDocument()
    expect(screen.getAllByText('Manage')).toHaveLength(2)
    expect(screen.getByText('Full')).toBeInTheDocument()
  })

  it('shows the role error state when data loading fails', async () => {
    vi.mocked(rolesService.getRoles).mockRejectedValue(
      new Error('Unable to load roles'),
    )
    vi.mocked(rolesService.getRolePermissionsMatrix).mockResolvedValue(
      permissionsMatrix,
    )

    render(<RolesPage />)

    expect(
      await screen.findByRole('heading', { name: 'Role data unavailable' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Role data could not be loaded. Please try again later.'),
    ).toBeInTheDocument()
  })
})
