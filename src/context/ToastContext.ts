import { createContext } from 'react'

export type ToastVariant = 'success' | 'info' | 'warning'

export type Toast = {
  id: string
  message: string
  timeoutMs: number
  variant: ToastVariant
}

export type ShowToastOptions = {
  message: string
  timeoutMs?: number
  variant?: ToastVariant
}

export type ToastContextValue = {
  dismissToast: (id: string) => void
  showToast: (options: ShowToastOptions) => void
}

export const defaultToastTimeoutMs = 4000

export const ToastContext = createContext<ToastContextValue | null>(null)
