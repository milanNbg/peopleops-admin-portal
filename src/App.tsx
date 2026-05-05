import './App.css'

const navigationItems = [
  'Dashboard',
  'Employees',
  'Departments',
  'Roles',
  'Reports',
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            PO
          </div>
          <div>
            <p className="brand-name">PeopleOps</p>
            <p className="brand-subtitle">Admin Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <a
              className={item === 'Dashboard' ? 'nav-link active' : 'nav-link'}
              href="#dashboard"
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <div className="workspace">
        <header className="top-header">
          <div>
            <p className="eyebrow">People Operations</p>
            <h1>Dashboard</h1>
          </div>

          <div className="header-actions" aria-label="Current workspace">
            <span className="status-dot" aria-hidden="true"></span>
            <span>Front-end preview</span>
          </div>
        </header>

        <main className="main-content" id="dashboard">
          <section className="welcome-panel" aria-labelledby="portal-title">
            <p className="eyebrow">Overview</p>
            <h2 id="portal-title">PeopleOps Admin Portal</h2>
            <p className="intro">
              A front-end admin dashboard for managing employees, departments,
              roles, and People Operations workflows.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
