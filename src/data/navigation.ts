export type NavigationItem = {
  label: string
  path: string
  shortLabel: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard', shortLabel: 'DB' },
  { label: 'Employees', path: '/employees', shortLabel: 'EMP' },
  { label: 'Departments', path: '/departments', shortLabel: 'DEP' },
  { label: 'Roles', path: '/roles', shortLabel: 'ROL' },
  { label: 'Reports', path: '/reports', shortLabel: 'REP' },
]
