import { StatusBadge } from '../../components/ui/StatusBadge'
import { employees } from '../../data/employees'

export const EmployeesPage = () => (
  <div className="employees-page">
    <section className="welcome-panel" aria-labelledby="employees-title">
      <p className="eyebrow">Directory</p>
      <h2 id="employees-title">Employees</h2>
      <p className="intro">
        Review employee records, assignments, locations, and current employment
        status across the organization.
      </p>
    </section>

    <section className="dashboard-card" aria-labelledby="employee-table-title">
      <div className="section-heading">
        <p className="eyebrow">People records</p>
        <h3 id="employee-table-title">Employee directory</h3>
      </div>

      <div className="employee-table" role="table" aria-label="Employee directory">
        <div className="employee-row employee-row-header" role="row">
          <span role="columnheader">Employee name</span>
          <span role="columnheader">Department</span>
          <span role="columnheader">Role</span>
          <span role="columnheader">Location</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Start date</span>
        </div>

        {employees.map((employee) => (
          <div className="employee-row" role="row" key={employee.id}>
            <span role="cell">
              <strong>{employee.name}</strong>
              <small>{employee.email}</small>
            </span>
            <span role="cell">{employee.department}</span>
            <span role="cell">{employee.role}</span>
            <span role="cell">{employee.location}</span>
            <span role="cell">
              <StatusBadge status={employee.status} />
            </span>
            <span role="cell">{employee.startDate}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
)
