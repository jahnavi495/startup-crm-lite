import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { useAuth } from '../context/AuthContext';

// Use React.lazy to import pages asynchronously to split code bundles and speed up initial page load.
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

// A premium visual page loader rendered in place of the page chunk until the lazy import resolves.
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen w-full py-20 animate-fade-in" aria-label="Loading page">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * ProtectedRoute Component
 * Gatekeeper component that intercepts unauthorized page queries.
 * Prevents flashing by displaying a visual loader during active session restoration.
 */
const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  // If there is no authentication token, redirect the client to the login layout
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Render nested child structures
  return <Outlet />;
};

/**
 * Shell layout that wraps the three CRM experience pages.
 */
const AppShell = () => (
  <Layout>
    <Outlet />
  </Layout>
);

/**
 * AppRoutes Component
 * Defines the route tree for the Startup CRM Lite product.
 * - public: '/login', '/register'
 * - private: '/', '/leads', '/analytics', '*'
 */
export const AppRoutes = () => {
  return (
    // Suspense keeps the app responsive while the next page chunk is being loaded.
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Authentication Screens */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Dashboard Views */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            {/* Dashboard route at the root path. */}
            <Route path="/" element={<Dashboard />} />

            {/* Lead management route. */}
            <Route path="/leads" element={<Leads />} />

            {/* Analytics route. */}
            <Route path="/analytics" element={<Analytics />} />

            {/* Catch-all route for any unknown URL. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
