import { employees } from '../../data/employees'
import { EmployeeEmptyState } from './components/EmployeeEmptyState'
import { EmployeeFilters } from './components/EmployeeFilters'
import { EmployeeTable } from './components/EmployeeTable'
import './EmployeesPage.css'
import { useEmployeeFilters } from './hooks/useEmployeeFilters'

export const EmployeesPage = () => {
  const {
    departments,
    dispatch,
    filteredEmployees,
    filters,
    statuses,
    totalEmployees,
  } = useEmployeeFilters(employees)

  return (
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
        <div className="section-heading employees-heading">
          <div>
            <p className="eyebrow">People records</p>
            <h3 id="employee-table-title">Employee directory</h3>
          </div>
          <span className="result-count">
            {filteredEmployees.length} of {totalEmployees} employees
          </span>
        </div>

        <EmployeeFilters
          departments={departments}
          dispatch={dispatch}
          filters={filters}
          statuses={statuses}
        />

        {filteredEmployees.length > 0 ? (
          <EmployeeTable employees={filteredEmployees} />
        ) : (
          <EmployeeEmptyState />
        )}
      </section>
    </div>
  )
}
