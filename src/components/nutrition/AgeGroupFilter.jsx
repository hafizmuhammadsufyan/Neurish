import React from 'react';

export default function AgeGroupFilter({ selectedAgeGroup, onSelectAgeGroup }) {
  const ageGroups = [
    { label: '0–6 Months', value: '0-6' },
    { label: '6–12 Months', value: '6-12' },
    { label: '1–2 Years', value: '1-2' },
    { label: '2–3 Years', value: '2-3' },
    { label: '3–5 Years', value: '3-5' },
    { label: '5+ Years', value: '5+' }
  ];

  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, marginBottom: 24 }}>
      {ageGroups.map(group => (
        <button
          key={group.value}
          onClick={() => onSelectAgeGroup(group.value)}
          className={selectedAgeGroup === group.value ? 'badge badge-primary' : 'badge badge-outline'}
          style={{ 
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: selectedAgeGroup === group.value ? 'none' : '1px solid var(--border)',
            backgroundColor: selectedAgeGroup === group.value ? 'var(--primary)' : 'transparent',
            color: selectedAgeGroup === group.value ? 'white' : 'var(--text-primary)',
            padding: '8px 16px',
            fontSize: 13
          }}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
}
