import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    hiringPriority: 'High',
    id: 'dept-001',
    lead: 'Nina Patel',
    location: 'San Francisco, CA',
    name: 'Engineering',
    note: 'Platform hiring remains the largest staffing dependency.',
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
    expect(screen.getAllByText('Engineering')[0]).toBeInTheDocument()
    expect(screen.getByText('Staffing insights')).toBeInTheDocument()
    expect(screen.getByText('Highest open-role demand')).toBeInTheDocument()
    expect(screen.getByText('High-priority hiring')).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Departments overview' }),
    ).toBeInTheDocument()
  })

  it('opens the department detail panel after selecting a department', async () => {
    const user = userEvent.setup()

    vi.mocked(departmentsService.getDepartments).mockResolvedValue(departments)

    render(<DepartmentsPage />)

    await user.click(
      await screen.findByRole('row', { name: 'View details for Engineering' }),
    )

    const detailPanel = screen.getByRole('complementary', {
      name: 'Engineering',
    })

    expect(detailPanel).toBeInTheDocument()
    expect(within(detailPanel).getByText('Nina Patel')).toBeInTheDocument()
    expect(within(detailPanel).getByText('Region')).toBeInTheDocument()
    expect(within(detailPanel).getByText('San Francisco, CA')).toBeInTheDocument()
    expect(within(detailPanel).getByText('High')).toBeInTheDocument()
    expect(
      within(detailPanel).getByText(
        'Platform hiring remains the largest staffing dependency.',
      ),
    ).toBeInTheDocument()
  })

  it('closes the department detail panel from the close action', async () => {
    const user = userEvent.setup()

    vi.mocked(departmentsService.getDepartments).mockResolvedValue(departments)

    render(<DepartmentsPage />)

    await user.click(
      await screen.findByRole('row', { name: 'View details for Engineering' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Close details for Engineering' }),
    )

    expect(
      screen.queryByRole('complementary', { name: 'Engineering' }),
    ).not.toBeInTheDocument()
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
