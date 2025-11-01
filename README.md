# FullStack2024

## Overview
- Full-stack ecommerce playground that pairs an Express/MongoDB API with a Vite + React + MUI front end.
- Supports catalog browsing, faceted search, cart management, Razorpay based checkout, user onboarding, and review capture.
- Ships with rate limiting, MongoDB sanitization, cookie-based JWT auth, and email helpers (Nodemailer/SendGrid) for transactional flows.

## Repo Layout
- `app.js`, `router/`, `controllers/`, `models/`, `utility/`: Express REST API and supporting modules.
- `frontend/`: Vite React SPA (Material UI, Redux Toolkit, react-router). Run independently.
- `dev-data.json`: Sample payloads you can seed into Mongo for testing.
- `payments.js`, `nodemailer.js`, `sendGridEmail.js`: Standalone scripts that exercise payment/email integrations.

## Prerequisites
- Node.js 18+ and npm.
- MongoDB instance reachable via connection string.
- Razorpay test keys for checkout demo (optional but required for full booking flow).
- Gmail app password or SendGrid key if you plan to test email helpers.

## Environment Variables
Create a `.env` next to `app.js`.
```
DATABASE=mongodb+srv://...
PORT=3000
EMAIL=example@gmail.com
PASSWORD=app_password_or_smtp_secret
SENDGRID_API=your_sendgrid_key
RAZORPAY_KEY_ID=test_key_id
RAZORPAY_SECRET_KEY=test_secret
WEBHOOK_SECRET=razorpay_webhook_secret
```
> Note: The API currently hardcodes the JWT secret inside `controllers/authController.js`. Replace `SECRET_KEY` with `process.env.JWT_SECRET` before production use.

For the React app, copy `frontend/.env.example` (create one if missing) and define:
```
VITE_BASE_URL=http://localhost:3000
```

## Installation & Running Locally
1. Install backend deps: `npm install` (root).
2. Install frontend deps: `cd frontend && npm install`.
3. Start MongoDB and ensure `DATABASE` is reachable.
4. Launch the API: `npm run dev` (hot reload via nodemon) or `npm start`.
5. In a second terminal: `cd frontend && npm run dev` (Vite on port 5173 by default).
6. Visit `http://localhost:5173` and sign up / log in. The SPA expects the API on `VITE_BASE_URL`.

## Backend Highlights
- Express middleware stack: CORS with credentials, rate limiting (`express-rate-limit`), `express.json`, cookie parsing, and Mongo query sanitization.
- Modular routers:
	- `api/auth`: Sign-up, login, logout, OTP-based reset (`forgetPassword`, `resetPassword`).
	- `api/product`: CRUD, category lookup, filtered search (`filter`, `sort`, `select`, pagination query params), Big Billion Day preset.
	- `api/booking`: Protects endpoints with JWT cookies, issues Razorpay orders, persists bookings, exposes webhook verification.
	- `api/user`: Admin-gated listing plus CRUD operations via generic factories.
	- `api/reviews`: Authenticated review creation with rolling average rating updates.
- Generic CRUD factory (`utility/crudFactory.js`) minimizes boilerplate for model operations.
- Data models (`models/*.js`) capture validation rules for users, products, bookings, and reviews.

### Key API Endpoints
| Method | Path | Description | Auth |
| ------ | ---- | ----------- | ---- |
| POST | `/api/auth/signup` | Create a user; validates duplicate email and confirm password | Open |
| POST | `/api/auth/login` | Issues JWT cookie, returns public user info | Open |
| POST | `/api/auth/forgetPassword` | Generates OTP and emails reset token | Open |
| PATCH | `/api/auth/resetPassword/:userId` | Verifies OTP to change password | Open |
| GET | `/api/auth/logout` | Clears auth cookie | Cookie |
| GET | `/api/product` | Search with `sort`, `select`, `filter`, `limit`, `page` | Optional |
| POST | `/api/product` | Create product via factory | JWT + role (`admin`, `ceo`, `sales`) |
| PATCH | `/api/product/:id` | Update product | JWT (role currently unchecked) |
| DELETE | `/api/product/:id` | Delete product | JWT + role |
| GET | `/api/product/categories` | Static category list | Open |
| GET | `/api/product/bigBillionDay` | Pre-filtered low-stock high-rated deals | Open |
| POST | `/api/booking` | Create booking & Razorpay order, links to user | JWT |
| GET | `/api/booking` | List bookings with populated user/product | JWT |
| GET | `/api/booking/user/:userId` | User-specific bookings sorted by recency | JWT |
| POST | `/api/booking/verify` | Webhook path to confirm payments | Razorpay |
| POST | `/api/reviews/:productId` | Add user review, update product rating | JWT |
| GET | `/api/user` | List all users (admin only) | JWT + admin |
| GET/PATCH/DELETE | `/api/user/:id` | User lookup, update, delete | Mixed |

## Frontend Highlights (`frontend/src`)
- Authenticated SPA using React Router v6, guarded routes through `RequireAuth` wrapper.
- Global auth context backed by `sessionStorage` plus Redux Toolkit slice for cart state (persist-ready with Redux Persist if re-enabled).
- Material UI theming with responsive design tweaks (`theme/`), search suggestions, filter drawer, and pagination context for catalog pages.
- Rich product detail experience (image gallery, share/favorite toggle, accordion specs, embedded reviews, add-to-cart quantity controls).
- Cart page integrates Razorpay Checkout script, shows dynamic pricing summary, tax/shipping calculations, and snackbar feedback.
- Bookings page (see `pages/Bookings.jsx`) pulls authenticated user bookings and renders tickets (PDF via `jspdf` helper if extended).
- Utility modules like `basicOps` handle filtering/sorting/pagination across categories and rating thresholds.

## Development Notes & Known Gaps
- Password hashing is incomplete: `models/userModel.js` computes a hash but never assigns it, and `loginHandler` compares raw strings. Fix before production.
- `controllers/authController.js` should use `bcrypt.compare` and move the JWT secret into env configuration.
- `app.js /search` route references undefined symbols (`Product`, `sortParams`, `selectParams`). Either wire it to `Product` or remove the dead endpoint.
- `bookingRouter` consumes `crypto` without requiring it; add `const crypto = require("crypto");`.
- `models/bookingModel.js` stores `product` as `type: [String]`; convert to `mongoose.Schema.Types.ObjectId` if you need population to work.
- `frontend/src/contexts/AuthProvider.jsx` re-stringifies session data during hydration, resulting in a double-encoded user object.
- `frontend/src/redux/slices/cartSlice.js` does not persist quantity increments for items already in the cart (missing assignment of the computed value).
- Razorpay checkout expects `window.Razorpay`; ensure the script loads before invoking `new Razorpay(...)` or guard the call.
- No automated tests exist (`npm test` stub). Add unit/integration coverage to stabilize future work.

## Helpful Scripts
- `npm run dev` (root): Nodemon-backed API server.
- `npm start` (root): Production-style API start.
- `npm run dev` (`frontend/`): Vite dev server with HMR.
- `npm run build` (`frontend/`): Production bundle.
- `node payments.js`: Standalone Razorpay order demo.
- `node sendGridEmail.js` / `node nodemailer.js`: Email proof-of-concept scripts (ensure env keys are set).

## Seeding & Sample Data
- Import `dev-data.json` into your Mongo cluster for quick bootstrapping (`mongoimport` or custom script).
- Consider creating an admin user manually, then update its `role` to `admin` for protected routes.

## Next Steps (Ideas)
- Harden authentication (hashing, refresh tokens, password policies).
- Add request validators (Joi/Zod) and better error shaping.
- Implement logging (Morgan/Winston) and request tracing.
- Expand unit/integration tests and linting rules.
- Automate frontend/backend start via a root-level concurrently script.

## License
- Currently ISC per `package.json`. Update if project requirements change.