import { useContext } from 'react'
import { AppUiContext } from '@/context/AppUiContext'

export const useAppUi = () => {
  const context = useContext(AppUiContext)

  if (!context) {
    throw new Error('useAppUi must be used within an AppUiProvider')
  }

  return context
}
