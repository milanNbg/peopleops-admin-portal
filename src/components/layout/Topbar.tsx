import { useLocation } from 'react-router-dom'
import { useAppUi } from '@/hooks/useAppUi'

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/employees': 'Employees',
  '/departments': 'Departments',
  '/roles': 'Roles',
  '/reports': 'Reports',
}

export const Topbar = () => {
  const { themeMode, toggleTheme } = useAppUi()
  const { pathname } = useLocation()
  const nextThemeLabel = themeMode === 'light' ? 'Dark mode' : 'Light mode'
  const pageTitle = routeTitles[pathname] ?? 'Dashboard'

  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">People Operations</p>
        <h1>{pageTitle}</h1>
      </div>

      <div className="header-actions">
        <div className="workspace-status" aria-label="Current workspace">
          <span className="status-dot" aria-hidden="true"></span>
          <span>Demo workspace</span>
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextThemeLabel}`}
          aria-pressed={themeMode === 'dark'}
        >
          {nextThemeLabel}
        </button>
      </div>
    </header>
  )
}
