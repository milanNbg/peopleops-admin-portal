import type { Role, RolePermissionsMatrix } from '@/types/role'

export const roles: Role[] = [
  {
    accessLevel: 'Executive',
    assignedEmployees: 6,
    department: 'Leadership',
    id: 'role-executive-admin',
    lastUpdated: 'Apr 28, 2026',
    name: 'Executive Admin',
    permissionsCount: 42,
    status: 'Active',
  },
  {
    accessLevel: 'Manager',
    assignedEmployees: 18,
    department: 'People',
    id: 'role-people-manager',
    lastUpdated: 'Apr 21, 2026',
    name: 'People Manager',
    permissionsCount: 34,
    status: 'Active',
  },
  {
    accessLevel: 'Manager',
    assignedEmployees: 12,
    department: 'Engineering',
    id: 'role-engineering-lead',
    lastUpdated: 'Mar 30, 2026',
    name: 'Engineering Lead',
    permissionsCount: 29,
    status: 'Review',
  },
  {
    accessLevel: 'Contributor',
    assignedEmployees: 86,
    department: 'All departments',
    id: 'role-employee-self-service',
    lastUpdated: 'Mar 18, 2026',
    name: 'Employee Self-Service',
    permissionsCount: 16,
    status: 'Active',
  },
  {
    accessLevel: 'Support',
    assignedEmployees: 9,
    department: 'Finance',
    id: 'role-payroll-support',
    lastUpdated: 'Feb 26, 2026',
    name: 'Payroll Support',
    permissionsCount: 22,
    status: 'Review',
  },
  {
    accessLevel: 'Contributor',
    assignedEmployees: 0,
    department: 'Customer Success',
    id: 'role-customer-success-analyst',
    lastUpdated: 'Feb 12, 2026',
    name: 'Customer Success Analyst',
    permissionsCount: 14,
    status: 'Draft',
  },
]

export const rolePermissionsMatrix: RolePermissionsMatrix = {
  permissions: [
    {
      description: 'Review core employee profile details and directory records.',
      id: 'employee-records',
      label: 'Employee records',
    },
    {
      description: 'Create, approve and update compensation changes.',
      id: 'compensation',
      label: 'Compensation',
    },
    {
      description: 'Manage department staffing plans and open roles.',
      id: 'workforce-planning',
      label: 'Workforce planning',
    },
    {
      description: 'Access reporting dashboards and export operational reports.',
      id: 'reports',
      label: 'Reports',
    },
    {
      description: 'Update role definitions, permissions and access reviews.',
      id: 'role-management',
      label: 'Role management',
    },
  ],
  roles: roles.map((role) => ({
    id: role.id,
    name: role.name,
  })),
  rows: [
    {
      permissionId: 'employee-records',
      roleAccess: {
        'role-customer-success-analyst': 'View',
        'role-employee-self-service': 'View',
        'role-engineering-lead': 'Manage',
        'role-executive-admin': 'Full',
        'role-payroll-support': 'View',
        'role-people-manager': 'Manage',
      },
    },
    {
      permissionId: 'compensation',
      roleAccess: {
        'role-customer-success-analyst': 'None',
        'role-employee-self-service': 'None',
        'role-engineering-lead': 'View',
        'role-executive-admin': 'Full',
        'role-payroll-support': 'Manage',
        'role-people-manager': 'Manage',
      },
    },
    {
      permissionId: 'workforce-planning',
      roleAccess: {
        'role-customer-success-analyst': 'View',
        'role-employee-self-service': 'None',
        'role-engineering-lead': 'Manage',
        'role-executive-admin': 'Full',
        'role-payroll-support': 'View',
        'role-people-manager': 'Manage',
      },
    },
    {
      permissionId: 'reports',
      roleAccess: {
        'role-customer-success-analyst': 'View',
        'role-employee-self-service': 'None',
        'role-engineering-lead': 'View',
        'role-executive-admin': 'Full',
        'role-payroll-support': 'Manage',
        'role-people-manager': 'Manage',
      },
    },
    {
      permissionId: 'role-management',
      roleAccess: {
        'role-customer-success-analyst': 'None',
        'role-employee-self-service': 'None',
        'role-engineering-lead': 'View',
        'role-executive-admin': 'Full',
        'role-payroll-support': 'None',
        'role-people-manager': 'Manage',
      },
    },
  ],
}
