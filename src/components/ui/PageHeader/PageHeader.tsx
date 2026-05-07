import type { ReactNode } from 'react'

type PageHeaderProps = {
  children: ReactNode
  eyebrow: string
  title: string
  titleId: string
}

export const PageHeader = ({
  children,
  eyebrow,
  title,
  titleId,
}: PageHeaderProps) => (
  <section className="welcome-panel" aria-labelledby={titleId}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 id={titleId}>{title}</h2>
    <p className="intro">{children}</p>
  </section>
)
