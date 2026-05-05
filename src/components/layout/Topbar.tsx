export function Topbar() {
  return (
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
  )
}
