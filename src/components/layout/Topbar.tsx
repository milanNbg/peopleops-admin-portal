import { useAppUi } from '../../context/AppUiContext'

export const Topbar = () => {
  const { themeMode, toggleTheme } = useAppUi()
  const nextThemeLabel = themeMode === 'light' ? 'Dark mode' : 'Light mode'

  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">People Operations</p>
        <h1>Dashboard</h1>
      </div>

      <div className="header-actions">
        <div className="workspace-status" aria-label="Current workspace">
          <span className="status-dot" aria-hidden="true"></span>
          <span>Front-end preview</span>
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextThemeLabel}`}
        >
          {nextThemeLabel}
        </button>
      </div>
    </header>
  )
}
