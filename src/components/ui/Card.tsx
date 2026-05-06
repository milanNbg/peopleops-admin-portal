import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  labelledBy: string
}

export const Card = ({ children, labelledBy }: CardProps) => (
  <section className="dashboard-card" aria-labelledby={labelledBy}>
    {children}
  </section>
)
