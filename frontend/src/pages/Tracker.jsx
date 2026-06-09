import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Info, CheckSquare, ShieldCheck, Heart } from 'lucide-react';
import MilestoneCard from '../components/MilestoneCard';
import MilestoneModal from '../components/MilestoneModal';
import STUDIES from '../data/studies';

export default function Tracker() {
  const { 
    activeChild, 
    completedMilestones, 
    milestones, 
    recommendations,
    calculateAge 
  } = useApp();

  const [activeTab, setActiveTab] = useState('Cognitive');
  const [selectedMilestoneInfo, setSelectedMilestoneInfo] = useState(null);

  const categories = ['Cognitive', 'Emotional', 'Social', 'Communication', 'Physical'];
  
  // Get active milestones based on active child age group
  const activeMilestonesList = useMemo(() => {
    return milestones[recommendations.milestoneAgeCategory] || [];
  }, [milestones, recommendations.milestoneAgeCategory]);

  // Calculations for categories
  const countCompleted = (category) => {
    return activeMilestonesList.filter(m => m.category === category && completedMilestones.includes(m.id)).length;
  };

  const countTotal = (category) => {
    return activeMilestonesList.filter(m => m.category === category).length;
  };

  // Filtered list for active tab
  const filteredMilestones = useMemo(() => {
    return activeMilestonesList.filter(m => m.category === activeTab);
  }, [activeMilestonesList, activeTab]);

  const childName = activeChild?.name || 'Your Child';
  const childAge = activeChild ? calculateAge(activeChild.dob) : '0 Months';

  const handleOpenResearch = (milestone) => {
    // Locate the scientific study linked to this milestone
    const study = STUDIES.find(s => 
      s.id === (milestone.ref === 'harvard' ? 's1' : milestone.ref === 'cdc' ? 's2' : milestone.ref === 'who' ? 's6' : 's3')
    );
    setSelectedMilestoneInfo({ milestone, study });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="text-3xl font-bold">Milestone Tracker</h1>
        <p className="text-sm text-secondary-color">
          Verify developmental milestones based on CDC & WHO benchmarks for{' '}
          <strong className="text-primary-color">{childName}</strong> ({childAge}).
        </p>
      </div>

      {/* Trust Advisory Banner */}
      <div style={{ 
        backgroundColor: '#FFFDF5', 
        border: '1px dashed #FCD34D', 
        padding: '12px 16px', 
        borderRadius: 'var(--radius-md)', 
        display: 'flex', 
        gap: 12, 
        marginBottom: 32, 
        alignItems: 'center' 
      }}>
        <div style={{ color: '#F59E0B' }}><ShieldCheck size={18} /></div>
        <p className="text-xs text-secondary-color" style={{ margin: 0 }}>
          Neurish milestones are strictly sourced from official surveillance guides. Checking milestones updates {childName}'s development telemetry. 
          If you have concerns, seek advice from a qualified developmental pediatrician.
        </p>
      </div>

      {/* Visual Category Tab Grid with Mini Progress Bars */}
      <div className="grid grid-5" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: 16, 
        marginBottom: 32 
      }}>
        {categories.map(cat => {
          const completed = countCompleted(cat);
          const total = countTotal(cat);
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isActive = activeTab === cat;

          return (
            <button 
              key={cat} 
              className={`card card-interactive ${isActive ? 'active' : ''}`}
              style={{ 
                padding: 16, 
                borderColor: isActive ? '#F59E0B' : 'var(--border)', 
                backgroundColor: isActive ? '#FEF3C7' : 'white',
                textAlign: 'left',
                width: '100%',
                display: 'block',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab(cat)}
            >
              <p className="text-sm font-bold" style={{ color: isActive ? '#78350F' : 'var(--text-primary)', marginBottom: 8, marginTop: 0 }}>
                {cat}
              </p>
              <div className="progress-container" style={{ height: 6, marginBottom: 8, backgroundColor: isActive ? 'white' : 'var(--border)' }}>
                <div className="progress-bar" style={{ width: `${percent}%`, backgroundColor: '#F59E0B' }}></div>
              </div>
              <p className="text-xs text-muted-color" style={{ margin: 0, color: isActive ? '#92400E' : 'var(--text-muted)' }}>
                {completed}/{total} Complete ({percent}%)
              </p>
            </button>
          );
        })}
      </div>

      {/* Milestone Checklist Container */}
      <div className="card">
        <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <h3 className="card-title" style={{ margin: 0 }}>{activeTab} Checklist</h3>
          <span className="text-xs text-muted-color">Select items to track completion. Click info details for scientific rationales.</span>
        </div>

        {filteredMilestones.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            No milestones defined for this category.
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredMilestones.map(m => (
              <MilestoneCard 
                key={m.id} 
                milestone={m} 
                onOpenResearch={() => handleOpenResearch(m)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Rationale modal */}
      {selectedMilestoneInfo && (
        <MilestoneModal 
          milestoneInfo={selectedMilestoneInfo} 
          onClose={() => setSelectedMilestoneInfo(null)} 
        />
      )}
    </div>
  );
}
