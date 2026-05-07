import { SkeletonBlock } from '../SkeletonBlock'

type SkeletonTableProps = {
  columns: string[]
  rowClassName: string
  tableClassName: string
  rows?: number
}

export const SkeletonTable = ({
  columns,
  rowClassName,
  tableClassName,
  rows = 4,
}: SkeletonTableProps) => (
  <div className={`${tableClassName} skeleton-table`} aria-hidden="true">
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div className={rowClassName} key={rowIndex}>
        {columns.map((columnClassName, columnIndex) => (
          <SkeletonBlock
            className={`skeleton-cell ${columnClassName}`}
            key={columnIndex}
          />
        ))}
      </div>
    ))}
  </div>
)
