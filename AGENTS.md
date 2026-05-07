# AGENTS.md

## Project Name

PeopleOps Admin Portal

## Project Goal

Build a modern, responsive, front-end-only admin dashboard for a People Operations / HR management platform.

The project should look like a professional enterprise SaaS product and should be suitable for a GitHub portfolio.

## Main Requirements

- React
- TypeScript
- Vite
- React Router
- SCSS
- Front-end only
- No real backend
- Mock data and mock service layer
- Clean feature-based architecture
- Reusable UI components
- Responsive dashboard layout
- Enterprise-style visual design
- Strong TypeScript usage
- Clear separation between UI, features, services, types, data and app-level state

## Current Implemented Features

- Dashboard overview page
- Employees page with table, filtering, sorting and detail panel
- Departments page
- Roles page
- Reports page
- React Router route structure
- Mock service layer
- Loading and error states
- Reusable UI components
- Reusable DataTable component
- App-level UI context
- Sidebar collapse / expand state
- Light / dark theme toggle
- Theme persistence with localStorage
- SCSS architecture with global, layout, UI and feature-level styles

## Visual Style

The design should be professional, premium, corporate and minimal.

Preferred style:

- Clean dashboard layout
- Sidebar navigation
- Top header
- Cards
- Tables
- Filters
- Subtle shadows
- Modern spacing
- Responsive behavior
- Blue / neutral color palette
- Clear information hierarchy
- Polished enterprise SaaS appearance

Avoid:

- Playful styling
- Overly colorful UI
- Messy folder structure
- Putting everything in App.tsx
- Unnecessary dependencies
- Backend implementation at this stage
- Adding unrelated styles to global stylesheets

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
  types/
  utils/
```

## Architecture Rules

- Keep app-level composition minimal.
- Keep feature-specific code inside the relevant feature folder.
- Keep reusable UI components inside `src/components/ui`.
- Keep layout components inside `src/components/layout`.
- Keep app-level context inside `src/context`.
- Keep shared custom hooks inside `src/hooks`.
- Keep feature-specific hooks inside the relevant feature folder.
- Keep mock data inside `src/data`.
- Keep mock data access inside `src/services`.
- Keep TypeScript domain types inside `src/types`.
- Do not import mock data directly into UI components when a service exists for that data.
- Do not add backend code.
- Do not add global state management unless there is a clear app-level need.

## State Management Rules

- Use local component state for simple UI state.
- Use `useReducer` for feature-level state with multiple related fields, such as filters, sorting and search.
- Use React Context only for app-level UI state, such as theme mode and sidebar collapse state.
- Do not use Context for server/mock data that belongs to feature pages.
- Do not introduce Redux, Zustand or other state libraries unless explicitly requested.

## Styling Architecture

- Use SCSS, not plain CSS.
- Keep global styles in `src/styles`.
- Keep base/theme/accessibility styles in `src/styles/base` and `src/styles/utilities`.
- Keep layout styles in `src/components/layout/layout.scss` unless a layout component becomes large enough to deserve its own SCSS file.
- Keep reusable UI styles in `src/components/ui/ui.scss` unless a component becomes large enough to deserve its own SCSS file.
- Keep feature page styles colocated with their feature page.
- Name feature page styles after the page component, for example `DashboardPage.scss`.
- Avoid adding unrelated styles to a global stylesheet.
- Prefer `rem` for spacing, font sizes and layout dimensions.
- Keep `1px` borders as `px`.
- Use modern Sass `@use` syntax for global partials.
- Keep responsive styles close to the component or feature they affect.
- Preserve the existing corporate, minimal and premium visual style.

## TypeScript Rules

- Use named exports for components and utilities where appropriate.
- Use `export const ComponentName = () => {}` for React components.
- Use explicit types for domain models.
- Keep TypeScript domain types inside `src/types`.
- Keep component-specific props/types close to the component, for example `ComponentName.types.ts`.
- Use `import type` for imports that are only used as TypeScript types.
- Prefer readable types over overly clever abstractions.
- Keep component props typed.
- Avoid `any`.
- Do not over-engineer generic components.
- Use generics only when they improve reusability and type safety, such as reusable table components.
- Order component props consistently:
  - data/content props first
  - state/selected/active props next
  - config/variant props next
  - callback props such as `onClick`, `onChange`, `onSelect` last

## Import Rules

- Organize imports consistently in React and TypeScript files.
- Use this import order:
  1. React and third-party imports
  2. Shared app imports using `@/`
  3. Type-only imports using `import type`
  4. Local relative imports
  5. SCSS/style imports last
- Keep SCSS imports as the final import group in component files.
- Separate import groups with a blank line.
- Prefer `@/` path aliases over deep relative imports when importing from shared app layers.
- Use local relative imports for files that belong to the same feature or component folder.
- Do not create a global `src/index.ts` barrel file.
- Barrel exports are allowed for focused public APIs such as `src/components/ui/index.ts`.

## Development Rules

- Make small, incremental changes.
- Keep the app running after every change.
- Prefer readable code over clever code.
- Avoid unnecessary dependencies.
- Do not remove existing config unless necessary.
- Do not install packages without a clear reason.
- Do not introduce unrelated changes.
- Keep components focused and reusable.
- After each major change, explain what files were changed and why.

## Commands

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

Run tests:

```bash
npm run test:run
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Definition of Done

A task is considered done when:

- The app still compiles successfully.
- TypeScript errors are resolved.
- Linting passes successfully.
- Tests pass successfully.
- Production build completes successfully.
- The UI works in the browser.
- Existing routes still work.
- Existing feature behavior is not broken.
- The change is small and easy to review.
- Unrelated files are not modified.
- Styling follows the SCSS architecture rules.
- The implementation follows the folder structure and visual style described above.

## Codex Instruction

Before making changes, read this file and follow the project rules.

When implementing a task:

- Keep the change small.
- Explain what files were changed.
- Do not introduce unrelated changes.
- Do not install packages unless explicitly requested.
- Keep the project compiling.
- Prefer refactoring existing patterns over creating duplicate patterns.