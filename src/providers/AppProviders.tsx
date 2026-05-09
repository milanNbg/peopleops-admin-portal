import { AppUiProvider } from '@/context/AppUiProvider'
import { ToastProvider } from '@/context/ToastProvider'

import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <AppUiProvider>
    <ToastProvider>{children}</ToastProvider>
  </AppUiProvider>
)
