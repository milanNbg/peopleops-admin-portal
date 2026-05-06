type ErrorStateProps = {
  message: string
  title?: string
}

export const ErrorState = ({
  message,
  title = 'Unable to load data',
}: ErrorStateProps) => (
  <div className="state-card state-card-error" role="alert">
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
)
