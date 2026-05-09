import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'

import { useAppUi } from '@/hooks/useAppUi'

import { CommandPalette } from './CommandPalette'

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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const nextThemeLabel = themeMode === 'light' ? 'Dark mode' : 'Light mode'
  const pageTitle = routeTitles[pathname] ?? 'Dashboard'
  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsCommandPaletteOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">People Operations</p>
        <h1>{pageTitle}</h1>
      </div>

      <div className="header-actions">
        <button
          className="command-palette-trigger"
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isCommandPaletteOpen}
        >
          <span>Search</span>
          <kbd>Ctrl K</kbd>
        </button>
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

      {isCommandPaletteOpen ? (
        <CommandPalette onClose={closeCommandPalette} />
      ) : null}
    </header>
  )
}
