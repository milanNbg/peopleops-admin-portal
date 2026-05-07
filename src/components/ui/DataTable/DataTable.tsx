import type { DataTableProps } from './DataTable.types'

export const DataTable = <TData,>({
  ariaLabel,
  className,
  columns,
  data,
  emptyMessage,
  getRowKey,
  getRowLabel,
  headerRowClassName,
  onRowSelect,
  rowClassName,
  selectedRowKey,
}: DataTableProps<TData>) => (
  <div
    className={className}
    role="table"
    aria-label={ariaLabel}
    aria-colcount={columns.length}
    aria-rowcount={data.length + 1}
  >
    <div className={headerRowClassName} role="row">
      {columns.map((column) => (
        <span role="columnheader" key={column.key}>
          {column.header}
        </span>
      ))}
    </div>

    {data.length > 0 ? (
      data.map((row) => {
        const rowKey = getRowKey(row)
        const rowContent = columns.map((column) => (
          <span role="cell" key={column.key}>
            {column.render(row)}
          </span>
        ))

        if (onRowSelect) {
          return (
            <button
              className={rowClassName}
              type="button"
              role="row"
              key={rowKey}
              onClick={() => onRowSelect(row)}
              aria-label={getRowLabel?.(row)}
              aria-selected={selectedRowKey === rowKey}
            >
              {rowContent}
            </button>
          )
        }

        return (
          <div className={rowClassName} role="row" key={rowKey}>
            {rowContent}
          </div>
        )
      })
    ) : (
      <div className={rowClassName} role="row">
        <span role="cell" className="data-table-empty-cell">
          {emptyMessage}
        </span>
      </div>
    )}
  </div>
)
