import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SkeletonTable } from './SkeletonTable'

describe('SkeletonTable', () => {
  it('renders hidden placeholder rows for a table-shaped loading state', () => {
    const { container } = render(
      <SkeletonTable
        columns={['wide-cell', 'short-cell']}
        rowClassName="test-row"
        rows={3}
        tableClassName="test-table"
      />,
    )

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.test-row')).toHaveLength(3)
    expect(container.querySelectorAll('.skeleton-cell')).toHaveLength(6)
  })
})
