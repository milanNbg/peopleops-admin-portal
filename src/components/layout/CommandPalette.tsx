import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { navigationItems } from '@/data/navigation'

type CommandPaletteProps = {
  onClose: () => void
}

export const CommandPalette = ({ onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return navigationItems
    }

    return navigationItems.filter((item) =>
      item.label.toLowerCase().includes(normalizedQuery),
    )
  }, [query])

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

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <div className="command-palette-overlay" role="presentation">
      <div
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
            type="search"
            value={query}
            placeholder="Search pages..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="command-palette-results" role="listbox">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((item) => (
              <button
                className="command-palette-item"
                key={item.path}
                role="option"
                type="button"
                onClick={() => handleNavigate(item.path)}
              >
                <span className="command-palette-shortcut" aria-hidden="true">
                  {item.shortLabel}
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.path}</small>
                </span>
              </button>
            ))
          ) : (
            <p className="command-palette-empty">No matching pages found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
