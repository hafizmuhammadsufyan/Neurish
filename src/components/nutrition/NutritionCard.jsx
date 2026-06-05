import React from 'react';
import { ChevronRight, Flame, Dumbbell } from 'lucide-react';

export default function NutritionCard({ nutrition, onOpen }) {
  return (
    <div 
      className="card card-interactive flex flex-col justify-between"
      onClick={onOpen}
      style={{ borderLeft: '4px solid var(--primary)' }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="badge badge-primary" style={{ fontSize: 11 }}>
            {nutrition.ageGroup}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 32 }}>{nutrition.image}</span>
          <h3 className="card-title text-base" style={{ color: 'var(--text-primary)', margin: 0 }}>
            {nutrition.name}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            backgroundColor: 'var(--bg-app)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: 12
          }}>
            <Flame size={14} style={{ color: 'var(--primary)' }} />
            <span className="text-xs">Brain Growth</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            backgroundColor: 'var(--bg-app)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: 12
          }}>
            <Dumbbell size={14} style={{ color: 'var(--primary)' }} />
            <span className="text-xs">Body Dev</span>
          </div>
        </div>

        <p className="text-xs text-secondary-color" style={{ marginBottom: 12, lineHeight: 1.5 }}>
          {nutrition.brainBenefits.substring(0, 80)}...
        </p>
      </div>

      <div>
        <div style={{ marginBottom: 12 }}>
          <span className="text-xs text-muted-color" style={{ display: 'block', marginBottom: 6 }}>
            Key Nutrients: {nutrition.nutrients.slice(0, 2).join(', ')}
          </span>
        </div>
        <button 
          className="btn btn-secondary btn-sm" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          View Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
