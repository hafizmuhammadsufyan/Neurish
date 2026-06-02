import React from 'react';
import { X, Clock, Users, Wrench, ListOrdered, Award } from 'lucide-react';

export default function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>
        
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div className="flex gap-8" style={{ marginBottom: 12 }}>
            <span className="badge badge-primary">{activity.ageGroup}</span>
            <span className="badge badge-outline">{activity.category}</span>
          </div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{activity.title}</h2>
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            marginTop: 8,
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: 500
          }}>
            <span className="flex align-center gap-4"><Clock size={14} /> Est. Time: {activity.duration}</span>
            <span className="flex align-center gap-4"><Users size={14} /> Caregiver Role: {activity.involvement}</span>
          </div>
        </div>

        {/* Setup / Requirements */}
        <div style={{ 
          backgroundColor: 'var(--bg-app)', 
          padding: 16, 
          borderRadius: 'var(--radius-md)', 
          marginBottom: 20,
          border: '1px solid var(--border)'
        }}>
          <h4 className="text-xs font-bold text-secondary-color flex align-center gap-6" style={{ textTransform: 'uppercase', marginBottom: 6, color: 'var(--text-primary)' }}>
            <Wrench size={12} /> Prep & Setup
          </h4>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.4 }}>{activity.setup}</p>
        </div>

        {/* Step-by-step instructions */}
        <h4 className="text-sm font-semibold flex align-center gap-6" style={{ marginBottom: 10, color: 'var(--text-primary)' }}>
          <ListOrdered size={14} /> Step-by-Step Instructions
        </h4>
        <div 
          className="text-sm text-secondary-color" 
          style={{ lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 24, fontSize: '13.5px' }}
        >
          {activity.instructions}
        </div>

        {/* Footer Reference */}
        <div style={{ 
          borderTop: '1px solid var(--border)', 
          paddingTop: 16, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <span className="text-xs text-muted-color flex align-center gap-4">
            <Award size={14} style={{ color: 'var(--primary)' }} /> 
            Sourced: <strong>{activity.reference}</strong>
          </span>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
}
