import type { Dispatch } from 'react'

import type { EmployeeFiltersAction } from '../hooks/useEmployeeFilters'

type EmployeePaginationProps = {
  currentPage: number
  pageCount: number
  totalResults: number
  dispatch: Dispatch<EmployeeFiltersAction>
}

export const EmployeePagination = ({
  currentPage,
  pageCount,
  totalResults,
  dispatch,
}: EmployeePaginationProps) => (
  <div className="employee-pagination" aria-label="Employee pagination">
    <p aria-live="polite">
      Page {currentPage} of {pageCount} - {totalResults} result
      {totalResults === 1 ? '' : 's'}
    </p>
    <div className="employee-pagination-actions">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => dispatch({ type: 'setPage', value: currentPage - 1 })}
      >
        Previous page
      </button>
      <button
        type="button"
        disabled={currentPage === pageCount}
        onClick={() => dispatch({ type: 'setPage', value: currentPage + 1 })}
      >
        Next page
      </button>
    </div>
  </div>
)
