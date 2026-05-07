import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as rolesService from '@/services/rolesService'

import type { Role } from '@/types/role'

import { RolesPage } from './RolesPage'

vi.mock('@/services/rolesService', () => ({
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

    vi.mocked(rolesService.getRoles).mockReturnValue(rolesRequest.promise)

    render(<RolesPage />)

    expect(screen.getByText('Loading role data...')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Roles' }),
    ).not.toBeInTheDocument()

    rolesRequest.resolve(roles)
  })

  it('shows role content after data loads successfully', async () => {
    vi.mocked(rolesService.getRoles).mockResolvedValue(roles)

    render(<RolesPage />)

    expect(
      await screen.findByRole('heading', { name: 'Roles' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Assigned employees')).toBeInTheDocument()
    expect(screen.getByText('Across active roles')).toBeInTheDocument()
    expect(screen.getByText('People Operations Lead')).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Roles overview' }),
    ).toBeInTheDocument()
  })

  it('shows the role error state when data loading fails', async () => {
    vi.mocked(rolesService.getRoles).mockRejectedValue(
      new Error('Unable to load roles'),
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
