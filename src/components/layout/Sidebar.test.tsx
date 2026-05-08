import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { AppUiProvider } from '@/context/AppUiProvider'
import { navigationItems } from '@/data/navigation'

import { Sidebar } from './Sidebar'

const renderSidebar = (initialEntry = '/dashboard') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppUiProvider>
        <Sidebar navigationItems={navigationItems} />
      </AppUiProvider>
    </MemoryRouter>,
  )

describe('Sidebar', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders primary navigation links', () => {
    renderSidebar()

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Employees' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Departments' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Roles' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Reports' })).toBeInTheDocument()
  })

  it('renders the brand as a dashboard link', () => {
    renderSidebar()

    expect(screen.getByRole('link', { name: 'Go to dashboard' })).toHaveAttribute(
      'href',
      '/dashboard',
    )
  })

  it('marks the active route as the current page', () => {
    renderSidebar('/employees')

    expect(screen.getByRole('link', { name: 'Employees' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('toggles navigation expanded state from the sidebar button', async () => {
    const user = userEvent.setup()

    renderSidebar()

    const toggleButton = screen.getByRole('button', {
      name: 'Hide navigation menu',
    })

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(toggleButton).toHaveTextContent('Collapse')

    await user.click(toggleButton)

    expect(
      screen.getByRole('button', { name: 'Show navigation menu' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.getByRole('button', { name: 'Show navigation menu' }),
    ).toHaveTextContent('Expand')
  })
})
