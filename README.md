# TaskFlow — Friendly Task Management

A warm, approachable task management UI built with React, Vite, Tailwind CSS, and shadcn-style Radix components.

## Tech Stack
- React 18 + Vite (SWC)
- JavaScript (JSX)
- Tailwind CSS + tailwindcss-animate
- Radix UI primitives (shadcn-style components)
- React Router DOM
- TanStack Query (React Query)
- Recharts
- Lucide React icons

## Requirements
- Node.js 18+ (Vite 5 requires Node 18 or newer)
- npm

## Getting Started
1) Install dependencies
```sh
npm install
```

2) Start the dev server
```sh
npm run dev
```
- App runs at: http://localhost:8080 (configured in `vite.config.js`)

3) Build for production
```sh
npm run build
```

4) Preview the production build
```sh
npm run preview
```

5) Lint the project
```sh
npm run lint
```

## Scripts
- dev: `vite`
- build: `vite build`
- build:dev: `vite build --mode development`
- preview: `vite preview`
- lint: `eslint .`

## Path Alias
This project uses an alias for cleaner imports:
- `@` -> `./src`

Example:
```js
import { Button } from "@/components/ui/button";
```

## Project Structure (high level)
- `src/main.jsx` — App bootstrap
- `src/App.jsx` — App shell and routes
- `src/pages/` — Pages: Index, Sprint, Backlog, Reports, NotFound
- `src/components/` — Feature components
- `src/components/ui/` — Reusable UI primitives (Radix-based)
- `src/hooks/` — Custom hooks (`use-toast`, `use-mobile`, etc.)
- `src/lib/` — Utilities (`utils.js`)

## Styling
- Tailwind configured in `tailwind.config.js` and `postcss.config.js`
- Dark mode via `class` strategy
- Inter font loaded in `index.html`

## Toasts
The app uses a Radix-based toaster with a simple toast store.
- Toaster component: `@/components/ui/toaster`
- Hook and API: `@/hooks/use-toast`

Usage example:
```jsx
import { toast } from "@/hooks/use-toast";

function Example() {
  return (
    <button
      onClick={() => toast({ title: "Saved", description: "Your changes are saved." })}
    >
      Save
    </button>
  );
}
```
Ensure `<Toaster />` is rendered in `App.jsx` (it already is).

## Routing
- Configured with React Router DOM in `App.jsx`.
- Update routes inside `<Routes>` as needed.

## Charts
- Recharts is available and a `ChartContainer` helper is provided at `@/components/ui/chart.jsx` to apply themed styles.

## Deployment
This is a standard Vite app. After `npm run build`, deploy the `dist/` folder to your static hosting of choice, or use `npm run preview` to test locally.

## Notes
- Codebase is JavaScript (JSX). Some UI files are adapted from TypeScript sources but compile as JS.
- A minimal toast system (`use-toast`) is implemented to work with the provided Toaster.