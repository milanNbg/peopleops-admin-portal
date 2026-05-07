import { useState } from 'react'

import {
  Card,
  ErrorState,
  PageHeader,
  PageHeaderSkeleton,
  SectionHeader,
  SkeletonBlock,
  SkeletonTable,
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

const EmployeesSkeleton = () => (
  <div className="employees-skeleton" role="status" aria-live="polite">
    <span className="visually-hidden">Loading employee records...</span>
    <PageHeaderSkeleton />
    <Card labelledBy="employees-skeleton-title">
      <span className="visually-hidden" id="employees-skeleton-title">
        Loading employee directory
      </span>
      <div className="employees-skeleton-heading" aria-hidden="true">
        <div>
          <SkeletonBlock className="skeleton-eyebrow" />
          <SkeletonBlock className="skeleton-heading" />
        </div>
        <SkeletonBlock className="employees-skeleton-count" />
      </div>
      <div className="employee-controls" aria-hidden="true">
        {['search', 'department', 'status', 'sort'].map((control) => (
          <div className="field" key={control}>
            <SkeletonBlock className="employees-skeleton-label" />
            <SkeletonBlock className="employees-skeleton-control" />
          </div>
        ))}
      </div>
      <SkeletonTable
        columns={[
          'skeleton-cell-wide',
          'skeleton-cell-medium',
          'skeleton-cell-wide',
          'skeleton-cell-medium',
          'skeleton-cell-short',
          'skeleton-cell-short',
        ]}
        rowClassName="employee-row"
        rows={5}
        tableClassName="employee-table"
      />
    </Card>
  </div>
)

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

  const selectedFilteredEmployee = selectedEmployee
    ? filteredEmployees.find((employee) => employee.id === selectedEmployee.id)
    : null

  return (
    <div className="employees-page">
      {isLoading ? (
        <EmployeesSkeleton />
      ) : (
        <>
          <PageHeader
            eyebrow="Directory"
            title="Employees"
            titleId="employees-title"
          >
            Review employee records, assignments, locations, and current
            employment status across the organization.
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

            {error ? (
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
                      selectedEmployeeId={selectedFilteredEmployee?.id}
                      onSelectEmployee={setSelectedEmployee}
                    />
                    {selectedFilteredEmployee ? (
                      <EmployeeDetailPanel
                        employee={selectedFilteredEmployee}
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
        </>
      )}
    </div>
  )
}
