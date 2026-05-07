import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as departmentsService from '@/services/departmentsService'

import type { Department } from '@/types/department'

import { DepartmentsPage } from './DepartmentsPage'

vi.mock('@/services/departmentsService', () => ({
  getDepartments: vi.fn(),
}))

const departments: Department[] = [
  {
    headcount: 42,
    id: 'dept-001',
    lead: 'Nina Patel',
    location: 'San Francisco, CA',
    name: 'Engineering',
    openRoles: 5,
    status: 'Hiring',
  },
]

const createDeferred = <TData,>() => {
  let resolve!: (value: TData) => void
  const promise = new Promise<TData>((promiseResolve) => {
    resolve = promiseResolve
  })

  return { promise, resolve }
}

describe('DepartmentsPage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the department skeleton while data is loading', () => {
    const departmentsRequest = createDeferred<Department[]>()

    vi.mocked(departmentsService.getDepartments).mockReturnValue(
      departmentsRequest.promise,
    )

    render(<DepartmentsPage />)

    expect(screen.getByText('Loading department data...')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Departments' }),
    ).not.toBeInTheDocument()

    departmentsRequest.resolve(departments)
  })

  it('shows department content after data loads successfully', async () => {
    vi.mocked(departmentsService.getDepartments).mockResolvedValue(departments)

    render(<DepartmentsPage />)

    expect(
      await screen.findByRole('heading', { name: 'Departments' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Total headcount')).toBeInTheDocument()
    expect(screen.getByText('Across all departments')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Departments overview' }),
    ).toBeInTheDocument()
  })

  it('shows the department error state when data loading fails', async () => {
    vi.mocked(departmentsService.getDepartments).mockRejectedValue(
      new Error('Unable to load departments'),
    )

    render(<DepartmentsPage />)

    expect(
      await screen.findByRole('heading', {
        name: 'Department data unavailable',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Department data could not be loaded. Please try again later.'),
    ).toBeInTheDocument()
  })
})
