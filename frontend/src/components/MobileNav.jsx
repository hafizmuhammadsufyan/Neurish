import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, Award, Leaf, Gamepad2 } from 'lucide-react';

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
        to="/nutrition" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Leaf size={20} />
        <span>Nutrition</span>
      </NavLink>
      <NavLink 
        to="/games" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Gamepad2 size={20} />
        <span>Games</span>
      </NavLink>
      <NavLink 
        to="/tracker" 
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <CheckSquare size={20} />
        <span>Tracker</span>
      </NavLink>
    </div>
  );
}
