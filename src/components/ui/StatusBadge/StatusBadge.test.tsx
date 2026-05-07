import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders the status label and matching class', () => {
    render(<StatusBadge status="On Leave" />)

    const badge = screen.getByText('On Leave')

    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('status-badge', 'status-badge-on-leave')
  })
})
