import {
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import {
  AppUiContext,
  appUiReducer,
  getInitialThemeMode,
  themeStorageKey,
} from './AppUiContext'

type AppUiProviderProps = {
  children: ReactNode
}

export const AppUiProvider = ({ children }: AppUiProviderProps) => {
  const [state, dispatch] = useReducer(
    appUiReducer,
    { isSidebarCollapsed: false, themeMode: 'light' },
    (initialState) => ({
      ...initialState,
      themeMode: getInitialThemeMode(),
    }),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = state.themeMode

    try {
      localStorage.setItem(themeStorageKey, state.themeMode)
    } catch {
      // Theme still applies for the current session if persistence is unavailable.
    }
  }, [state.themeMode])

  const contextValue = useMemo(
    () => ({
      ...state,
      toggleSidebar: () => dispatch({ type: 'toggleSidebar' }),
      toggleTheme: () => dispatch({ type: 'toggleTheme' }),
    }),
    [state],
  )

  return (
    <AppUiContext.Provider value={contextValue}>
      {children}
    </AppUiContext.Provider>
  )
}
