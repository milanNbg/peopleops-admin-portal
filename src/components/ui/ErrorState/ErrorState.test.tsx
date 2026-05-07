import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ErrorState } from './ErrorState'

describe('ErrorState', () => {
  it('announces an error message as an alert', () => {
    render(
      <ErrorState
        message="Employee records could not be loaded."
        title="Employee data unavailable"
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Employee data unavailable',
    )
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Employee records could not be loaded.',
    )
  })
})
