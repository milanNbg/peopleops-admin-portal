import type { ReactNode } from 'react'

type MainContentProps = {
  children: ReactNode
}

export const MainContent = ({ children }: MainContentProps) => (
  <main className="main-content">
    {children}
  </main>
)
