import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebouncedValue } from '@/hooks/useDebouncedValue'

import type { Dispatch } from 'react'
import type { Employee, EmployeeStatus } from '@/types/employee'

export type SortOption = 'name' | 'startDate'

export type EmployeeFiltersState = {
  department: string
  page: number
  pageSize: number
  search: string
  sortBy: SortOption
  status: string
}

export type ActiveEmployeeFilter = {
  label: string
  value: string
}

export type EmployeeFiltersAction =
  | { type: 'resetFilters' }
  | { type: 'setDepartment'; value: string }
  | { type: 'setPage'; value: number }
  | { type: 'setPageSize'; value: number }
  | { type: 'setSearch'; value: string }
  | { type: 'setSortBy'; value: SortOption }
  | { type: 'setStatus'; value: string }

export const defaultEmployeeFilters: EmployeeFiltersState = {
  department: 'All',
  page: 1,
  pageSize: 5,
  search: '',
  sortBy: 'name',
  status: 'All',
}

export const employeePageSizeOptions = [5, 10, 20]

const sortOptions: SortOption[] = ['name', 'startDate']

const getValidPage = (value: string | null) => {
  const page = Number(value)

  return Number.isInteger(page) && page >= 1 ? page : defaultEmployeeFilters.page
}

const getValidPageSize = (value: string | null) => {
  const pageSize = Number(value)

  return employeePageSizeOptions.includes(pageSize)
    ? pageSize
    : defaultEmployeeFilters.pageSize
}

const employeeFiltersReducer = (
  state: EmployeeFiltersState,
  action: EmployeeFiltersAction,
): EmployeeFiltersState => {
  switch (action.type) {
    case 'resetFilters':
      return defaultEmployeeFilters
    case 'setDepartment':
      return { ...state, department: action.value, page: 1 }
    case 'setPage':
      return { ...state, page: action.value }
    case 'setPageSize':
      return {
        ...state,
        page: 1,
        pageSize: employeePageSizeOptions.includes(action.value)
          ? action.value
          : defaultEmployeeFilters.pageSize,
      }
    case 'setSearch':
      return { ...state, page: 1, search: action.value }
    case 'setSortBy':
      return { ...state, page: 1, sortBy: action.value }
    case 'setStatus':
      return { ...state, page: 1, status: action.value }
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
    page: getValidPage(searchParams.get('page')),
    pageSize: getValidPageSize(searchParams.get('pageSize')),
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
  updateParam('page', String(filters.page), String(defaultEmployeeFilters.page))
  updateParam(
    'pageSize',
    String(filters.pageSize),
    String(defaultEmployeeFilters.pageSize),
  )
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

const sortLabels: Record<SortOption, string> = {
  name: 'Name',
  startDate: 'Start date',
}

const getActiveEmployeeFilters = (
  filters: EmployeeFiltersState,
): ActiveEmployeeFilter[] => {
  const activeFilters: ActiveEmployeeFilter[] = []
  const trimmedSearch = filters.search.trim()

  if (trimmedSearch.length > 0) {
    activeFilters.push({ label: 'Search', value: trimmedSearch })
  }

  if (filters.department !== defaultEmployeeFilters.department) {
    activeFilters.push({ label: 'Department', value: filters.department })
  }

  if (filters.status !== defaultEmployeeFilters.status) {
    activeFilters.push({ label: 'Status', value: filters.status })
  }

  if (filters.sortBy !== defaultEmployeeFilters.sortBy) {
    activeFilters.push({ label: 'Sort', value: sortLabels[filters.sortBy] })
  }

  return activeFilters
}

export const useEmployeeFilters = (employeeList: Employee[], isReady = true) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, baseDispatch] = useReducer(
    employeeFiltersReducer,
    searchParams,
    getEmployeeFiltersFromSearchParams,
  )
  const debouncedSearch = useDebouncedValue(filters.search, 300)
  const appliedSearch =
    filters.search === defaultEmployeeFilters.search ? filters.search : debouncedSearch
  const appliedFilters = useMemo(
    () => ({
      ...filters,
      search: appliedSearch,
    }),
    [appliedSearch, filters],
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

  const activeFilters = useMemo(
    () => getActiveEmployeeFilters(filters),
    [filters],
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

  const pageCount = Math.max(
    1,
    Math.ceil(filteredEmployees.length / appliedFilters.pageSize),
  )
  const currentPage = isReady
    ? Math.min(appliedFilters.page, pageCount)
    : appliedFilters.page
  const pageStartIndex = (currentPage - 1) * appliedFilters.pageSize
  const paginatedEmployees = filteredEmployees.slice(
    pageStartIndex,
    pageStartIndex + appliedFilters.pageSize,
  )

  useEffect(() => {
    if (isReady && filters.page !== currentPage) {
      baseDispatch({ type: 'setPage', value: currentPage })
    }
  }, [currentPage, filters.page, isReady, baseDispatch])

  return {
    activeFilters,
    currentPage,
    departments,
    dispatch,
    filteredEmployees,
    filters,
    hasActiveFilters: activeFilters.length > 0,
    pageCount,
    pageSizeOptions: employeePageSizeOptions,
    paginatedEmployees,
    statuses,
    totalEmployees: employeeList.length,
  }
}
