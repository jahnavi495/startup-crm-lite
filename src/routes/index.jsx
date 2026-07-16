import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

// Global session flag to check if the full A-U-R-A splash animation has already run
let hasLoaderRun = false;

// Helper to delay lazy chunk resolution so the PageLoader completes its full animation loop
const delayedImport = (importFunc) => {
  return lazy(() => {
    if (hasLoaderRun) {
      return importFunc();
    }
    hasLoaderRun = true;
    return Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, 2000))
    ]).then(([moduleExports]) => moduleExports);
  });
};

const Dashboard = delayedImport(() => import('../pages/Dashboard'));
const Leads = delayedImport(() => import('../pages/Leads'));
const Analytics = delayedImport(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));


// Premium visual page loader rendered in place of the page chunk until lazy imports resolve
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/80 dark:bg-bg/90 backdrop-blur-3xl transition-all duration-300">
      <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center select-none">
        
        {/* Modern multi-ring spinning loader */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Ambient glow sphere */}
          <div className="absolute w-20 h-20 bg-primary/10 blur-xl rounded-full animate-pulse-glow" />
          
          {/* Outer Ring 1 - Fast Spin */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" style={{ animationDuration: '0.8s' }} />
          
          {/* Outer Ring 2 - Slow Reverse Spin */}
          <div className="absolute inset-2 rounded-full border border-dashed border-slate-300/30 dark:border-slate-700/30 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          
          {/* Inner Ring 3 - Medium Spin */}
          <div className="absolute inset-3 rounded-full border border-transparent border-b-cyan-500 border-l-cyan-500 animate-spin" style={{ animationDuration: '1.2s' }} />

          {/* Logo Core */}
          <Logo className="w-10 h-10 text-primary relative z-10 animate-pulse" />
        </div>

      </div>
    </div>
  );
};

/**
 * Guard Component: ProtectedRoute
 * Restricts access to authenticated sessions. Renders app shell Layout wrapper with sub-route Outlet.
 */
const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();
  const [delayActive, setDelayActive] = React.useState(!hasLoaderRun);

  React.useEffect(() => {
    if (!isLoading) {
      if (hasLoaderRun) {
        setDelayActive(false);
      } else {
        const timer = setTimeout(() => {
          setDelayActive(false);
          hasLoaderRun = true;
        }, 2800);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading]);

  if (isLoading || delayActive) return <PageLoader />;

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

/**
 * Guard Component: PublicOnly
 * Prevents authenticated sessions from accessing login or registration screens.
 */
const PublicOnly = ({ children }) => {
  const { token, isLoading } = useAuth();
  const [delayActive, setDelayActive] = React.useState(!hasLoaderRun);

  React.useEffect(() => {
    if (!isLoading) {
      if (hasLoaderRun) {
        setDelayActive(false);
      } else {
        const timer = setTimeout(() => {
          setDelayActive(false);
          hasLoaderRun = true;
        }, 2800);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading]);

  if (isLoading || delayActive) return <PageLoader />;

  return !token ? children : <Navigate to="/dashboard" replace />;
};

/**
 * AppRoutes Component
 * Sets up the routing tree using React Router DOM.
 */
export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Redirect Root to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Authentication Routes */}
        <Route
          path="/login"
          element={
            <PublicOnly>
              <Login />
            </PublicOnly>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnly>
              <Register />
            </PublicOnly>
          }
        />


        {/* Private Dashboard Shell Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Route targeting the main landing Dashboard overview */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Route targeting the Leads table CRUD control desk */}
          <Route path="/leads" element={<Leads />} />

          {/* Route targeting deep graphical charts & stats */}
          <Route path="/analytics" element={<Analytics />} />


          {/* Wildcard route displaying a custom 404 fallback page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
