# PeopleOps Admin Portal Case Study

## Project Overview

PeopleOps Admin Portal is a front-end-only React application that models an enterprise People Operations dashboard. It is designed as a portfolio project that demonstrates application structure, TypeScript usage, responsive UI engineering, accessible navigation patterns, testing discipline and production deployment.

The product experience centers on common HR admin workflows: reviewing workforce metrics, browsing employees, inspecting department staffing needs, understanding role permissions and managing generated reports.

## Project Goal

The goal was to build a realistic SaaS-style admin interface without relying on a backend. The project prioritizes maintainable architecture, predictable state management, professional visual polish and testable user-facing behavior over broad feature volume.

## Tech Stack

- React and TypeScript for the application layer.
- Vite for development and production builds.
- React Router for routing, redirects, unknown-route handling and route-level lazy loading.
- SCSS for theme tokens, layout styles, reusable UI styles and feature-level responsive design.
- Vitest and React Testing Library for unit and component tests.
- Playwright for focused end-to-end smoke tests.
- GitHub Actions for CI validation.
- Vercel for production deployment.

## Architecture Decisions

The application uses a feature-based structure so each major page owns its page-specific components, hooks and styles. Shared layout components live in `src/components/layout`, reusable UI primitives live in `src/components/ui`, app-level context lives in `src/context`, root provider composition lives in `src/providers`, mock services live in `src/services` and domain types live in `src/types`.

This keeps the codebase easy to scan: reusable pieces are separated from feature-specific workflows, while each page remains close to the components that only it uses.

## Feature-Based Folder Structure

The main feature folders are:

- `dashboard` for workforce overview, metrics and trend visualization.
- `employees` for filtering, sorting, pagination, URL query state, CSV export and employee detail inspection.
- `departments` for staffing insights and department detail panels.
- `roles` for role summaries and the permissions matrix.
- `reports` for report overview, detail panels and CSV download.
- `not-found` for the unknown route experience.

Reusable UI components follow a folder-per-component structure with focused `index.ts` exports. This keeps component APIs discoverable without creating a large global barrel.

## Mock Data And Service Layer

The app is intentionally front-end only. Mock data is stored in `src/data`, and feature pages load it through service functions in `src/services`. This service layer simulates asynchronous data access and keeps pages from importing mock data directly.

That separation makes the UI code resemble a real application boundary: replacing mock services with API-backed services later would not require rewriting feature components.

## Employees Page As The Main Complex Workflow

The Employees page is the most workflow-heavy area of the app. It combines:

- Debounced search.
- Department and status filters.
- Sorting.
- URL-synced query parameters.
- Active filter chips and clear filters behavior.
- Client-side pagination and page-size controls.
- Selected employee detail panel.
- CSV export for the full filtered and sorted result set.
- Empty, loading and error states.

State is managed with a feature-specific reducer and hook so related filter fields remain predictable. The selected detail panel is kept in sync with the current visible results, which prevents stale details from staying open when search, filters or pagination move the employee out of view.

## Dashboard, Roles, Departments And Reports Highlights

The Dashboard page presents summary metrics, workforce overview data, recent activity, department summaries and an accessible workforce trend visualization.

The Roles page includes a permissions matrix that uses accessible table semantics and remains horizontally scrollable on smaller screens where that pattern is more usable than collapsing the matrix.

The Departments page adds staffing insights and a detail panel with operational metadata such as lead, headcount, open roles, region, staffing status and hiring priority.

The Reports page models a lightweight report catalog with generated report metadata, detail inspection and a client-side CSV download action.

## State Management Approach

State management is intentionally lightweight:

- Local component state handles simple UI state such as selected detail rows.
- `useReducer` handles related feature-level state, especially employee filters and pagination.
- React Context handles app-level UI concerns such as theme mode, sidebar collapse state and toast notifications.
- Mock data remains local to feature pages and is loaded through service functions with reusable async loading helpers.

No external state library is used because the app does not need cross-feature server-state coordination.

## Styling And Responsive UI Approach

Styling uses SCSS with a global entry point, theme tokens, accessibility utilities, layout styles, reusable UI styles and feature-level styles.

The visual design aims for a professional enterprise dashboard feel: restrained color, clear hierarchy, cards, tables, subtle shadows, dark mode support and responsive layouts. Dense data areas use local horizontal scrolling where appropriate, while the Employees table becomes more mobile-friendly with card-like responsive behavior.

The app also includes full-page skeleton states so data-heavy pages feel stable while mock async data is loading.

## Accessibility And Keyboard UX

Accessibility was treated as part of the application architecture rather than an afterthought. The app includes semantic landmarks, a skip-to-content link, accessible navigation labels, active route state, dynamic document titles and keyboard-reachable controls.

The command palette supports Ctrl+K and Cmd+K, focuses the search input when opened, closes with Escape and restores focus to the trigger where practical. Detail panels use clear close button labels, selected rows expose state where useful and toast notifications use a polite live region.

## Testing Strategy

Vitest and React Testing Library cover user-visible behavior across reusable components, app context, routing, async loading states, employee filtering, URL query behavior, CSV export, detail panels, command palette behavior and error boundaries.

Playwright covers primary end-to-end smoke flows such as loading the dashboard, navigating to employees, updating employee filters, reflecting filter state in the URL, toggling theme mode and rendering the Not Found route.

The test strategy avoids snapshots and CSS implementation details, focusing instead on behavior users can observe or interact with.

## CI/CD

GitHub Actions runs CI on pushes and pull requests targeting `main`. The workflow installs dependencies with `npm ci`, runs linting, runs the Vitest suite, builds the production bundle and executes Playwright smoke tests.

The app is deployed on Vercel with SPA fallback behavior preserved, so direct route visits still resolve through the React app.

## Tradeoffs

The project is front-end only by design. That keeps the scope focused on React application engineering, UI architecture, accessibility, responsive design and testing. The tradeoff is that data persistence, authentication, authorization, API error variability and backend validation are represented only as mock workflows.

For a portfolio project, this is intentional: the app demonstrates how a production-style frontend could be structured while keeping the implementation reviewable.

## Possible Future Improvements

- Add API integration behind the existing service layer.
- Add authenticated roles and route protection.
- Add more realistic data validation and mutation flows.
- Add saved views for employee filters.
- Add richer report export formats.
- Add automated Lighthouse checks to CI.
- Expand Playwright coverage for keyboard navigation paths.
