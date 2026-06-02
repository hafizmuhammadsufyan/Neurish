import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, Award, User } from 'lucide-react';

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink 
        to="/learn" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <BookOpen size={20} />
        <span>Learn</span>
      </NavLink>
      <NavLink 
        to="/tracker" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <CheckSquare size={20} />
        <span>Tracker</span>
      </NavLink>
      <NavLink 
        to="/activities" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Award size={20} />
        <span>Activities</span>
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </NavLink>
    </div>
  );
}
