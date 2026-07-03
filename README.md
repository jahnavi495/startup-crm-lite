# Startup CRM Lite

Startup CRM Lite is a modern, premium sales pipeline dashboard application. It consists of a React & Vite frontend and a modular Express & MongoDB backend to manage users, authentication, and sales leads.

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
