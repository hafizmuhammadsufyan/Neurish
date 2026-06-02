import React from 'react';
import { Check, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MilestoneCard({ milestone, onOpenResearch }) {
  const { completedMilestones, toggleMilestone } = useApp();
  const isChecked = completedMilestones.includes(milestone.id);

  return (
    <div 
      className="milestone-item" 
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        borderBottom: '1px solid var(--border)',
        gap: '16px',
        transition: 'background-color 0.2s',
        backgroundColor: isChecked ? '#FFFDF5' : 'transparent'
      }}
    >
      {/* Checkbox Trigger */}
      <button 
        onClick={() => toggleMilestone(milestone.id)}
        className={`milestone-checkbox ${isChecked ? 'checked' : ''}`}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          border: '2px solid var(--border-active)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          marginTop: '2px',
          background: isChecked ? 'var(--primary)' : 'white',
          borderColor: isChecked ? 'var(--primary)' : 'var(--border-active)',
          color: 'white',
          padding: 0
        }}
        aria-label={`Toggle completion for ${milestone.text}`}
      >
        {isChecked && <Check size={14} />}
      </button>
      
      <div style={{ flex: 1 }}>
        <p 
          className="text-sm font-medium" 
          style={{ 
            textDecoration: isChecked ? 'line-through' : 'none', 
            color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
            margin: 0
          }}
        >
          {milestone.text}
        </p>
        <p className="text-xs text-secondary-color" style={{ marginTop: 4, margin: '4px 0 0' }}>
          {milestone.guidance}
        </p>
        
        <div style={{ marginTop: 8 }}>
          <button 
            className="science-ref-badge"
            style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
            onClick={onOpenResearch}
          >
            <Info size={10} /> Research Rationale
          </button>
        </div>
      </div>
    </div>
  );
}
