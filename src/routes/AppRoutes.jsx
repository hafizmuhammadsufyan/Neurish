import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

// Pages
import Landing from '../pages/Landing';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import Learn from '../pages/Learn';
import Tracker from '../pages/Tracker';
import Activities from '../pages/Activities';
import Profile from '../pages/Profile';
import ResearchCenter from '../pages/ResearchCenter';

/**
 * Layout wrapper for in-app views requiring Sidebar and Mobile Navigation.
 */
function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone Pages (No App Shell) */}
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Authenticated Pages (Wrapped in App Shell Layout) */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/research" element={<ResearchCenter />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
