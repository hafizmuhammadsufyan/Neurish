import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Info, Award, Clock, LayoutDashboard, Bookmark, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHero from '../components/DashboardHero';
import ArticleModal from '../components/ArticleModal';
import ActivityModal from '../components/ActivityModal';

export default function Dashboard() {
  const { 
    activeChild, 
    savedArticles, 
    articles,
    recommendations,
    calculateAge 
  } = useApp();
  
  const navigate = useNavigate();

  // Modal Views State
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const childName = activeChild?.name || 'Your Child';
  const childAge = activeChild ? calculateAge(activeChild.dob) : '';
  const childConcerns = activeChild?.concerns || ['General Development'];

  return (
    <div>
      {/* Welcome Header */}
      <div className="flex justify-between align-center" style={{ marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="text-3xl font-bold">Good morning, Parent!</h1>
          <p className="text-sm text-secondary-color">
            Here is today's scientific focus for <span className="font-semibold text-primary-color">{childName}</span> ({childAge} old).
          </p>
        </div>
        <div className="flex gap-12">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/onboarding', { state: { startAtStep: 2 } })}
          >
            <Plus size={16} /> Add Profile
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/tracker')}>
            Check Milestones
          </button>
        </div>
      </div>

      {/* Dynamic Personalization Alert Banner */}
      <div style={{ 
        backgroundColor: 'var(--primary-light)', 
        border: '1px solid var(--primary-border)', 
        padding: '16px 20px', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex', 
        gap: 16, 
        marginBottom: 32, 
        alignItems: 'flex-start' 
      }}>
        <div style={{ color: 'var(--primary)', marginTop: 2 }}><Info size={20} /></div>
        <div>
          <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 4 }}>
            Neurish Engine Tailored to {childName}
          </h4>
          <p className="text-xs text-secondary-color" style={{ margin: 0 }}>
            Currently addressing concerns: <strong style={{ color: 'var(--text-primary)' }}>{childConcerns.join(', ')}</strong>. 
            Dashboard recommendations are dynamically generated based on peer-reviewed guidelines matching the <strong>{childAge}</strong> development threshold.
          </p>
        </div>
      </div>

      {/* Premium Dashboard Hero Section */}
      <DashboardHero 
        onSelectArticle={setSelectedArticle} 
        onSelectActivity={setSelectedActivity} 
      />

      {/* Quick Access Grid */}
      <div className="grid grid-2" style={{ gap: '24px' }}>
        
        {/* Recommended Activity Spotlight Details */}
        <div className="card flex flex-col justify-between" style={{ borderLeft: '4px solid var(--primary)' }}>
          {recommendations.activity ? (
            <>
              <div>
                <div className="flex justify-between align-center" style={{ marginBottom: 16 }}>
                  <span className="badge badge-outline" style={{ display: 'flex', gap: 4 }}>
                    <Star size={10} style={{ fill: '#F59E0B', stroke: '#D97706' }} /> Highlighted Activity
                  </span>
                  <span className="text-xs text-muted-color flex align-center gap-4">
                    <Clock size={12} /> {recommendations.activity.duration}
                  </span>
                </div>
                <h3 className="card-title">{recommendations.activity.title}</h3>
                <p className="text-sm text-secondary-color" style={{ marginBottom: 20, lineHeight: 1.5 }}>
                  {recommendations.activity.benefit}
                </p>
                <div className="flex gap-8" style={{ marginBottom: 16 }}>
                  <span className="badge text-xs" style={{ fontSize: 10 }}>{recommendations.activity.category}</span>
                  <span className="badge text-xs" style={{ fontSize: 10 }}>{recommendations.activity.involvement}</span>
                </div>
              </div>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => setSelectedActivity(recommendations.activity)}
                style={{ alignSelf: 'flex-start' }}
              >
                Start Activity Guide
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              No activity recommendations.
            </div>
          )}
        </div>

        {/* Saved Guides List */}
        <div className="card flex flex-col justify-between">
          <div>
            <h3 className="card-title">Saved Scientific Guides</h3>
            <p className="text-xs text-secondary-color" style={{ marginBottom: 20 }}>
              Your bookmarked research summaries for easy reference.
            </p>
            
            {savedArticles.length === 0 ? (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Bookmark size={24} style={{ color: 'var(--text-muted)', marginBottom: 8, strokeWidth: 1.5 }} />
                <p className="text-xs">No guides saved yet. Bookmark articles in the Learn section.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-12" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                {savedArticles.map(artId => {
                  const article = articles.find(a => a.id === artId);
                  if (!article) return null;
                  return (
                    <div 
                      key={artId} 
                      className="flex justify-between align-center" 
                      style={{ 
                        padding: '8px 12px', 
                        border: '1px solid var(--border)', 
                        borderRadius: 'var(--radius-sm)', 
                        backgroundColor: 'var(--bg-app)' 
                      }}
                    >
                      <span className="text-xs font-semibold" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '75%' }}>
                        {article.title}
                      </span>
                      <button 
                        className="btn-text text-xs" 
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        onClick={() => setSelectedArticle(article)}
                      >
                        Read Guide
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ width: '100%', marginTop: 20 }} 
            onClick={() => navigate('/learn')}
          >
            Browse All Topics <ArrowRight size={12} style={{ marginLeft: 4 }} />
          </button>
        </div>

      </div>

      {/* Render overlay modals */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}

      {selectedActivity && (
        <ActivityModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}
    </div>
  );
}
