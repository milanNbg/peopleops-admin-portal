import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { AppUiProvider } from '@/context/AppUiProvider'

import { Topbar } from './Topbar'

const renderTopbar = (initialEntry = '/employees') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppUiProvider>
        <Topbar />
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
})
