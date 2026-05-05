export type NavigationItem = {
  href: string
  isActive?: boolean
  label: string
}

export const navigationItems: NavigationItem[] = [
  { href: '#dashboard', isActive: true, label: 'Dashboard' },
  { href: '#dashboard', label: 'Employees' },
  { href: '#dashboard', label: 'Departments' },
  { href: '#dashboard', label: 'Roles' },
  { href: '#dashboard', label: 'Reports' },
]
