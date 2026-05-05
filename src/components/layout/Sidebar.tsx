import { NavLink } from 'react-router-dom'
import type { NavigationItem } from '../../data/navigation'

type SidebarProps = {
  navigationItems: NavigationItem[]
}

export const Sidebar = ({ navigationItems }: SidebarProps) => (
  <aside className="sidebar" aria-label="Primary navigation">
    <div className="brand">
      <div className="brand-mark" aria-hidden="true">
        PO
      </div>
      <div>
        <p className="brand-name">PeopleOps</p>
        <p className="brand-subtitle">Admin Portal</p>
      </div>
    </div>

    <nav className="sidebar-nav">
      {navigationItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
          end={item.path === '/dashboard'}
          key={item.label}
          to={item.path}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
