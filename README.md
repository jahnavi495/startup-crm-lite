# 🚀 Startup CRM Lite

<div align="center">

**A production-grade, full-stack Sales Pipeline & CRM Dashboard for early-stage startups and solo sales teams.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)
![Deployed on Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E?logo=railway&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Vision & Objectives](#-vision--objectives)
4. [Key Features](#-key-features)
5. [Target Users](#-target-users)
6. [Business Value](#-business-value)
7. [System Architecture](#-system-architecture)
8. [Application Workflow](#-application-workflow)
9. [Technology Stack](#-technology-stack)
10. [Project Folder Structure](#-project-folder-structure)
11. [Frontend Architecture](#-frontend-architecture)
12. [Backend Architecture](#-backend-architecture)
13. [Database Architecture](#-database-architecture)
14. [API Reference](#-api-reference)
15. [Authentication & Authorization](#-authentication--authorization)
16. [State Management](#-state-management)
17. [Third-Party Services & Integrations](#-third-party-services--integrations)
18. [Development Prerequisites](#-development-prerequisites)
19. [Installation Guide](#-installation-guide)
20. [Environment Variables](#-environment-variables)
21. [Running Locally](#-running-locally)
22. [Deployment Guide](#-deployment-guide)
23. [Security Considerations](#-security-considerations)
24. [Performance Optimizations](#-performance-optimizations)
25. [Coding Standards & Conventions](#-coding-standards--conventions)
26. [Known Limitations](#-known-limitations)
27. [Future Roadmap](#-future-roadmap)
28. [Troubleshooting Guide](#-troubleshooting-guide)
29. [Changelog](#-changelog)
30. [License](#-license)
31. [Credits & Acknowledgements](#-credits--acknowledgements)

---

## 🌟 Project Overview

**Startup CRM Lite** is a modern, full-stack Customer Relationship Management (CRM) application purpose-built for early-stage startups, freelancers, and small sales teams who need a powerful yet lightweight pipeline management tool.

It provides a complete sales workflow — from lead capture and multi-stage pipeline tracking to advanced analytics dashboards with revenue forecasting — all wrapped in a premium dark-mode-capable UI.

The system is composed of two independent but tightly integrated services:

- **Frontend** — A React 19 + Vite single-page application deployed on Vercel, delivering a premium, responsive, glassmorphism-styled dashboard.
- **Backend** — A Node.js + Express 5 REST API deployed on Railway, backed by MongoDB Atlas for persistent data storage.

---

## 🧩 Problem Statement

Early-stage startups and small sales teams often face a painful dilemma: enterprise CRM tools like Salesforce or HubSpot are prohibitively expensive and overly complex, while generic spreadsheets and task management tools are too primitive to surface meaningful sales intelligence.

The gap results in:

- Leads falling through the cracks with no structured pipeline.
- Zero visibility into team conversion rates, pipeline velocity, or revenue trends.
- Manual, error-prone tracking that consumes hours every week.
- No actionable insights to guide strategic decisions.

---

## 🎯 Vision & Objectives

Startup CRM Lite was built around the following core objectives:

| Objective | Implementation |
|---|---|
| Zero friction pipeline management | 8-stage visual pipeline with inline status updates |
| Real-time sales intelligence | 14 analytics chart components powered by live data |
| Security-first architecture | JWT auth, bcrypt hashing, rate limiting, Helmet, mongo sanitization |
| Developer-friendly codebase | Feature-sliced folder structure, clean separation of concerns |
| Production deployment ready | Vercel (frontend) + Railway (backend) + MongoDB Atlas |
| Device-agnostic experience | Fully responsive across mobile, tablet, and desktop |

---

## ✨ Key Features

### Sales Pipeline Management
- **8 Pipeline Stages** — New → Contacted → Qualified → Meeting Scheduled → Proposal Sent → Negotiation → Won → Lost
- **Full Lead CRUD** — Create, read, update, and delete leads with rich contact information
- **Quick Status Updates** — Single-click inline status transitions directly from the lead table
- **Advanced Filtering** — Filter leads by status, acquisition source, date range, and free-text search across name, company, and email
- **Sortable Table** — Server-side sorting by any column with direction toggle
- **Server-Side Pagination** — Scalable pagination (default 20 leads per page) with full page count metadata

### Analytics Dashboard
- **6 KPI Summary Cards** — Total Leads, Conversion Rate, Pipeline Value, Won Revenue, Avg. Sales Cycle, Lost Rate — all with period comparison trend indicators
- **14 Chart Components** — Status doughnut, funnel conversion, monthly bar, conversion trend line, revenue area, lead source horizontal bar, activity heatmap, top performers leaderboard, sales velocity card, and revenue forecast card
- **Flexible Time Filters** — Last 7 Days, Last 30 Days, Last 90 Days, This Year, All Time, and Custom Date Range
- **Skeleton Loading Animation** — Premium skeleton pulse animation on filter transitions

### Authentication System
- **Secure Registration & Login** — Email/password authentication with bcrypt hashing and JWT tokens
- **Auto Session Restoration** — Persists sessions across browser refreshes via localStorage
- **Route Guards** — ProtectedRoute and PublicOnly components prevent unauthorized access
- **Profile Management** — Update display name and change password with old password verification
- **Welcome Emails** — Transactional email on successful registration via Resend API

### User Experience
- **Dark Mode** — System-aware dark/light mode toggle persisted per user
- **Currency Selection** — Toggle between INR (₹) and USD ($) persisted per user email
- **In-App Notifications** — Action-triggered notification history with unread counts
- **Swipe-to-Dismiss Toasts** — Mobile-friendly draggable toast notifications
- **Premium Splash Loader** — Multi-ring animated logo loader on first app load
- **Responsive Design** — Adaptive sidebar, collapsible mobile navbar, responsive grid layouts
- **Empty States** — Illustrated, context-aware empty state components for all sections

---

## 👥 Target Users

| User Type | How They Use It |
|---|---|
| **Solo Founder** | Tracks their own sales pipeline without paying for enterprise tools |
| **Small Sales Team** | Each rep manages their own leads with full isolation between accounts |
| **Freelancer** | Tracks client opportunities and deal stages across projects |
| **Startup Sales Lead** | Gets pipeline overview, conversion metrics, and forecasting |
| **Developer / Open Source Contributor** | Uses as a full-stack reference implementation or starting point |

---

## 💼 Business Value

- **Cost** — Free and open-source; no per-seat licensing fees
- **Speed** — New teams can be productive within minutes of setup
- **Insight** — Revenue forecasts, sales velocity, and conversion trends replace manual reporting
- **Scale** — MongoDB Atlas scales horizontally as the lead volume grows
- **Security** — Production hardened with JWT, Helmet, rate limiting, and NoSQL injection protection
- **Ownership** — Self-hostable; your data stays in your own MongoDB Atlas cluster

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    🖥️  Browser (Client)                      │
│         React 19 SPA · Vite · Hash-based Routing            │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS · Authorization: Bearer JWT
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              🚂  Railway — Express 5 REST API               │
│  Helmet · CORS · Rate Limiter · Mongo Sanitizer · Morgan    │
│               JWT protect middleware (auth.js)              │
│      Auth Controller          Lead Controller               │
└───────────────────────┬─────────────────────────────────────┘
                        │ Mongoose ODM
                        ▼
┌─────────────────────────────────────────────────────────────┐
│               🍃  MongoDB Atlas (Cloud)                      │
│       users collection · leads collection · otps            │
└─────────────────────────────────────────────────────────────┘
                        │ Async fire-and-forget
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   📧  Resend API                             │
│         Transactional emails (welcome, password reset)       │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Application Workflow

### Login & Session Restore

1. Browser opens the app URL.
2. Frontend checks `localStorage` for a stored JWT token (`crm-token`).
3. If a token exists, `AuthContext` calls `GET /api/auth/profile` to validate and restore the session.
4. If the token is valid, the user is redirected to the Dashboard.
5. If no token exists or the token is expired/invalid, the user is redirected to `/login`.

### Lead Lifecycle

1. User creates a lead with name, company, email, deal value, source, and notes.
2. Lead is saved to MongoDB with `owner: req.user._id` for multi-tenant isolation.
3. Lead appears in the pipeline table and is immediately reflected in analytics.
4. User progresses the lead through pipeline stages via inline status updates.
5. When marked Won or Lost, the lead is excluded from the active pipeline value calculation.

### Analytics Data Flow

1. `LeadContext` fetches all leads for the user from the API on login.
2. `useAnalytics` hook filters the in-memory leads array based on the selected date range.
3. Pure helper functions in `analyticsHelpers.js` compute all chart data and KPI metrics.
4. All computations are memoized with `useMemo()` — recalculate only when leads or filter changes.
5. Results are passed as props to 14 individual chart components.

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI component framework |
| Vite | 8.x | Build tool and dev server |
| React Router DOM | 7.x | Client-side Hash-based routing |
| TailwindCSS | 4.x | Utility-first CSS framework |
| Recharts | 3.x | SVG-based chart components |
| Framer Motion | 12.x | Animation and micro-interactions |
| Lucide React | 1.x | Icon library |
| React Hot Toast | 2.x | Toast notification system |
| Axios | 1.x | HTTP client with interceptors |
| React Three Fiber | 9.x | 3D rendering (splash/loader effects) |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 24.x | JavaScript runtime |
| Express | 5.x | Web application framework |
| Mongoose | 9.x | MongoDB ODM with schema validation |
| jsonwebtoken | 9.x | Stateless JWT authentication |
| bcryptjs | 3.x | Password hashing |
| Helmet | 8.x | HTTP security headers |
| express-rate-limit | 8.x | API rate limiting |
| express-validator | 7.x | Input validation and sanitization |
| Morgan | 1.x | HTTP request logging |
| CORS | 2.x | Cross-origin request handling |
| dotenv | 17.x | Environment variable management |
| Nodemon | 3.x | Dev auto-restart (devDependency) |

### Infrastructure & Deployment

| Service | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted database with managed scaling and backups |
| Vercel | Frontend SPA hosting with CDN edge delivery |
| Railway | Backend Node.js hosting with auto-deploy from Git |
| Resend API | Transactional email delivery |
| GitHub | Source control and deployment trigger |

---

## 📁 Project Folder Structure

```
startup-crm-lite/
│
├── backend/                           # Node.js / Express API (deployed on Railway)
│   ├── config/
│   │   └── database.js                # MongoDB Atlas connection logic
│   ├── controllers/
│   │   ├── authController.js          # register, login, getProfile, updateProfile, logout
│   │   └── leadController.js          # CRUD, filtering, search, stats, pagination
│   ├── middleware/
│   │   ├── auth.js                    # JWT Bearer token verification (protect guard)
│   │   ├── errorHandler.js            # Centralized error response formatter
│   │   └── validate.js                # express-validator result checker
│   ├── models/
│   │   ├── User.js                    # User schema: name, email, bcrypt password, role
│   │   ├── Lead.js                    # Lead schema: 8 stages, 9 sources, owner ref
│   │   └── Otp.js                     # OTP schema with TTL auto-expiry index
│   ├── routes/
│   │   ├── authRoutes.js              # Auth route definitions with validation
│   │   └── leadRoutes.js              # Lead route definitions (all protected)
│   ├── utils/
│   │   ├── apiResponse.js             # successResponse / errorResponse helpers
│   │   └── email.js                   # Resend API email templates
│   ├── .env                           # Backend secrets (never committed)
│   ├── .env.example                   # Template for required environment variables
│   └── server.js                      # Express app: middleware stack, routes, server init
│
├── src/                               # React / Vite frontend (deployed on Vercel)
│   ├── assets/                        # Static images and SVG assets
│   ├── components/
│   │   ├── analytics/                 # 14 chart and KPI card components
│   │   │   ├── ActivityHeatmap.jsx    # Lead activity calendar heatmap
│   │   │   ├── AnalyticsFilters.jsx   # Date range filter toolbar
│   │   │   ├── BarChartCard.jsx       # Monthly lead count bar chart
│   │   │   ├── EmptyAnalyticsState.jsx# Empty state for zero-data scenarios
│   │   │   ├── ForecastCard.jsx       # Revenue forecast projection widget
│   │   │   ├── FunnelChartCard.jsx    # Pipeline conversion funnel chart
│   │   │   ├── LeadSourceChart.jsx    # Acquisition source horizontal bar chart
│   │   │   ├── LineChartCard.jsx      # Conversion rate trend line chart
│   │   │   ├── LoadingSkeleton.jsx    # Skeleton pulse loading placeholder
│   │   │   ├── PieChartCard.jsx       # Lead status doughnut chart
│   │   │   ├── RevenueChartCard.jsx   # Revenue area chart by month
│   │   │   ├── SalesVelocityCard.jsx  # Sales velocity KPI widget
│   │   │   ├── StatsCards.jsx         # 6 KPI summary cards with trend indicators
│   │   │   └── TopPerformersCard.jsx  # Lead owner performance leaderboard
│   │   ├── common/                    # Shared layout and UI primitives
│   │   │   ├── DarkModeToggle.jsx     # Light/dark theme toggle
│   │   │   ├── EmptyState.jsx         # Reusable illustrated empty state
│   │   │   ├── FilterBar.jsx          # Lead table filter and search toolbar
│   │   │   ├── Layout.jsx             # App shell: sidebar + navbar + content
│   │   │   ├── Logo.jsx               # SVG app logo
│   │   │   ├── Navbar.jsx             # Top navigation bar
│   │   │   ├── NotificationDropdown.jsx # Notification bell with history
│   │   │   ├── SearchBar.jsx          # Global search input
│   │   │   ├── ShimmerButton.jsx      # Animated CTA button
│   │   │   └── Sidebar.jsx            # Collapsible navigation sidebar
│   │   ├── dashboard/                 # Dashboard overview widgets
│   │   │   ├── PipelineOverview.jsx   # Pipeline stage breakdown bar
│   │   │   ├── QuickActions.jsx       # Quick action shortcut buttons
│   │   │   ├── RecentLeads.jsx        # Recent lead activity list
│   │   │   └── StatsCard.jsx          # Individual dashboard KPI stat card
│   │   └── leads/                     # Lead management UI
│   │       ├── AddLeadModal.jsx       # Modal wrapper for new lead form
│   │       ├── LeadCard.jsx           # Mobile card view for a single lead
│   │       ├── LeadForm.jsx           # Lead creation / editing form
│   │       ├── LeadTable.jsx          # Desktop sortable paginated table
│   │       └── StatusBadge.jsx        # Colored pipeline status pill
│   ├── constants/
│   │   ├── index.js                   # STATUS_OPTIONS, SOURCE_OPTIONS, STATUS_COLORS
│   │   └── analyticsColors.js         # Chart color palette constants
│   ├── context/
│   │   ├── AuthContext.jsx            # Session state, login, register, logout
│   │   ├── LeadContext.jsx            # Leads CRUD, pagination, notifications, currency
│   │   └── ThemeContext.jsx           # Dark/light theme persisted to localStorage
│   ├── data/                          # Static seed/demo data
│   ├── hooks/
│   │   ├── useAnalytics.js            # Analytics aggregation with date filtering
│   │   ├── useDocumentMetadata.js     # Dynamic document title and meta description
│   │   └── useLocalStorage.js         # Type-safe localStorage get/set hook
│   ├── pages/
│   │   ├── Analytics.jsx              # Full analytics dashboard (14 charts)
│   │   ├── Dashboard.jsx              # Home overview with KPI widgets
│   │   ├── Leads.jsx                  # Full lead management CRUD page
│   │   ├── Login.jsx                  # Authentication login page
│   │   ├── NotFound.jsx               # 404 fallback page
│   │   └── Register.jsx               # New account registration page
│   ├── routes/
│   │   └── index.jsx                  # Route tree, lazy imports, guards
│   ├── services/
│   │   ├── api.js                     # Axios instance, JWT interceptor, error handler
│   │   ├── authService.js             # Auth API calls: login, register, profile
│   │   └── leadService.js             # Lead API calls: CRUD, stats, search
│   ├── utils/
│   │   └── analyticsHelpers.js        # 15+ pure analytics computation functions
│   ├── .env.production                # Production VITE_API_URL (committed, no secrets)
│   ├── App.jsx                        # Root: HashRouter, Toaster, AppRoutes
│   ├── index.css                      # Global CSS, Tailwind, design tokens
│   └── main.jsx                       # React DOM render entry point
│
├── index.html                         # HTML shell with SEO meta and font imports
├── vite.config.js                     # Vite: react plugin, tailwind, dev server
├── eslint.config.js                   # ESLint flat config with react-hooks rules
├── vercel.json                        # Vercel SPA rewrite (all routes → index.html)
├── package.json                       # Frontend dependencies and npm scripts
└── CRM_UI_SYSTEM.md                   # Internal UI design system reference
```

---

## 🖥️ Frontend Architecture

The frontend is a **React 19 Single-Page Application (SPA)** built with Vite.

### Routing

The application uses **Hash-based routing** (`HashRouter`). This ensures compatibility with Vercel static hosting, where all routes serve `index.html` and navigation is handled client-side. All routes are prefixed with `#/` (e.g., `/#/dashboard`, `/#/leads`).

**Route Guards:**
- `ProtectedRoute` — Wraps all authenticated pages. Redirects unauthenticated users to `/login`.
- `PublicOnly` — Wraps Login and Register. Redirects authenticated users to `/dashboard`.

All page components are **lazy-loaded** using `React.lazy()` and `Suspense`. On first app load, a 2-second minimum delay allows the animated splash loader to complete.

### Component Organization

Components are organized by **feature domain**, not by type:

| Directory | Ownership |
|---|---|
| `components/analytics/` | Exclusively consumed by the Analytics page |
| `components/dashboard/` | Overview widgets for the Dashboard page |
| `components/leads/` | Full lead management UI (table, form, card, badge) |
| `components/common/` | Shared infrastructure used across all pages |

### Data Flow

```
REST API → services/*.js → Context Providers → Pages → Components
    ↑                           ↓
    └───────── User mutations ──┘
```

The `LeadContext` is the single source of truth for all lead data. Components never call the API directly — all mutations route through `LeadContext`, which calls `leadService.js`, which uses the configured Axios instance.

---

## 🔧 Backend Architecture

The backend is a **Node.js + Express 5 REST API** with a layered MVC-style architecture.

### Middleware Stack (execution order)

| # | Middleware | Purpose |
|---|---|---|
| 1 | `helmet()` | Sets secure HTTP headers (XSS, CSRF, clickjacking protections) |
| 2 | `mongoSanitizeMiddleware()` | Custom NoSQL injection protection — strips `$` and `.` keys from all inputs |
| 3 | `morgan()` | Request logging (`dev` locally, `combined` in production) |
| 4 | `rateLimit()` | 100 req/15min (general); 10 req/15min (auth routes) |
| 5 | `cors()` | Allows Vercel domains + `localhost:5173`; blocks unknown origins in production |
| 6 | `express.json({ limit: '10kb' })` | JSON body parsing with size cap |
| 7 | `express.urlencoded()` | Form data body parsing |
| 8 | Route handlers | Business logic in controllers |
| 9 | `errorHandler` | Centralized error formatting (Mongoose, JWT, validation errors) |

### Standardized Response Format

All API responses follow a consistent envelope:

```json
// Success
{ "success": true, "message": "...", "data": { ... } }

// Error
{ "success": false, "message": "...", "errors": [ ... ] }
```

---

## 🗄️ Database Architecture

Three MongoDB collections managed via Mongoose:

### `users` Collection

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, 2–50 chars |
| `email` | String | Required, unique, lowercase |
| `password` | String | bcrypt hashed via pre-save hook. Stripped from all JSON outputs |
| `role` | String | `admin` or `user`. Default: `user` |
| `isActive` | Boolean | Default: `true` |

### `leads` Collection

Every lead is owner-scoped. Users can only access leads where `owner === req.user._id`.

| Field | Type | Values / Constraints |
|---|---|---|
| `name` | String | Contact person name, 2–100 chars |
| `company` | String | Required |
| `email` | String | Required, valid format |
| `phone` | String | Optional |
| `value` | Number | Estimated deal size. Default: 0 |
| `status` | String | New, Contacted, Qualified, Meeting Scheduled, Proposal Sent, Negotiation, Won, Lost |
| `source` | String | Website, Referral, LinkedIn, Cold Call, Email Campaign, Facebook, Instagram, Google Ads, Other |
| `notes` | String | Optional, max 1000 chars |
| `owner` | ObjectId | Required, `ref: 'User'` |

**Indexes:** `{ owner, status }`, `{ owner, createdAt }`, `{ owner, name }`, `{ owner, company }`, `{ owner, source }`, `{ email }` — all optimized for the API's most common query patterns.

**Virtuals:** `age` (days since creation), `date` (createdAt as `YYYY-MM-DD`).

### `otps` Collection

Stores short-lived verification states for registration and password reset. A TTL index on `otpExpires` allows MongoDB to automatically delete expired documents.

> **Note:** OTP email verification is deprecated in the current implementation. Registration creates user accounts directly. The collection and infrastructure remain for future re-enablement.

---

## 📡 API Reference

**Production Base URL:** `https://startup-crm-production.up.railway.app`  
**Local Base URL:** `http://localhost:5000`

### Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new account |
| `POST` | `/api/auth/login` | Public | Authenticate and receive JWT |
| `GET` | `/api/auth/profile` | 🔐 | Get logged-in user profile |
| `PUT` | `/api/auth/profile` | 🔐 | Update name or change password |
| `POST` | `/api/auth/logout` | 🔐 | Signal session end |

### Leads (`/api/leads`) — All Protected

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | List leads with filters, sorting, pagination |
| `POST` | `/api/leads` | Create a new lead |
| `GET` | `/api/leads/:id` | Fetch a single lead |
| `PUT` | `/api/leads/:id` | Full update of a lead |
| `DELETE` | `/api/leads/:id` | Delete a lead |
| `PATCH` | `/api/leads/:id/status` | Update pipeline status only |
| `GET` | `/api/leads/stats` | Aggregated pipeline KPIs |
| `GET` | `/api/leads/monthly-stats` | Monthly aggregation (last 6 months) |
| `GET` | `/api/leads/search` | Autocomplete search |

**Query Parameters for `GET /api/leads`:**

| Parameter | Default | Description |
|---|---|---|
| `status` | — | Filter by pipeline stage |
| `source` | — | Filter by acquisition channel |
| `search` | — | Full-text search (name, company, email) |
| `dateFrom` | — | ISO date lower bound |
| `dateTo` | — | ISO date upper bound |
| `sortBy` | `createdAt` | Field to sort by |
| `sortOrder` | `desc` | `asc` or `desc` |
| `page` | `1` | Page number |
| `limit` | `20` | Results per page |

### System Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Root health check |
| `GET` | `/api/health` | Detailed health check with timestamp |

---

## 🔐 Authentication & Authorization

### Token Flow

1. User submits credentials via the Login form.
2. Backend verifies the password hash with `bcrypt.compare()`.
3. On success, a JWT is signed with the user's `_id` and returned.
4. The client stores the JWT in `localStorage` as `crm-token`.
5. The Axios request interceptor in `api.js` automatically injects `Authorization: Bearer <token>` on every subsequent request.
6. On page reload, `AuthContext` calls `GET /api/auth/profile` to restore the session silently.

### `protect` Middleware

Every private endpoint passes through `protect`:
- Extracts the Bearer token from the Authorization header.
- Verifies signature and expiration with `jwt.verify()`.
- Fetches the user from MongoDB by the decoded `id`.
- Attaches the full user document to `req.user`.
- Returns `401` for missing, expired, or tampered tokens.

### Multi-Tenant Data Isolation

Every lead query includes `{ owner: req.user._id }` as a mandatory filter. This is enforced at the controller level — users cannot read or modify another user's leads under any circumstance, even if they know the lead's `_id`.

### Password Security

- Passwords are hashed with bcrypt (10 salt rounds) via a Mongoose `pre('save')` hook.
- The `toJSON()` override strips the `password` field from all outgoing user objects.
- `select('+password')` is used only where comparison is required (login, password change).

---

## 🔄 State Management

The application uses **React Context API** exclusively. No Redux, Zustand, or other external state library is used.

| Context | Responsibility |
|---|---|
| `AuthContext` | Session state (user, token, isAuthenticated), login, register, updateProfile, logout |
| `LeadContext` | In-memory leads array, CRUD, pagination metadata, notifications, currency preference |
| `ThemeContext` | Dark/light mode toggle, persisted to localStorage |

### Analytics Computation

The `useAnalytics` custom hook applies date-range filters to the `LeadContext` leads array and passes filtered leads through 15+ pure functions in `analyticsHelpers.js`. All outputs are wrapped in `useMemo()` — recomputation only occurs when leads or the active filter changes.

---

## 🔗 Third-Party Services & Integrations

### Resend API
Sends transactional emails via `backend/utils/email.js`.

| Trigger | Email Type |
|---|---|
| Successful registration | Welcome / account confirmation email |
| Password changed via profile | Password reset success confirmation |

Email sending is **asynchronous and non-blocking** — failures are logged but never affect the primary API response.

**Required env var:** `RESEND_API_KEY`

### MongoDB Atlas
Production database with auto-scaling, managed backups, and global cluster support. IPv4-first DNS is enforced in `server.js` to prevent connectivity issues on Railway.

### Recharts
All 10 chart types in the Analytics dashboard use Recharts — a composable, responsive chart library built on D3.

---

## 💻 Development Prerequisites

| Requirement | Minimum | Recommended |
|---|---|---|
| Node.js | 18.x | 24.x (project built on v24) |
| npm | 9.x | Latest |
| MongoDB | Atlas free tier | Atlas M0 cluster |
| Git | Any recent | Latest |

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/jahnavi495/startup-crm-lite.git
cd startup-crm-lite
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your values (see [Environment Variables](#-environment-variables)).

### 4. Install Frontend Dependencies

```bash
cd ..
npm install
```

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | ✅ | Port for the Express server | `5000` |
| `NODE_ENV` | ✅ | Runtime mode | `development` |
| `MONGODB_URI` | ✅ | Full MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/crm` |
| `JWT_SECRET` | ✅ | Secret key for signing JWTs. Keep this private and strong. | `a64CharRandomSecret` |
| `JWT_EXPIRES_IN` | ✅ | Token lifetime | `7d` |
| `FRONTEND_URL` | ✅ | Allowed CORS origin (your Vercel URL) | `https://your-app.vercel.app` |
| `RESEND_API_KEY` | ⚠️ Optional | Resend API key for email. App works without it; emails are skipped. | `re_xxxx` |

> **Never commit `backend/.env` to version control.** It is already listed in `backend/.gitignore`.

### Frontend — Environment Files

Vite reads `.env` files from the **project root**, not from `src/`.

| Variable | File | Purpose |
|---|---|---|
| `VITE_API_URL` | `.env.production` (committed) | Production Railway backend URL |
| `VITE_API_URL` | `.env` (root, gitignored) | Local backend override |

For local development, create a `.env` file at the **project root**:

```env
VITE_API_URL=http://localhost:5000
```

If no `VITE_API_URL` is set, the API client falls back to `http://<current-hostname>:5000`.

---

## ▶️ Running Locally

### Start the Backend

```bash
cd backend
npm run dev
```

Starts on `http://localhost:5000` with Nodemon watching for changes.

### Start the Frontend

From the project root:

```bash
npm run dev
```

Opens on `http://localhost:5173`.

> Both terminals must be running simultaneously for the full application to work.

### Available Scripts

**Frontend (project root):**

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production bundle to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

**Backend (`backend/`):**

| Script | Description |
|---|---|
| `npm run dev` | Start with Nodemon (auto-reload) |
| `npm start` | Start for production (`node server.js`) |

---

## 🚀 Deployment Guide

### Frontend — Vercel

1. Connect your GitHub repository to a new Vercel project.
2. **Root Directory:** `/` (project root).
3. **Build Command:** `npm run build`.
4. **Output Directory:** `dist`.
5. The `vercel.json` handles SPA routing — all paths serve `index.html`.
6. Add `VITE_API_URL` in Vercel's environment settings pointing to your Railway URL.

### Backend — Railway

1. Connect your GitHub repository to a new Railway project.
2. Set **Root Directory** to `backend/`.
3. Railway auto-detects Node.js and runs `npm start`.
4. Set all required environment variables in Railway's variable settings.
5. Railway provides a public HTTPS URL — use this as `VITE_API_URL` on Vercel.

### Database — MongoDB Atlas

1. Create a free M0 cluster on [MongoDB Atlas](https://cloud.mongodb.com).
2. Create a database user with readWrite access.
3. Whitelist `0.0.0.0/0` in Network Access (required for Railway's dynamic IPs).
4. Copy the connection string and set it as `MONGODB_URI` in Railway.

---

## 🛡️ Security Considerations

| Concern | Mitigation |
|---|---|
| HTTP header vulnerabilities | `helmet()` — sets CSP, XSS protection, HSTS, and 15+ headers |
| NoSQL injection | Custom middleware strips `$` and `.` keys from all request bodies, queries, and params |
| Brute force / DoS | `express-rate-limit` — 100 req/15min general, 10 req/15min for auth routes |
| Cross-origin attacks | Strict CORS allowlist in production; only Vercel domains and localhost allowed |
| Password exposure | bcrypt with 10 salt rounds; `toJSON()` strips password from all serialized user objects |
| Token tampering | JWTs signed with `JWT_SECRET`; auto-expire after `JWT_EXPIRES_IN` |
| Unauthorized data access | All lead queries scoped by `owner: req.user._id` — multi-tenant isolation enforced at controller level |
| Large payload attacks | `express.json({ limit: '10kb' })` caps request body size |
| IPv6 connectivity | `dns.setDefaultResultOrder('ipv4first')` prevents `ENETUNREACH` on Railway |

---

## ⚡ Performance Optimizations

| Optimization | Implementation |
|---|---|
| Code splitting | All page components lazy-loaded with `React.lazy()` + `Suspense` |
| Memoized analytics | All 15+ aggregation functions wrapped in `useMemo()` |
| Targeted MongoDB indexes | 6 compound indexes cover all common query patterns |
| Client-side filtering | Analytics filtering operates on the in-memory array — no round-trips |
| Toast deduplication | `id: 'global-network-error'` prevents repeated error toasts for the same failure |
| Perceived performance | 450ms skeleton pulse on filter changes gives immediate visual feedback |
| CDN delivery | Vercel serves the built bundle from global edge nodes |
| Font optimization | Google Fonts loaded with `display=swap` to avoid layout shift |

---

## 📐 Coding Standards & Conventions

### Frontend
- Components: **PascalCase** (e.g., `LeadTable.jsx`)
- Custom hooks: **camelCase** with `use` prefix (e.g., `useAnalytics.js`)
- Contexts: **PascalCase** with `Context` suffix (e.g., `AuthContext.jsx`)
- No direct API calls from components — all mutations go through `LeadContext`
- React 19 automatic JSX transform — no `import React` needed

### Backend
- Controller functions: Named ESM exports
- All responses use `successResponse()` or `errorResponse()` helpers — never `res.json()` directly
- All controller catch blocks pass errors to `next(error)` for centralized handling
- Input validation defined in routes, enforced by the `validate` middleware before controllers run
- ES Modules throughout (`"type": "module"` in `package.json`)

---

## ⚠️ Known Limitations

| Limitation | Notes |
|---|---|
| OTP email verification disabled | Users created directly on registration; OTP infrastructure exists for future use |
| No real-time collaboration | Leads are user-scoped; no shared pipelines between accounts |
| No file attachments | Lead records are text-only |
| Role-based UI not implemented | `admin`/`user` roles exist on the schema but are not enforced in the frontend |
| No automated test suite | `mongodb-memory-server` is installed as a devDependency, but no tests are written yet |
| No CI/CD pipeline | Deployments are Git-push triggered via Railway/Vercel integrations; no GitHub Actions |

---

## 🗺️ Future Roadmap

| Feature | Priority |
|---|---|
| Automated API tests (Jest + Supertest) | High |
| Automated UI tests (Vitest + React Testing Library) | High |
| GitHub Actions CI/CD pipeline | High |
| Re-enable OTP email verification | Medium |
| Admin role dashboard | Medium |
| Lead activity timeline / comments history | Medium |
| CSV / Excel import and export | Medium |
| Kanban board view for pipeline stages | Low |
| Team shared pipeline (multi-user ownership) | Low |
| In-app email to leads | Low |
| Webhook integrations (Slack, Zapier) | Low |
| React Native mobile app | Low |

---

## 🔍 Troubleshooting Guide

### "Cannot connect to server" on Login

The frontend cannot reach the backend API.

- Confirm the backend is running (`npm run dev` inside `backend/`).
- Ensure `VITE_API_URL` is set in your root `.env` to `http://localhost:5000`.
- On the deployed app, verify the Railway service is active and the Vercel `VITE_API_URL` env var is correct.

### `SyntaxError: Unexpected token '<<'` in server.js

Git merge conflict markers were left in the file. Search for `<<<<<<<`, `=======`, and `>>>>>>>` in `server.js`, resolve the conflict manually, save, and restart the server.

### "Email already exists" on Registration

A user with that email already exists. Use a different email address or log in.

### "Token has expired"

The JWT in localStorage has passed its expiry. The Axios interceptor automatically clears the token and redirects to login. Simply log in again.

### MongoDB connection fails on startup

- Verify `MONGODB_URI` is correct in `backend/.env`.
- Ensure your IP is whitelisted in MongoDB Atlas Network Access (use `0.0.0.0/0` for Railway).
- Check that the Atlas cluster is active (free tiers pause after 60 days of inactivity).

### `ENETUNREACH` on Railway

Already mitigated in `server.js` with `dns.setDefaultResultOrder('ipv4first')`. Ensure this change is committed and deployed.

---

## 📋 Changelog

### v1.0.0 — Initial Production Release
- Full-stack CRM with 8-stage sales pipeline management
- JWT authentication with persistent session restoration
- 14-component analytics dashboard with flexible date filtering
- Dark mode, currency preference (INR/USD), notification system
- Deployed on Vercel + Railway + MongoDB Atlas

### Post-v1.0 Patches
- Fixed `text-slate-905` typo → `text-slate-900` in Analytics page header
- Fixed pipeline value to exclude Won deals (active pipeline only)
- Fixed `-0%` drop-off display in FunnelChartCard via `Math.max(0, ...)` clamping
- Removed unused `React` import from Analytics.jsx (React 19 automatic JSX transform)
- Resolved backend `server.js` merge conflict (stale `mongoSanitize()` undefined call removed)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Credits & Acknowledgements

| Library / Service | Purpose |
|---|---|
| [React](https://react.dev) | Frontend UI framework |
| [Vite](https://vitejs.dev) | Build toolchain |
| [TailwindCSS](https://tailwindcss.com) | Utility CSS framework |
| [Recharts](https://recharts.org) | Chart components |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Lucide React](https://lucide.dev) | Icon set |
| [React Hot Toast](https://react-hot-toast.com) | Toast notifications |
| [Express](https://expressjs.com) | Backend web framework |
| [Mongoose](https://mongoosejs.com) | MongoDB ODM |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Helmet](https://helmetjs.github.io) | HTTP security headers |
| [Resend](https://resend.com) | Transactional email |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
| [Vercel](https://vercel.com) | Frontend hosting |
| [Railway](https://railway.app) | Backend hosting |

---

<div align="center">

**Built with ❤️ for startup founders who deserve better than spreadsheets.**

[⭐ Star this repo](https://github.com/jahnavi495/startup-crm-lite) · [🐛 Report a Bug](https://github.com/jahnavi495/startup-crm-lite/issues) · [💡 Request a Feature](https://github.com/jahnavi495/startup-crm-lite/issues)

</div>


---

## 📂 Project Architecture

```
startup-crm-lite/
├── backend/                  # Node.js / Express API Server
│   ├── config/               # Database connection settings
│   ├── controllers/          # Request controllers (auth, leads)
│   ├── middleware/           # Authentication guards & error handlers
│   ├── models/               # MongoDB Schemas (User, Lead)
│   ├── routes/               # API route definitions
│   ├── utils/                # Standardized response utilities
│   ├── .env                  # Port, environment, DB URIs, and JWT keys
│   └── server.js             # Main backend server entry point
│
├── src/                      # React / Vite Frontend
│   ├── assets/               # Images and CSS resources
│   ├── components/           # UI elements (common layouts, leads list)
│   ├── constants/            # Global status and source constants
│   ├── context/              # Context providers (auth, leads, theme)
│   ├── data/                 # Sample seed database lists
│   ├── hooks/                # Custom React hooks (e.g. localStorage)
│   ├── pages/                # Primary pages (Dashboard, Leads, Analytics)
│   └── App.jsx               # React core layout router
│
├── package.json              # Frontend package manager configuration
└── vite.config.js            # Vite bundler configurations
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (A local database installation or a MongoDB Atlas Cluster connection URI)

### 2. Backend Setup
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables. Create a `.env` file inside the `backend` directory (a template is provided in `.env`):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/startup-crm
   JWT_SECRET=super_secret_jwt_key_123456_change_me
   JWT_EXPIRE=30d
   ```
4. Start the backend development server (uses `nodemon` for auto-restarts):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Endpoints

### 🔐 Authentication (`/api/auth`)
All request payloads and query responses utilize a standardized JSON template format.
- `POST /api/auth/register` — Registers a new user. Expects `name`, `email`, and `password`.
- `POST /api/auth/login` — Auths credentials. Expects `email` and `password`. Returns JWT token.
- `GET /api/auth/profile` — Retrieves the logged-in user's profile. *(Requires JWT Bearer Token authorization)*

### 📈 Leads Lifecycle (`/api/leads`)
All endpoints are private and require a valid `Authorization: Bearer <token>` header. Actions are strictly scoped to the active authenticated user's records.
- `GET /api/leads` — Retrieves all leads for the current user.
- `POST /api/leads` — Registers a new lead. Requires `name`, `company`, and `email`.
- `GET /api/leads/:id` — Fetches a single lead record.
- `PUT /api/leads/:id` — Modifies fields on a lead (e.g., updates `status` or `value`).
- `DELETE /api/leads/:id` — Removes a lead from the pipeline.
