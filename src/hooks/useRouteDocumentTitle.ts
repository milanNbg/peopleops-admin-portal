import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const appDocumentTitle = 'PeopleOps Admin Portal'

const routePageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/departments': 'Departments',
  '/employees': 'Employees',
  '/reports': 'Reports',
  '/roles': 'Roles',
}

export const getRouteDocumentTitle = (pathname: string) => {
  const pageTitle = routePageTitles[pathname] ?? 'Page Not Found'

  return `${pageTitle} | ${appDocumentTitle}`
}

export const useRouteDocumentTitle = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = getRouteDocumentTitle(pathname)
  }, [pathname])
}
