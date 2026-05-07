import { SkeletonBlock } from '../SkeletonBlock'

type SkeletonCardGridProps = {
  count?: number
}

export const SkeletonCardGrid = ({ count = 4 }: SkeletonCardGridProps) => (
  <section className="metric-grid" aria-hidden="true">
    {Array.from({ length: count }, (_, index) => (
      <div className="metric-card skeleton-metric-card" key={index}>
        <SkeletonBlock className="skeleton-label" />
        <SkeletonBlock className="skeleton-value" />
        <SkeletonBlock className="skeleton-caption" />
      </div>
    ))}
  </section>
)
