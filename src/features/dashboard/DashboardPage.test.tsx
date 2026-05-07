import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import * as dashboardService from '@/services/dashboardService'

import type {
  DashboardMetric,
  DepartmentSummary,
  RecentActivity,
  WorkforceOverviewItem,
  WorkforceTrendItem,
} from '@/types/dashboard'

import { DashboardPage } from './DashboardPage'

vi.mock('@/services/dashboardService', () => ({
  getDashboardMetrics: vi.fn(),
  getDepartmentSummaries: vi.fn(),
  getRecentActivities: vi.fn(),
  getWorkforceOverview: vi.fn(),
  getWorkforceTrend: vi.fn(),
}))

const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total employees', trend: '+2 this month', value: '128' },
  { label: 'Open roles', trend: '4 priority hires', value: '12' },
]

const departmentSummaries: DepartmentSummary[] = [
  { headcount: 42, lead: 'Nina Patel', name: 'Engineering', openRoles: 5 },
]

const recentActivities: RecentActivity[] = [
  {
    description: 'Engineering opened two new roles.',
    time: '09:30',
  },
]

const workforceOverview: WorkforceOverviewItem[] = [
  { label: 'Full-time employees', value: '118' },
]

const workforceTrend: WorkforceTrendItem[] = [
  { headcount: 118, label: 'Jan' },
  { headcount: 132, label: 'Feb' },
]

const createDeferred = <TData,>() => {
  let resolve!: (value: TData) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<TData>((promiseResolve, promiseReject) => {
    resolve = promiseResolve
    reject = promiseReject
  })

  return { promise, reject, resolve }
}

const mockSuccessfulDashboardServices = () => {
  vi.mocked(dashboardService.getDashboardMetrics).mockResolvedValue(
    dashboardMetrics,
  )
  vi.mocked(dashboardService.getDepartmentSummaries).mockResolvedValue(
    departmentSummaries,
  )
  vi.mocked(dashboardService.getRecentActivities).mockResolvedValue(
    recentActivities,
  )
  vi.mocked(dashboardService.getWorkforceOverview).mockResolvedValue(
    workforceOverview,
  )
  vi.mocked(dashboardService.getWorkforceTrend).mockResolvedValue(
    workforceTrend,
  )
}

describe('DashboardPage', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the dashboard skeleton while data is loading', () => {
    const metricsRequest = createDeferred<DashboardMetric[]>()

    vi.mocked(dashboardService.getDashboardMetrics).mockReturnValue(
      metricsRequest.promise,
    )
    vi.mocked(dashboardService.getDepartmentSummaries).mockResolvedValue(
      departmentSummaries,
    )
    vi.mocked(dashboardService.getRecentActivities).mockResolvedValue(
      recentActivities,
    )
    vi.mocked(dashboardService.getWorkforceOverview).mockResolvedValue(
      workforceOverview,
    )
    vi.mocked(dashboardService.getWorkforceTrend).mockResolvedValue(
      workforceTrend,
    )

    render(<DashboardPage />)

    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'PeopleOps Admin Portal' }),
    ).not.toBeInTheDocument()

    metricsRequest.resolve(dashboardMetrics)
  })

  it('shows dashboard content after data loads successfully', async () => {
    mockSuccessfulDashboardServices()

    render(<DashboardPage />)

    expect(
      await screen.findByRole('heading', { name: 'PeopleOps Admin Portal' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Total employees')).toBeInTheDocument()
    expect(screen.getByText('128')).toBeInTheDocument()
    expect(screen.getByText('Full-time employees')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Workforce trend' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Six-month headcount movement across the organization.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Engineering opened two new roles.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('table', { name: 'Department summary' }),
    ).toBeInTheDocument()
  })

  it('shows the dashboard error state when data loading fails', async () => {
    vi.mocked(dashboardService.getDashboardMetrics).mockRejectedValue(
      new Error('Unable to load metrics'),
    )
    vi.mocked(dashboardService.getDepartmentSummaries).mockResolvedValue(
      departmentSummaries,
    )
    vi.mocked(dashboardService.getRecentActivities).mockResolvedValue(
      recentActivities,
    )
    vi.mocked(dashboardService.getWorkforceOverview).mockResolvedValue(
      workforceOverview,
    )
    vi.mocked(dashboardService.getWorkforceTrend).mockResolvedValue(
      workforceTrend,
    )

    render(<DashboardPage />)

    expect(
      await screen.findByRole('heading', {
        name: 'Dashboard data unavailable',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Dashboard data could not be loaded. Please try again later.'),
    ).toBeInTheDocument()
  })
})
