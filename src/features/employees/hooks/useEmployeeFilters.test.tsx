import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'

import type { Employee } from '@/types/employee'
import type { ReactNode } from 'react'

import { useEmployeeFilters } from './useEmployeeFilters'

const employees: Employee[] = [
  {
    department: 'People',
    email: 'avery@example.com',
    employmentType: 'Full-time',
    id: '1',
    location: 'New York',
    manager: 'Dana Lee',
    name: 'Avery Stone',
    role: 'HR Manager',
    startDate: '2024-01-15',
    status: 'Active',
  },
  {
    department: 'Finance',
    email: 'mina@example.com',
    employmentType: 'Full-time',
    id: '2',
    location: 'Austin',
    manager: 'Chris Wong',
    name: 'Mina Patel',
    role: 'Payroll Analyst',
    startDate: '2023-08-04',
    status: 'Inactive',
  },
]

const EmployeeFiltersHarness = () => {
  const { dispatch, filteredEmployees } = useEmployeeFilters(employees)
  const { search } = useLocation()

  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch({ type: 'setSearch', value: 'avery' })}
      >
        Search Avery
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'setDepartment', value: 'Finance' })}
      >
        Finance only
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'setStatus', value: 'Active' })}
      >
        Active only
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'setSortBy', value: 'startDate' })}
      >
        Sort by start date
      </button>
      <output aria-label="filtered employees">
        {filteredEmployees.map((employee) => employee.name).join(', ')}
      </output>
      <output aria-label="query string">{search}</output>
    </div>
  )
}

const renderEmployeeFilters = (initialEntry = '/employees') =>
  render(<EmployeeFiltersHarness />, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    ),
  })

describe('useEmployeeFilters', () => {
  afterEach(() => {
    cleanup()
  })

  it('filters employees by search, department and status', async () => {
    const user = userEvent.setup()

    renderEmployeeFilters()

    await user.click(screen.getByRole('button', { name: 'Search Avery' }))
    await waitFor(() => {
      expect(screen.getByLabelText('filtered employees')).toHaveTextContent(
        /^Avery Stone$/,
      )
    })

    await user.click(screen.getByRole('button', { name: 'Finance only' }))
    expect(screen.getByLabelText('filtered employees')).toBeEmptyDOMElement()

    await user.click(screen.getByRole('button', { name: 'Active only' }))
    expect(screen.getByLabelText('filtered employees')).toBeEmptyDOMElement()
  })

  it('initializes filters from the URL query string', () => {
    renderEmployeeFilters('/employees?search=mina&department=Finance')

    expect(screen.getByLabelText('filtered employees')).toHaveTextContent(
      'Mina Patel',
    )
  })

  it('updates the URL query string when filters change', async () => {
    const user = userEvent.setup()

    renderEmployeeFilters()

    await user.click(screen.getByRole('button', { name: 'Search Avery' }))
    await user.click(screen.getByRole('button', { name: 'Finance only' }))
    await user.click(screen.getByRole('button', { name: 'Sort by start date' }))

    await waitFor(() => {
      expect(screen.getByLabelText('query string')).toHaveTextContent(
        'search=avery',
      )
      expect(screen.getByLabelText('query string')).toHaveTextContent(
        'department=Finance',
      )
      expect(screen.getByLabelText('query string')).toHaveTextContent(
        'sort=startDate',
      )
    })
  })
})
