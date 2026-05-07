import { useState } from 'react'
import {
  Card,
  ErrorState,
  LoadingState,
  PageHeader,
  SectionHeader,
} from '@/components/ui'
import { getEmployees } from '@/services/employeesService'
import { useAsyncData } from '@/hooks/useAsyncData'
import type { Employee } from '@/types/employee'
import { EmployeeDetailPanel } from './components/EmployeeDetailPanel'
import { EmployeeEmptyState } from './components/EmployeeEmptyState'
import { EmployeeFilters } from './components/EmployeeFilters'
import { EmployeeTable } from './components/EmployeeTable'
import { useEmployeeFilters } from './hooks/useEmployeeFilters'
import './EmployeesPage.scss'

export const EmployeesPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const {
    data: employees,
    error,
    isLoading,
  } = useAsyncData(getEmployees, {
    errorMessage: 'Employee records could not be loaded. Please try again later.',
    initialData: [],
  })

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
              filters={filters}
              statuses={statuses}
              dispatch={dispatch}
            />

            {filteredEmployees.length > 0 ? (
              <>
                <EmployeeTable
                  employees={filteredEmployees}
                  selectedEmployeeId={selectedEmployee?.id}
                  onSelectEmployee={setSelectedEmployee}
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
