import { useCallback, useState } from 'react'

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
import { useToast } from '@/hooks/useToast'
import { createCsv } from '@/utils/csv'

import type { Employee } from '@/types/employee'

import { EmployeeDetailPanel } from './components/EmployeeDetailPanel'
import { EmployeeEmptyState } from './components/EmployeeEmptyState'
import { EmployeeFilters } from './components/EmployeeFilters'
import { EmployeePagination } from './components/EmployeePagination'
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
        {['search', 'department', 'status', 'sort', 'page-size'].map((control) => (
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

const employeeCsvHeaders = [
  'Name',
  'Email',
  'Department',
  'Role',
  'Location',
  'Status',
  'Employment type',
  'Manager',
  'Start date',
]

const createEmployeeCsv = (employees: Employee[]) =>
  createCsv([
    employeeCsvHeaders,
    ...employees.map((employee) => [
      employee.name,
      employee.email,
      employee.department,
      employee.role,
      employee.location,
      employee.status,
      employee.employmentType,
      employee.manager,
      employee.startDate,
    ]),
  ])

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
  const { showToast } = useToast()

  const {
    activeFilters,
    departments,
    dispatch,
    filteredEmployees,
    filters,
    hasActiveFilters,
    currentPage,
    pageCount,
    pageSizeOptions,
    paginatedEmployees,
    statuses,
    totalEmployees,
  } = useEmployeeFilters(employees, !isLoading)

  const selectedFilteredEmployee = selectedEmployee
    ? paginatedEmployees.find((employee) => employee.id === selectedEmployee.id)
    : null
  const handleExportEmployees = useCallback(() => {
    if (filteredEmployees.length === 0) {
      return
    }

    const csv = createEmployeeCsv(filteredEmployees)
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const csvUrl = URL.createObjectURL(csvBlob)
    const downloadLink = document.createElement('a')

    downloadLink.href = csvUrl
    downloadLink.download = 'peopleops-employees.csv'
    document.body.append(downloadLink)

    try {
      downloadLink.click()
      showToast({
        message: 'Employee CSV exported successfully.',
        variant: 'success',
      })
    } finally {
      downloadLink.remove()
      URL.revokeObjectURL(csvUrl)
    }
  }, [
    filteredEmployees,
    showToast,
  ])

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
                <div className="employee-section-actions">
                  <span className="result-count">
                    {filteredEmployees.length} of {totalEmployees} employees
                  </span>
                  <button
                    className="export-csv-button"
                    type="button"
                    disabled={filteredEmployees.length === 0}
                    onClick={handleExportEmployees}
                  >
                    Export CSV
                  </button>
                </div>
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
                  activeFilters={activeFilters}
                  departments={departments}
                  filters={filters}
                  hasActiveFilters={hasActiveFilters}
                  pageSizeOptions={pageSizeOptions}
                  statuses={statuses}
                  dispatch={dispatch}
                />

                {filteredEmployees.length > 0 ? (
                  <>
                    <EmployeeTable
                      employees={paginatedEmployees}
                      selectedEmployeeId={selectedFilteredEmployee?.id}
                      onSelectEmployee={setSelectedEmployee}
                    />
                    <EmployeePagination
                      currentPage={currentPage}
                      pageCount={pageCount}
                      totalResults={filteredEmployees.length}
                      dispatch={dispatch}
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
