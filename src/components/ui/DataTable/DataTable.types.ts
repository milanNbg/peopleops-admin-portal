import type { ReactNode } from 'react'

export type DataTableColumn<TData> = {
  header: string
  key: string
  render: (row: TData) => ReactNode
}

export type DataTableProps<TData> = {
  ariaLabel: string
  className: string
  columns: DataTableColumn<TData>[]
  data: TData[]
  emptyMessage: string
  headerRowClassName: string
  rowClassName: string
  selectedRowKey?: string
  getRowKey: (row: TData) => string
  getRowLabel?: (row: TData) => string
  onRowSelect?: (row: TData) => void
}
