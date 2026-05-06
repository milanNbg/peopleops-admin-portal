import { useEffect, useState } from 'react'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { getEmployees } from '../../services/employeesService'
import type { Employee } from '../../types/employee'
import { EmployeeDetailPanel } from './components/EmployeeDetailPanel'
import { EmployeeEmptyState } from './components/EmployeeEmptyState'
import { EmployeeFilters } from './components/EmployeeFilters'
import { EmployeeTable } from './components/EmployeeTable'
import './EmployeesPage.scss'
import { useEmployeeFilters } from './hooks/useEmployeeFilters'

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const {
    departments,
    dispatch,
    filteredEmployees,
    filters,
    statuses,
    totalEmployees,
  } = useEmployeeFilters(employees)

  useEffect(() => {
    let isMounted = true

    const loadEmployees = async () => {
      try {
        const employeeData = await getEmployees()

        if (isMounted) {
          setEmployees(employeeData)
          setError(null)
        }
      } catch {
        if (isMounted) {
          setError('Employee records could not be loaded. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEmployees()

    return () => {
      isMounted = false
    }
  }, [])

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

        {isLoading ? (
          <LoadingState message="Loading employee records..." />
        ) : error ? (
          <ErrorState message={error} title="Employee data unavailable" />
        ) : (
          <>
            <EmployeeFilters
              departments={departments}
              dispatch={dispatch}
              filters={filters}
              statuses={statuses}
            />

            {filteredEmployees.length > 0 ? (
              <>
                <EmployeeTable
                  employees={filteredEmployees}
                  onSelectEmployee={setSelectedEmployee}
                  selectedEmployeeId={selectedEmployee?.id}
                />
                {selectedEmployee ? (
                  <EmployeeDetailPanel
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                  />
                ) : null}
              </>
            ) : (
              <EmployeeEmptyState />
            )}
          </>
        )}
      </section>
    </div>
  )
}
