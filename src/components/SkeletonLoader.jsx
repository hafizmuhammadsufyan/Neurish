import React from 'react';

/**
 * Renders a placeholder skeleton loader card to prevent visual layout shifts.
 */
export default function SkeletonLoader({ type = 'card', count = 3 }) {
  const renderCardSkeleton = (index) => (
    <div key={index} className="card" style={{
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient element */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        animation: 'shimmer 1.5s infinite',
        transform: 'translateX(-100%)'
      }} />

      <div>
        <div style={{
          backgroundColor: '#e2e8f0',
          height: '16px',
          width: '60px',
          borderRadius: 'var(--radius-full)',
          marginBottom: '16px'
        }} />
        <div style={{
          backgroundColor: '#e2e8f0',
          height: '22px',
          width: '80%',
          borderRadius: '4px',
          marginBottom: '12px'
        }} />
        <div style={{
          backgroundColor: '#e2e8f0',
          height: '14px',
          width: '95%',
          borderRadius: '4px',
          marginBottom: '8px'
        }} />
        <div style={{
          backgroundColor: '#e2e8f0',
          height: '14px',
          width: '70%',
          borderRadius: '4px'
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <div style={{ backgroundColor: '#e2e8f0', height: '14px', width: '80px', borderRadius: '4px' }} />
        <div style={{ backgroundColor: '#e2e8f0', height: '24px', width: '60px', borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  );

  const renderTextSkeleton = (index) => (
    <div key={index} style={{ marginBottom: '16px' }}>
      <div style={{ backgroundColor: '#e2e8f0', height: '16px', width: '40%', borderRadius: '4px', marginBottom: '8px' }} />
      <div style={{ backgroundColor: '#e2e8f0', height: '12px', width: '100%', borderRadius: '4px', marginBottom: '6px' }} />
      <div style={{ backgroundColor: '#e2e8f0', height: '12px', width: '90%', borderRadius: '4px' }} />
    </div>
  );

  const arr = Array.from({ length: count });

  if (type === 'text') {
    return <div style={{ width: '100%' }}>{arr.map((_, i) => renderTextSkeleton(i))}</div>;
  }

  return (
    <div className="grid grid-3" style={{ width: '100%' }}>
      {arr.map((_, i) => renderCardSkeleton(i))}
    </div>
  );
}
