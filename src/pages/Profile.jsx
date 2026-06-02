import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, User, Award, ShieldAlert, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { 
    childProfiles, 
    activeChildId, 
    selectChild, 
    updateChildProfile, 
    calculateAge 
  } = useApp();

  const navigate = useNavigate();

  // Selected child to edit in detail
  const [editingChildId, setEditingChildId] = useState(activeChildId);
  const editingChild = childProfiles.find(c => c.id === editingChildId) || childProfiles[0];

  // Forms states
  const [name, setName] = useState(editingChild?.name || '');
  const [dob, setDob] = useState(editingChild?.dob || '');
  const [gender, setGender] = useState(editingChild?.gender || 'Male');
  const [concerns, setConcerns] = useState(editingChild?.concerns || []);
  const [notes, setNotes] = useState(editingChild?.notes || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if editing target changes
  const handleSelectEditingChild = (id) => {
    setEditingChildId(id);
    const child = childProfiles.find(c => c.id === id);
    if (child) {
      setName(child.name);
      setDob(child.dob);
      setGender(child.gender);
      setConcerns(child.concerns);
      setNotes(child.notes);
      setSaveSuccess(false);
    }
  };

  const CONCERN_OPTIONS = [
    'Tantrums',
    'Excessive Crying',
    'Screen Time',
    'Sleep Issues',
    'Speech Development',
    'Learning & Attention',
    'Emotional Regulation',
    'Social Skills',
    'Behavior Challenges'
  ];

  const handleToggleConcern = (concern) => {
    setConcerns(prev => {
      if (prev.includes(concern)) {
        return prev.filter(c => c !== concern);
      } else {
        return [...prev, concern];
      }
    });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateChildProfile(editingChildId, {
      name,
      dob,
      gender,
      concerns,
      notes
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 className="text-3xl font-bold">Profile & Child Management</h1>
        <p className="text-sm text-secondary-color">
          Manage child configurations, registered concerns, and active profile dashboards.
        </p>
      </div>

      <div className="grid grid-3">
        {/* Child Profiles list */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Registered Children</h3>
          
          <div className="flex flex-col gap-12" style={{ marginBottom: 24 }}>
            {childProfiles.map(child => {
              const isActiveDashboard = child.id === activeChildId;
              const isSelectedEditing = child.id === editingChildId;

              return (
                <div 
                  key={child.id} 
                  onClick={() => handleSelectEditingChild(child.id)}
                  style={{ 
                    padding: 16, 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    borderColor: isSelectedEditing ? '#F59E0B' : 'var(--border)',
                    backgroundColor: isSelectedEditing ? '#FFFDF5' : 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  <div className="flex justify-between align-center">
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{child.name}</h4>
                    {isActiveDashboard && (
                      <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--primary-border)', padding: '2px 8px', fontSize: '9px' }}>
                        Active Board
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-secondary-color" style={{ margin: '4px 0 8px' }}>
                    Age: {calculateAge(child.dob)} ({child.gender})
                  </p>
                  
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {child.concerns.slice(0, 2).map(c => (
                      <span key={c} className="badge text-xs" style={{ fontSize: '9px', padding: '2px 6px' }}>{c}</span>
                    ))}
                    {child.concerns.length > 2 && (
                      <span className="badge text-xs" style={{ fontSize: '9px', padding: '2px 6px' }}>+{child.concerns.length - 2}</span>
                    )}
                  </div>
                  
                  {!isActiveDashboard && (
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ width: '100%', marginTop: 12, padding: '4px 8px', fontSize: 11 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectChild(child.id);
                        handleSelectEditingChild(child.id);
                      }}
                    >
                      Make Active Dashboard
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button 
            className="btn btn-primary btn-sm" 
            style={{ width: '100%', display: 'flex', gap: 6, justifyContent: 'center' }}
            onClick={() => navigate('/onboarding', { state: { startAtStep: 2 } })}
          >
            <Plus size={14} /> Register New Child
          </button>
        </div>

        {/* Detailed edit form */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>
            Edit Profile: {editingChild?.name}
          </h3>

          <form onSubmit={handleSaveChanges} className="flex flex-col gap-16">
            <div className="input-group">
              <label className="input-label">Child's Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="input-field" 
                required 
              />
            </div>

            <div className="grid grid-2 gap-16">
              <div className="input-group">
                <label className="input-label">Date of Birth</label>
                <input 
                  type="date" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  className="input-field" 
                  required 
                />
              </div>

              <div className="input-group">
                <label className="input-label">Gender</label>
                <select 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)} 
                  className="input-field"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Optional Notes</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                className="input-field" 
                style={{ minHeight: '80px', resize: 'none' }}
              />
            </div>

            {/* Concerns Select Grid */}
            <div className="input-group">
              <label className="input-label" style={{ marginBottom: 6 }}>Parenting priorities & concerns</label>
              <div className="chip-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                {CONCERN_OPTIONS.map(concern => {
                  const isActive = concerns.includes(concern);
                  return (
                    <button 
                      type="button"
                      key={concern}
                      onClick={() => handleToggleConcern(concern)}
                      className={`chip ${isActive ? 'active' : ''}`}
                      style={{ 
                        padding: '10px', 
                        fontSize: '12px',
                        border: '1px solid var(--border)',
                        cursor: 'pointer'
                      }}
                    >
                      {concern}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex align-center gap-16" style={{ marginTop: 12, justifyContent: 'flex-end' }}>
              {saveSuccess && (
                <span className="flex align-center gap-4 text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                  <Check size={14} /> Changes saved successfully!
                </span>
              )}
              <button type="submit" className="btn btn-primary">
                Save Child Profile
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
