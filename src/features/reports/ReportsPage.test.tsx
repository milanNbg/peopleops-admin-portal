import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    description: 'Executive workforce snapshot for leadership review.',
    generatedDate: 'May 01, 2026',
    id: 'report-001',
    name: 'Workforce Snapshot',
    owner: 'Maya Chen',
    period: 'Q2 2026',
    schedule: 'Weekly on Monday',
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

const mockReportDownload = () => {
  const createObjectURL = vi.fn((blob: Blob) => {
    void blob

    return 'blob:peopleops-report'
  })
  const revokeObjectURL = vi.fn()
  const click = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => undefined)

  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: createObjectURL,
  })
  Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    value: revokeObjectURL,
  })

  return { click, createObjectURL, revokeObjectURL }
}

describe('ReportsPage', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
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

  it('opens the report detail panel after selecting a report', async () => {
    const user = userEvent.setup()

    vi.mocked(reportsService.getReports).mockResolvedValue(reports)

    render(<ReportsPage />)

    await user.click(
      await screen.findByRole('row', {
        name: 'View details for Workforce Snapshot',
      }),
    )

    expect(
      screen.getByRole('complementary', { name: 'Workforce Snapshot' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Weekly on Monday')).toBeInTheDocument()
    expect(
      screen.getByText('Executive workforce snapshot for leadership review.'),
    ).toBeInTheDocument()
  })

  it('closes the report detail panel from the close action', async () => {
    const user = userEvent.setup()

    vi.mocked(reportsService.getReports).mockResolvedValue(reports)

    render(<ReportsPage />)

    await user.click(
      await screen.findByRole('row', {
        name: 'View details for Workforce Snapshot',
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(
      screen.queryByRole('complementary', { name: 'Workforce Snapshot' }),
    ).not.toBeInTheDocument()
  })

  it('shows a download action for a selected report', async () => {
    const user = userEvent.setup()
    const { click, createObjectURL, revokeObjectURL } = mockReportDownload()

    vi.mocked(reportsService.getReports).mockResolvedValue(reports)

    render(<ReportsPage />)

    await user.click(
      await screen.findByRole('row', {
        name: 'View details for Workforce Snapshot',
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Download CSV' }))

    const reportBlob = createObjectURL.mock.calls.at(0)?.[0]

    if (!reportBlob) {
      throw new Error('Expected report export to create a Blob.')
    }

    const reportCsv = await reportBlob.text()

    expect(click).toHaveBeenCalled()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:peopleops-report')
    expect(reportCsv).toContain('Workforce Snapshot')
    expect(reportCsv).toContain('Weekly on Monday')
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
