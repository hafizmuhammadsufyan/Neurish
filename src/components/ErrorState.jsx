import React from 'react';
import { AlertOctagon } from 'lucide-react';

export default function ErrorState({ title = 'Operation Failed', message = 'There was an issue loading the requested research files.', retryText = 'Retry Request', onRetry }) {
  return (
    <div className="card" style={{
      textAlign: 'center',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#FECACA',
      backgroundColor: '#FEF2F2',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{
        backgroundColor: '#FEE2E2',
        color: '#EF4444',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        marginBottom: '16px'
      }}>
        <AlertOctagon size={24} />
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#991B1B', marginBottom: '6px' }}>
        {title}
      </h3>
      <p className="text-xs" style={{ color: '#B91C1C', maxWidth: '320px', margin: '0 auto 16px', lineHeight: 1.4 }}>
        {message}
      </p>
      {onRetry && (
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={onRetry}
          style={{ borderColor: '#FCA5A5', color: '#B91C1C', background: 'white' }}
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
