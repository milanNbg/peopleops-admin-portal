import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoadingState } from '@/components/ui'
import { DashboardPage } from '@/features/dashboard/DashboardPage'

const EmployeesPage = lazy(() =>
  import('@/features/employees/EmployeesPage').then((module) => ({
    default: module.EmployeesPage,
  })),
)

const DepartmentsPage = lazy(() =>
  import('@/features/departments/DepartmentsPage').then((module) => ({
    default: module.DepartmentsPage,
  })),
)

const RolesPage = lazy(() =>
  import('@/features/roles/RolesPage').then((module) => ({
    default: module.RolesPage,
  })),
)

const ReportsPage = lazy(() =>
  import('@/features/reports/ReportsPage').then((module) => ({
    default: module.ReportsPage,
  })),
)

const NotFoundPage = lazy(() =>
  import('@/features/not-found/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
)

export const AppRoutes = () => (
  <Suspense fallback={<LoadingState message="Loading page..." />}>
    <Routes>
      <Route element={<Navigate to="/dashboard" replace />} path="/" />
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<EmployeesPage />} path="/employees" />
      <Route element={<DepartmentsPage />} path="/departments" />
      <Route element={<RolesPage />} path="/roles" />
      <Route element={<ReportsPage />} path="/reports" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  </Suspense>
)
