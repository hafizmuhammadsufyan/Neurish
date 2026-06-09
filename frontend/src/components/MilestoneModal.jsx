import React from 'react';
import { X, Award, Info, FileText } from 'lucide-react';

export default function MilestoneModal({ milestoneInfo, onClose }) {
  if (!milestoneInfo) return null;
  const { milestone, study } = milestoneInfo;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)' }}>
          <Info size={20} style={{ color: 'var(--primary)' }} /> Pediatric Research Evidence
        </h2>
        
        {/* Milestone Indicator */}
        <div style={{ 
          backgroundColor: 'var(--primary-light)', 
          padding: 12, 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--primary-border)', 
          marginBottom: 20 
        }}>
          <h4 className="text-xs font-bold text-primary-color" style={{ textTransform: 'uppercase', margin: 0 }}>
            Tracked Milestone
          </h4>
          <p className="text-sm font-medium" style={{ marginTop: 4, margin: '4px 0 0', color: 'var(--text-primary)' }}>
            {milestone.text}
          </p>
        </div>

        {/* Why it Matters */}
        <h4 className="text-sm font-semibold" style={{ marginBottom: 8, color: 'var(--text-primary)' }}>
          Why This Matters (Developmental Science)
        </h4>
        <p className="text-sm text-secondary-color" style={{ marginBottom: 20, lineHeight: 1.5 }}>
          {milestone.guidance}
        </p>

        {/* Supporting Study */}
        {study ? (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <span className="badge text-xs" style={{ marginBottom: 8, backgroundColor: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D' }}>
              <FileText size={10} style={{ marginRight: 4, display: 'inline' }} /> Supporting Scientific Study
            </span>
            <h4 className="text-xs font-bold text-secondary-color" style={{ color: 'var(--text-primary)', fontSize: '13px' }}>
              {study.title}
            </h4>
            <p className="text-xs text-secondary-color" style={{ marginTop: 4 }}>
              <strong>Institution:</strong> {study.source} ({study.year})
            </p>
            <p className="text-xs text-secondary-color" style={{ marginTop: 8, lineHeight: 1.4 }}>
              <strong>Key Insight:</strong> {study.finding}
            </p>
          </div>
        ) : (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, color: 'var(--text-muted)', fontSize: '12px' }}>
            Official developmental benchmark guidelines established by the CDC and WHO.
          </div>
        )}

        {/* Action button */}
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Back to Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
