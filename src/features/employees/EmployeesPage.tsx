import { useEffect, useState } from 'react'
import {
  Card,
  ErrorState,
  LoadingState,
  PageHeader,
  SectionHeader,
} from '@/components/ui'
import { getEmployees } from '@/services/employeesService'
import type { Employee } from '@/types/employee'
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
      <PageHeader eyebrow="Directory" title="Employees" titleId="employees-title">
        Review employee records, assignments, locations, and current employment
        status across the organization.
      </PageHeader>

      <Card labelledBy="employee-table-title">
        <SectionHeader
          actions={
            <span className="result-count">
              {filteredEmployees.length} of {totalEmployees} employees
            </span>
          }
          className="employees-heading"
          eyebrow="People records"
          title="Employee directory"
          titleId="employee-table-title"
        />

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
      </Card>
    </div>
  )
}
