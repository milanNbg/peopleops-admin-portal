# PeopleOps Admin Portal

[![CI](https://github.com/milanNbg/peopleops-admin-portal/actions/workflows/ci.yml/badge.svg)](https://github.com/milanNbg/peopleops-admin-portal/actions/workflows/ci.yml)

A modern, responsive, front-end-only admin dashboard for People Operations and HR management workflows.

PeopleOps Admin Portal is designed as a portfolio-level React application with a professional enterprise SaaS interface, feature-based architecture, mock service layer and reusable UI patterns.

## Live Demo

View the deployed app: https://peopleops-admin-portal.vercel.app/dashboard

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- SCSS
- ESLint
- Vitest
- React Testing Library
- GitHub Actions

## Features

- Dashboard overview with summary metrics and operational activity.
- Employees page with table-based browsing, filtering, sorting and an employee detail panel.
- Departments overview page with summary cards and department data.
- Roles overview page with role, access and permission information.
- Reports overview page with reporting categories and generated report details.
- Responsive app shell with sidebar navigation and top header.
- Sidebar collapse / expand preference.
- Light and dark theme toggle with localStorage persistence.
- Mock async data flows through a service layer.
- Loading, empty and error states for async mock data flows.
- Reusable UI components including cards, page headers, section headers, status badges and data tables.

## Architecture

The application is front-end only and does not include backend code or real API calls. Data is stored as mock data in `src/data` and accessed through a mock service layer in `src/services`.

The project uses a feature-based structure so each major page keeps its page-specific components, hooks and styles close to the feature. Shared layout components live in `src/components/layout`, reusable UI components live in `src/components/ui`, and domain types live in `src/types`.

State management is intentionally lightweight:

- `useReducer` is used for feature-level state such as employee filtering and sorting.
- React Context is used for app-level UI preferences such as theme mode and sidebar collapsed state.
- Feature data remains local to pages and is loaded through mock services.

Styling uses SCSS with a global entry point in `src/styles`, base/theme/accessibility partials, layout-level styles, reusable UI styles and feature-page styles colocated with their pages.

## Project Structure

```txt
src/
  assets/
  components/
    layout/
    ui/
  context/
  data/
  features/
    dashboard/
    departments/
    employees/
    reports/
    roles/
  hooks/
  routes/
  services/
  styles/
    base/
    utilities/
  test/
  types/
  utils/
```

## Available Scripts

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Run the test suite:

```bash
npm run test:run
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## CI

GitHub Actions runs the project validation workflow on pushes and pull requests targeting `main`.

The CI workflow installs dependencies with `npm ci`, then runs linting, the Vitest test suite and the production build.

## Purpose

This project demonstrates modern React application development with strong TypeScript usage, reusable component architecture, responsive enterprise dashboard design, maintainable SCSS organization, front-end testing and a simple CI workflow.
