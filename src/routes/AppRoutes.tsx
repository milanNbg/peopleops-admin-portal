import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { DepartmentsPage } from '@/features/departments/DepartmentsPage'
import { EmployeesPage } from '@/features/employees/EmployeesPage'
import { NotFoundPage } from '@/features/not-found/NotFoundPage'
import { ReportsPage } from '@/features/reports/ReportsPage'
import { RolesPage } from '@/features/roles/RolesPage'

export const AppRoutes = () => (
  <Routes>
    <Route element={<Navigate to="/dashboard" replace />} path="/" />
    <Route element={<DashboardPage />} path="/dashboard" />
    <Route element={<EmployeesPage />} path="/employees" />
    <Route element={<DepartmentsPage />} path="/departments" />
    <Route element={<RolesPage />} path="/roles" />
    <Route element={<ReportsPage />} path="/reports" />
    <Route element={<NotFoundPage />} path="*" />
  </Routes>
)
