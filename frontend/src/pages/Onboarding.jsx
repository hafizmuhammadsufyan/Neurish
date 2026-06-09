import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const { addChildProfile } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // UX enhancement: check if parent is registering another child, starting at Step 2
  const startAtStep = location.state?.startAtStep || 1;
  const [step, setStep] = useState(startAtStep);

  // Sync state if they click "Add child" multiple times
  useEffect(() => {
    if (location.state?.startAtStep) {
      setStep(location.state.startAtStep);
    }
  }, [location.state]);

  // --- Form States ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('2024-01-01');
  const [childGender, setChildGender] = useState('Male');
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [childNotes, setChildNotes] = useState('');

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
    setSelectedConcerns(prev => {
      if (prev.includes(concern)) {
        return prev.filter(c => c !== concern);
      } else {
        return [...prev, concern];
      }
    });
  };

  const handleCompleteOnboarding = () => {
    // Add child to context state
    const newId = addChildProfile({
      name: childName,
      dob: childDob,
      gender: childGender,
      concerns: selectedConcerns,
      notes: childNotes
    });

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        {/* Step Indicator */}
        <div className="flex justify-between align-center" style={{ marginBottom: 32, width: '100%' }}>
          <span className="text-xs font-semibold text-muted-color">STEP {step} OF 3</span>
          <div className="flex gap-8">
            <div style={{ width: 24, height: 6, borderRadius: 3, backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--border)' }}></div>
            <div style={{ width: 24, height: 6, borderRadius: 3, backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border)' }}></div>
            <div style={{ width: 24, height: 6, borderRadius: 3, backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--border)' }}></div>
          </div>
        </div>

        {/* Step 1: Account Setup */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold" style={{ marginBottom: 12, color: 'var(--text-primary)' }}>Join Neurish</h2>
            <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>
              Let's create your account to securely log developmental milestones and activities.
            </p>
            
            <div className="flex flex-col gap-16" style={{ marginBottom: 24 }}>
              <div className="input-group">
                <label className="input-label">Your Email</label>
                <input 
                  type="email" 
                  placeholder="parent@domain.com" 
                  className="input-field" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input-field" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              onClick={() => setStep(2)} 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={!email || !password}
            >
              Continue to Child Profile
            </button>
          </div>
        )}

        {/* Step 2: Child Profile Form */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold" style={{ marginBottom: 12, color: 'var(--text-primary)' }}>Tell Us About Your Child</h2>
            <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>
              This initializes the personalization engine for age-based activities and developmental milestones.
            </p>
            
            <div className="flex flex-col gap-16" style={{ marginBottom: 24 }}>
              <div className="input-group">
                <label className="input-label">Child's Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Zain or Ayesha" 
                  value={childName} 
                  onChange={(e) => setChildName(e.target.value)} 
                  className="input-field" 
                />
              </div>
              
              <div className="grid grid-2 gap-16">
                <div className="input-group">
                  <label className="input-label">Date of Birth</label>
                  <input 
                    type="date" 
                    value={childDob} 
                    onChange={(e) => setChildDob(e.target.value)} 
                    className="input-field" 
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">Gender</label>
                  <select 
                    value={childGender} 
                    onChange={(e) => setChildGender(e.target.value)} 
                    className="input-field"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Optional Notes (Specific habits, keywords)</label>
                <textarea 
                  placeholder="e.g. loves stacking cups, active only after afternoon nap" 
                  value={childNotes} 
                  onChange={(e) => setChildNotes(e.target.value)} 
                  className="input-field" 
                  style={{ minHeight: 80, resize: 'none' }}
                ></textarea>
              </div>
            </div>
            
            <div className="flex gap-16">
              {startAtStep === 1 && (
                <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>Back</button>
              )}
              <button 
                onClick={() => setStep(3)} 
                className="btn btn-primary" 
                style={{ flex: 2 }}
                disabled={!childName.trim()}
              >
                Next: Select Concerns
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Concerns selection */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold" style={{ marginBottom: 8, color: 'var(--text-primary)' }}>What concerns you most?</h2>
            <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>
              We will customize your learning resources, activity prompts, and dashboards to address these first.
            </p>
            
            <div className="chip-grid" style={{ marginBottom: 32 }}>
              {CONCERN_OPTIONS.map(concern => {
                const isActive = selectedConcerns.includes(concern);
                return (
                  <button 
                    key={concern}
                    onClick={() => handleToggleConcern(concern)}
                    className={`chip ${isActive ? 'active' : ''}`}
                    style={{ border: '1px solid var(--border)', cursor: 'pointer' }}
                  >
                    {concern}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-16">
              <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>Back</button>
              <button onClick={handleCompleteOnboarding} className="btn btn-primary" style={{ flex: 2 }}>
                Complete Profile Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
