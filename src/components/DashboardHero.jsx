import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Clock, ArrowRight, Heart, Brain, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardHero({ onSelectArticle, onSelectActivity }) {
  const { 
    activeChild, 
    completedMilestones, 
    milestones, 
    recommendations, 
    calculateAge 
  } = useApp();
  const navigate = useNavigate();

  // Find active milestones based on derived recommendations
  const activeMilestonesList = milestones[recommendations.milestoneAgeCategory] || [];
  const completedCount = activeMilestonesList.filter(m => completedMilestones.includes(m.id)).length;
  const progressPercent = activeMilestonesList.length > 0 
    ? Math.round((completedCount / activeMilestonesList.length) * 100) 
    : 0;

  const childName = activeChild?.name || 'Your Child';
  const childAge = activeChild ? calculateAge(activeChild.dob) : '0 Months';
  const primaryConcern = activeChild?.concerns?.[0] || 'General Development';

  return (
    <div className="dashboard-hero-card" style={{
      background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFDF5 100%)',
      border: '1px solid #F59E0B',
      borderRadius: 'var(--radius-lg)',
      padding: '32px',
      boxShadow: 'var(--shadow-md)',
      marginBottom: '32px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Warm Shapes */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0) 70%)',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Child Badge & Header */}
        <div className="flex justify-between align-center" style={{ flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div className="flex align-center gap-12">
            <div style={{
              backgroundColor: '#F59E0B',
              color: 'white',
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)'
            }}>
              {childName[0]}
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#78350F' }}>
                Nurturing {childName}
              </h2>
              <p className="text-sm" style={{ color: '#92400E', fontWeight: 500 }}>
                Age: {childAge} • Focus Area: <span style={{ textDecoration: 'underline' }}>{primaryConcern}</span>
              </p>
            </div>
          </div>
          <div className="badge" style={{ backgroundColor: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D', padding: '6px 12px' }}>
            <Heart size={14} style={{ marginRight: 6, fill: '#F59E0B', stroke: '#D97706' }} /> Trust-First Pediatric Support
          </div>
        </div>

        {/* Hero Grid Content */}
        <div className="grid grid-3" style={{ gap: '24px', marginTop: '16px' }}>
          
          {/* Column 1: Today's Focus & Guidance */}
          <div className="flex flex-col justify-between" style={{
            background: 'white',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(245, 158, 11, 0.15)'
          }}>
            <div>
              <div className="flex align-center gap-8" style={{ marginBottom: 12 }}>
                <Brain size={18} style={{ color: '#F59E0B' }} />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#78350F' }}>Today's Focus</h4>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {recommendations.focusText}
              </p>
            </div>
            <div style={{ marginTop: '16px', borderTop: '1px solid #FEF3C7', paddingTop: '12px' }}>
              <span className="text-xs font-semibold" style={{ color: '#D97706' }}>
                Targeting: {recommendations.milestoneCategory} Skills
              </span>
            </div>
          </div>

          {/* Column 2: Suggested Activity */}
          <div className="flex flex-col justify-between" style={{
            background: 'white',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(245, 158, 11, 0.15)'
          }}>
            {recommendations.activity ? (
              <>
                <div>
                  <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
                    <div className="flex align-center gap-8">
                      <Award size={18} style={{ color: '#F59E0B' }} />
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#78350F' }}>Suggested Activity</h4>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Clock size={10} style={{ marginRight: 4, display: 'inline' }} /> 
                      {recommendations.activity.duration}
                    </span>
                  </div>
                  <h5 style={{ fontWeight: 700, fontSize: '14px', marginBottom: 4, color: 'var(--text-primary)' }}>
                    {recommendations.activity.title}
                  </h5>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {recommendations.activity.benefit}
                  </p>
                </div>
                <button 
                  onClick={() => onSelectActivity(recommendations.activity)}
                  className="btn btn-secondary btn-sm" 
                  style={{ width: '100%', marginTop: '16px', background: '#FFFBEB', color: '#D97706', borderColor: '#FCD34D' }}
                >
                  Start Activity Guide <ArrowRight size={12} />
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)' }}>
                No recommended activities.
              </div>
            )}
          </div>

          {/* Column 3: Recommended Article */}
          <div className="flex flex-col justify-between" style={{
            background: 'white',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(245, 158, 11, 0.15)'
          }}>
            {recommendations.article ? (
              <>
                <div>
                  <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
                    <div className="flex align-center gap-8">
                      <BookOpen size={18} style={{ color: '#F59E0B' }} />
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#78350F' }}>Scientific Resource</h4>
                    </div>
                  </div>
                  <h5 style={{ fontWeight: 700, fontSize: '14px', marginBottom: 4, color: 'var(--text-primary)' }}>
                    {recommendations.article.title}
                  </h5>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Sourced: {recommendations.article.source}
                  </p>
                </div>
                <button 
                  onClick={() => onSelectArticle(recommendations.article)}
                  className="btn btn-primary btn-sm" 
                  style={{ width: '100%', marginTop: '16px', backgroundColor: '#F59E0B', borderColor: '#F59E0B' }}
                >
                  Read Guide
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)' }}>
                No recommended articles.
              </div>
            )}
          </div>

        </div>

        {/* Milestone Progress Section */}
        <div style={{
          marginTop: '24px',
          background: 'rgba(254, 243, 199, 0.6)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed #FCD34D'
        }}>
          <div className="flex justify-between align-center" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
            <span className="text-sm font-semibold" style={{ color: '#78350F' }}>
              Development Milestones Checklist Progress
            </span>
            <span className="text-xs font-bold" style={{ color: '#D97706' }}>
              {completedCount} of {activeMilestonesList.length} Milestones Checked ({progressPercent}%)
            </span>
          </div>
          <div className="progress-container" style={{ backgroundColor: 'white', height: '10px' }}>
            <div className="progress-bar" style={{ width: `${progressPercent}%`, backgroundColor: '#F59E0B' }}></div>
          </div>
          <div className="flex justify-between align-center" style={{ marginTop: 8 }}>
            <p className="text-xs" style={{ color: '#92400E' }}>
              Currently screening for {recommendations.milestoneAgeCategory === 'preschool' ? 'Preschooler (3-5 Years)' : 'Toddler (1-2 Years)'} benchmarks.
            </p>
            <button 
              onClick={() => navigate('/tracker')} 
              style={{ background: 'none', border: 'none', color: '#D97706', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              Update Milestones
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
