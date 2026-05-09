import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders the status label and inferred tone class', () => {
    render(<StatusBadge status="On Leave" />)

    const badge = screen.getByText('On Leave')

    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('status-badge', 'status-badge-warning')
  })

  it('supports an explicit tone and feature class', () => {
    render(
      <StatusBadge
        className="permission-level"
        status="Full"
        tone="accent"
      />,
    )

    const badge = screen.getByText('Full')

    expect(badge).toHaveClass(
      'status-badge',
      'status-badge-accent',
      'permission-level',
    )
  })
})
