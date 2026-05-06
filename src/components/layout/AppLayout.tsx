import type { ReactNode } from 'react'
import { useAppUi } from '../../context/AppUiContext'

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
      {sidebar}

      <div className="workspace">
        {topbar}
        {children}
      </div>
    </div>
  )
}
