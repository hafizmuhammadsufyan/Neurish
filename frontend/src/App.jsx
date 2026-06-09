import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Root Application Bootstrapper
 * Configures the router and the global personalization context.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </BrowserRouter>
  );
}
