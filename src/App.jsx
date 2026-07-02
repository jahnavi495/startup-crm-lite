import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';

/**
 * App Component
 * The root assembly for the Startup CRM Lite experience.
 * - Wraps the app in BrowserRouter so the URL matches the current CRM page.
 * - Renders the global toast container and the lazy-loaded route tree.
 */
const App = () => {
  return (
    // BrowserRouter keeps navigation tied to the browser URL for clean Vite routing.
    <BrowserRouter>
      {/* Toast notifications appear globally above the app shell. */}
      <Toaster position="top-right" />

      {/* AppRoutes loads the active CRM page lazily and mounts it for the current path. */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;