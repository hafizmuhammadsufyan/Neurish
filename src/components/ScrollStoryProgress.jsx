import { useState, useEffect, useRef } from 'react';

const CHAPTERS = [
  { id: 'ch-hero',        label: 'The Beginning',    short: '01' },
  { id: 'ch-brain',       label: 'The First Years',  short: '02' },
  { id: 'ch-challenges',  label: 'The Challenges',   short: '03' },
  { id: 'ch-science',     label: 'The Science',      short: '04' },
  { id: 'ch-possibility', label: 'The Possibility',  short: '05' },
  { id: 'ch-future',      label: 'The Future',       short: '06' },
];

// Map section IDs to chapter indices
const SECTION_TO_CHAPTER = {
  'ch-hero': 0,
  'ch-brain': 1,
  'ch-challenges': 2,
  'ch-pakistan': 2,
  'ch-science': 3,
  'ch-simulator': 3,
  'ch-roadmap': 4,
  'ch-neurish': 4,
  'ch-possibility': 4,
  'ch-reflection': 5,
  'ch-cta': 5,
  'ch-future': 5,
};

export default function ScrollStoryProgress() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [fillPercent, setFillPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const observersRef = useRef([]);

  useEffect(() => {
    // Show after scrolling past hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setFillPercent(docH > 0 ? (scrollY / docH) * 100 : 0);
      setIsVisible(scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection observer for each tracked section
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const chapterIdx = SECTION_TO_CHAPTER[id];
          if (chapterIdx !== undefined) {
            setActiveChapter(chapterIdx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });

    Object.keys(SECTION_TO_CHAPTER).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observersRef.current.push(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`ssp-tracker ${isVisible ? 'ssp-tracker--visible' : ''}`}
      aria-label="Story progress"
    >
      {/* Fill line container */}
      <div className="ssp-line-track">
        <div
          className="ssp-line-fill"
          style={{ height: `${fillPercent}%` }}
        />
      </div>

      {/* Chapter dots */}
      <div className="ssp-chapters">
        {CHAPTERS.map((ch, idx) => {
          const isActive = activeChapter === idx;
          const isPast = activeChapter > idx;
          return (
            <div
              key={ch.id}
              className={`ssp-chapter ${isActive ? 'ssp-chapter--active' : ''} ${isPast ? 'ssp-chapter--past' : ''}`}
              onClick={() => {
                const el = document.getElementById(ch.id) || document.getElementById(Object.keys(SECTION_TO_CHAPTER).find(k => SECTION_TO_CHAPTER[k] === idx));
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <div className="ssp-dot-wrap">
                <div className="ssp-dot">
                  {isActive && <div className="ssp-dot-pulse" />}
                </div>
              </div>
              <div className={`ssp-label ${isActive ? 'ssp-label--active' : ''}`}>
                <span className="ssp-label-num">{ch.short}</span>
                <span className="ssp-label-text">{ch.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
