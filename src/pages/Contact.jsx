import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageSquare, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import './Landing.css';

export default function Contact() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Parent',
    subject: 'General Inquiry',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 600);
  };

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
            <span className="lp-nav-link" onClick={() => navigate('/about')}>About</span>
          </nav>
          <div className="lp-nav-actions">
            <button className="lp-btn-text" onClick={() => navigate('/onboarding')}>Login</button>
            <button className="lp-btn lp-btn-primary" onClick={() => navigate('/onboarding')}>Get Started</button>
          </div>
        </div>
      </header>

      {/* Contact Main Content */}
      <section className="lp-contact-section">
        <div className="lp-container lp-flex-row lp-contact-grid">
          
          {/* Left Column: Contact Info */}
          <div className="lp-contact-info-col">
            <div className="lp-badge">Get in Touch</div>
            <h1 className="lp-contact-title">We’d Love to Hear From You</h1>
            <p className="lp-contact-subtitle">
              Whether you are a parent with feedback, a pediatrician interested in our science framework, or an investor looking to join our journey, reach out to our team.
            </p>

            <div className="lp-contact-methods">
              <div className="lp-contact-method-card">
                <div className="lp-cm-icon lp-icon-teal">
                  <Mail size={22} />
                </div>
                <div className="lp-cm-details">
                  <h4>Email Us</h4>
                  <p>support@neurish.co</p>
                  <span>We reply within 24 business hours.</span>
                </div>
              </div>

              <div className="lp-contact-method-card">
                <div className="lp-cm-icon lp-icon-amber">
                  <MessageSquare size={22} />
                </div>
                <div className="lp-cm-details">
                  <h4>Medical Advisory Board</h4>
                  <p>science@neurish.co</p>
                  <span>For pediatricians, researchers, and scientific partners.</span>
                </div>
              </div>

              <div className="lp-contact-method-card">
                <div className="lp-cm-icon lp-icon-blue">
                  <ShieldCheck size={22} />
                </div>
                <div className="lp-cm-details">
                  <h4>Privacy & Safety</h4>
                  <p>safety@neurish.co</p>
                  <span>For inquiries related to child data security compliance.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lp-contact-form-col">
            <div className="lp-form-card">
              {formSubmitted ? (
                <div className="lp-form-success">
                  <div className="lp-success-icon-wrapper">
                    <CheckCircle2 size={48} className="lp-success-icon" />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out to Neurish. One of our team members will get back to you shortly.</p>
                  <button className="lp-btn lp-btn-primary" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="lp-contact-form">
                  <h3 className="lp-form-title">Send a Message</h3>
                  
                  <div className="lp-form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your name" 
                    />
                  </div>

                  <div className="lp-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      placeholder="you@example.com" 
                    />
                  </div>

                  <div className="lp-form-row">
                    <div className="lp-form-group lp-col-6">
                      <label htmlFor="role">I am a</label>
                      <select id="role" name="role" value={formData.role} onChange={handleChange}>
                        <option value="Parent">Parent</option>
                        <option value="Pediatrician">Pediatrician / Doctor</option>
                        <option value="Educator">Educator</option>
                        <option value="Researcher">Researcher / Scholar</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="lp-form-group lp-col-6">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Science / Advisory">Science Framework</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnerships">Partnerships</option>
                      </select>
                    </div>
                  </div>

                  <div className="lp-form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button type="submit" className="lp-btn lp-btn-primary lp-btn-block">
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>
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
