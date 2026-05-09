import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useToast } from '@/hooks/useToast'

import { ToastProvider } from './ToastProvider'

const ToastTrigger = () => {
  const { showToast } = useToast()

  return (
    <button
      type="button"
      onClick={() =>
        showToast({
          message: 'Profile saved.',
          timeoutMs: 1000,
          variant: 'success',
        })
      }
    >
      Show toast
    </button>
  )
}

const renderToastTrigger = () =>
  render(
    <ToastProvider>
      <ToastTrigger />
    </ToastProvider>,
  )

describe('ToastProvider', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('shows and dismisses toast notifications', () => {
    renderToastTrigger()

    fireEvent.click(screen.getByRole('button', { name: 'Show toast' }))

    expect(screen.getByText('Profile saved.')).toBeInTheDocument()
    expect(screen.getByLabelText('Notifications')).toHaveAttribute(
      'aria-live',
      'polite',
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Dismiss notification: Profile saved.',
      }),
    )

    expect(screen.queryByText('Profile saved.')).not.toBeInTheDocument()
  })

  it('automatically dismisses toast notifications after a timeout', () => {
    vi.useFakeTimers()

    renderToastTrigger()

    fireEvent.click(screen.getByRole('button', { name: 'Show toast' }))

    expect(screen.getByText('Profile saved.')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryByText('Profile saved.')).not.toBeInTheDocument()
  })
})
