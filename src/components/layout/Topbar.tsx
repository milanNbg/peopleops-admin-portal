import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'

import { getNavigationLabelByPath } from '@/data/navigation'
import { useAppUi } from '@/hooks/useAppUi'

import { CommandPalette } from './CommandPalette'

export const Topbar = () => {
  const {
    isSidebarCollapsed,
    themeMode,
    toggleSidebar,
    toggleTheme,
  } = useAppUi()
  const { pathname } = useLocation()
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const commandPaletteTriggerRef = useRef<HTMLButtonElement>(null)
  const nextThemeLabel = themeMode === 'light' ? 'Dark mode' : 'Light mode'
  const pageTitle = getNavigationLabelByPath(pathname) ?? 'Page not found'
  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false)
    commandPaletteTriggerRef.current?.focus()
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
          ref={commandPaletteTriggerRef}
          className="command-palette-trigger"
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          aria-controls={
            isCommandPaletteOpen ? 'command-palette-dialog' : undefined
          }
          aria-haspopup="dialog"
          aria-expanded={isCommandPaletteOpen}
          aria-keyshortcuts="Control+K Meta+K"
          aria-label="Open command palette search"
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
        <CommandPalette
          isSidebarCollapsed={isSidebarCollapsed}
          onClose={closeCommandPalette}
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
        />
      ) : null}
    </header>
  )
}
