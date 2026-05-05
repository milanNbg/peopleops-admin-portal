import './App.css'
import { AppLayout } from './components/layout/AppLayout'
import { MainContent } from './components/layout/MainContent'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { navigationItems } from './data/navigation'
import { DashboardPage } from './features/dashboard/DashboardPage'

function App() {
  return (
    <AppLayout
      sidebar={<Sidebar navigationItems={navigationItems} />}
      topbar={<Topbar />}
    >
      <MainContent>
        <DashboardPage />
      </MainContent>
    </AppLayout>
  )
}

export default App
