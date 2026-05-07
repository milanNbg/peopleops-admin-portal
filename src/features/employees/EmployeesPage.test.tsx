import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { Employee } from '@/types/employee'

import { EmployeesPage } from './EmployeesPage'

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
]

vi.mock('@/services/employeesService', () => ({
  getEmployees: vi.fn(() => Promise.resolve(testEmployees)),
}))

const renderEmployeesPage = () =>
  render(
    <MemoryRouter initialEntries={['/employees']}>
      <EmployeesPage />
    </MemoryRouter>,
  )

const getEmployeeDetailPanel = (employeeName: string) =>
  screen.getByRole('complementary', { name: employeeName })

describe('EmployeesPage', () => {
  afterEach(() => {
    cleanup()
  })

  it('shows the detail panel after selecting an employee', async () => {
    const user = userEvent.setup()

    renderEmployeesPage()

    await user.click(
      await screen.findByRole('row', { name: 'View details for Maya Chen' }),
    )

    expect(getEmployeeDetailPanel('Maya Chen')).toBeInTheDocument()
  })

  it('hides the detail panel when filters remove the selected employee', async () => {
    const user = userEvent.setup()

    renderEmployeesPage()

    await user.click(
      await screen.findByRole('row', { name: 'View details for Maya Chen' }),
    )

    const searchInput = screen.getByRole('searchbox', {
      name: 'Search employees by name, role, or location',
    })

    await user.type(searchInput, 'lena')

    await waitFor(() => {
      expect(
        screen.queryByRole('complementary', { name: 'Maya Chen' }),
      ).not.toBeInTheDocument()
    })
  })

  it('keeps the detail panel open when the selected employee still matches filters', async () => {
    const user = userEvent.setup()

    renderEmployeesPage()

    await user.click(
      await screen.findByRole('row', { name: 'View details for Lena Ortiz' }),
    )

    const searchInput = screen.getByRole('searchbox', {
      name: 'Search employees by name, role, or location',
    })

    await user.type(searchInput, 'lena')

    expect(
      within(getEmployeeDetailPanel('Lena Ortiz')).getByText(
        'People Operations Lead',
      ),
    ).toBeInTheDocument()
  })
})
