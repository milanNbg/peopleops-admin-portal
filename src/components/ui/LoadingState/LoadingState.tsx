type LoadingStateProps = {
  message: string
}

export const LoadingState = ({ message }: LoadingStateProps) => (
  <div className="state-card" role="status" aria-live="polite">
    <span className="loading-indicator" aria-hidden="true" />
    <p>{message}</p>
  </div>
)
