import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/features/dashboard/DashboardPage', () => ({
  DashboardPage: () => <h2>Dashboard route content</h2>,
}))

vi.mock('@/features/employees/EmployeesPage', () => ({
  EmployeesPage: () => <h2>Employees route content</h2>,
}))

vi.mock('@/features/departments/DepartmentsPage', () => ({
  DepartmentsPage: () => <h2>Departments route content</h2>,
}))

vi.mock('@/features/roles/RolesPage', () => ({
  RolesPage: () => <h2>Roles route content</h2>,
}))

vi.mock('@/features/reports/ReportsPage', () => ({
  ReportsPage: () => <h2>Reports route content</h2>,
}))

vi.mock('@/features/not-found/NotFoundPage', () => ({
  NotFoundPage: () => <h2>Page Not Found route content</h2>,
}))

import { AppRoutes } from './AppRoutes'

const renderAppRoutes = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppRoutes />
    </MemoryRouter>,
  )

describe('AppRoutes', () => {
  it('redirects the root route to dashboard content', async () => {
    renderAppRoutes('/')

    expect(await screen.findByText('Dashboard route content')).toBeInTheDocument()
  })

  it('renders a known route', async () => {
    renderAppRoutes('/employees')

    expect(await screen.findByText('Employees route content')).toBeInTheDocument()
  })

  it('renders the not found route for unknown paths', async () => {
    renderAppRoutes('/missing-page')

    expect(
      await screen.findByText('Page Not Found route content'),
    ).toBeInTheDocument()
  })
})
