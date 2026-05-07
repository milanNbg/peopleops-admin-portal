type SkeletonBlockProps = {
  className?: string
}

export const SkeletonBlock = ({ className }: SkeletonBlockProps) => (
  <span
    className={`skeleton-block${className ? ` ${className}` : ''}`}
    aria-hidden="true"
  />
)
