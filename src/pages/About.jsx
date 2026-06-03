import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import './Landing.css';

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lp-body">
      {/* Sticky Glassmorphism Navbar */}
      <header className="lp-navbar">
        <div className="lp-container lp-flex-row lp-justify-between lp-align-center">
          <div className="lp-logo" onClick={() => navigate('/')}>
            <div className="lp-logo-icon">N</div>
            <span>Neurish</span>
          </div>
          <nav className="lp-nav-links">
            <span className="lp-nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="lp-nav-link" onClick={() => navigate('/learn')}>Learn</span>
            <span className="lp-nav-link" onClick={() => navigate('/activities')}>Activities</span>
            <span className="lp-nav-link" onClick={() => navigate('/research')}>Research</span>
            <span className="lp-nav-link active" onClick={() => navigate('/about')}>About</span>
          </nav>
          <div className="lp-nav-actions">
            <button className="lp-btn-text" onClick={() => navigate('/onboarding')}>Login</button>
            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/onboarding')}>Get Started</button>
          </div>
        </div>
      </header>

      {/* About Hero Section */}
      <section className="lp-about-hero">
        <div className="lp-container">
          <div className="lp-badge">Our Mission</div>
          <h1 className="lp-about-title">
            Empowering Parents with <span className="lp-text-gradient">Pediatric Neuroscience</span>
          </h1>
          <p className="lp-about-subtitle">
            We bridge the gap between complex developmental science and daily parenting, translating neuroscientific research into small, actionable moments that shape your child's future.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="lp-about-values">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">The Principles That Guide Us</h2>
            <p className="lp-section-subtitle">Neurish was founded on three non-negotiable pillars of trust, credibility, and empathy.</p>
          </div>
          <div className="lp-grid-3">
            <div className="lp-value-card">
              <div className="lp-value-icon-wrapper lp-icon-teal">
                <ShieldCheck size={28} />
              </div>
              <h3 className="lp-value-title">Rigorous Science</h3>
              <p className="lp-value-text">
                Every milestone, tip, and activity in Neurish is backed by premier global authorities. We do not publish opinions, untested trends, or unsourced parenting theories.
              </p>
            </div>
            <div className="lp-value-card">
              <div className="lp-value-icon-wrapper lp-icon-amber">
                <Heart size={28} />
              </div>
              <h3 className="lp-value-title">Actionable Simplicity</h3>
              <p className="lp-value-text">
                We understand that parents are busy. We break down complex neuroscientific studies into simple, 5-to-15 minute daily exercises that fit naturally into your routine.
              </p>
            </div>
            <div className="lp-value-card">
              <div className="lp-value-icon-wrapper lp-icon-blue">
                <Award size={28} />
              </div>
              <h3 className="lp-value-title">Inclusion & Context</h3>
              <p className="lp-value-text">
                Designed for multi-generational families and diverse resource environments. Neurish provides flexible play setups that work in any home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Framework Section */}
      <section className="lp-about-framework">
        <div className="lp-container lp-flex-row lp-about-framework-grid">
          <div className="lp-framework-left">
            <div className="lp-badge">Scientific Base</div>
            <h2 className="lp-framework-title">Translating Brain Development to Practice</h2>
            <p className="lp-framework-desc">
              During the first five years, a child's brain forms millions of connections per second. This neural architecture is built through "serve and return" interactions—responsive communication between children and caregivers.
            </p>
            <p className="lp-framework-desc">
              Neurish acts as a real-time translator, showing you exactly how and when to "return the serve" based on standardized cognitive, language, social-emotional, and motor milestones.
            </p>
            <div className="lp-framework-stats">
              <div className="lp-fw-stat">
                <span className="lp-fw-number">0-5</span>
                <span className="lp-fw-label">Years of critical development</span>
              </div>
              <div className="lp-fw-stat">
                <span className="lp-fw-number">100%</span>
                <span className="lp-fw-label">Evidence-based activities</span>
              </div>
            </div>
          </div>
          <div className="lp-framework-right">
            <div className="lp-framework-card">
              <div className="lp-fw-badge">Trusted Sources Included</div>
              <ul className="lp-fw-list">
                <li>
                  <strong>Harvard Center on the Developing Child</strong>
                  <span>Focus: Brain architecture & executive function development.</span>
                </li>
                <li>
                  <strong>World Health Organization (WHO)</strong>
                  <span>Focus: Physical activity, sleep guidelines, and global development standards.</span>
                </li>
                <li>
                  <strong>Centers for Disease Control (CDC)</strong>
                  <span>Focus: Developmental milestone surveillance indices.</span>
                </li>
                <li>
                  <strong>UNICEF & AAP</strong>
                  <span>Focus: Socio-emotional support and play-based cognitive stimulation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-about-cta">
        <div className="lp-container lp-cta-box">
          <h2 className="lp-cta-title">Join Us in Raising the Next Generation</h2>
          <p className="lp-cta-text">
            Give your child the biological advantage of positive, developmental interactions starting today.
          </p>
          <div className="lp-flex-row lp-justify-center" style={{ gap: 16 }}>
            <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/onboarding')}>
              Create Free Child Profile <ArrowRight size={18} />
            </button>
            <button className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/research')}>
              Explore Research
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <div className="lp-logo" onClick={() => navigate('/')}>
                <div className="lp-logo-icon">N</div>
                <span>Neurish</span>
              </div>
              <p className="lp-footer-desc">
                The first research-backed parenting platform built for growing minds. Providing personalized child development tools.
              </p>
            </div>
            <div className="lp-footer-links-col">
              <h4>Navigation</h4>
              <span onClick={() => navigate('/')}>Home</span>
              <span onClick={() => navigate('/learn')}>Learn</span>
              <span onClick={() => navigate('/activities')}>Activities</span>
              <span onClick={() => navigate('/research')}>Research Center</span>
              <span onClick={() => navigate('/about')}>About</span>
            </div>
            <div className="lp-footer-links-col">
              <h4>Legal & Info</h4>
              <span onClick={() => navigate('/contact')}>Contact Us</span>
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
              <span>Evidence Levels</span>
            </div>
            <div className="lp-footer-newsletter">
              <h4>Join our Science Newsletter</h4>
              <p>Get the latest pediatric brain research simplified for your child's age group.</p>
              <form className="lp-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <p>© 2026 Neurish Parenting Platform. All rights reserved.</p>
            <p className="lp-footer-disclaimer">
              Disclaimer: The information provided on Neurish is for educational purposes only. It is not a substitute for professional pediatric medical advice, diagnosis, or treatment. Always consult with a qualified health provider.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
