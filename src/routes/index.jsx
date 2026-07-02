import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from '../components/common/Layout';

// Use React.lazy to import pages asynchronously to split code bundles and speed up initial page load.
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

// A premium visual page loader rendered in place of the page chunk until the lazy import resolves.
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-100 w-full py-20" aria-label="Loading page">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
 * Each path maps to a page component and uses lazy loading for better performance.
 * - "/" renders the Dashboard page.
 * - "/leads" renders the Lead Management page.
 * - "/analytics" renders the Analytics page.
 * - "*" renders the 404 Not Found page for unknown routes.
 */
export const AppRoutes = () => {
  return (
    // Suspense keeps the app responsive while the next page chunk is being loaded.
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* The shared app shell wraps the main CRM views with the navbar and sidebar. */}
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
      </Routes>
    </Suspense>
  );
};
