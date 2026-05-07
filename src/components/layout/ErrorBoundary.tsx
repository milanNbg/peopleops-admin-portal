import { Component } from 'react'

import { ErrorState } from '@/components/ui'

import type { ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unexpected application error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error-boundary">
          <ErrorState
            message="An unexpected rendering error interrupted the app. Reload to try again."
            title="Something went wrong"
          />
          <button
            className="app-error-boundary-button"
            type="button"
            onClick={this.handleReload}
          >
            Reload app
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
