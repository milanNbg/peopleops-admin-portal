import type { WorkforceTrendItem } from '@/types/dashboard'

type WorkforceTrendChartProps = {
  workforceTrend: WorkforceTrendItem[]
}

const getWorkforceTrendLabel = (workforceTrend: WorkforceTrendItem[]) => {
  const firstTrendPoint = workforceTrend[0]
  const lastTrendPoint = workforceTrend[workforceTrend.length - 1]

  if (!firstTrendPoint || !lastTrendPoint) {
    return 'Workforce trend data is unavailable.'
  }

  return `Workforce trend from ${firstTrendPoint.headcount} employees in ${firstTrendPoint.label} to ${lastTrendPoint.headcount} employees in ${lastTrendPoint.label}.`
}

export const WorkforceTrendChart = ({
  workforceTrend,
}: WorkforceTrendChartProps) => {
  const maximumHeadcount = Math.max(
    ...workforceTrend.map((item) => item.headcount),
    1,
  )

  return (
    <div
      className="workforce-trend-chart"
      role="img"
      aria-label={getWorkforceTrendLabel(workforceTrend)}
    >
      {workforceTrend.map((item) => (
        <div className="workforce-trend-item" key={item.label}>
          <div className="workforce-trend-track" aria-hidden="true">
            <div
              className="workforce-trend-bar"
              style={{ height: `${(item.headcount / maximumHeadcount) * 100}%` }}
            ></div>
          </div>
          <span>{item.label}</span>
          <strong>{item.headcount}</strong>
        </div>
      ))}
    </div>
  )
}
