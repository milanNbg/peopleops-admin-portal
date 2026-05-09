import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  MemoryRouter,
  useLocation,
} from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { AppUiProvider } from '@/context/AppUiProvider'

import { Topbar } from './Topbar'

const LocationProbe = () => {
  const { pathname } = useLocation()

  return <span data-testid="current-path">{pathname}</span>
}

const renderTopbar = (initialEntry = '/employees') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppUiProvider>
        <Topbar />
        <LocationProbe />
      </AppUiProvider>
    </MemoryRouter>,
  )

describe('Topbar', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('shows the title for the current route', () => {
    renderTopbar('/reports')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Reports' }),
    ).toBeInTheDocument()
  })

  it.each([
    ['/dashboard', 'Dashboard'],
    ['/employees', 'Employees'],
    ['/departments', 'Departments'],
    ['/roles', 'Roles'],
    ['/reports', 'Reports'],
  ])('shows %s as %s in the topbar', (route, title) => {
    renderTopbar(route)

    expect(
      screen.getByRole('heading', { level: 1, name: title }),
    ).toBeInTheDocument()
  })

  it('shows a sensible fallback for unknown routes', () => {
    renderTopbar('/missing-page')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
  })

  it('toggles theme mode with a clear pressed state', async () => {
    const user = userEvent.setup()

    renderTopbar()

    const themeButton = screen.getByRole('button', {
      name: 'Switch to Dark mode',
    })

    expect(themeButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(themeButton)

    expect(
      screen.getByRole('button', { name: 'Switch to Light mode' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('opens the command palette from the topbar', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(
      screen.getByRole('dialog', { name: 'Command palette' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toHaveFocus()
  })

  it('opens the command palette with Ctrl+K', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.keyboard('{Control>}k{/Control}')

    expect(
      screen.getByRole('dialog', { name: 'Command palette' }),
    ).toBeInTheDocument()
  })

  it('opens the command palette with Cmd+K', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.keyboard('{Meta>}k{/Meta}')

    expect(
      screen.getByRole('dialog', { name: 'Command palette' }),
    ).toBeInTheDocument()
  })

  it('filters command results as the user types', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.type(screen.getByRole('searchbox'), 'rep')

    expect(
      screen.getByRole('option', { name: /reports/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('option', { name: /employees/i }),
    ).not.toBeInTheDocument()
  })

  it('shows quick action commands', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(
      screen.getByRole('heading', { level: 3, name: 'Navigation' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Actions' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /toggle theme/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /collapse sidebar/i }),
    ).toBeInTheDocument()
  })

  it('selecting Toggle theme changes the theme state', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.click(screen.getByRole('option', { name: /toggle theme/i }))

    expect(
      screen.getByRole('button', { name: 'Switch to Light mode' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('selecting Collapse or Expand sidebar changes sidebar state', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.click(screen.getByRole('option', { name: /collapse sidebar/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(
      screen.getByRole('option', { name: /expand sidebar/i }),
    ).toBeInTheDocument()
  })

  it('filters across navigation and action commands', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.type(screen.getByRole('searchbox'), 'theme')

    expect(
      screen.getByRole('option', { name: /toggle theme/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('option', { name: /dashboard/i }),
    ).not.toBeInTheDocument()
  })

  it('closes the command palette with Escape', async () => {
    const user = userEvent.setup()

    renderTopbar()

    const commandPaletteTrigger = screen.getByRole('button', { name: /search/i })

    await user.click(commandPaletteTrigger)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(commandPaletteTrigger).toHaveFocus()
  })

  it('selecting a command navigates to the expected route', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.click(screen.getByRole('option', { name: /^roles/i }))

    expect(screen.getByTestId('current-path')).toHaveTextContent('/roles')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows a no results state when no command matches', async () => {
    const user = userEvent.setup()

    renderTopbar()

    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.type(screen.getByRole('searchbox'), 'unknown page')

    expect(screen.getByText('No matching pages found.')).toBeInTheDocument()
  })
})
