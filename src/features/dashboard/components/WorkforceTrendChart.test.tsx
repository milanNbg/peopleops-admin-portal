import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import type { WorkforceTrendItem } from '@/types/dashboard'

import { WorkforceTrendChart } from './WorkforceTrendChart'

const workforceTrend: WorkforceTrendItem[] = [
  { headcount: 118, label: 'Jan' },
  { headcount: 132, label: 'Feb' },
]

describe('WorkforceTrendChart', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the workforce trend with an accessible summary label', () => {
    render(<WorkforceTrendChart workforceTrend={workforceTrend} />)

    expect(
      screen.getByRole('img', {
        name: 'Workforce trend from 118 employees in Jan to 132 employees in Feb.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Jan')).toBeInTheDocument()
    expect(screen.getByText('118')).toBeInTheDocument()
    expect(screen.getByText('Feb')).toBeInTheDocument()
    expect(screen.getByText('132')).toBeInTheDocument()
  })

  it('provides an accessible fallback label when trend data is empty', () => {
    render(<WorkforceTrendChart workforceTrend={[]} />)

    expect(
      screen.getByRole('img', {
        name: 'Workforce trend data is unavailable.',
      }),
    ).toBeInTheDocument()
  })
})
