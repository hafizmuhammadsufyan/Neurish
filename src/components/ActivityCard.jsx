import React from 'react';
import { Clock, Users, Play } from 'lucide-react';

export default function ActivityCard({ activity, onOpen }) {
  return (
    <div 
      className="card card-interactive flex flex-col justify-between" 
      onClick={onOpen}
      style={{ borderLeft: '4px solid var(--primary)' }}
    >
      <div>
        <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
          <span className="badge badge-primary" style={{ fontSize: 10 }}>
            {activity.ageGroup}
          </span>
          <span className="text-xs text-muted-color flex align-center gap-4">
            <Clock size={12} /> {activity.duration}
          </span>
        </div>
        
        <h3 className="card-title text-base" style={{ color: 'var(--text-primary)' }}>
          {activity.title}
        </h3>
        <p className="text-xs text-secondary-color" style={{ marginBottom: 16 }}>
          {activity.benefit}
        </p>
      </div>

      <div>
        <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
          <span className="badge text-xs" style={{ fontSize: 10 }}>
            {activity.category}
          </span>
          <span className="text-xs text-muted-color flex align-center gap-4">
            <Users size={12} /> {activity.involvement}
          </span>
        </div>
        <button 
          className="btn btn-secondary btn-sm" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Play size={12} fill="currentColor" /> View Instructions
        </button>
      </div>
    </div>
  );
}
