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
import ChildJourneySection from '../components/ChildJourneySection';
import BrainConnectionsSimulator from '../components/BrainConnectionsSimulator';
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

  // --- 2. Chapter and Emotional Story Data ---
  const chapters = [
    { id: 'chapter-1', label: 'The Beginning' },
    { id: 'chapter-2', label: 'The First Years' },
    { id: 'chapter-3', label: 'The Challenges' },
    { id: 'chapter-4', label: 'The Science' },
    { id: 'chapter-5', label: 'The Possibility' },
    { id: 'chapter-6', label: 'The Future' }
  ];

  const challengeStories = [
    {
      topic: 'Tantrums',
      icon: <ShieldAlert size={28} />,
      concern: 'My toddler has sudden intense crying fits and hits the floor.',
      reason: 'Raw emotion is a child’s first language before words can catch up.',
      solution: 'Neurish helps you name feelings, steady the environment, and guide self-regulation with calm routines.'
    },
    {
      topic: 'Screen Time',
      icon: <Brain size={28} />,
      concern: 'I feel guilty using screens but need time to complete house chores.',
      reason: 'Passive screens replace the responsive attention that builds hard-wired communication circuits.',
      solution: 'We design low-tech substitutions that keep your child engaged while preserving learning-rich interaction.'
    },
    {
      topic: 'Speech Development',
      icon: <Sparkles size={28} />,
      concern: 'My 18-month-old only makes sounds and does not speak clear words.',
      reason: 'Speech grows out of consistent turn-taking, not just hearing words in the background.',
      solution: 'Our guided narration prompts and conversation games make every day a vocabulary-building moment.'
    },
    {
      topic: 'Sleep Issues',
      icon: <HelpCircle size={28} />,
      concern: 'Bedtime is a struggle and my baby wakes up multiple times a night.',
      reason: 'Inconsistent sleep disrupts the brain’s ability to store learning and regulate emotion.',
      solution: 'Neurish gives you a reliable sleep routine shaped by pediatric sleep science and real family rhythms.'
    },
    {
      topic: 'Emotional Regulation',
      icon: <Smile size={28} />,
      concern: 'How do I help my child handle intense frustration when play goes wrong?',
      reason: 'Big feelings are part of learning how to manage the body and the mind together.',
      solution: 'We offer sensory scaffolds and simple breath-based exercises parents can use anywhere.'
    },
    {
      topic: 'Learning Through Play',
      icon: <Activity size={28} />,
      concern: 'What toys and activities actually support cognitive learning instead of just noise?',
      reason: 'Meaningful play is built around choice, repetition, and curiosity, not shiny distractions.',
      solution: 'Every activity we recommend is selected for focus, language, motor development, and emotional growth.'
    }
  ];

  const roadmapNodes = [
    { stage: 'I Feel Safe', title: 'Trust and calm become the first home.', desc: 'A secure world gives a child the confidence to explore and learn.' },
    { stage: 'I Express Myself', title: 'Thoughts find words and feelings find meaning.', desc: 'Language and emotion grow together when parents respond with warmth.' },
    { stage: 'I Learn', title: 'Curiosity becomes structure and progress.', desc: 'Play, stories, and gentle challenge build the brain’s early architecture.' },
    { stage: 'I Explore', title: 'Confidence opens new paths.', desc: 'A child who feels safe is more willing to try, fail, and try again.' },
    { stage: 'I Build Confidence', title: 'Small wins become steady belief.', desc: 'Mastering a new skill rewires the brain to expect success.' },
    { stage: 'I Shape My Future', title: 'Early moments change what is possible.', desc: 'The foundation set now supports resilience, focus, and healthy relationships.' }
  ];

  const confusionBlocks = [
    {
      myth: 'Most parenting guides are one-size-fits-all.',
      science: 'Early development is highly individualized; the most effective guidance adjusts to your child’s pace and emotional state.',
      source: 'Harvard Center on the Developing Child',
      evidenceLevel: 'Level I'
    },
    {
      myth: 'Screens can replace time spent speaking with your child.',
      science: 'Language circuits strengthen with real conversation, not passive exposure.',
      source: 'American Academy of Pediatrics (AAP)',
      evidenceLevel: 'Level I'
    },
    {
      myth: 'Behavior problems are just a phase you should ignore.',
      science: 'Every big reaction is data about a child’s needs and the brain state behind their behavior.',
      source: 'National Institutes of Health (NIH)',
      evidenceLevel: 'Level I'
    }
  ];

  const [activeChapter, setActiveChapter] = useState(chapters[0].id);

  useEffect(() => {
    const sectionElements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const activeChapterIndex = chapters.findIndex((chapter) => chapter.id === activeChapter);
  const brainStage = Math.max(0.12, Math.min(1, (activeChapterIndex + 1) / chapters.length));

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
      <section id="chapter-1" className="lp-hero">
        <div className="lp-container lp-hero-layout">
          <div className="lp-hero-copy">
            <div className="lp-badge">Every early moment rewires a child’s future</div>
            <h1 className="lp-hero-title">
              The first years are not just moments.
              They are the story of a growing mind.
            </h1>
            <p className="lp-hero-subtitle">
              When a child enters the world, the brain begins to form pathways that will carry every later step. This is not a product page—it is the first chapter of a lived journey.
            </p>

            <div className="lp-hero-buttons">
              <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/onboarding')}>
                Guide their growing future <ChevronRight size={18} />
              </button>
              <button className="lp-btn lp-btn-secondary lp-btn-lg" onClick={() => navigate('/research')}>
                Explore the science
              </button>
            </div>

            <div className="lp-hero-trust lp-hero-trust-compact">
              <div className="lp-trust-label">Trusted by pediatric research</div>
              <div className="lp-trust-logos">
                <span className="lp-trust-logo">WHO</span>
                <span className="lp-trust-logo">UNICEF</span>
                <span className="lp-trust-logo">CDC</span>
                <span className="lp-trust-logo">AAP</span>
              </div>
            </div>
          </div>

          <div className="lp-hero-right lp-hero-right-large">
            <div className="lp-hero-visual-frame">
              <NeuralNetwork stage={0.18} />
              <div className="lp-hero-frame-copy">
                <span>Partially formed</span>
                <p>The brain is just beginning to light its first connections.</p>
              </div>
            </div>
            <div className="lp-hero-scroll-tracker">
              <div className="lp-scroll-track-label">Scroll to follow the story</div>
              <div className="lp-scroll-tracker">
                {chapters.map((chapter, idx) => (
                  <div key={idx} className={`lp-scroll-step ${activeChapter === chapter.id ? 'active' : ''}`}>
                    <span className="lp-scroll-step-dot"></span>
                    <span>{chapter.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE FIRST YEARS */}
      <section id="chapter-2" className="lp-section-alt lp-section-with-brain">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">The brain begins forming.</h2>
            <p className="lp-section-subtitle">
              During the first years, every shared sentence, gentle encouragement, and responsive pause deepens the pathways that support lifelong learning.
            </p>
          </div>

          <div className="lp-section-split">
            <div className="lp-brain-spotlight">
              <NeuralNetwork stage={0.45} />
              <div className="lp-brain-spotlight-copy">
                <strong>More connections begin to glow.</strong> The brain is not finished—it is actively forming in every small interaction.
              </div>
            </div>

            <div className="lp-stats-grid lp-stats-grid-2">
              <div className="lp-stat-card lp-stat-card-light">
                <div className="lp-stat-num">
                  <Counter value="90%" />
                </div>
                <h3 className="lp-stat-title">The first five years shape the foundation</h3>
                <p className="lp-stat-desc">
                  A child’s brain reaches nearly adult volume before kindergarten, making these years the most powerful window for growth.
                </p>
              </div>

              <div className="lp-stat-card lp-stat-card-light">
                <div className="lp-stat-num">
                  <Counter value="1M" />
                </div>
                <h3 className="lp-stat-title">Connections formed every second</h3>
                <p className="lp-stat-desc">
                  Every responsive touch, sentence, and nurturing pause strengthens the wiring behind thinking, feeling, and focusing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChildJourneySection />

      {/* SECTION 4: THE CHALLENGES */}
      <section id="chapter-3" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Parents face real challenges every day.</h2>
            <p className="lp-section-subtitle">
              The story of early childhood is not only wonder. It is also the quiet work of figuring out what your child needs next.
            </p>
          </div>

          <div className="lp-challenge-grid">
            {challengeStories.map((challenge, idx) => (
              <div key={idx} className="lp-challenge-card lp-challenge-story-card">
                <div className="lp-challenge-icon">{challenge.icon}</div>
                <h3>{challenge.topic}</h3>
                <p className="lp-challenge-text">{challenge.concern}</p>
                <div className="lp-challenge-foot">
                  <div className="lp-challenge-detail">
                    <span className="lp-challenge-detail-title">Why it happens</span>
                    <p>{challenge.reason}</p>
                  </div>
                  <div className="lp-challenge-detail">
                    <span className="lp-challenge-detail-title">How to help</span>
                    <p>{challenge.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE SCIENCE */}
      <section id="chapter-4" className="lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Most parenting advice is confusing.</h2>
            <p className="lp-section-subtitle">
              One story says one thing, another says the opposite. Science provides the clarity parents need to feel sure again.
            </p>
          </div>

          <div className="lp-grid-3 lp-myth-grid">
            {confusionBlocks.map((item, idx) => (
              <div key={idx} className="lp-myth-card lp-myth-card-soft">
                <div className="lp-myth-side">
                  <div className="lp-myth-label">
                    <AlertTriangle size={10} style={{ marginRight: 6 }} /> Common Myth
                  </div>
                  <h4 className="lp-myth-title">"{item.myth}"</h4>
                </div>
                <div className="lp-science-side">
                  <div className="lp-science-label">
                    <Check size={10} style={{ marginRight: 6 }} /> Science Says
                  </div>
                  <p className="lp-science-title">{item.science}</p>
                  <div className="lp-science-foot">
                    <span>{item.source}</span>
                    <span>{item.evidenceLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-science-grid lp-science-grid-hero">
            {researchSources.slice(0, 5).map((source) => (
              <div key={source.id} className="lp-science-card lp-science-card-compact">
                <span className="lp-sc-logo-tag">{source.logoText}</span>
                <h3 className="lp-sc-name">{source.name}</h3>
                <p className="lp-sc-desc">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BRAIN CONNECTIONS SIMULATOR */}
      <BrainConnectionsSimulator id="chapter-5" />

      {/* SECTION 7: THE POSSIBILITY */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">How positive experiences build stronger outcomes</h2>
            <p className="lp-section-subtitle">
              Each warm response, playful invitation, and curious question becomes the scaffolding of a child’s future self.
            </p>
          </div>

          <div className="lp-roadmap-container lp-roadmap-container-outcomes">
            <div className="lp-roadmap-flow">
              {roadmapNodes.map((node, idx) => (
                <div key={idx} className="lp-roadmap-node lp-roadmap-node-large">
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

      {/* SECTION 8: NEURISH ENTERS THE STORY */}
      <section id="chapter-6" className="lp-section-alt lp-section-with-brain">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Neurish enters the story when the journey needs direction.</h2>
            <p className="lp-section-subtitle">
              We are not the beginning—we are the partner that helps parents translate daily care into stronger brain outcomes.
            </p>
          </div>

          <div className="lp-section-split lp-section-split-reverse">
            <div className="lp-brain-spotlight lp-brain-spotlight-secondary">
              <NeuralNetwork stage={0.88} />
              <div className="lp-brain-spotlight-copy">
                <strong>The brain now looks alive.</strong> More connections are active. More paths are ready to grow.
              </div>
            </div>

            <div className="lp-timeline lp-timeline-compact">
              <div className="lp-timeline-step">
                <div className="lp-timeline-dot"></div>
                <div className="lp-timeline-content">
                  <div className="lp-timeline-num">01</div>
                  <h3 className="lp-timeline-title">Profile your child</h3>
                  <p className="lp-timeline-desc">Start with what makes your child unique: age, temperament, and current routines.</p>
                </div>
              </div>
              <div className="lp-timeline-step">
                <div className="lp-timeline-dot"></div>
                <div className="lp-timeline-content">
                  <div className="lp-timeline-num">02</div>
                  <h3 className="lp-timeline-title">See what matters most</h3>
                  <p className="lp-timeline-desc">Get guidance that focuses on the exact moments and challenges your family is already living.</p>
                </div>
              </div>
              <div className="lp-timeline-step">
                <div className="lp-timeline-dot"></div>
                <div className="lp-timeline-content">
                  <div className="lp-timeline-num">03</div>
                  <h3 className="lp-timeline-title">Turn care into confidence</h3>
                  <p className="lp-timeline-desc">Use structured science-based routines to make every day feel more intentional.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-cta-box lp-cta-story">
            <h2 className="lp-cta-title">The future is not created in adulthood. It begins in childhood.</h2>
            <p className="lp-cta-text">
              Start the story with a platform that helps you see the brain behind every choice and the possibility behind every small moment.
            </p>
            <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={() => navigate('/onboarding')}>
              Start the first chapter <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
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
