import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { Employee } from '@/types/employee'

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
      <output aria-label="filtered employees">
        {filteredEmployees.map((employee) => employee.name).join(', ')}
      </output>
    </div>
  )
}

describe('useEmployeeFilters', () => {
  it('filters employees by search, department and status', async () => {
    const user = userEvent.setup()

    render(<EmployeeFiltersHarness />)

    await user.click(screen.getByRole('button', { name: 'Search Avery' }))
    expect(screen.getByLabelText('filtered employees')).toHaveTextContent(
      'Avery Stone',
    )

    await user.click(screen.getByRole('button', { name: 'Finance only' }))
    expect(screen.getByLabelText('filtered employees')).toHaveTextContent('')

    await user.click(screen.getByRole('button', { name: 'Active only' }))
    expect(screen.getByLabelText('filtered employees')).toHaveTextContent('')
  })
})
