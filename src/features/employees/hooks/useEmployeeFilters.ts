import { useMemo, useReducer } from 'react'

import type { Employee, EmployeeStatus } from '@/types/employee'

export type SortOption = 'name' | 'startDate'

export type EmployeeFiltersState = {
  department: string
  search: string
  sortBy: SortOption
  status: string
}

export type EmployeeFiltersAction =
  | { type: 'setDepartment'; value: string }
  | { type: 'setSearch'; value: string }
  | { type: 'setSortBy'; value: SortOption }
  | { type: 'setStatus'; value: string }

const initialFilters: EmployeeFiltersState = {
  department: 'All',
  search: '',
  sortBy: 'name',
  status: 'All',
}

const employeeFiltersReducer = (
  state: EmployeeFiltersState,
  action: EmployeeFiltersAction,
): EmployeeFiltersState => {
  switch (action.type) {
    case 'setDepartment':
      return { ...state, department: action.value }
    case 'setSearch':
      return { ...state, search: action.value }
    case 'setSortBy':
      return { ...state, sortBy: action.value }
    case 'setStatus':
      return { ...state, status: action.value }
  }
}

const statuses: Array<EmployeeStatus | 'All'> = [
  'All',
  'Active',
  'Inactive',
  'On Leave',
]

const sortEmployees = (employeeList: Employee[], sortBy: SortOption) =>
  [...employeeList].sort((firstEmployee, secondEmployee) => {
    if (sortBy === 'startDate') {
      return (
        Date.parse(secondEmployee.startDate) - Date.parse(firstEmployee.startDate)
      )
    }

    return firstEmployee.name.localeCompare(secondEmployee.name)
  })

export const useEmployeeFilters = (employeeList: Employee[]) => {
  const [filters, dispatch] = useReducer(employeeFiltersReducer, initialFilters)

  const departments = useMemo(
    () => [
      'All',
      ...new Set(employeeList.map((employee) => employee.department)),
    ],
    [employeeList],
  )

  const filteredEmployees = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase()

    const matchesFilters = employeeList.filter((employee) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.role.toLowerCase().includes(searchTerm) ||
        employee.location.toLowerCase().includes(searchTerm)

      const matchesDepartment =
        filters.department === 'All' || employee.department === filters.department
      const matchesStatus =
        filters.status === 'All' || employee.status === filters.status

      return matchesSearch && matchesDepartment && matchesStatus
    })

    return sortEmployees(matchesFilters, filters.sortBy)
  }, [employeeList, filters])

  return {
    departments,
    dispatch,
    filteredEmployees,
    filters,
    statuses,
    totalEmployees: employeeList.length,
  }
}
