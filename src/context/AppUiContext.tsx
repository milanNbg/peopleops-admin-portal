import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'

type ThemeMode = 'light' | 'dark'

type AppUiState = {
  isSidebarCollapsed: boolean
  themeMode: ThemeMode
}

type AppUiAction =
  | { type: 'toggleSidebar' }
  | { type: 'toggleTheme' }

type AppUiContextValue = AppUiState & {
  toggleSidebar: () => void
  toggleTheme: () => void
}

type AppUiProviderProps = {
  children: ReactNode
}

const themeStorageKey = 'peopleops-theme-mode'

const getInitialThemeMode = (): ThemeMode => {
  try {
    const storedTheme = globalThis.localStorage?.getItem(themeStorageKey)

    return storedTheme === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const appUiReducer = (
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

const AppUiContext = createContext<AppUiContextValue | null>(null)

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

export const useAppUi = () => {
  const context = useContext(AppUiContext)

  if (!context) {
    throw new Error('useAppUi must be used within an AppUiProvider')
  }

  return context
}
