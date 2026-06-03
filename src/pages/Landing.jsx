import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  Brain, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  Check, 
  AlertTriangle,
  Compass,
  Smile,
  Activity,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import NeuralNetwork from '../components/NeuralNetwork';
import './Landing.css';

// --- Local Count-Up Statistic Component ---
function Counter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    // Cap increment time to prevent freeze
    incrementTime = Math.max(incrementTime, 16); 

    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, value, duration]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { researchSources, activities } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCheckAge, setActiveCheckAge] = useState('0–1');
  const [activePreviewAge, setActivePreviewAge] = useState('0-1');

  // Track scroll for sticky navbar glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 1. Quick Development Check Dataset (Standardized with Sources & Evidence) ---
  const devChecks = {
    '0–1': {
      age: '0-1 Year (Infant)',
      focus: 'Cognitive Wiring & Motor Basics',
      milestones: [
        'Recognizes and responds to familiar voices and sounds',
        'Tracks moving objects visually and reaches for toys',
        'Brings hands to mouth and pushes up when lying on tummy'
      ],
      activity: {
        title: 'Serve & Return Eye-Contact Play',
        desc: 'Engage in synchronized smiling, babbling, and mimicry during tummy time.',
        duration: '5–10 mins'
      },
      source: 'CDC Act Early & Harvard Center',
      evidenceLevel: 'Level I (Systematic Reviews & RCTs)',
      sourceUrl: 'https://www.cdc.gov/ncbddd/actearly'
    },
    '1–2': {
      age: '1-2 Years (Toddler)',
      focus: 'Language Emergence & Fine Motor',
      milestones: [
        'Points to objects to show interest or ask for them',
        'Says several single words (e.g. Mama, Baba, water)',
        'Walks independently and begins exploring vertical space'
      ],
      activity: {
        title: 'Kitchen Sensory Exploration',
        desc: 'Narrating sensory details of safe household items (soft cloth, bumpy bowls).',
        duration: '10–15 mins'
      },
      source: 'American Academy of Pediatrics (AAP)',
      evidenceLevel: 'Level I',
      sourceUrl: 'https://www.aap.org'
    },
    '2–3': {
      age: '2-3 Years (Early Preschooler)',
      focus: 'Social Emulation & Spatial Logic',
      milestones: [
        'Follows simple two-step instructions',
        'Begins cooperative play and copies other peers',
        'Stacks towers of 4-6 blocks, demonstrating basic gravity reasoning'
      ],
      activity: {
        title: 'Interactive Shape Sorting',
        desc: 'Using dynamic shoe-box shape sorters to develop cognitive sorting rules.',
        duration: '15 mins'
      },
      source: 'UNICEF Parenting Guide',
      evidenceLevel: 'Level I',
      sourceUrl: 'https://www.unicef.org/parenting'
    },
    '3–5': {
      age: '3-5 Years (Preschooler)',
      focus: 'Emotional Regulation & Executive Power',
      milestones: [
        'Expresses a wide range of emotions and begins naming them',
        'Speaks in descriptive sentences of 4-5 words',
        'Can stand on one foot for up to 3-5 seconds'
      ],
      activity: {
        title: 'Emotion Face Mirror Mimic',
        desc: 'Looking in a mirror together and mimicking emotions (happy, surprised, sad).',
        duration: '10 mins'
      },
      source: 'WHO Physical & Cognitive Milestones',
      evidenceLevel: 'Level I',
      sourceUrl: 'https://www.who.int'
    },
    '5+': {
      age: '5+ Years (School-Age)',
      focus: 'Logical Categorization & Language Fluency',
      milestones: [
        'Counts 10 or more objects and names 4+ colors',
        'Speaks very clearly, using full complex sentences',
        'Demonstrates independence in dressing and eating'
      ],
      activity: {
        title: 'Nature Sorting Classification',
        desc: 'Gathering and classifying garden leaves or pebbles by texture, color, and size.',
        duration: '20 mins'
      },
      source: 'Harvard Center on the Developing Child',
      evidenceLevel: 'Level II (Cohort Studies)',
      sourceUrl: 'https://developingchild.harvard.edu'
    }
  };

  // --- 2. Parenting Challenges Dataset ---
  const challenges = [
    {
      topic: 'Tantrums',
      icon: <ShieldAlert size={28} />,
      concern: 'My toddler has sudden intense crying fits and hits the floor.',
      solution: 'Neurish guides you to identify emotional triggers, teach basic feeling labels, and establish co-regulation zones.'
    },
    {
      topic: 'Screen Time',
      icon: <Brain size={28} />,
      concern: 'I feel guilty using screens but need time to complete house chores.',
      solution: 'We offer healthy screen-time limits by age and suggest high-stimulus, low-tech alternatives.'
    },
    {
      topic: 'Speech Development',
      icon: <Sparkles size={28} />,
      concern: 'My 18-month-old only makes sounds and does not speak clear words.',
      solution: 'Our server-and-return communication exercises and kitchen narration guides help build vocabulary faster.'
    },
    {
      topic: 'Sleep Issues',
      icon: <HelpCircle size={28} />,
      concern: 'Bedtime is a struggle and my baby wakes up multiple times a night.',
      solution: 'Neurish provides science-backed sleep hygiene routines based on WHO infant sleep guidelines.'
    },
    {
      topic: 'Emotional Regulation',
      icon: <Smile size={28} />,
      concern: 'How do I help my child handle intense frustration when play goes wrong?',
      solution: 'We supply sensory calming cards and guided breathing games validated by pediatric psychology boards.'
    },
    {
      topic: 'Learning Through Play',
      icon: <Activity size={28} />,
      concern: 'What toys and activities actually support cognitive learning instead of just noise?',
      solution: 'Every play layout we suggest targets spatial logic, categorization, or fine motor strength.'
    }
  ];

  // --- 3. Roadmap Nodes ---
  const roadmapNodes = [
    { stage: 'Birth', title: 'Sensory Bonding', desc: 'Eye tracking, response to voices, and head control foundation.' },
    { stage: 'Language', title: 'Vocal Expansion', desc: 'From basic babbling to expressive descriptive vocabulary.' },
    { stage: 'Social Skills', title: 'Emotional Mirroring', desc: 'Understanding facial cues, empathy, and peer play patterns.' },
    { stage: 'Problem Solving', title: 'Spatial Reasoning', desc: 'Block construction, sorting, and shape classification logic.' },
    { stage: 'Confidence', title: 'Self-Determination', desc: 'Task independence, dressing, and expressing creative choices.' },
    { stage: 'Future Success', title: 'Cognitive Ready', desc: 'Prepared with resilience, executive function, and motor coordination.' }
  ];

  // --- 4. Parenting Myths vs Science Dataset ---
  const myths = [
    {
      myth: 'More screen time helps babies learn language faster.',
      science: 'Real-world, serve-and-return interaction is the primary biological driver for early language development.',
      source: 'American Academy of Pediatrics (AAP)',
      evidenceLevel: 'Level I',
      sourceUrl: 'https://www.aap.org'
    },
    {
      myth: 'Tantrums are a sign of bad behavior or poor parenting.',
      science: 'Tantrums are natural emotional regulation limits. Toddlers feel big feelings before their brain is wired to speak them.',
      source: 'Harvard Center on the Developing Child',
      evidenceLevel: 'Level I',
      sourceUrl: 'https://developingchild.harvard.edu'
    },
    {
      myth: 'Children naturally build communication skills without parental support.',
      science: 'Conversational turn-taking between parents and children physically shapes the child\'s white-matter language tracts.',
      source: 'National Institutes of Health (NIH)',
      evidenceLevel: 'Level I',
      sourceUrl: 'https://www.nih.gov'
    }
  ];

  // Filter activities from context or use fallbacks for Preview
  const previewActivity = activities.find(act => {
    // Map age selector groups to activities ageGroups
    const ageMap = {
      '0-1': '0–1 Year',
      '1-2': '1–2 Years',
      '2-3': '2–3 Years',
      '3-5': '3–5 Years',
      '5+': '5+ Years'
    };
    return act.ageGroup === ageMap[activePreviewAge];
  }) || activities[0];

  return (
    <div className="lp-body">
      
      {/* SECTION 1: STICKY NAVBAR */}
      <header className={`lp-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="lp-container lp-flex-row lp-justify-between lp-align-center">
          <div className="lp-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="lp-logo-icon">N</div>
            <span>Neurish</span>
          </div>
          <nav className="lp-nav-links">
            <span className="lp-nav-link active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</span>
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

      {/* SECTION 2: HERO SECTION */}
      <section className="lp-hero">
        <div className="lp-container">
          <div className="lp-grid-2 lp-hero-grid">
            
            {/* Left Side Copy */}
            <div className="lp-hero-left">
              <div className="lp-badge">Research-Backed Early Childhood Development</div>
              <h1 className="lp-hero-title">
                The First Research-Backed Parenting Platform <span className="lp-text-gradient">Built For Growing Minds</span>
              </h1>
              <p className="lp-hero-subtitle">
                Personalized developmental guidance, milestone tracking, and science-backed parenting tools designed for the years that matter most.
              </p>
              
              <div className="lp-hero-buttons">
                <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/onboarding')}>
                  Start Your Child's Journey <ChevronRight size={18} />
                </button>
                <button className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/research')}>
                  Explore Research
                </button>
              </div>

              <div className="lp-hero-trust">
                <div className="lp-trust-label">Aligned with Global Authorities</div>
                <div className="lp-trust-logos">
                  <span className="lp-trust-logo" title="World Health Organization">WHO</span>
                  <span className="lp-trust-logo" title="UNICEF Child Learning">UNICEF</span>
                  <span className="lp-trust-logo" title="Centers for Disease Control">CDC</span>
                  <span className="lp-trust-logo" title="American Academy of Pediatrics">AAP</span>
                </div>
              </div>
            </div>

            {/* Right Side Three.js Interactive Visual */}
            <div className="lp-hero-right">
              <NeuralNetwork />
              <div className="lp-visual-tip">
                <div className="lp-visual-tip-dot"></div>
                <span className="lp-visual-tip-text">Hover to interact with the growing neural connections</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK DEVELOPMENT CHECK (NEW) */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Quick Development Check</h2>
            <p className="lp-section-subtitle">
              See what developmental milestones matter most for your child's age group. Select an age below to view guidelines.
            </p>
          </div>

          <div className="lp-dev-check-card">
            <div className="lp-age-tabs">
              {Object.keys(devChecks).map((ageKey) => (
                <button 
                  key={ageKey} 
                  className={`lp-age-tab ${activeCheckAge === ageKey ? 'active' : ''}`}
                  onClick={() => setActiveCheckAge(ageKey)}
                >
                  Age {ageKey}
                </button>
              ))}
            </div>

            <div className="lp-dc-results">
              
              {/* Focus & Milestones */}
              <div className="lp-dc-col">
                <h4>
                  <Brain size={18} className="lp-text-primary-color" />
                  <span>{devChecks[activeCheckAge].age} Focus</span>
                </h4>
                <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--lp-primary)', marginBottom: '16px' }}>
                  {devChecks[activeCheckAge].focus}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--lp-text-secondary)', marginBottom: '12px' }}>
                  Key Developmental Milestones:
                </p>
                <ul className="lp-dc-list">
                  {devChecks[activeCheckAge].milestones.map((milestone, idx) => (
                    <li key={idx}>{milestone}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Activity */}
              <div className="lp-dc-col">
                <h4>
                  <Activity size={18} style={{ color: 'var(--lp-accent)' }} />
                  <span>Recommended Activity</span>
                </h4>
                <div className="lp-dc-activity-box">
                  <div className="lp-dc-activity-title">{devChecks[activeCheckAge].activity.title}</div>
                  <div className="lp-dc-activity-benefit">{devChecks[activeCheckAge].activity.desc}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lp-text-light)' }}>
                  Duration: {devChecks[activeCheckAge].activity.duration}
                </div>
              </div>

              {/* Scientific Trust Info */}
              <div className="lp-dc-col">
                <h4>
                  <Award size={18} className="lp-text-primary-color" />
                  <span>Scientific Trust Check</span>
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--lp-text-secondary)' }}>
                  This guideline is verified and compiled by pediatric institutions:
                </p>
                <div className="lp-dc-evidence">
                  Evidence Level: {devChecks[activeCheckAge].evidenceLevel}
                </div>
                <div className="lp-dc-reference">
                  Source: <strong>{devChecks[activeCheckAge].source}</strong>
                  <br />
                  Learn more at:{' '}
                  <a href={devChecks[activeCheckAge].sourceUrl} target="_blank" rel="noopener noreferrer">
                    {devChecks[activeCheckAge].sourceUrl}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY THE FIRST FIVE YEARS MATTER */}
      <section className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Why the First Five Years Matter</h2>
            <p className="lp-section-subtitle">
              Scientific research confirms that early childhood experiences lay the physical foundation for all future learning, behavior, and health.
            </p>
          </div>

          <div className="lp-stats-grid">
            <div className="lp-stat-card">
              <div className="lp-stat-num">
                <Counter value="90%" />
              </div>
              <h3 className="lp-stat-title">Brain Development Before Age 5</h3>
              <p className="lp-stat-desc">
                By age five, a child's brain has developed 90% of its adult volume. These years represent the highest rate of synaptic density formation.
              </p>
              <div style={{ fontSize: '11px', color: 'var(--lp-text-light)', marginTop: '16px' }}>
                Source: Harvard Center on the Developing Child (Evidence Level I)
              </div>
            </div>

            <div className="lp-stat-card">
              <div className="lp-stat-num">
                <Counter value="1M" />
              </div>
              <h3 className="lp-stat-title">New Connections Every Second</h3>
              <p className="lp-stat-desc">
                Millions of new neural connections (synapses) form every single second in the early years, stimulated by communication loops.
              </p>
              <div style={{ fontSize: '11px', color: 'var(--lp-text-light)', marginTop: '16px' }}>
                Source: Centers for Disease Control (CDC) (Evidence Level I)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PARENTING CHALLENGES */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Parenting Challenges</h2>
            <p className="lp-section-subtitle">
              Early parenting is full of complex decisions. Hover over the cards below to see how Neurish translates scientific studies into everyday help.
            </p>
          </div>

          <div className="lp-challenge-grid">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="lp-challenge-card">
                <div className="lp-challenge-icon">{challenge.icon}</div>
                <h3>{challenge.topic}</h3>
                <span className="lp-challenge-prompt">Hover to see concern & help</span>
                
                <div className="lp-challenge-expansion">
                  <div className="lp-concern-box">
                    <div className="lp-concern-label">Parent Concern</div>
                    <div className="lp-concern-text">{challenge.concern}</div>
                  </div>
                  <div className="lp-solution-box">
                    <div className="lp-solution-label">How Neurish Helps</div>
                    <div className="lp-solution-text">{challenge.solution}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW NEURISH WORKS */}
      <section className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">How Neurish Works</h2>
            <p className="lp-section-subtitle">
              Three steps to aligning your parenting moments with clinical pediatric science.
            </p>
          </div>

          <div className="lp-timeline">
            
            <div className="lp-timeline-step">
              <div className="lp-timeline-dot"></div>
              <div className="lp-timeline-content">
                <div className="lp-timeline-num">Step 01</div>
                <h3 className="lp-timeline-title">Create Child Profile</h3>
                <p className="lp-timeline-desc">
                  Input your child's age and select specific focus areas (like screen time limits, motor skills, or language development).
                </p>
              </div>
            </div>

            <div className="lp-timeline-step">
              <div className="lp-timeline-dot"></div>
              <div className="lp-timeline-content">
                <div className="lp-timeline-num">Step 02</div>
                <h3 className="lp-timeline-title">Track Development</h3>
                <p className="lp-timeline-desc">
                  Check off weekly cognitive and motor milestones directly linked to clinical pediatrics checklists (CDC/WHO).
                </p>
              </div>
            </div>

            <div className="lp-timeline-step">
              <div className="lp-timeline-dot"></div>
              <div className="lp-timeline-content">
                <div className="lp-timeline-num">Step 03</div>
                <h3 className="lp-timeline-title">Receive Personalized Guidance</h3>
                <p className="lp-timeline-desc">
                  Get high-impact play activities and evidence-based tips matching your child's precise development pace.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: DEVELOPMENT JOURNEY */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Development Journey Roadmap</h2>
            <p className="lp-section-subtitle">
              A child's trajectory from birth to school readiness. Scroll horizontally to explore the milestone roadmap.
            </p>
          </div>

          <div className="lp-roadmap-container">
            <div className="lp-roadmap-flow">
              {roadmapNodes.map((node, idx) => (
                <div key={idx} className="lp-roadmap-node">
                  <div className="lp-roadmap-dot-wrapper">
                    <Compass size={32} style={{ color: idx % 2 === 0 ? 'var(--lp-primary)' : 'var(--lp-accent)' }} />
                  </div>
                  <span className="lp-roadmap-stage">{node.stage}</span>
                  <div className="lp-roadmap-focus">{node.title}</div>
                  <p className="lp-roadmap-desc">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: ACTIVITY PREVIEW */}
      <section className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Explore Science-Backed Activities</h2>
            <p className="lp-section-subtitle">
              Preview high-impact co-play activities designed to boost cognitive connections.
            </p>
          </div>

          <div className="lp-age-tabs" style={{ marginBottom: 40 }}>
            {['0-1', '1-2', '2-3', '3-5', '5+'].map((age) => (
              <button 
                key={age} 
                className={`lp-age-tab ${activePreviewAge === age ? 'active' : ''}`}
                onClick={() => setActivePreviewAge(age)}
              >
                {age} Years
              </button>
            ))}
          </div>

          {previewActivity && (
            <div className="lp-preview-card-wrapper">
              <div className="lp-preview-left">
                <div className="lp-preview-meta">
                  <span className="lp-preview-meta-tag">{previewActivity.category}</span>
                  <span className="lp-preview-meta-tag amber">{previewActivity.involvement} involvement</span>
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{previewActivity.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--lp-text-secondary)', marginBottom: '24px' }}>
                  {previewActivity.benefit}
                </p>
                
                <div style={{ fontSize: '13px', borderTop: '1px solid rgba(226, 232, 240, 0.8)', paddingTop: '16px' }}>
                  <strong>Source Authorization:</strong>
                  <div style={{ color: 'var(--lp-text-light)', marginTop: '4px', fontStyle: 'italic' }}>
                    {previewActivity.reference}
                  </div>
                </div>
              </div>

              <div className="lp-preview-right">
                <div className="lp-preview-activity-header">
                  <span className="lp-p-instructions-title">Activity Play Guide</span>
                  <span className="lp-preview-duration">Est. Duration: {previewActivity.duration}</span>
                </div>
                <p className="lp-p-instructions">{previewActivity.instructions}</p>
                <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'var(--lp-surface)', borderRadius: '6px', border: '1px solid var(--lp-border)' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--lp-primary)', textTransform: 'uppercase' }}>Setup Items</span>
                  <p style={{ fontSize: '12px', color: 'var(--lp-text-secondary)', marginTop: '4px' }}>{previewActivity.setup}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 9: SCIENCE & TRUST */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Built On Science. Not Opinions.</h2>
            <p className="lp-section-subtitle">
              Neurish does not rely on parenting blogs. We host data compiled from the world's leading academic and clinical pediatric bodies.
            </p>
          </div>

          <div className="lp-science-grid">
            {researchSources.slice(0, 6).map((source) => (
              <div key={source.id} className="lp-science-card">
                <span className="lp-sc-logo-tag">{source.logoText}</span>
                <h3 className="lp-sc-name">{source.name}</h3>
                <span className="lp-sc-category">{source.category}</span>
                <p className="lp-sc-desc">{source.description}</p>
                <div className="lp-sc-focus">
                  <strong>Research Focus Area:</strong>
                  <span>{source.researchFocus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: PARENTING MYTHS VS SCIENCE (NEW) */}
      <section className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Parenting Myths vs. Science</h2>
            <p className="lp-section-subtitle">
              We separate clinical fact from popular parenting opinions to provide clear, actionable rules.
            </p>
          </div>

          <div className="lp-grid-3">
            {myths.map((item, idx) => (
              <div key={idx} className="lp-myth-card">
                
                {/* Myth Side */}
                <div className="lp-myth-side">
                  <div className="lp-myth-label">
                    <AlertTriangle size={10} style={{ marginRight: 4 }} /> Common Myth
                  </div>
                  <h4 className="lp-myth-title">"{item.myth}"</h4>
                </div>

                {/* Science Side */}
                <div className="lp-science-side">
                  <div className="lp-science-label">
                    <Check size={10} style={{ marginRight: 4 }} /> Medical Science
                  </div>
                  <p className="lp-science-title">{item.science}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTop: '1px solid rgba(226, 232, 240, 0.5)', paddingTop: 10 }}>
                    <span style={{ fontSize: '10px', color: 'var(--lp-text-light)' }}>
                      Source: <strong>{item.source}</strong>
                    </span>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--lp-primary)', backgroundColor: 'var(--lp-primary-light)', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.evidenceLevel}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: NEURISH VS TRADITIONAL PARENTING */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Why Neurish is Different</h2>
            <p className="lp-section-subtitle">
              Traditional parenting advice is scattered and opinion-based. Neurish offers structured, evidence-backed clinical surveillance.
            </p>
          </div>

          <div className="lp-comparison-card">
            <table className="lp-comp-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Traditional Advice</th>
                  <th>Neurish Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="lp-comp-feature">Methodology</td>
                  <td className="lp-comp-bad">Opinion-based columns, forum blogs, and anecdotes.</td>
                  <td className="lp-comp-good">
                    <strong>Evidence-Based</strong>
                    Directly sourced from CDC and Harvard Center guidelines.
                  </td>
                </tr>
                <tr>
                  <td className="lp-comp-feature">Personalization</td>
                  <td className="lp-comp-bad">Generic checklists by age year that ignore individual speed.</td>
                  <td className="lp-comp-good">
                    <strong>Age-Specific Guidance</strong>
                    Personalized to monthly intervals and parent focus concerns.
                  </td>
                </tr>
                <tr>
                  <td className="lp-comp-feature">Actionability</td>
                  <td className="lp-comp-bad">Static articles suggesting vague things like "talk to your child".</td>
                  <td className="lp-comp-good">
                    <strong>Development Tracking</strong>
                    Play guide instructions with setup lists and duration tracking.
                  </td>
                </tr>
                <tr>
                  <td className="lp-comp-feature">Content Updates</td>
                  <td className="lp-comp-bad">Unstructured suggestions often pushing commercial toys.</td>
                  <td className="lp-comp-good">
                    <strong>Personalized Recommendations</strong>
                    Real-time updates tailored to developmental delay detection indexes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 12: FINAL CTA */}
      <section className="lp-section-alt" style={{ borderBottom: 'none' }}>
        <div className="lp-container">
          <div className="lp-cta-box">
            <h2 className="lp-cta-title">Every Child Deserves The Right Start.</h2>
            <p className="lp-cta-text">
              The experiences children have today shape the adults they become tomorrow. Open your child's free profile and align their play with developmental science.
            </p>
            <button className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/onboarding')}>
              Create Free Child Profile <ArrowRight size={18} style={{ color: 'var(--lp-primary)' }} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-grid">
            
            <div className="lp-footer-brand">
              <div className="lp-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="lp-logo-icon">N</div>
                <span>Neurish</span>
              </div>
              <p className="lp-footer-desc">
                Neurish is a startup-grade demonstration showcasing pediatric development tracking, interactive play guides, and clinical surveillance overlays.
              </p>
            </div>

            <div className="lp-footer-links-col">
              <h4>Platform</h4>
              <span onClick={() => navigate('/learn')}>Learn</span>
              <span onClick={() => navigate('/activities')}>Activities</span>
              <span onClick={() => navigate('/research')}>Research Center</span>
            </div>

            <div className="lp-footer-links-col">
              <h4>Company</h4>
              <span onClick={() => navigate('/about')}>About Us</span>
              <span onClick={() => navigate('/contact')}>Contact Support</span>
              <span>Terms of Service</span>
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
              Disclaimer: Neurish does not provide medical diagnostics. Every play exercise is intended for developmental stimulation under parent guidance. Consult a medical professional for developmental delays.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
