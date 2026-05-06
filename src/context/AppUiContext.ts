import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark'

export type AppUiState = {
  isSidebarCollapsed: boolean
  themeMode: ThemeMode
}

export type AppUiAction =
  | { type: 'toggleSidebar' }
  | { type: 'toggleTheme' }

export type AppUiContextValue = AppUiState & {
  toggleSidebar: () => void
  toggleTheme: () => void
}

export const themeStorageKey = 'peopleops-theme-mode'

export const getInitialThemeMode = (): ThemeMode => {
  try {
    const storedTheme = globalThis.localStorage?.getItem(themeStorageKey)

    return storedTheme === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export const appUiReducer = (
  state: AppUiState,
  action: AppUiAction,
): AppUiState => {
  switch (action.type) {
    case 'toggleSidebar':
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      }
    case 'toggleTheme':
      return {
        ...state,
        themeMode: state.themeMode === 'light' ? 'dark' : 'light',
      }
  }
}

export const AppUiContext = createContext<AppUiContextValue | null>(null)
