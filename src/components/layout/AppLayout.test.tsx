import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { AppUiProvider } from '@/context/AppUiProvider'
import { navigationItems } from '@/data/navigation'

import { AppLayout } from './AppLayout'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

const renderAppLayout = () =>
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AppUiProvider>
        <AppLayout
          sidebar={<Sidebar navigationItems={navigationItems} />}
          topbar={<Topbar />}
        >
          <section aria-label="Page content">Dashboard content</section>
        </AppLayout>
      </AppUiProvider>
    </MemoryRouter>,
  )

describe('AppLayout', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the skip link, layout regions and children content', () => {
    renderAppLayout()

    expect(
      screen.getByRole('link', { name: 'Skip to main content' }),
    ).toHaveAttribute('href', '#main-content')
    expect(
      screen.getByRole('complementary', { name: 'Primary navigation' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Dashboard' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Page content')).toHaveTextContent(
      'Dashboard content',
    )
  })

  it('applies the collapsed shell state when the sidebar toggle changes', async () => {
    const user = userEvent.setup()

    const { container } = renderAppLayout()
    const appShell = container.querySelector('.app-shell')

    expect(appShell).not.toHaveClass('sidebar-collapsed')

    await user.click(
      screen.getByRole('button', { name: 'Hide navigation menu' }),
    )

    expect(appShell).toHaveClass('sidebar-collapsed')
  })
})
