import React from 'react';
import { ExternalLink, ShieldCheck, Bookmark } from 'lucide-react';

export default function ResearchCard({ source }) {
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      borderColor: 'var(--border)',
      transition: 'all 0.2s ease'
    }}>
      <div>
        {/* Header with badge */}
        <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
          <span className="badge text-xs" style={{ backgroundColor: '#F1F5F9', color: 'var(--text-secondary)' }}>
            {source.category}
          </span>
          <div className="flex align-center gap-4 text-xs font-semibold" style={{ color: 'var(--primary)' }}>
            <ShieldCheck size={14} /> {source.trustBadge}
          </div>
        </div>

        {/* Agency Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-sm)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontWeight: 800,
            fontSize: '11px',
            border: '1px solid var(--primary-border)'
          }}>
            {source.logoText}
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{source.name}</h4>
        </div>

        {/* Description */}
        <p className="text-xs text-secondary-color" style={{ marginBottom: 16, lineHeight: 1.5 }}>
          {source.description}
        </p>

        {/* Focus Area */}
        <div style={{
          backgroundColor: 'var(--bg-app)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 16
        }}>
          <p className="text-xs" style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <strong>Research Focus:</strong> {source.researchFocus}
          </p>
        </div>
      </div>

      {/* Action link */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
        <a 
          href={source.externalLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          style={{ gap: 4, display: 'inline-flex', alignItems: 'center' }}
        >
          Visit Source <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
