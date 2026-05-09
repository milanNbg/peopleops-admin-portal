import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { navigationItems } from '@/data/navigation'

type CommandPaletteProps = {
  isSidebarCollapsed: boolean
  onClose: () => void
  onToggleSidebar: () => void
  onToggleTheme: () => void
}

type PaletteCommandGroup = {
  commands: Array<{
    description: string
    id: string
    label: string
    shortLabel: string
    onSelect: () => void
  }>
  label: string
}

export const CommandPalette = ({
  isSidebarCollapsed,
  onClose,
  onToggleSidebar,
  onToggleTheme,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const commandGroups = useMemo<PaletteCommandGroup[]>(() => {
    const handleNavigate = (path: string) => {
      navigate(path)
      onClose()
    }
    const handleAction = (action: () => void) => {
      action()
      onClose()
    }
    const sidebarLabel = isSidebarCollapsed
      ? 'Expand sidebar'
      : 'Collapse sidebar'

    return [
      {
        commands: navigationItems.map((item) => ({
          description: item.path,
          id: item.path,
          label: item.label,
          onSelect: () => handleNavigate(item.path),
          shortLabel: item.shortLabel,
        })),
        label: 'Navigation',
      },
      {
        commands: [
          {
            description: 'Switch between light and dark mode',
            id: 'toggle-theme',
            label: 'Toggle theme',
            onSelect: () => handleAction(onToggleTheme),
            shortLabel: 'THM',
          },
          {
            description: 'Adjust the primary navigation width',
            id: 'toggle-sidebar',
            label: sidebarLabel,
            onSelect: () => handleAction(onToggleSidebar),
            shortLabel: isSidebarCollapsed ? 'EXP' : 'COL',
          },
        ],
        label: 'Actions',
      },
    ]
  }, [
    isSidebarCollapsed,
    navigate,
    onClose,
    onToggleSidebar,
    onToggleTheme,
  ])
  const filteredCommandGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return commandGroups
    }

    return commandGroups
      .map((group) => ({
        ...group,
        commands: group.commands.filter((command) =>
          `${command.label} ${command.description}`
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.commands.length > 0)
  }, [commandGroups, query])
  const hasResults = filteredCommandGroups.some(
    (group) => group.commands.length > 0,
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="command-palette-overlay" role="presentation">
      <div
        id="command-palette-dialog"
        aria-labelledby="command-palette-title"
        aria-modal="true"
        className="command-palette"
        role="dialog"
      >
        <div className="command-palette-header">
          <div>
            <p className="eyebrow">Quick navigation</p>
            <h2 id="command-palette-title">Command palette</h2>
          </div>
          <button
            aria-label="Close command palette"
            className="command-palette-close"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <label className="command-palette-search">
          <span className="visually-hidden">Search pages</span>
          <input
            ref={inputRef}
            aria-controls="command-palette-results"
            type="search"
            value={query}
            placeholder="Search pages..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="command-palette-results" id="command-palette-results">
          {hasResults ? (
            filteredCommandGroups.map((group) => (
              <section className="command-palette-group" key={group.label}>
                <h3>{group.label}</h3>
                <div role="listbox" aria-label={`${group.label} commands`}>
                  {group.commands.map((command) => (
                    <button
                      className="command-palette-item"
                      key={command.id}
                      role="option"
                      type="button"
                      onClick={command.onSelect}
                    >
                      <span
                        className="command-palette-shortcut"
                        aria-hidden="true"
                      >
                        {command.shortLabel}
                      </span>
                      <span>
                        <strong>{command.label}</strong>
                        <small>{command.description}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className="command-palette-empty">No matching pages found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
