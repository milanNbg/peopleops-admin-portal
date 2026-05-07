import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as employeesService from '@/services/employeesService'

import type { Employee } from '@/types/employee'

import { EmployeesPage } from './EmployeesPage'

vi.mock('@/services/employeesService', () => ({
  getEmployees: vi.fn(),
}))

const testEmployees: Employee[] = [
  {
    department: 'Engineering',
    email: 'maya@example.com',
    employmentType: 'Full-time',
    id: 'emp-001',
    location: 'San Francisco, CA',
    manager: 'Nina Patel',
    name: 'Maya Chen',
    role: 'Senior Frontend Engineer',
    startDate: 'Jan 16, 2023',
    status: 'Active',
  },
  {
    department: 'People',
    email: 'lena@example.com',
    employmentType: 'Full-time',
    id: 'emp-002',
    location: 'Austin, TX',
    manager: 'Priya Shah',
    name: 'Lena Ortiz',
    role: 'People Operations Lead',
    startDate: 'Mar 04, 2021',
    status: 'Active',
  },
  {
    department: 'Customer Success',
    email: 'avery@example.com',
    employmentType: 'Full-time',
    id: 'emp-003',
    location: 'Denver, CO',
    manager: 'Lena Ortiz',
    name: 'Avery Stone',
    role: 'Customer Success Manager',
    startDate: 'Nov 13, 2023',
    status: 'On Leave',
  },
]

const createDeferred = <TData,>() => {
  let resolve!: (value: TData) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<TData>((promiseResolve, promiseReject) => {
    resolve = promiseResolve
    reject = promiseReject
  })

  return { promise, reject, resolve }
}

const LocationStatus = () => {
  const { search } = useLocation()

  return <output aria-label="query string">{search}</output>
}

const renderEmployeesPage = (initialEntry = '/employees') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <EmployeesPage />
      <LocationStatus />
    </MemoryRouter>,
  )

const mockSuccessfulEmployeesService = () => {
  vi.mocked(employeesService.getEmployees).mockResolvedValue(testEmployees)
}

const getEmployeeDetailPanel = (employeeName: string) =>
  screen.getByRole('complementary', { name: employeeName })

const getSearchInput = () =>
  screen.getByRole('searchbox', {
    name: 'Search employees by name, role, or location',
  })

const getVisibleEmployeeRows = () =>
  screen.getAllByRole('row').filter((row) => row.getAttribute('aria-label'))

describe('EmployeesPage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the employee skeleton while data is loading', () => {
    const employeesRequest = createDeferred<Employee[]>()

    vi.mocked(employeesService.getEmployees).mockReturnValue(
      employeesRequest.promise,
    )

    renderEmployeesPage()

    expect(screen.getByText('Loading employee records...')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Employees' }),
    ).not.toBeInTheDocument()

    employeesRequest.resolve(testEmployees)
  })

  it('shows employee list content after data loads successfully', async () => {
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    expect(
      await screen.findByRole('heading', { name: 'Employees' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Employee directory' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('row', { name: 'View details for Maya Chen' }),
    ).toBeInTheDocument()
    expect(screen.getByText('3 of 3 employees')).toBeInTheDocument()
  })

  it('shows the employee error state when data loading fails', async () => {
    vi.mocked(employeesService.getEmployees).mockRejectedValue(
      new Error('Unable to load employees'),
    )

    renderEmployeesPage()

    expect(
      await screen.findByRole('heading', {
        name: 'Employee data unavailable',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Employee records could not be loaded. Please try again later.'),
    ).toBeInTheDocument()
  })

  it('updates visible employee results from search and filter controls', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await screen.findByRole('row', { name: 'View details for Maya Chen' })
    await user.type(getSearchInput(), 'lena')

    expect(
      screen.getByRole('row', { name: 'View details for Lena Ortiz' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('row', { name: 'View details for Maya Chen' }),
    ).not.toBeInTheDocument()

    await user.clear(getSearchInput())
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filter employees by status' }),
      'On Leave',
    )

    expect(
      screen.getByRole('row', { name: 'View details for Avery Stone' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('row', { name: 'View details for Lena Ortiz' }),
    ).not.toBeInTheDocument()
  })

  it('updates the URL query string from search, filter and sort controls', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await screen.findByRole('row', { name: 'View details for Maya Chen' })
    await user.type(getSearchInput(), 'maya')
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filter employees by department' }),
      'Engineering',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filter employees by status' }),
      'Active',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Sort employees' }),
      'startDate',
    )

    expect(screen.getByLabelText('query string')).toHaveTextContent(
      'search=maya',
    )
    expect(screen.getByLabelText('query string')).toHaveTextContent(
      'department=Engineering',
    )
    expect(screen.getByLabelText('query string')).toHaveTextContent(
      'status=Active',
    )
    expect(screen.getByLabelText('query string')).toHaveTextContent(
      'sort=startDate',
    )
  })

  it('initializes filters from the URL query string on page load', async () => {
    mockSuccessfulEmployeesService()

    renderEmployeesPage('/employees?search=avery&status=On%20Leave')

    expect(
      await screen.findByRole('row', { name: 'View details for Avery Stone' }),
    ).toBeInTheDocument()
    expect(getSearchInput()).toHaveValue('avery')
    expect(
      screen.getByRole('combobox', { name: 'Filter employees by status' }),
    ).toHaveValue('On Leave')
    expect(
      screen.queryByRole('row', { name: 'View details for Maya Chen' }),
    ).not.toBeInTheDocument()
  })

  it('sorts visible employee results from the sort control', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await screen.findByRole('row', { name: 'View details for Avery Stone' })

    expect(getVisibleEmployeeRows().map((row) => row.getAttribute('aria-label')))
      .toEqual([
        'View details for Avery Stone',
        'View details for Lena Ortiz',
        'View details for Maya Chen',
      ])

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Sort employees' }),
      'startDate',
    )

    expect(getVisibleEmployeeRows().map((row) => row.getAttribute('aria-label')))
      .toEqual([
        'View details for Avery Stone',
        'View details for Maya Chen',
        'View details for Lena Ortiz',
      ])
  })

  it('shows the detail panel after selecting an employee', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await user.click(
      await screen.findByRole('row', { name: 'View details for Maya Chen' }),
    )

    expect(getEmployeeDetailPanel('Maya Chen')).toBeInTheDocument()
  })

  it('hides the detail panel when filters remove the selected employee', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await user.click(
      await screen.findByRole('row', { name: 'View details for Maya Chen' }),
    )
    await user.type(getSearchInput(), 'lena')

    await waitFor(() => {
      expect(
        screen.queryByRole('complementary', { name: 'Maya Chen' }),
      ).not.toBeInTheDocument()
    })
  })

  it('keeps the detail panel open when the selected employee still matches filters', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await user.click(
      await screen.findByRole('row', { name: 'View details for Lena Ortiz' }),
    )
    await user.type(getSearchInput(), 'lena')

    expect(
      within(getEmployeeDetailPanel('Lena Ortiz')).getByText(
        'People Operations Lead',
      ),
    ).toBeInTheDocument()
  })

  it('shows the empty state when filters return no employees', async () => {
    const user = userEvent.setup()
    mockSuccessfulEmployeesService()

    renderEmployeesPage()

    await screen.findByRole('row', { name: 'View details for Maya Chen' })
    await user.type(getSearchInput(), 'no matching employee')

    expect(
      screen.getByRole('heading', { name: 'No employees found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Adjust the search term, department, or status filter.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('row', { name: 'View details for Maya Chen' }),
    ).not.toBeInTheDocument()
  })
})
