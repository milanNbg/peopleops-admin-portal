import type { NavigationItem } from '../../data/navigation'

type SidebarProps = {
  navigationItems: NavigationItem[]
}

export function Sidebar({ navigationItems }: SidebarProps) {
  return (
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
          <a
            className={item.isActive ? 'nav-link active' : 'nav-link'}
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
