import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { DataTableColumn } from '.'

import { DataTable } from '.'

type TestEmployee = {
  department: string
  id: string
  name: string
}

const columns: DataTableColumn<TestEmployee>[] = [
  {
    header: 'Name',
    key: 'name',
    render: (employee) => employee.name,
  },
  {
    header: 'Department',
    key: 'department',
    render: (employee) => employee.department,
  },
]

const renderTable = (data: TestEmployee[]) =>
  render(
    <DataTable
      ariaLabel="Employees"
      className="employee-table"
      columns={columns}
      data={data}
      emptyMessage="No employees found."
      getRowKey={(employee) => employee.id}
      headerRowClassName="employee-row employee-row-header"
      rowClassName="employee-row"
    />,
  )

describe('DataTable', () => {
  it('renders provided rows', () => {
    renderTable([
      { department: 'People', id: '1', name: 'Avery Stone' },
      { department: 'Finance', id: '2', name: 'Mina Patel' },
    ])

    expect(screen.getByRole('table', { name: 'Employees' })).toBeInTheDocument()
    expect(screen.getByText('Avery Stone')).toBeInTheDocument()
    expect(screen.getByText('Mina Patel')).toBeInTheDocument()
  })

  it('shows an empty state when there is no data', () => {
    renderTable([])

    expect(screen.getByText('No employees found.')).toBeInTheDocument()
  })
})
