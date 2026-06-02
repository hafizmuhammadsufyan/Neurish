import React from 'react';
import { X, Clock, Award, ShieldAlert, Check } from 'lucide-react';
import formatDate from '../utils/formatDate';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>
        
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <span className="badge" style={{ backgroundColor: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D', marginBottom: 12 }}>
            {article.category}
          </span>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', marginTop: 8 }}>{article.title}</h2>
          
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <span className="text-xs text-muted-color">
              Citations Sourced: <strong>{article.source}</strong>
            </span>
          </div>
        </div>

        {/* Article Meta row */}
        <div style={{ 
          borderBottom: '1px solid var(--border)', 
          borderTop: '1px solid var(--border)', 
          padding: '12px 0', 
          margin: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <span className="text-xs font-semibold text-secondary-color flex align-center gap-4">
            <Clock size={12} /> {article.readTime}
          </span>
          <span className="text-xs font-semibold text-secondary-color">
            Age: {article.ageGroup}
          </span>
          <span className="text-xs font-semibold text-secondary-color" style={{ color: 'var(--primary)' }}>
            Evidence: {article.evidenceLevel}
          </span>
        </div>

        {/* Article Content */}
        <div 
          className="text-sm text-secondary-color" 
          style={{ lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: 24, fontSize: '14px' }}
        >
          {article.body}
        </div>

        {/* Content Governance Footer */}
        <div style={{ 
          backgroundColor: 'var(--bg-app)', 
          padding: 16, 
          borderRadius: 'var(--radius-md)', 
          borderLeft: '4px solid var(--primary)' 
        }}>
          <p className="text-xs font-bold text-primary-color" style={{ marginBottom: 4, letterSpacing: '0.05em' }}>
            RESEARCH AUTHENTICITY ASSURANCE
          </p>
          <p className="text-xs text-secondary-color" style={{ marginBottom: 6 }}>
            <strong>Source Study URL:</strong>{' '}
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              {article.sourceUrl}
            </a>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 8 }}>
            <span className="text-xs text-muted-color">
              Last Reviewed: {formatDate(article.lastReviewed)}
            </span>
            <span className="text-xs text-muted-color flex align-center gap-4">
              Review Status:{' '}
              <strong style={{ color: article.reviewStatus === 'Approved' ? 'var(--primary)' : 'var(--text-secondary)' }}>
                {article.reviewStatus}
              </strong>
            </span>
          </div>
          {article.reviewedBy && (
            <p className="text-xs text-muted-color" style={{ marginTop: 4 }}>
              Editor: {article.reviewedBy}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
