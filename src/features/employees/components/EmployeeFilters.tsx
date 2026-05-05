import type { Dispatch } from 'react'
import type {
  EmployeeFiltersAction,
  EmployeeFiltersState,
  SortOption,
} from '../hooks/useEmployeeFilters'
import type { EmployeeStatus } from '../../../types/employee'

type EmployeeFiltersProps = {
  departments: string[]
  dispatch: Dispatch<EmployeeFiltersAction>
  filters: EmployeeFiltersState
  statuses: Array<EmployeeStatus | 'All'>
}

export const EmployeeFilters = ({
  departments,
  dispatch,
  filters,
  statuses,
}: EmployeeFiltersProps) => (
  <div className="employee-controls" aria-label="Employee filters">
    <label className="field">
      <span>Search</span>
      <input
        onChange={(event) =>
          dispatch({ type: 'setSearch', value: event.target.value })
        }
        placeholder="Name, role, or location"
        type="search"
        value={filters.search}
      />
    </label>

    <label className="field">
      <span>Department</span>
      <select
        onChange={(event) =>
          dispatch({ type: 'setDepartment', value: event.target.value })
        }
        value={filters.department}
      >
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </label>

    <label className="field">
      <span>Status</span>
      <select
        onChange={(event) =>
          dispatch({ type: 'setStatus', value: event.target.value })
        }
        value={filters.status}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </label>

    <label className="field">
      <span>Sort by</span>
      <select
        onChange={(event) =>
          dispatch({
            type: 'setSortBy',
            value: event.target.value as SortOption,
          })
        }
        value={filters.sortBy}
      >
        <option value="name">Name</option>
        <option value="startDate">Start date</option>
      </select>
    </label>
  </div>
)
