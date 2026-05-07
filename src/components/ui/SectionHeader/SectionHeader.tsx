import type { ReactNode } from 'react'

type SectionHeaderProps = {
  actions?: ReactNode
  className?: string
  eyebrow: string
  title: string
  titleId: string
}

export const SectionHeader = ({
  actions,
  className,
  eyebrow,
  title,
  titleId,
}: SectionHeaderProps) => (
  <div className={`section-heading${className ? ` ${className}` : ''}`}>
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h3 id={titleId}>{title}</h3>
    </div>
    {actions}
  </div>
)
