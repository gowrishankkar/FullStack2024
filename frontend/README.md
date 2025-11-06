# Frontend Overview

FullStack2024 ships with a React 18 single-page application bootstrapped using Vite. The app consumes the Node/Express API, renders ecommerce flows, and persists client state with Redux Toolkit. This document explains project setup, environment configuration, architecture, and key commands so contributors can iterate quickly.

- [Frontend Overview](#frontend-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [State Management](#state-management)
- [UI & Theming](#ui--theming)
- [API Integration](#api-integration)
- [Testing Guidelines](#testing-guidelines)
- [Performance Tips](#performance-tips)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js** ≥ 18.x (aligns with backend runtime)
- **npm** ≥ 9.x (Yarn or pnpm also work, adjust commands accordingly)
- A running backend API (local or deployed) exposing the routes defined in the project report
- Optional: Razorpay test keys for verifying checkout sandbox flows

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

- Vite serves the app at `http://localhost:5173` by default.
- The proxy/API base URL is configured via the `REACT_APP_API_URL` variable described below.

## Environment Variables

Create a `.env.local` (ignored by git) at the frontend root. Example values:

```bash
REACT_APP_API_URL=https://localhost:3000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_********************************
```

| Variable | Description |
| --- | --- |
| `REACT_APP_API_URL` | Base URL for REST endpoints (auth, products, cart, bookings, etc.). |
| `REACT_APP_RAZORPAY_KEY_ID` | Frontend key for initializing Razorpay Checkout in sandbox or production. |

## Available Scripts

```bash
npm run dev      # Launch Vite dev server with HMR
npm run build    # Generate production bundle in dist/
npm run preview  # Serve built assets locally for smoke testing
npm run lint     # Run ESLint using project rules (if configured)
```

## Project Structure

```
frontend/
├── public/                  # Static assets served as-is
├── src/
│   ├── App.jsx              # Root component and router definitions
│   ├── main.jsx             # Entry point wiring React, Redux, Router
│   ├── assets/              # Images, icons, logos
│   ├── components/          # Reusable UI widgets (NavBar, Logo, etc.)
│   ├── contexts/            # React context providers (AuthProvider, PaginationProvider)
│   ├── pages/               # Route-level components (Home, Cart, ProductDetails...)
│   ├── redux/               # Redux Toolkit store and slices
│   ├── theme/               # Global styles, MUI theme customizations
│   ├── utility/             # Helper functions used across components
│   └── urlConfig.js         # Centralized API endpoint definitions
├── package.json
└── vite.config.js
```

## Routing

- React Router v6 handles in-app navigation. Routes live in `App.jsx`.
- Protected screens wrap inside `<RequireAuth>` which checks auth state.
- Key routes:
	- `/` – Home (product listing & filters)
	- `/product/:id` – Product details page
	- `/cart` – Shopping cart (requires login)
	- `/bookings` – Order history and booking management
	- `/user` – Profile settings and saved data
	- `/login` and `/signup` – Auth flows
	- Catchall `*` route renders `PageNotFound` for unknown paths

## State Management

- Redux Toolkit store is configured in `redux/store.js` with `redux-persist` to retain cart/auth state across reloads.
- `cartSlice.js` tracks cart items, quantity, and totals; other slices can be added as features expand.
- `AuthProvider` supplies context for user session management, bridging JWT authentication with UI state.

## UI & Theming

- Material UI (MUI) v5 provides the component library.
- Global themes live in `theme/` and are configured via `createTheme` in `App.jsx`.
- Additional styling comes from CSS modules like `theme/mobileOptimizations.css` and `theme/animations.css` to improve responsive behavior.
- The `NavBar` demonstrates MUI AppBar usage, responsive menus, and integration with Redux state.

## API Integration

- All network requests reference `src/urlConfig.js` to avoid hardcoding endpoints.
- `axios` calls attach JWT tokens via interceptors defined in the auth context; ensure tokens are refreshed or cleared on logout.
- Payment flows rely on Razorpay Checkout; ensure the backend is returning signed order IDs before invoking the widget.

## Testing Guidelines

- Unit tests can be added using Jest and React Testing Library (not yet scaffolded). Suggested targets:
	- Utility helpers (`utility/basicOps.js`)
	- Component rendering (NavBar, ProductList)
	- Auth context flows (mock JWT/token states)
- Use Cypress or Playwright for end-to-end coverage once backend endpoints stabilize.

## Performance Tips

- Leverage code splitting with `React.lazy` for large route components (future optimization).
- Monitor bundle size via `npm run build -- --stats` to spot growth.
- Memoize expensive selectors or derived data when Redux state becomes more complex.
- Use Lighthouse audits to track Core Web Vitals after significant UI changes.

## Troubleshooting

| Issue | Resolution |
| --- | --- |
| API calls return 401 | Confirm backend is reachable and JWT token is stored in local storage via AuthProvider. |
| Razorpay modal fails to open | Verify `REACT_APP_RAZORPAY_KEY_ID` and ensure backend order creation returns `id`, `amount`, `currency`. |
| Styles not applied | Check `CssBaseline` import and theme provider wrapper in `App.jsx`. |
| Persisted Redux state stale | Clear local storage or adjust `redux-persist` version key when changing store shape. |

For additional context—architecture diagrams, DocX exports, and security guidelines—see the root-level documentation (`Ecommerce_Project_Report.md` and related artifacts).
