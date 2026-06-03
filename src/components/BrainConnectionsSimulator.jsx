import { useState } from 'react';

const simulatorActions = [
  {
    title: 'Reading Together',
    type: 'positive',
    effect: 0.9,
    description: 'Every shared page strengthens language pathways and emotional connection.',
  },
  {
    title: 'Responsive Communication',
    type: 'positive',
    effect: 0.8,
    description: 'Answering a child’s sounds and gestures builds trust and neural flexibility.',
  },
  {
    title: 'Play-Based Learning',
    type: 'positive',
    effect: 0.85,
    description: 'Open-ended play supports problem solving, memory, and motor planning.',
  },
  {
    title: 'Emotional Support',
    type: 'positive',
    effect: 0.8,
    description: 'Calm responsiveness helps the brain learn how to manage strong feelings.',
  },
  {
    title: 'Healthy Sleep',
    type: 'positive',
    effect: 0.75,
    description: 'Rest is the space where the brain rewires and stores everything it learned.',
  },
  {
    title: 'Language Interaction',
    type: 'positive',
    effect: 0.9,
    description: 'Talking, describing, and naming create the pathways that become fluent thought.',
  },
  {
    title: 'Excessive Screen Time',
    type: 'negative',
    effect: -0.65,
    description: 'Passive screens interrupt the back-and-forth that wires language and attention.',
  },
  {
    title: 'Lack of Interaction',
    type: 'negative',
    effect: -0.7,
    description: 'When the world feels distant, the brain has fewer meaningful moments to connect.',
  }
];

export default function BrainConnectionsSimulator({ id }) {
  const [activeItem, setActiveItem] = useState(null);
  const current = activeItem || simulatorActions[0];
  const intensity = current.effect > 0 ? current.effect : 1 + current.effect;

  return (
    <section id={id} className="lp-section-alt lp-simulator-section">
      <div className="lp-container">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Brain Connections Simulator</h2>
          <p className="lp-section-subtitle">
            Hover over the actions below to see how daily care changes what a child’s brain feels like from the inside.
          </p>
        </div>

        <div className="lp-simulator-grid">
          <div className="lp-simulator-visual" style={{ '--intensity': intensity }}>
            <div className="lp-simulator-brain-shell" />
            <svg viewBox="0 0 320 320" className="lp-simulator-brain-svg" aria-hidden="true">
              <defs>
                <radialGradient id="brainGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="rgba(245, 158, 11, 0.25)" />
                  <stop offset="50%" stopColor="rgba(13, 148, 136, 0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="160" cy="160" r="98" fill="url(#brainGlow)" />
              <g className={`lp-simulator-connections ${current.type}`}>
                <line x1="70" y1="120" x2="130" y2="90" />
                <line x1="100" y1="80" x2="170" y2="90" />
                <line x1="170" y1="90" x2="210" y2="130" />
                <line x1="90" y1="170" x2="140" y2="210" />
                <line x1="170" y1="210" x2="215" y2="170" />
                <line x1="190" y1="130" x2="230" y2="170" />
                <line x1="120" y1="140" x2="170" y2="160" />
                <line x1="130" y1="210" x2="180" y2="190" />
              </g>
              <g className="lp-simulator-nodes">
                <circle cx="70" cy="120" r="10" />
                <circle cx="130" cy="90" r="10" />
                <circle cx="170" cy="90" r="10" />
                <circle cx="210" cy="130" r="10" />
                <circle cx="90" cy="170" r="10" />
                <circle cx="140" cy="210" r="10" />
                <circle cx="170" cy="160" r="10" />
                <circle cx="230" cy="170" r="10" />
              </g>
            </svg>
            <div className="lp-simulator-highlight">
              <span>{current.title}</span>
              <p>{current.description}</p>
            </div>
          </div>

          <div className="lp-simulator-actions">
            {simulatorActions.map((item, idx) => (
              <button
                type="button"
                key={idx}
                className={`lp-simulator-action-card ${item.type} ${activeItem === item ? 'active' : ''}`}
                onMouseEnter={() => setActiveItem(item)}
                onFocus={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                onBlur={() => setActiveItem(null)}
              >
                <span className="simulator-action-title">{item.title}</span>
                <span className="simulator-action-type">{item.type === 'positive' ? 'Positive' : 'Risk'}</span>
                <p>{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
