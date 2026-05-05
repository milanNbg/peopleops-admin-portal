import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/layout/AppLayout'
import { MainContent } from './components/layout/MainContent'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { navigationItems } from './data/navigation'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppLayout
        sidebar={<Sidebar navigationItems={navigationItems} />}
        topbar={<Topbar />}
      >
        <MainContent>
          <AppRoutes />
        </MainContent>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
