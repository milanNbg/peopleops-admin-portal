import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as reportsService from '@/services/reportsService'

import type { Report } from '@/types/report'

import { ReportsPage } from './ReportsPage'

vi.mock('@/services/reportsService', () => ({
  getReports: vi.fn(),
}))

const reports: Report[] = [
  {
    category: 'Workforce',
    generatedDate: 'May 01, 2026',
    id: 'report-001',
    name: 'Workforce Snapshot',
    owner: 'Maya Chen',
    period: 'Q2 2026',
    status: 'Ready',
  },
]

const createDeferred = <TData,>() => {
  let resolve!: (value: TData) => void
  const promise = new Promise<TData>((promiseResolve) => {
    resolve = promiseResolve
  })

  return { promise, resolve }
}

describe('ReportsPage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the report skeleton while data is loading', () => {
    const reportsRequest = createDeferred<Report[]>()

    vi.mocked(reportsService.getReports).mockReturnValue(reportsRequest.promise)

    render(<ReportsPage />)

    expect(screen.getByText('Loading report data...')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Reports' }),
    ).not.toBeInTheDocument()

    reportsRequest.resolve(reports)
  })

  it('shows report content after data loads successfully', async () => {
    vi.mocked(reportsService.getReports).mockResolvedValue(reports)

    render(<ReportsPage />)

    expect(
      await screen.findByRole('heading', { name: 'Reports' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Generated and available')).toBeInTheDocument()
    expect(screen.getByText('Workforce Snapshot')).toBeInTheDocument()
    expect(screen.getByText('Maya Chen')).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Reports overview' }),
    ).toBeInTheDocument()
  })

  it('shows the report error state when data loading fails', async () => {
    vi.mocked(reportsService.getReports).mockRejectedValue(
      new Error('Unable to load reports'),
    )

    render(<ReportsPage />)

    expect(
      await screen.findByRole('heading', { name: 'Report data unavailable' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Report data could not be loaded. Please try again later.'),
    ).toBeInTheDocument()
  })
})
