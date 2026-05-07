import { BrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { MainContent } from '@/components/layout/MainContent'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { AppUiProvider } from '@/context/AppUiProvider'
import { navigationItems } from '@/data/navigation'
import { AppRoutes } from '@/routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppUiProvider>
          <AppLayout
            sidebar={<Sidebar navigationItems={navigationItems} />}
            topbar={<Topbar />}
          >
            <MainContent>
              <AppRoutes />
            </MainContent>
          </AppLayout>
        </AppUiProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
