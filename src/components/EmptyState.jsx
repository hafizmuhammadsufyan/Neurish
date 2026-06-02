import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function EmptyState({ title = 'No items found', message = 'Try expanding your filters or search keywords.', actionText, onAction }) {
  return (
    <div className="card" style={{
      textAlign: 'center',
      padding: '48px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dashed',
      borderColor: 'var(--border-active)',
      backgroundColor: 'transparent',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{
        backgroundColor: '#FEF3C7',
        color: '#D97706',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        marginBottom: '16px',
        border: '1px solid #FCD34D'
      }}>
        <AlertCircle size={28} />
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
        {title}
      </h3>
      <p className="text-sm text-secondary-color" style={{ maxWidth: '380px', margin: '0 auto 20px', lineHeight: 1.5 }}>
        {message}
      </p>
      {actionText && onAction && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
