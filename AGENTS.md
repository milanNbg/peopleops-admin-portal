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
- Front-end only for now
- No real backend
- Use mock data and a mock service layer
- Clean and scalable folder structure
- Modern responsive UI
- Enterprise-style dashboard design
- Reusable components
- Strong TypeScript usage
- Clear separation between UI, features, services, types and data

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

Avoid:

- Playful styling
- Overly colorful UI
- Messy folder structure
- Putting everything in App.tsx
- Unnecessary dependencies
- Backend implementation at this stage

## Suggested Folder Structure

```txt
src/
  assets/
  components/
    layout/
    ui/
  data/
  features/
    dashboard/
    employees/
    departments/
    roles/
  hooks/
  routes/
  services/
  types/
  utils/
```

## Current Tech Stack

- React
- TypeScript
- Vite
- ESLint
- Git & GitHub

## Planned Enhancements

- React Router
- Mock service layer
- Reusable UI components
- Responsive data tables
- Dashboard cards and metrics
- Search and filtering
- Loading, empty and error states
- Unit tests

## Development Rules

- Make small, incremental changes.
- Keep the app running after every change.
- Prefer readable code over clever code.
- Use TypeScript types/interfaces for domain models.
- Avoid unnecessary dependencies.
- Do not add backend code.
- Do not remove existing config unless necessary.
- Do not install packages without a clear reason.
- Do not introduce unrelated changes.
- Keep components focused and reusable.
- Keep feature-specific code inside the relevant feature folder.
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

Build the project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## First Implementation Steps

1. Clean up the default Vite starter code.
2. Create the initial folder structure.
3. Build the main application shell.
4. Add sidebar navigation.
5. Add top header.
6. Add dashboard placeholder page.
7. Add mock data layer.
8. Add feature pages gradually.

## Definition of Done

A task is considered done when:

- The app still compiles successfully.
- TypeScript errors are resolved.
- The UI works in the browser.
- The change is small and easy to review.
- Unrelated files are not modified.
- The implementation follows the folder structure and visual style described above.

## Codex Instruction

Before making changes, read this file and follow the project rules.

When implementing a task:

- Keep the change small.
- Explain what files were changed.
- Do not introduce unrelated changes.
- Do not install packages unless explicitly requested.
- Keep the project compiling.