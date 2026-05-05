import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
  sidebar: ReactNode
  topbar: ReactNode
}

export function AppLayout({ children, sidebar, topbar }: AppLayoutProps) {
  return (
    <div className="app-shell">
      {sidebar}

      <div className="workspace">
        {topbar}
        {children}
      </div>
    </div>
  )
}
