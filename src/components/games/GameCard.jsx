import React from 'react';
import { Play, Award } from 'lucide-react';

export default function GameCard({ game, onPlay }) {
  return (
    <div 
      className="card card-interactive flex flex-col justify-between"
      style={{ borderLeft: '4px solid var(--primary)' }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="badge badge-primary" style={{ fontSize: 11 }}>
            {game.ageGroup}
          </span>
          <span className="badge" style={{ fontSize: 11, backgroundColor: '#E0E7FF', color: '#3730A3' }}>
            Level {game.difficulty}/{game.maxDifficulty}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          {game.icon && <game.icon size={20} style={{ color: 'var(--primary)' }} />}
          <h3 className="card-title text-base" style={{ color: 'var(--text-primary)', margin: 0 }}>
            {game.name}
          </h3>
        </div>

        <p className="text-xs text-secondary-color" style={{ marginBottom: 14, lineHeight: 1.5 }}>
          {game.description}
        </p>

        {/* Skills Badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {game.skillBadges.map((badge, idx) => (
            <span key={idx} className="badge" style={{ 
              fontSize: 10, 
              backgroundColor: '#FFFBEB', 
              color: '#D97706',
              padding: '4px 8px'
            }}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 6, 
          marginBottom: 12,
          padding: '8px 12px',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-md)'
        }}>
          <Award size={14} style={{ color: 'var(--primary)' }} />
          <span className="text-xs text-secondary-color">
            {game.skills.slice(0, 2).join(', ')}
          </span>
        </div>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={onPlay}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Play size={12} fill="currentColor" /> Play Now
        </button>
      </div>
    </div>
  );
}
