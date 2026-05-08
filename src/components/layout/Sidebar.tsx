import { Link, NavLink } from 'react-router-dom'

import { useAppUi } from '@/hooks/useAppUi'

import type { NavigationItem } from '@/data/navigation'

type SidebarProps = {
  navigationItems: NavigationItem[]
}

export const Sidebar = ({ navigationItems }: SidebarProps) => {
  const { isSidebarCollapsed, toggleSidebar } = useAppUi()

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <Link className="brand" to="/dashboard" aria-label="Go to dashboard">
        <div className="brand-mark" aria-hidden="true">
          PO
        </div>
        <div className="brand-copy">
          <p className="brand-name">PeopleOps</p>
          <p className="brand-subtitle">Admin Portal</p>
        </div>
      </Link>

      <button
        className="sidebar-toggle"
        type="button"
        onClick={toggleSidebar}
        aria-controls="primary-navigation"
        aria-expanded={!isSidebarCollapsed}
        aria-label={
          isSidebarCollapsed
            ? 'Show navigation menu'
            : 'Hide navigation menu'
        }
      >
        <span className="sidebar-toggle-label-desktop">
          {isSidebarCollapsed ? 'Expand' : 'Collapse'}
        </span>
        <span className="sidebar-toggle-label-mobile">
          {isSidebarCollapsed ? 'Menu' : 'Hide menu'}
        </span>
      </button>

      <nav
        className="sidebar-nav"
        id="primary-navigation"
        aria-label="Primary"
      >
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end={item.path === '/dashboard'}
            key={item.label}
            aria-label={item.label}
            title={isSidebarCollapsed ? item.label : undefined}
            to={item.path}
          >
            <span className="nav-initial" aria-hidden="true">
              {item.shortLabel}
            </span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
