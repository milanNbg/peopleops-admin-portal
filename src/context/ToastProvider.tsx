import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import type {
  ShowToastOptions,
  Toast,
} from './ToastContext'

import {
  ToastContext,
  defaultToastTimeoutMs,
} from './ToastContext'

type ToastProviderProps = {
  children: ReactNode
}

type ToastItemProps = {
  toast: Toast
  onDismiss: (id: string) => void
}

const toastLimit = 4

const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  useEffect(() => {
    if (toast.timeoutMs <= 0) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      onDismiss(toast.id)
    }, toast.timeoutMs)

    return () => window.clearTimeout(timeoutId)
  }, [
    onDismiss,
    toast.id,
    toast.timeoutMs,
  ])

  return (
    <li
      className={`toast toast-${toast.variant}`}
      role="status"
      aria-atomic="true"
    >
      <span className="toast-message">{toast.message}</span>
      <button
        className="toast-close"
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label={`Dismiss notification: ${toast.message}`}
      >
        Close
      </button>
    </li>
  )
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextToastId = useRef(0)
  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    )
  }, [])
  const showToast = useCallback((options: ShowToastOptions) => {
    const toast: Toast = {
      id: `toast-${nextToastId.current + 1}`,
      message: options.message,
      timeoutMs: options.timeoutMs ?? defaultToastTimeoutMs,
      variant: options.variant ?? 'info',
    }

    nextToastId.current += 1
    setToasts((currentToasts) => [...currentToasts, toast].slice(-toastLimit))
  }, [])
  const contextValue = useMemo(
    () => ({
      dismissToast,
      showToast,
    }),
    [
      dismissToast,
      showToast,
    ],
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className="toast-region"
        aria-label="Notifications"
        aria-live="polite"
        aria-relevant="additions text"
      >
        <ol className="toast-list">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={dismissToast}
            />
          ))}
        </ol>
      </div>
    </ToastContext.Provider>
  )
}
