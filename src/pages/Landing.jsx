import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckSquare, LayoutDashboard, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { researchSources } = useApp();

  return (
    <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Landing Navbar */}
      <header className="landing-navbar">
        <div className="container flex justify-between align-center" style={{ width: '100%' }}>
          <div 
            className="flex align-center gap-8" 
            style={{ fontSize: 22, fontWeight: 800, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div style={{ 
              backgroundColor: 'var(--primary)', 
              width: 28, 
              height: 28, 
              borderRadius: 6, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white', 
              fontSize: 16,
              fontWeight: 800
            }}>
              N
            </div>
            <span style={{ fontFamily: 'Outfit' }}>Neurish</span>
          </div>
          <div className="flex gap-24 align-center">
            <button 
              onClick={() => navigate('/research')} 
              className="btn-text" 
              style={{ textDecoration: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Scientific Base
            </button>
            <button 
              onClick={() => navigate('/onboarding')} 
              className="btn btn-primary btn-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="badge badge-primary" style={{ marginBottom: 20 }}>
            Research-Backed Early Childhood Development
          </div>
          <h1 className="text-4xl font-bold" style={{ marginBottom: 24, lineHeight: 1.15, color: 'var(--text-primary)' }}>
            Scientifically Informed Decisions for Your Child’s Most Critical Years
          </h1>
          <p className="text-lg text-secondary-color" style={{ marginBottom: 36, maxWidth: 650, margin: '0 auto 36px' }}>
            Designed specifically for Pakistani families. Align your child’s daily play and milestones directly with developmental pediatric science (0 to 5 Years).
          </p>
          <div className="flex align-center gap-16" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/onboarding')} 
              className="btn btn-primary btn-lg"
              style={{ boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.2)' }}
            >
              Create Free Child Profile
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-secondary btn-lg"
            >
              Explore Demo Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Scientific Trust Logostrip */}
      <section className="trust-logo-strip">
        <div className="container">
          <p className="text-xs text-muted-color font-semibold" style={{ textAlign: 'center', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Built on research foundations established by
          </p>
          <div className="logo-grid">
            {researchSources.map(source => (
              <div 
                key={source.id} 
                className="logo-placeholder" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/research')}
                title={source.name}
              >
                {source.logoText}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars / Value Prop */}
      <section className="container" style={{ paddingBottom: 80, paddingTop: 40 }}>
        <h2 className="text-3xl font-semibold" style={{ textAlign: 'center', marginBottom: 48, color: 'var(--text-primary)' }}>
          Why Neurish is Different
        </h2>
        <div className="grid grid-3">
          <div className="card" style={{ borderTop: '4px solid #F59E0B' }}>
            <div style={{ 
              backgroundColor: '#FEF3C7', 
              width: 48, 
              height: 48, 
              borderRadius: 12, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#F59E0B', 
              marginBottom: 16 
            }}>
              <Heart size={24} />
            </div>
            <h3 className="card-title">Pakistani Context</h3>
            <p className="text-sm text-secondary-color">
              Milestones and activities adapted for local family settings, available resources, and multi-generational joint households.
            </p>
          </div>
          <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
            <div style={{ 
              backgroundColor: 'var(--primary-light)', 
              width: 48, 
              height: 48, 
              borderRadius: 12, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--primary)', 
              marginBottom: 16 
            }}>
              <Award size={24} />
            </div>
            <h3 className="card-title">Evidence-Based Guidelines</h3>
            <p className="text-sm text-secondary-color">
              Every activity, article, and milestone checklist is sourced from verified scientific pediatric organizations (CDC, WHO, Harvard Center).
            </p>
          </div>
          <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
            <div style={{ 
              backgroundColor: 'var(--primary-light)', 
              width: 48, 
              height: 48, 
              borderRadius: 12, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--primary)', 
              marginBottom: 16 
            }}>
              <LayoutDashboard size={24} />
            </div>
            <h3 className="card-title">Age-Personalized</h3>
            <p className="text-sm text-secondary-color">
              No generic tips. Recommendations align precisely with your child's physical age and your parenting concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 0', backgroundColor: 'white', marginTop: 'auto' }}>
        <div className="container flex justify-between align-center flex-col" style={{ gap: 16, width: '100%' }}>
          <p className="text-sm text-muted-color">© 2026 Neurish Parenting Platform. All rights reserved.</p>
          <p className="text-xs text-muted-color" style={{ textAlign: 'center', maxWidth: '600px' }}>
            This is a startup-grade demonstration showcasing UX architecture, interactive flows, and evidence-based personalization.
          </p>
        </div>
      </footer>
    </div>
  );
}
