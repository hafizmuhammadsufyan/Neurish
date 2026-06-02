import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  Award, 
  User, 
  FileText
} from 'lucide-react';
import ChildSelector from './ChildSelector';

export default function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Learn Hub', icon: BookOpen, path: '/learn' },
    { name: 'Tracker', icon: CheckSquare, path: '/tracker' },
    { name: 'Activities', icon: Award, path: '/activities' },
    { name: 'Research Center', icon: FileText, path: '/research' },
    { name: 'Profile Settings', icon: User, path: '/profile' }
  ];

  return (
    <div className="sidebar">
      {/* Brand Logo */}
      <div 
        className="sidebar-logo" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer' }}
      >
        <div style={{ 
          backgroundColor: 'var(--primary)', 
          width: 32, 
          height: 32, 
          borderRadius: 8, 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'center', 
          color: 'white', 
          fontWeight: 800,
          paddingLeft: 8
        }}>
          N
        </div>
        <span>Neurish</span>
      </div>

      {/* Reusable Child Profile Dropper */}
      <ChildSelector />

      {/* Navigation List */}
      <ul className="sidebar-menu">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Parent Profile Card */}
      <div className="sidebar-profile-box">
        <div className="flex align-center gap-12">
          <div style={{ 
            width: 36, 
            height: 36, 
            borderRadius: '50%', 
            backgroundColor: '#e2e8f0', 
            display: 'flex', 
            alignItems: 'center', 
            justify: 'center', 
            fontWeight: 'bold' 
          }}>
            P
          </div>
          <div>
            <p className="text-sm font-semibold">Pakistani Parent</p>
            <button 
              onClick={() => navigate('/')} 
              style={{ 
                border: 'none', 
                background: 'none', 
                color: 'var(--text-muted)', 
                fontSize: 11, 
                cursor: 'pointer', 
                textDecoration: 'underline',
                padding: 0
              }}
            >
              Logout (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
