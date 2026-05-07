type MetricCardProps = {
  label: string
  trend: string
  value: string
}

export const MetricCard = ({ label, trend, value }: MetricCardProps) => (
  <article className="metric-card">
    <p className="metric-label">{label}</p>
    <strong className="metric-value">{value}</strong>
    <p className="metric-trend">{trend}</p>
  </article>
)
