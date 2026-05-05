export type NavigationItem = {
  label: string
  path: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Employees', path: '/employees' },
  { label: 'Departments', path: '/departments' },
  { label: 'Roles', path: '/roles' },
  { label: 'Reports', path: '/reports' },
]
