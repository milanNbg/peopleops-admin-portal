import { useAppUi } from '@/hooks/useAppUi'

import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
  sidebar: ReactNode
  topbar: ReactNode
}

export const AppLayout = ({ children, sidebar, topbar }: AppLayoutProps) => {
  const { isSidebarCollapsed } = useAppUi()

  return (
    <div
      className={`app-shell${isSidebarCollapsed ? ' sidebar-collapsed' : ''}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {sidebar}

      <div className="workspace">
        {topbar}
        {children}
      </div>
    </div>
  )
}
