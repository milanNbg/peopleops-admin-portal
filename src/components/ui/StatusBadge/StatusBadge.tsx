export type StatusBadgeTone =
  | 'accent'
  | 'neutral'
  | 'subtle'
  | 'success'
  | 'warning'

type StatusBadgeProps = {
  className?: string
  status: string
  tone?: StatusBadgeTone
}

const defaultStatusTones: Record<string, StatusBadgeTone> = {
  Active: 'success',
  Draft: 'neutral',
  Full: 'accent',
  Hiring: 'accent',
  Inactive: 'neutral',
  Manage: 'success',
  None: 'subtle',
  'On Leave': 'warning',
  Planning: 'warning',
  Ready: 'success',
  Review: 'warning',
  Scheduled: 'accent',
  View: 'neutral',
}

const getStatusTone = (status: string, tone?: StatusBadgeTone) =>
  tone ?? defaultStatusTones[status] ?? 'neutral'

export const StatusBadge = ({
  className,
  status,
  tone,
}: StatusBadgeProps) => {
  const badgeTone = getStatusTone(status, tone)
  const classNames = ['status-badge', `status-badge-${badgeTone}`, className]
    .filter(Boolean)
    .join(' ')

  return <span className={classNames}>{status}</span>
}
