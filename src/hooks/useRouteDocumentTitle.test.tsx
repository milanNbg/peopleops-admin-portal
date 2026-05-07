import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'

import type { ReactNode } from 'react'

import {
  getRouteDocumentTitle,
  useRouteDocumentTitle,
} from './useRouteDocumentTitle'

const defaultDocumentTitle = 'PeopleOps Admin Portal'

const createWrapper =
  (initialEntry: string) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  )

describe('useRouteDocumentTitle', () => {
  afterEach(() => {
    document.title = defaultDocumentTitle
  })

  it.each([
    ['/dashboard', 'Dashboard | PeopleOps Admin Portal'],
    ['/employees', 'Employees | PeopleOps Admin Portal'],
    ['/departments', 'Departments | PeopleOps Admin Portal'],
    ['/roles', 'Roles | PeopleOps Admin Portal'],
    ['/reports', 'Reports | PeopleOps Admin Portal'],
    ['/unknown', 'Page Not Found | PeopleOps Admin Portal'],
  ])('sets the document title for %s', (path, expectedTitle) => {
    renderHook(() => useRouteDocumentTitle(), {
      wrapper: createWrapper(path),
    })

    expect(document.title).toBe(expectedTitle)
  })

  it('returns the dashboard title for the root redirect route', () => {
    expect(getRouteDocumentTitle('/')).toBe(
      'Dashboard | PeopleOps Admin Portal',
    )
  })
})
