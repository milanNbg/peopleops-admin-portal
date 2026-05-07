import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LoadingState } from './LoadingState'

describe('LoadingState', () => {
  it('announces loading progress with status semantics', () => {
    render(<LoadingState message="Loading page..." />)

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByRole('status')).toHaveTextContent('Loading page...')
  })
})
