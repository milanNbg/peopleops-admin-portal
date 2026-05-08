import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebouncedValue } from '@/hooks/useDebouncedValue'

import type { Dispatch } from 'react'
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

export const defaultEmployeeFilters: EmployeeFiltersState = {
  department: 'All',
  search: '',
  sortBy: 'name',
  status: 'All',
}

const sortOptions: SortOption[] = ['name', 'startDate']

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

const getSearchParamValue = (
  searchParams: URLSearchParams,
  key: 'department' | 'search' | 'status',
) => searchParams.get(key)?.trim() ?? defaultEmployeeFilters[key]

export const getEmployeeFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): EmployeeFiltersState => {
  const sortBy = searchParams.get('sort')?.trim() ?? defaultEmployeeFilters.sortBy

  return {
    department: getSearchParamValue(searchParams, 'department'),
    search: getSearchParamValue(searchParams, 'search'),
    sortBy: sortOptions.includes(sortBy as SortOption)
      ? (sortBy as SortOption)
      : defaultEmployeeFilters.sortBy,
    status: getSearchParamValue(searchParams, 'status'),
  }
}

export const setEmployeeFilterSearchParams = (
  searchParams: URLSearchParams,
  filters: EmployeeFiltersState,
) => {
  const nextSearchParams = new URLSearchParams(searchParams)

  const updateParam = (
    key: string,
    value: string,
    defaultValue: string,
  ) => {
    const trimmedValue = value.trim()

    if (trimmedValue === defaultValue) {
      nextSearchParams.delete(key)
    } else {
      nextSearchParams.set(key, trimmedValue)
    }
  }

  updateParam('department', filters.department, defaultEmployeeFilters.department)
  updateParam('search', filters.search, defaultEmployeeFilters.search)
  updateParam('sort', filters.sortBy, defaultEmployeeFilters.sortBy)
  updateParam('status', filters.status, defaultEmployeeFilters.status)

  return nextSearchParams
}

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
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, baseDispatch] = useReducer(
    employeeFiltersReducer,
    searchParams,
    getEmployeeFiltersFromSearchParams,
  )
  const debouncedSearch = useDebouncedValue(filters.search, 300)
  const appliedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [debouncedSearch, filters],
  )

  const dispatch: Dispatch<EmployeeFiltersAction> = useCallback(
    (action) => {
      baseDispatch(action)
    },
    [],
  )

  useEffect(() => {
    const nextSearchParams = setEmployeeFilterSearchParams(
      searchParams,
      appliedFilters,
    )

    if (nextSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(nextSearchParams, { replace: true })
    }
  }, [appliedFilters, searchParams, setSearchParams])

  const departments = useMemo(
    () => [
      'All',
      ...new Set(employeeList.map((employee) => employee.department)),
    ],
    [employeeList],
  )

  const filteredEmployees = useMemo(() => {
    const searchTerm = appliedFilters.search.trim().toLowerCase()

    const matchesFilters = employeeList.filter((employee) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.role.toLowerCase().includes(searchTerm) ||
        employee.location.toLowerCase().includes(searchTerm)

      const matchesDepartment =
        appliedFilters.department === 'All' ||
        employee.department === appliedFilters.department
      const matchesStatus =
        appliedFilters.status === 'All' || employee.status === appliedFilters.status

      return matchesSearch && matchesDepartment && matchesStatus
    })

    return sortEmployees(matchesFilters, appliedFilters.sortBy)
  }, [employeeList, appliedFilters])

  return {
    departments,
    dispatch,
    filteredEmployees,
    filters,
    statuses,
    totalEmployees: employeeList.length,
  }
}
