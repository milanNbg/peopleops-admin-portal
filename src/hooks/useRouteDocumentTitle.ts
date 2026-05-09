import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getNavigationLabelByPath } from '@/data/navigation'

const appDocumentTitle = 'PeopleOps Admin Portal'

export const getRouteDocumentTitle = (pathname: string) => {
  const normalizedPathname = pathname === '/' ? '/dashboard' : pathname
  const pageTitle =
    getNavigationLabelByPath(normalizedPathname) ?? 'Page Not Found'

  return `${pageTitle} | ${appDocumentTitle}`
}

export const useRouteDocumentTitle = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = getRouteDocumentTitle(pathname)
  }, [pathname])
}
