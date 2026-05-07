import { SkeletonBlock } from '../SkeletonBlock'

export const PageHeaderSkeleton = () => (
  <section className="welcome-panel page-header-skeleton" aria-hidden="true">
    <SkeletonBlock className="skeleton-eyebrow" />
    <SkeletonBlock className="page-header-skeleton-title" />
    <SkeletonBlock className="page-header-skeleton-intro" />
    <SkeletonBlock className="page-header-skeleton-intro-short" />
  </section>
)
