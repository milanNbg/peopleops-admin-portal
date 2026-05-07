import type { Department } from '@/types/department'

export const departments: Department[] = [
  {
    headcount: 72,
    id: 'dept-engineering',
    lead: 'Nina Patel',
    location: 'North America',
    name: 'Engineering',
    openRoles: 7,
    status: 'Hiring',
  },
  {
    headcount: 38,
    id: 'dept-sales',
    lead: 'Owen Brooks',
    location: 'North America',
    name: 'Sales',
    openRoles: 4,
    status: 'Hiring',
  },
  {
    headcount: 31,
    id: 'dept-customer-success',
    lead: 'Avery Stone',
    location: 'Distributed',
    name: 'Customer Success',
    openRoles: 3,
    status: 'Active',
  },
  {
    headcount: 24,
    id: 'dept-people',
    lead: 'Lena Ortiz',
    location: 'United States',
    name: 'People',
    openRoles: 1,
    status: 'Active',
  },
  {
    headcount: 18,
    id: 'dept-finance',
    lead: 'Maya Chen',
    location: 'United States',
    name: 'Finance',
    openRoles: 0,
    status: 'Planning',
  },
]
