import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  titleId: string
  actions?: ReactNode
  className?: string
}

export const SectionHeader = ({
  eyebrow,
  title,
  titleId,
  actions,
  className,
}: SectionHeaderProps) => (
  <div className={`section-heading${className ? ` ${className}` : ''}`}>
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h3 id={titleId}>{title}</h3>
    </div>
    {actions}
  </div>
)
