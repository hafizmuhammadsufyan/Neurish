import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function ChildSelector() {
  const { childProfiles, activeChildId, activeChild, selectChild, calculateAge } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="child-selector-container" ref={dropdownRef}>
      <button 
        className="child-selector-btn" 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}
      >
        <div className="flex align-center gap-8">
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
          <span style={{ fontWeight: 600 }}>{activeChild.name} ({calculateAge(activeChild.dob)})</span>
        </div>
        <ChevronDown size={16} />
      </button>
      
      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          backgroundColor: 'white', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius-md)', 
          marginTop: 4, 
          zIndex: 300, 
          boxShadow: 'var(--shadow-md)' 
        }}>
          {childProfiles.map(child => (
            <button 
              key={child.id} 
              onClick={() => {
                selectChild(child.id);
                setIsOpen(false);
              }} 
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '10px 16px', 
                border: 'none', 
                background: 'none', 
                textAlign: 'left', 
                cursor: 'pointer', 
                fontSize: 13, 
                borderBottom: '1px solid var(--border)', 
                fontWeight: child.id === activeChildId ? '600' : '400', 
                color: child.id === activeChildId ? 'var(--primary)' : 'var(--text-primary)' 
              }}
            >
              {child.name} ({calculateAge(child.dob)})
            </button>
          ))}
          <button 
            onClick={() => { 
              setIsOpen(false); 
              navigate('/onboarding', { state: { startAtStep: 2 } });
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              width: '100%', 
              padding: '10px 16px', 
              border: 'none', 
              background: 'var(--primary-light)', 
              textAlign: 'left', 
              cursor: 'pointer', 
              fontSize: 13, 
              color: 'var(--primary)', 
              fontWeight: '600' 
            }}
          >
            <Plus size={14} /> Add Child Profile
          </button>
        </div>
      )}
    </div>
  );
}
