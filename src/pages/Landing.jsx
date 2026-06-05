import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, ArrowRight, Brain, Sparkles, ShieldAlert, HelpCircle,
  Check, AlertTriangle, Activity, Award, BookOpen, Moon, Heart, MessageCircle,
  Users, Star, Zap, Eye, TrendingUp, Shield, Home, Search, Leaf, Globe2, Clock, FlaskConical, Smartphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import NeuralNetwork from '../components/NeuralNetwork';
import ChildIllustration from '../components/ChildIllustration';
import BrainSimulator from '../components/BrainSimulator';
import ScrollStoryProgress from '../components/ScrollStoryProgress';
import SectionDivider from '../components/SectionDivider';
import './Landing.css';

// ─── Count-Up Counter ─────────────────────────────────────────────────────────
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const end = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || end === 0) return;
    const totalMs = duration * 1000;
    const step = Math.max(16, Math.floor(totalMs / end));
    const increment = Math.ceil(end / (totalMs / step));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, end);
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Reveal Hook (IntersectionObserver) ──────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.lp-reveal, .lp-reveal-left, .lp-reveal-right, .lp-reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

// ─── Magnetic Button Hook ─────────────────────────────────────────────────────
function MagneticButton({ children, className = '', onClick, id }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);
  return (
    <button ref={ref} id={id} className={`lp-btn-magnetic ${className}`}
      onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}>
      {children}
    </button>
  );
}

// ─── Main Landing Component ───────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const { researchSources, activities } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCheckAge, setActiveCheckAge] = useState('0–1');
  const [activePreviewAge, setActivePreviewAge] = useState('0-1');

  useReveal();

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(sy > 40);
      setScrollProgress(docH > 0 ? sy / docH : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Data ────────────────────────────────────────────────────────────────

  const devChecks = {
    '0–1': {
      age: '0-1 Year (Infant)', focus: 'Cognitive Wiring & Motor Basics',
      milestones: ['Recognizes and responds to familiar voices and sounds', 'Tracks moving objects visually and reaches for toys', 'Brings hands to mouth and pushes up during tummy time'],
      activity: { title: 'Serve & Return Eye-Contact Play', desc: 'Synchronized smiling, babbling, and mimicry during tummy time.', duration: '5–10 mins' },
      source: 'CDC Act Early & Harvard Center', evidenceLevel: 'Level I (Systematic Reviews & RCTs)',
      sourceUrl: 'https://www.cdc.gov/ncbddd/actearly'
    },
    '1–2': {
      age: '1-2 Years (Toddler)', focus: 'Language Emergence & Fine Motor',
      milestones: ['Points to objects to show interest or ask for them', 'Says several single words (e.g. Mama, Baba, water)', 'Walks independently and begins exploring vertical space'],
      activity: { title: 'Kitchen Sensory Exploration', desc: 'Narrating sensory details of safe household items.', duration: '10–15 mins' },
      source: 'American Academy of Pediatrics (AAP)', evidenceLevel: 'Level I',
      sourceUrl: 'https://www.aap.org'
    },
    '2–3': {
      age: '2-3 Years (Early Preschooler)', focus: 'Social Emulation & Spatial Logic',
      milestones: ['Follows simple two-step instructions', 'Begins cooperative play and copies peers', 'Stacks towers of 4-6 blocks, showing gravity reasoning'],
      activity: { title: 'Interactive Shape Sorting', desc: 'Shoe-box shape sorters to develop cognitive sorting rules.', duration: '15 mins' },
      source: 'UNICEF Parenting Guide', evidenceLevel: 'Level I',
      sourceUrl: 'https://www.unicef.org/parenting'
    },
    '3–5': {
      age: '3-5 Years (Preschooler)', focus: 'Emotional Regulation & Executive Power',
      milestones: ['Expresses a wide range of emotions and names them', 'Speaks in descriptive sentences of 4-5 words', 'Can stand on one foot for up to 3-5 seconds'],
      activity: { title: 'Emotion Face Mirror Mimic', desc: 'Mirror together and mimic emotions (happy, surprised, sad).', duration: '10 mins' },
      source: 'WHO Physical & Cognitive Milestones', evidenceLevel: 'Level I',
      sourceUrl: 'https://www.who.int'
    },
    '5+': {
      age: '5+ Years (School-Age)', focus: 'Logical Categorization & Language Fluency',
      milestones: ['Counts 10 or more objects and names 4+ colors', 'Speaks clearly in full complex sentences', 'Demonstrates independence in dressing and eating'],
      activity: { title: 'Nature Sorting Classification', desc: 'Classifying leaves or pebbles by texture, color, and size.', duration: '20 mins' },
      source: 'Harvard Center on the Developing Child', evidenceLevel: 'Level II (Cohort Studies)',
      sourceUrl: 'https://developingchild.harvard.edu'
    }
  };

  const challenges = [
    {
      topic: 'Tantrums', icon: <ShieldAlert size={18} />, 
      hook: '"Why does my toddler just lose it?"',
      concern: 'My toddler has sudden intense crying fits, hits the floor, and nothing seems to calm them.',
      why: 'The prefrontal cortex — the brain\'s emotional brake — is still physically forming in toddlers.',
      science: 'Tantrums are not misbehavior. They\'re neurological overflow. The brain literally cannot process the emotion yet.',
      solution: 'Neurish guides you through co-regulation techniques, emotional labeling games, and calming sensory strategies.'
    },
    {
      topic: 'Screen Time', icon: <Eye size={18} />,
      hook: '"I feel guilty but I need five minutes."',
      concern: 'I feel guilty using screens but need time to complete house chores. What is actually harmful?',
      why: 'Screens replace serve-and-return interactions — the primary driver of early brain connection.',
      science: 'The AAP confirms that background TV reduces parent-child verbal interaction by 56%, directly impacting vocabulary growth.',
      solution: 'We offer age-specific screen-time limits and 5-minute alternative activities that build more in less time.'
    },
    {
      topic: 'Speech Development', icon: <MessageCircle size={18} />,
      hook: '"My 18-month-old isn\'t talking yet."',
      concern: 'My toddler makes sounds but does not speak clear words. Friends\' children the same age speak full sentences.',
      why: 'Language development varies widely. But conversational turns — not passive listening — build vocabulary circuits.',
      science: 'NIH research shows that children who experience more conversational turn-taking develop significantly stronger language networks.',
      solution: 'Our narration guides and serve-and-return exercises add hundreds of extra vocabulary turns per day.'
    },
    {
      topic: 'Sleep Struggles', icon: <Moon size={18} />,
      hook: '"Bedtime has become a battle."',
      concern: 'Bedtime is a struggle every night and my baby wakes multiple times. We are exhausted.',
      why: 'Inconsistent pre-sleep signals prevent melatonin production. The brain needs rituals to shift into sleep mode.',
      science: 'WHO infant sleep guidelines confirm that consistent wind-down rituals reduce sleep latency by up to 37%.',
      solution: 'Neurish provides age-calibrated bedtime routine cards backed by pediatric sleep research.'
    },
    {
      topic: 'Emotional Regulation', icon: <Heart size={18} />,
      hook: '"How do I help when play goes wrong?"',
      concern: 'My child cannot handle losing at games or when something breaks. The frustration becomes intense.',
      why: 'Frustration tolerance is a learned skill. Without modeling, children cannot self-regulate intense negative feelings.',
      science: 'Pediatric psychology confirms that co-regulation — adults modeling calm — is the primary pathway to self-regulation.',
      solution: 'We supply sensory calming cards and breathing games validated by pediatric psychology boards.'
    },
    {
      topic: 'Play vs. Learning', icon: <Activity size={18} />,
      hook: '"Are we using the right activities?"',
      concern: 'What toys and activities actually support cognitive learning instead of just keeping them busy?',
      why: 'Most toys are designed for entertainment, not for stimulating the specific neural pathways that matter in early development.',
      science: 'Harvard research shows that open-ended play that challenges categorization and spatial logic builds executive function far better than screen-based learning.',
      solution: 'Every activity in Neurish targets specific cognitive or motor milestones with setup guides and duration tracking.'
    },
  ];

  const myths = [
    {
      myth: 'More screen time helps babies learn language faster.',
      science: 'Real-world serve-and-return interaction is the primary biological driver for early language development. Screens cannot substitute this.',
      source: 'American Academy of Pediatrics (AAP)', evidenceLevel: 'Level I',
    },
    {
      myth: 'Tantrums are a sign of bad parenting or a spoiled child.',
      science: 'Tantrums are natural emotional regulation limits. Toddlers feel big feelings before their brain is physically wired to express them.',
      source: 'Harvard Center on the Developing Child', evidenceLevel: 'Level I',
    },
    {
      myth: 'Children naturally build communication skills on their own.',
      science: 'Conversational turn-taking between parents and children physically shapes white-matter language tracts in the brain.',
      source: 'National Institutes of Health (NIH)', evidenceLevel: 'Level I',
    },
  ];

  const roadmapNodes = [
    { statement: 'I Feel Safe', desc: 'Secure attachment and consistent emotional presence build the foundation.', icon: <Home size={18} /> },
    { statement: 'I Express Myself', desc: 'Vocabulary grows when serve-and-return conversations happen daily.', icon: <MessageCircle size={18} /> },
    { statement: 'I Learn', desc: 'Play-based exploration activates executive function and spatial reasoning.', icon: <Search size={18} /> },
    { statement: 'I Explore', desc: 'Curiosity expands as the child is given safe freedom to discover.', icon: <Leaf size={18} /> },
    { statement: 'I Build Confidence', desc: 'Small successes compound into a resilient, self-determined mindset.', icon: <Star size={18} /> },
    { statement: 'I Shape My Future', desc: 'The brain arrives at school ready — curious, connected, and capable.', icon: <Zap size={18} /> },
  ];

  const pakistanCards = [
    { icon: <Users size={20} />, title: 'Joint Family Dynamics', desc: 'Multiple caregivers is a strength, not a challenge. Neurish helps align grandparents, parents, and extended family around consistent development signals.', tag: 'Cultural Strength', tagType: '' },
    { icon: <BookOpen size={20} />, title: 'Academic Pressure Starts Early', desc: '"Rote learning doesn\'t build the brain." Science shows that conceptual play before age 5 creates stronger academic foundations than early drilling.', tag: 'Science Says', tagType: '' },
    { icon: <Eye size={20} />, title: 'Screen Time Myths', desc: 'Many Pakistani families use mobile videos to keep children calm. Neurish offers 5-minute alternatives that calm AND build — bhook se zyada zaroor hai.', tag: 'Practical Help', tagType: 'amber' },
    { icon: <MessageCircle size={20} />, title: 'Modern vs. Traditional Balance', desc: 'You don\'t have to choose between dadi\'s wisdom and pediatric science. Neurish bridges them — finding what\'s universal in good parenting.', tag: 'Both Worlds', tagType: '' },
    { icon: <MessageCircle size={20} />, title: 'Urdu & Bilingual Development', desc: 'Children raised in bilingual households develop stronger cognitive flexibility. Neurish supports mixed-language guidance for Urdu-first families.', tag: 'Bilingual Ready', tagType: 'amber' },
    { icon: <Clock size={20} />, title: 'Busy Working Parents', desc: 'Quality over quantity. 10 focused minutes of serve-and-return interaction builds more than 2 hours of passive co-presence. Neurish shows you which 10 minutes matter.', tag: '10-Minute Wins', tagType: '' },
  ];

  const trustItems = [
    { logo: 'WHO', name: 'World Health Organization', role: 'Global Health Guidelines' },
    { logo: 'UNICEF', name: 'UNICEF', role: 'Child Development Standards' },
    { logo: 'CDC', name: 'Centers for Disease Control', role: 'Developmental Milestones' },
    { logo: 'AAP', name: 'American Academy of Pediatrics', role: 'Clinical Pediatrics' },
    { logo: 'NIH', name: 'National Institutes of Health', role: 'Neuroscience Research' },
    { logo: 'HCDC', name: 'Harvard Center on Developing Child', role: 'Brain Science' },
  ];

  const previewActivity = activities.find(act => {
    const ageMap = { '0-1': '0–1 Year', '1-2': '1–2 Years', '2-3': '2–3 Years', '3-5': '3–5 Years', '5+': '5+ Years' };
    return act.ageGroup === ageMap[activePreviewAge];
  }) || activities[0];

  return (
    <div className="lp-body">
      <ScrollStoryProgress />

      {/* ─── NAVBAR ──────────────────────────────────────────────────────── */}
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
            <MagneticButton className="lp-btn lp-btn-primary" onClick={() => navigate('/onboarding')}>
              Get Started <ChevronRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 1 — THE BEGINNING
          "Before anything else, there was a child."
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-hero" className="lp-hero">
        <div className="lp-container">
          <div className="lp-grid-2 lp-hero-grid">

            {/* Left: copy */}
            <div className="lp-hero-left">
              <div className="lp-badge lp-reveal">
                <Brain size={12} /> Research-Backed Early Childhood Development
              </div>
              <h1 className="lp-hero-title lp-reveal lp-reveal-d1">
                Before anything else,<br />
                <span className="lp-text-gradient">there was a child.</span>
              </h1>
              <p className="lp-hero-subtitle lp-reveal lp-reveal-d2">
                And in those first few years, everything that would shape their future was quietly being written — one interaction at a time.
              </p>
              <div className="lp-hero-buttons lp-reveal lp-reveal-d3">
                <MagneticButton className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/onboarding')} id="hero-cta-primary">
                  Begin Your Child's Story <ChevronRight size={18} />
                </MagneticButton>
                <MagneticButton className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/research')} id="hero-cta-research">
                  Explore the Science
                </MagneticButton>
              </div>
              <div className="lp-hero-trust lp-reveal lp-reveal-d4">
                <div className="lp-trust-label">Aligned with Global Authorities</div>
                <div className="lp-trust-logos">
                  {['WHO', 'UNICEF', 'CDC', 'AAP', 'NIH'].map(logo => (
                    <span key={logo} className="lp-trust-logo" title={logo}>{logo}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Three.js Neural Network */}
            <div className="lp-hero-right lp-reveal-right">
              <NeuralNetwork evolutionLevel={0.2 + scrollProgress * 0.8} />
              <div className="lp-visual-tip">
                <div className="lp-visual-tip-dot" />
                <span className="lp-visual-tip-text">This brain grows as you scroll — just like a child's.</span>
              </div>
            </div>

          </div>
        </div>
        <div className="lp-hero-scroll-hint">
          <span>Begin the journey</span>
          <div className="lp-scroll-arrow" />
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--lp-bg-alt)" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 2 — THE FIRST YEARS
          "The brain begins forming millions of connections."
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-brain" className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-chapter-label lp-chapter-label--center lp-reveal">Chapter Two</div>
            <h2 className="lp-section-title lp-reveal lp-reveal-d1">
              The brain is not born complete.<br />
              <span className="lp-text-gradient">It is built through experience.</span>
            </h2>
            <p className="lp-section-subtitle lp-reveal lp-reveal-d2">
              Every time you hold, speak, respond, or play with your child — you are physically shaping their neural architecture. This is not metaphor. This is neuroscience.
            </p>
          </div>

          <div className="lp-stats-grid">
            {[
              { val: '90%', title: 'Brain Development Before Age 5', desc: 'By age five, the brain reaches 90% of its adult volume. These are the years of highest synaptic density formation.', source: 'Harvard Center on the Developing Child' },
              { val: '1M', title: 'New Connections Every Second', desc: 'One million new neural synapses form every second in the early years, stimulated by interaction and experience.', source: 'Centers for Disease Control (CDC)' },
              { val: '3X', title: 'Return on Early Investment', desc: 'Every dollar invested in quality early childhood development yields up to $13 in societal returns. The ROI of parenting is real.', source: 'Nobel Laureate James Heckman, University of Chicago' },
              { val: '5Y', title: 'The Most Critical Window', desc: 'The first five years establish the biological blueprint for all future learning, behavior, emotion, and health.', source: 'World Health Organization (WHO)' },
            ].map((s, i) => (
              <div key={i} className={`lp-stat-card lp-reveal lp-reveal-d${i + 1}`}>
                <div className="lp-stat-num"><Counter value={s.val} /></div>
                <h3 className="lp-stat-title">{s.title}</h3>
                <p className="lp-stat-desc">{s.desc}</p>
                <div className="lp-stat-source">Source: {s.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="neural" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 3 — THE FIRST YEARS SHAPE EVERYTHING
          "What happens in each stage of development."
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-challenges" className="lp-section">
        <div className="lp-container">
          <div className="lp-two-col">

            <div>
              <div className="lp-chapter-label lp-reveal">Chapter Three</div>
              <h2 className="lp-section-title lp-reveal lp-reveal-d1">
                The first years<br />shape everything.
              </h2>
              <p className="lp-section-subtitle lp-reveal lp-reveal-d2" style={{ textAlign: 'left', maxWidth: 'none' }}>
                Development does not wait. In each age window, specific neural pathways are forming. Miss the window, and catching up requires far more effort.
              </p>

              <div style={{ marginTop: 32 }}>
                {[
                  { age: '0–6 months', title: 'Sensory Bonding', desc: 'Vision, hearing, and touch shape the first neural maps. Eye contact and voice recognition begin.', icon: <Eye size={16} /> },
                  { age: '6–18 months', title: 'Language Foundation', desc: 'Babbling becomes words. Pointing emerges. Every response you give creates a language pathway.', icon: <MessageCircle size={16} /> },
                  { age: '18–36 months', title: 'Emotional Architecture', desc: 'Empathy, frustration tolerance, and social understanding begin forming through mirrored interactions.', icon: <Heart size={16} /> },
                  { age: '3–5 years', title: 'Executive Function', desc: 'Attention, planning, and self-control circuits become trainable through structured play.', icon: <Zap size={16} /> },
                ].map((item, i) => (
                  <div key={i} className={`lp-highlight-box lp-reveal lp-reveal-d${i + 2}`}>
                    <div className="lp-highlight-box-label">{item.icon} {item.age}</div>
                    <div className="lp-highlight-box-text">{item.title} — {item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-reveal-right">
              <ChildIllustration stage="exploring" style={{ maxWidth: 380 }} />
            </div>

          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--lp-bg-alt)" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 4 — PARENTS FACE REAL CHALLENGES
          "The layered challenge cards."
      ══════════════════════════════════════════════════════════════════ */}
      <section className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-chapter-label lp-chapter-label--center lp-reveal">Chapter Four</div>
            <h2 className="lp-section-title lp-reveal lp-reveal-d1">
              Parenting in the real world<br />
              <span className="lp-text-gradient">is complicated.</span>
            </h2>
            <p className="lp-section-subtitle lp-reveal lp-reveal-d2">
              Every parent faces these moments. Hover each card to understand the challenge — why it happens, what science says, and what actually helps.
            </p>
          </div>

          <div className="lp-challenge-grid">
            {challenges.map((c, i) => (
              <div key={i} className={`lp-challenge-card-v2 lp-reveal lp-reveal-d${(i % 3) + 1}`}>
                <div className="lp-challenge-header">
                  <div className="lp-challenge-icon-v2">{c.icon}</div>
                  <div>
                    <div className="lp-challenge-title">{c.topic}</div>
                    <div className="lp-challenge-hook">{c.hook}</div>
                  </div>
                </div>
                <div className="lp-challenge-stages">
                  <div className="lp-challenge-stage">
                    <div className="lp-stage-label lp-stage-label--concern"><AlertTriangle size={14} /> Parent Concern</div>
                    <div className="lp-stage-text">{c.concern}</div>
                  </div>
                  <div className="lp-challenge-stage">
                    <div className="lp-stage-label lp-stage-label--why"><Search size={14} /> Why It Happens</div>
                    <div className="lp-stage-text">{c.why}</div>
                  </div>
                  <div className="lp-challenge-stage">
                    <div className="lp-stage-label lp-stage-label--science"><FlaskConical size={14} /> What Science Says</div>
                    <div className="lp-stage-text">{c.science}</div>
                  </div>
                  <div className="lp-challenge-stage">
                    <div className="lp-stage-label lp-stage-label--solution"><Check size={14} /> How Neurish Helps</div>
                    <div className="lp-stage-text">{c.solution}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Challenge illustration */}
          <div style={{ marginTop: 64, display: 'flex', justifyContent: 'center' }}>
            <ChildIllustration stage="challenged" style={{ maxWidth: 280, opacity: 0.85 }} />
          </div>
        </div>
      </section>

      <SectionDivider variant="neural" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 5 — NEURISH ENTERS THE STORY
          Introduced early so users understand the product.
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-neurish" className="lp-section">
        <div className="lp-container">
          <div className="lp-two-col">

            <div>
              <div className="lp-chapter-label lp-reveal">Chapter Five · Meet Neurish</div>
              <h2 className="lp-section-title lp-reveal lp-reveal-d1">
                Science-backed guidance<br />
                <span className="lp-text-gradient">for the years that matter most.</span>
              </h2>
              <p className="lp-section-subtitle lp-reveal lp-reveal-d2" style={{ textAlign: 'left', maxWidth: 'none', marginBottom: 40 }}>
                Neurish translates decades of pediatric research into clear, daily guidance for parents. Not advice blogs. Not opinions. Clinical science — made actionable.
              </p>

              <div className="lp-how-grid" style={{ gridTemplateColumns: '1fr' }}>
                {[
                  { num: '01', icon: <Users size={22} />, title: 'Build Your Child\'s Profile', desc: 'Add your child\'s age and select your focus areas — language, sleep, emotional regulation, motor skills, or all of the above.' },
                  { num: '02', icon: <TrendingUp size={22} />, title: 'Track Development Weekly', desc: 'Check off milestones directly linked to CDC and WHO clinical checklists. See your child\'s progress in real time.' },
                  { num: '03', icon: <Sparkles size={22} />, title: 'Receive Personalized Guidance', desc: 'Get science-backed activities, play guides, and alerts — calibrated to your child\'s exact developmental pace.' },
                ].map((s, i) => (
                  <div key={i} className={`lp-how-card lp-reveal lp-reveal-d${i + 1}`}>
                    <div className="lp-how-num">{s.num}</div>
                    <div className="lp-how-icon">{s.icon}</div>
                    <div className="lp-how-title">{s.title}</div>
                    <div className="lp-how-desc">{s.desc}</div>
                  </div>
                ))}
              </div>

              <div className="lp-reveal lp-reveal-d4" style={{ marginTop: 32 }}>
                <MagneticButton className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/onboarding')} id="neurish-cta">
                  Start Free — No Credit Card <ArrowRight size={18} />
                </MagneticButton>
              </div>
            </div>

            <div className="lp-reveal-right">
              <ChildIllustration stage="learning" style={{ maxWidth: 380 }} />
            </div>

          </div>
        </div>
      </section>

      <SectionDivider variant="wave" flip color="var(--lp-pakistan-bg, #0a1f1c)" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 6 — BUILT FOR PAKISTANI FAMILIES
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-pakistan" className="lp-pakistan-section">
        <div className="lp-container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="lp-section-header">
            <div className="lp-chapter-label lp-chapter-label--center lp-reveal" style={{ color: 'var(--lp-accent)' }}>Chapter Six</div>
            <h2 className="lp-section-title lp-reveal lp-reveal-d1" style={{ color: '#ffffff' }}>
              Built for Pakistani families.<br />
              <span className="lp-text-gradient">Grounded in your reality.</span>
            </h2>
            <p className="lp-section-subtitle lp-reveal lp-reveal-d2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              We understand that Pakistani parenting is shaped by culture, community, language, and love — not just textbooks. Neurish is designed with that in mind.
            </p>
          </div>

          <div className="lp-pakistan-intro lp-reveal">
            <div className="lp-pakistan-quote">"Bachay ki tarbiyat ghar se shuru hoti hai."</div>
            <div className="lp-pakistan-quote-sub">A child's upbringing begins at home. — Pakistani proverb</div>
          </div>

          <div className="lp-pakistan-grid">
            {pakistanCards.map((card, i) => (
              <div key={i} className={`lp-pakistan-card lp-reveal lp-reveal-d${(i % 3) + 1}`}>
                <div className="lp-pak-card-icon">{card.icon}</div>
                <div className="lp-pak-card-title">{card.title}</div>
                <div className="lp-pak-card-desc">{card.desc}</div>
                <span className={`lp-pak-card-tag ${card.tagType === 'amber' ? 'lp-pak-card-tag--amber' : ''}`}>
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--lp-bg)" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 7 — SCIENCE VS MYTHS + TRUST SIGNALS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-science" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-chapter-label lp-chapter-label--center lp-reveal">Chapter Seven</div>
            <h2 className="lp-section-title lp-reveal lp-reveal-d1">
              Most parenting advice is confusing.<br />
              <span className="lp-text-gradient">Science provides clarity.</span>
            </h2>
            <p className="lp-section-subtitle lp-reveal lp-reveal-d2">
              We separate clinical evidence from popular opinion — so you never have to guess what actually helps your child develop.
            </p>
          </div>

          <div className="lp-myths-grid">
            {myths.map((item, i) => (
              <div key={i} className={`lp-myth-card lp-reveal lp-reveal-d${i + 1}`}>
                <div className="lp-myth-side">
                  <div className="lp-myth-label">
                    <AlertTriangle size={11} /> Common Myth
                  </div>
                  <div className="lp-myth-title">"{item.myth}"</div>
                </div>
                <div className="lp-science-side">
                  <div className="lp-science-label">
                    <Check size={11} /> What Science Actually Says
                  </div>
                  <p className="lp-science-title">{item.science}</p>
                  <div>
                    <div className="lp-evidence-badge">
                      <Shield size={9} /> {item.evidenceLevel}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--lp-text-muted)', marginTop: 8 }}>
                      Source: <strong style={{ color: 'var(--lp-text-secondary)' }}>{item.source}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research sources */}
          {researchSources.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <div className="lp-chapter-label lp-chapter-label--center lp-reveal" style={{ marginBottom: 8 }}>Built on Science. Not Opinions.</div>
                <p className="lp-section-subtitle lp-reveal" style={{ maxWidth: 560, margin: '0 auto' }}>
                  Neurish does not rely on parenting blogs. Every guideline is compiled from the world's leading pediatric research bodies.
                </p>
              </div>
              <div className="lp-science-grid">
                {researchSources.slice(0, 6).map((source, i) => (
                  <div key={source.id} className={`lp-science-card lp-reveal lp-reveal-d${(i % 3) + 1}`}>
                    <span className="lp-sc-logo-tag">{source.logoText}</span>
                    <h3 className="lp-sc-name">{source.name}</h3>
                    <span className="lp-sc-category">{source.category}</span>
                    <p className="lp-sc-desc">{source.description}</p>
                    <div className="lp-sc-focus"><strong>Research Focus:</strong> {source.researchFocus}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust signals strip */}
          <div className="lp-trust-row">
            {trustItems.map((item, i) => (
              <div key={i} className={`lp-trust-item lp-reveal lp-reveal-d${(i % 3) + 1}`}>
                <div className="lp-trust-item-logo">{item.logo}</div>
                <div className="lp-trust-item-info">
                  <div className="lp-trust-item-name">{item.name}</div>
                  <div className="lp-trust-item-role">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--lp-bg-alt)" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 8 — BRAIN CONNECTIONS SIMULATOR
          The signature interactive section.
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-simulator" className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-chapter-label lp-chapter-label--center lp-reveal">Chapter Eight · Interactive</div>
            <h2 className="lp-section-title lp-reveal lp-reveal-d1">
              Your daily actions<br />
              <span className="lp-text-gradient">shape their brain.</span>
            </h2>
            <p className="lp-section-subtitle lp-reveal lp-reveal-d2">
              Hover over any action below to see how it strengthens or weakens your child's neural connections in real time. This is the science of everyday parenting.
            </p>
          </div>

          <div className="lp-reveal">
            <BrainSimulator />
          </div>
        </div>
      </section>

      <SectionDivider variant="neural" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 9 — THE EMOTIONAL ROADMAP
          "I Feel Safe → I Shape My Future"
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-roadmap" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-chapter-label lp-chapter-label--center lp-reveal">Chapter Nine</div>
            <h2 className="lp-section-title lp-reveal lp-reveal-d1">
              Every child's journey<br />
              <span className="lp-text-gradient">told in their own words.</span>
            </h2>
            <p className="lp-section-subtitle lp-reveal lp-reveal-d2">
              Development is not a checklist. It's a story of emotional milestones. Parents who understand these stages can guide each one with intention.
            </p>
          </div>

          <div className="lp-roadmap-track lp-reveal">
            {roadmapNodes.map((node, i) => (
              <div key={i} className="lp-roadmap-node-v2">
                <div className="lp-roadmap-dot-v2">{node.icon}</div>
                <div className="lp-roadmap-statement">"{node.statement}"</div>
                <p className="lp-roadmap-desc-v2">{node.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick dev check section */}
          <div style={{ marginTop: 80 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <h3 style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Outfit, sans-serif', marginBottom: 10 }}>
                Where is your child right now?
              </h3>
              <p style={{ color: 'var(--lp-text-secondary)', fontSize: 15 }}>
                Select an age to see evidence-based milestones and a recommended activity.
              </p>
            </div>

            <div className="lp-dev-check-card lp-reveal">
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
                <div className="lp-dc-col">
                  <h4><Brain size={16} style={{ color: 'var(--lp-primary)' }} /> {devChecks[activeCheckAge].age} Focus</h4>
                  <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--lp-primary)', marginBottom: 14 }}>{devChecks[activeCheckAge].focus}</div>
                  <p style={{ fontSize: 12, color: 'var(--lp-text-secondary)', marginBottom: 10 }}>Key Developmental Milestones:</p>
                  <ul className="lp-dc-list">
                    {devChecks[activeCheckAge].milestones.map((m, idx) => <li key={idx}>{m}</li>)}
                  </ul>
                </div>
                <div className="lp-dc-col">
                  <h4><Activity size={16} style={{ color: 'var(--lp-accent)' }} /> Recommended Activity</h4>
                  <div className="lp-dc-activity-box">
                    <div className="lp-dc-activity-title">{devChecks[activeCheckAge].activity.title}</div>
                    <div className="lp-dc-activity-benefit">{devChecks[activeCheckAge].activity.desc}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--lp-text-light)' }}>Duration: {devChecks[activeCheckAge].activity.duration}</div>
                </div>
                <div className="lp-dc-col">
                  <h4><Award size={16} style={{ color: 'var(--lp-primary)' }} /> Scientific Trust Check</h4>
                  <p style={{ fontSize: 13, color: 'var(--lp-text-secondary)' }}>Verified by global pediatric institutions:</p>
                  <div className="lp-dc-evidence">Evidence Level: {devChecks[activeCheckAge].evidenceLevel}</div>
                  <div className="lp-dc-reference">
                    Source: <strong>{devChecks[activeCheckAge].source}</strong>
                    <br />
                    <a href={devChecks[activeCheckAge].sourceUrl} target="_blank" rel="noopener noreferrer">
                      {devChecks[activeCheckAge].sourceUrl}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--lp-bg-alt)" />

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 10 — THINK ABOUT YOUR CHILDHOOD
          Emotional reflection pause before final CTA.
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-reflection" className="lp-reflection-section">
        <div className="lp-container">
          <div className="lp-reflection-inner">
            <div className="lp-reflection-eyebrow lp-reveal">Chapter Ten · A Moment to Pause</div>

            <h2 className="lp-reflection-title lp-reveal lp-reveal-d1">
              Think about your own<br />childhood.
            </h2>
            <p className="lp-reflection-subtitle lp-reveal lp-reveal-d2">
              What moments stayed with you? What did you need more of? What did someone give you — or not give you — that shaped who you became?
            </p>

            <div className="lp-reflection-cards lp-reveal lp-reveal-d3">
              <div className="lp-reflection-card">
                <span className="lp-reflection-card-icon">🏡</span>
                <div className="lp-reflection-card-text">"A space where I felt completely safe to be myself."</div>
              </div>
              <div className="lp-reflection-card">
                <span className="lp-reflection-card-icon">👂</span>
                <div className="lp-reflection-card-text">"Someone who listened without judgment — and responded with warmth."</div>
              </div>
              <div className="lp-reflection-card">
                <span className="lp-reflection-card-icon">✨</span>
                <div className="lp-reflection-card-text">"A moment of wonder that made me believe the world was worth exploring."</div>
              </div>
            </div>

            <div className="lp-reflection-closing lp-reveal lp-reveal-d4">
              Your child deserves to remember theirs.
            </div>
            <div className="lp-reflection-sub lp-reveal lp-reveal-d5">
              And you have the power — right now — to create those moments.
            </div>

            <div className="lp-reveal lp-reveal-d6">
              <MagneticButton className="lp-btn lp-btn-primary lp-btn-xl" onClick={() => navigate('/onboarding')} id="reflection-cta">
                Begin Creating Those Moments <ArrowRight size={20} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 11 — FINAL CTA
          "The future begins in childhood."
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ch-cta" className="lp-cta-section">
        <div className="lp-container">
          <div className="lp-cta-inner">

            <div className="lp-cta-eyebrow lp-reveal">The Future Begins Now</div>

            <div className="lp-cta-manifesto lp-reveal lp-reveal-d1">
              <span>The future is not created</span>
              <span>in adulthood.</span>
              <span className="lp-text-gradient">It begins in childhood.</span>
            </div>

            <p className="lp-cta-text lp-reveal lp-reveal-d2">
              The interactions you have today are building the adult your child will become tomorrow. Neurish is your guide — grounded in science, designed for real families, built with love.
            </p>

            <div className="lp-cta-buttons lp-reveal lp-reveal-d3">
              <MagneticButton className="lp-btn lp-btn-primary lp-btn-xl" onClick={() => navigate('/onboarding')} id="final-cta-primary">
                Create Your Child's Free Profile <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/learn')} id="final-cta-learn">
                Explore Research First
              </MagneticButton>
            </div>

            {/* Confident child at the end */}
            <div className="lp-reveal lp-reveal-d4" style={{ marginBottom: 32 }}>
              <ChildIllustration stage="confident" style={{ maxWidth: 260, margin: '0 auto' }} />
            </div>

            {/* Final trust strip */}
            <div className="lp-cta-trust-strip lp-reveal lp-reveal-d5">
              {[
                'Evidence-based guidance',
                'Research-backed milestones',
                'Trusted global institutions',
                'Scientific review process',
                'Free to start',
              ].map((item, i) => (
                <div key={i} className="lp-cta-trust-item">
                  <div className="lp-cta-trust-check">✓</div>
                  <span className="lp-cta-trust-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <div className="lp-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="lp-logo-icon">N</div>
                <span style={{ color: 'white' }}>Neurish</span>
              </div>
              <p className="lp-footer-desc">
                A research-backed early childhood development platform helping Pakistani families give their children the best possible start — guided by global pediatric science.
              </p>
            </div>
            <div className="lp-footer-links-col">
              <h4>Platform</h4>
              <span onClick={() => navigate('/learn')}>Learn</span>
              <span onClick={() => navigate('/activities')}>Activities</span>
              <span onClick={() => navigate('/research')}>Research Center</span>
              <span onClick={() => navigate('/tracker')}>Milestone Tracker</span>
            </div>
            <div className="lp-footer-links-col">
              <h4>Company</h4>
              <span onClick={() => navigate('/about')}>About Us</span>
              <span onClick={() => navigate('/contact')}>Contact Support</span>
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
            </div>
            <div className="lp-footer-newsletter">
              <h4>Science Newsletter</h4>
              <p>Get the latest pediatric brain research simplified for your child's age group — free, monthly.</p>
              <form className="lp-newsletter-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <p>© 2026 Neurish Parenting Platform. All rights reserved.</p>
            <p className="lp-footer-disclaimer">
              Disclaimer: Neurish does not provide medical diagnoses. All content is for developmental stimulation under parent guidance. Consult a qualified medical professional for developmental concerns.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
