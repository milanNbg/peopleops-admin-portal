import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useAppUi } from '@/hooks/useAppUi'
import { AppUiProvider } from './AppUiProvider'

const AppUiHarness = () => {
  const { isSidebarCollapsed, themeMode, toggleSidebar, toggleTheme } = useAppUi()

  return (
    <div>
      <p>Theme: {themeMode}</p>
      <p>Sidebar: {isSidebarCollapsed ? 'collapsed' : 'expanded'}</p>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
      <button type="button" onClick={toggleSidebar}>
        Toggle sidebar
      </button>
    </div>
  )
}

describe('AppUiProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('toggles theme mode and sidebar state', async () => {
    const user = userEvent.setup()

    render(
      <AppUiProvider>
        <AppUiHarness />
      </AppUiProvider>,
    )

    expect(screen.getByText('Theme: light')).toBeInTheDocument()
    expect(screen.getByText('Sidebar: expanded')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }))
    await user.click(screen.getByRole('button', { name: 'Toggle sidebar' }))

    expect(screen.getByText('Theme: dark')).toBeInTheDocument()
    expect(screen.getByText('Sidebar: collapsed')).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('peopleops-theme-mode')).toBe('dark')
  })
})
