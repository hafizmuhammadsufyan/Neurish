import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

// Pages
import Landing from '../pages/Landing';
import Onboarding from '../pages/Onboarding';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import Learn from '../pages/Learn';
import Tracker from '../pages/Tracker';
import Activities from '../pages/Activities';
import Profile from '../pages/Profile';
import ResearchCenter from '../pages/ResearchCenter';
import Nutrition from '../pages/Nutrition';
import Games from '../pages/Games';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';

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
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authenticated Pages (Wrapped in App Shell Layout) */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/games" element={<Games />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/research" element={<ResearchCenter />} />
      </Route>

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
