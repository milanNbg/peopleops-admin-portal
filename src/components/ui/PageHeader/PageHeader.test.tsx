import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  it('labels the section with its heading', () => {
    render(
      <PageHeader eyebrow="Overview" title="Dashboard" titleId="dashboard-title">
        Review workforce activity.
      </PageHeader>,
    )

    expect(
      screen.getByRole('region', { name: 'Dashboard' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Dashboard' }),
    ).toHaveAttribute('id', 'dashboard-title')
    expect(screen.getByText('Review workforce activity.')).toBeInTheDocument()
  })
})
