import { useState, useCallback, useRef } from 'react';

// ─── Brain Node Positions (in 440×370 SVG viewBox) ───────────────────────────
const NODES = [
  // Left frontal
  { id: 0, x: 88, y: 118 }, { id: 1, x: 108, y: 95 }, { id: 2, x: 132, y: 78 },
  { id: 3, x: 92, y: 148 }, { id: 4, x: 78, y: 172 }, { id: 5, x: 100, y: 198 },
  { id: 6, x: 128, y: 185 }, { id: 7, x: 148, y: 155 }, { id: 8, x: 162, y: 118 },
  { id: 9, x: 142, y: 95 }, { id: 10, x: 72, y: 152 }, { id: 11, x: 85, y: 218 },
  { id: 12, x: 118, y: 232 }, { id: 13, x: 148, y: 225 }, { id: 14, x: 165, y: 198 },
  // Center corpus
  { id: 15, x: 192, y: 78 }, { id: 16, x: 198, y: 112 }, { id: 17, x: 195, y: 148 },
  { id: 18, x: 192, y: 182 }, { id: 19, x: 188, y: 215 },
  // Right frontal
  { id: 20, x: 222, y: 95 }, { id: 21, x: 248, y: 80 }, { id: 22, x: 232, y: 128 },
  { id: 23, x: 245, y: 165 }, { id: 24, x: 228, y: 198 }, { id: 25, x: 252, y: 225 },
  { id: 26, x: 278, y: 208 }, { id: 27, x: 305, y: 185 }, { id: 28, x: 318, y: 158 },
  { id: 29, x: 308, y: 125 }, { id: 30, x: 275, y: 102 }, { id: 31, x: 285, y: 148 },
  { id: 32, x: 268, y: 172 }, { id: 33, x: 282, y: 232 }, { id: 34, x: 248, y: 242 },
  // Bottom / temporal
  { id: 35, x: 192, y: 242 }, { id: 36, x: 162, y: 252 }, { id: 37, x: 132, y: 248 },
  { id: 38, x: 105, y: 240 }, { id: 39, x: 215, y: 250 }, { id: 40, x: 238, y: 248 },
];

// ─── Connection Pairs ─────────────────────────────────────────────────────────
const CONNECTIONS = [
  [0,1],[1,2],[1,9],[2,8],[0,3],[3,4],[3,6],[4,5],[5,6],[6,7],[7,8],[7,16],[8,15],
  [8,9],[9,15],[4,10],[10,11],[5,11],[11,12],[12,13],[13,14],[14,6],[14,18],[7,17],
  [6,13],[15,16],[16,17],[17,18],[18,19],[15,20],[20,21],[20,22],[21,30],[22,23],
  [22,31],[23,24],[23,32],[24,25],[25,26],[26,27],[27,28],[28,29],[29,30],[30,31],
  [31,32],[32,26],[26,33],[33,34],[34,35],[19,35],[18,24],[17,23],[16,22],[13,19],
  [12,19],[19,24],[35,36],[36,37],[37,38],[38,5],[34,39],[39,40],[33,40],[40,25],
  [9,16],[2,15],[36,13],[14,17],[24,32],[21,29],[38,11],
];

// ─── Action Definitions ───────────────────────────────────────────────────────
const ACTIONS = [
  { id: 'reading',   label: 'Reading Together',          type: 'positive', icon: '📖', desc: 'Activates language & memory networks', nodes: [7,8,9,15,16,20,21,22,29,30] },
  { id: 'talk',      label: 'Responsive Communication',  type: 'positive', icon: '💬', desc: 'Strengthens frontal lobe connectivity', nodes: [0,1,2,3,4,10,11,9,8] },
  { id: 'play',      label: 'Play-Based Learning',       type: 'positive', icon: '🎯', desc: 'Builds executive function pathways',   nodes: [5,6,13,14,17,18,23,24] },
  { id: 'emotional', label: 'Emotional Support',         type: 'positive', icon: '❤️', desc: 'Develops emotional regulation centers', nodes: [12,19,35,36,37,38,18,13] },
  { id: 'sleep',     label: 'Healthy Sleep',             type: 'positive', icon: '🌙', desc: 'Consolidates memory during deep sleep',  nodes: [26,27,28,29,30,31,32,33] },
  { id: 'language',  label: 'Language Interaction',      type: 'positive', icon: '🗣️', desc: 'Expands vocabulary neural pathways',     nodes: [15,16,17,20,21,22,29,30] },
  { id: 'screens',   label: 'Excessive Screen Time',     type: 'negative', icon: '📱', desc: 'Reduces serve-and-return interactions',  nodes: [7,8,16,17,22,23,31,15] },
  { id: 'isolation', label: 'Lack of Interaction',       type: 'negative', icon: '🚫', desc: 'Weakens social and language connections', nodes: [0,1,3,15,20,26,27,29] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getNodeStyle(nodeId, activeAction) {
  if (!activeAction) return { fill: '#0d9488', opacity: 0.35, r: 4 };
  const action = ACTIONS.find(a => a.id === activeAction);
  if (!action) return { fill: '#0d9488', opacity: 0.35, r: 4 };
  if (action.nodes.includes(nodeId)) {
    return action.type === 'positive'
      ? { fill: '#0d9488', opacity: 1, r: 6.5, glow: true }
      : { fill: '#64748b', opacity: 0.7, r: 3.5, dimmed: true };
  }
  return { fill: '#0d9488', opacity: 0.15, r: 3.5 };
}

function getConnectionStyle(fromId, toId, activeAction) {
  if (!activeAction) return { stroke: '#0d9488', opacity: 0.12, width: 1 };
  const action = ACTIONS.find(a => a.id === activeAction);
  if (!action) return { stroke: '#0d9488', opacity: 0.12, width: 1 };
  const bothActive = action.nodes.includes(fromId) && action.nodes.includes(toId);
  const eitherActive = action.nodes.includes(fromId) || action.nodes.includes(toId);
  if (action.type === 'positive') {
    if (bothActive) return { stroke: '#0d9488', opacity: 0.85, width: 2.2, animated: true };
    if (eitherActive) return { stroke: '#0d9488', opacity: 0.4, width: 1.4 };
    return { stroke: '#0d9488', opacity: 0.06, width: 0.8 };
  } else {
    if (bothActive) return { stroke: '#64748b', opacity: 0.5, width: 1.5, fade: true };
    if (eitherActive) return { stroke: '#64748b', opacity: 0.25, width: 1 };
    return { stroke: '#0d9488', opacity: 0.06, width: 0.8 };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BrainSimulator() {
  const [activeAction, setActiveAction] = useState(null);
  const [pulseNodes, setPulseNodes] = useState([]);
  const pulseTimerRef = useRef(null);

  const handleActionEnter = useCallback((actionId) => {
    setActiveAction(actionId);
    const action = ACTIONS.find(a => a.id === actionId);
    if (action?.type === 'positive') {
      // Stagger pulse nodes
      clearTimeout(pulseTimerRef.current);
      const staggered = [];
      action.nodes.forEach((nid, i) => {
        pulseTimerRef.current = setTimeout(() => {
          staggered.push(nid);
          setPulseNodes([...staggered]);
        }, i * 80);
      });
    } else {
      setPulseNodes([]);
    }
  }, []);

  const handleActionLeave = useCallback(() => {
    setActiveAction(null);
    setPulseNodes([]);
  }, []);

  const positiveActions = ACTIONS.filter(a => a.type === 'positive');
  const negativeActions = ACTIONS.filter(a => a.type === 'negative');
  const currentAction = ACTIONS.find(a => a.id === activeAction);

  return (
    <div className="bsim-wrapper">
      <div className="bsim-layout">
        {/* Left action column — positive */}
        <div className="bsim-col bsim-col--left">
          <div className="bsim-col-label bsim-col-label--positive">
            <span className="bsim-col-dot bsim-col-dot--positive" />
            Positive Experiences
          </div>
          {positiveActions.map(action => (
            <button
              key={action.id}
              className={`bsim-action bsim-action--positive ${activeAction === action.id ? 'bsim-action--active-pos' : ''}`}
              onMouseEnter={() => handleActionEnter(action.id)}
              onMouseLeave={handleActionLeave}
              onFocus={() => handleActionEnter(action.id)}
              onBlur={handleActionLeave}
            >
              <span className="bsim-action-icon">{action.icon}</span>
              <span className="bsim-action-label">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Center — SVG Brain */}
        <div className="bsim-brain-area">
          <div className="bsim-brain-frame">
            <svg
              viewBox="0 0 400 320"
              xmlns="http://www.w3.org/2000/svg"
              className="bsim-svg"
              aria-label="Interactive brain connections diagram"
            >
              <defs>
                <filter id="bsim-glow-pos">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="bsim-glow-neg">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="bsim-bg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ambient brain glow */}
              <ellipse cx="200" cy="165" rx="165" ry="140" fill="url(#bsim-bg)" />

              {/* Brain outline — approximate path */}
              <path
                d="M120 80 Q100 60 85 75 Q65 90 70 118 Q55 130 58 152 Q52 175 68 192 Q72 218 92 228 Q110 248 135 248 Q155 262 185 258 Q205 270 225 258 Q255 265 275 248 Q300 242 318 222 Q338 208 340 185 Q350 165 342 142 Q348 118 332 100 Q318 75 295 72 Q278 55 258 65 Q238 52 218 62 Q200 50 185 60 Q165 48 148 58 Q132 55 120 80Z"
                fill="none"
                stroke={currentAction?.type === 'negative' ? '#64748b' : '#0d9488'}
                strokeWidth="1.8"
                strokeOpacity={activeAction ? (currentAction?.type === 'negative' ? 0.25 : 0.45) : 0.2}
                strokeDasharray={activeAction ? 'none' : '4 6'}
                style={{ transition: 'all 0.5s ease' }}
              />

              {/* Connections */}
              {CONNECTIONS.map(([fromId, toId], idx) => {
                const nodeA = NODES[fromId];
                const nodeB = NODES[toId];
                const cs = getConnectionStyle(fromId, toId, activeAction);
                return (
                  <line
                    key={idx}
                    x1={nodeA.x}
                    y1={nodeA.y}
                    x2={nodeB.x}
                    y2={nodeB.y}
                    stroke={cs.stroke}
                    strokeWidth={cs.width}
                    strokeOpacity={cs.opacity}
                    strokeLinecap="round"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                );
              })}

              {/* Pulse rings on active positive nodes */}
              {activeAction && currentAction?.type === 'positive' && pulseNodes.map(nodeId => {
                const node = NODES[nodeId];
                if (!node) return null;
                return (
                  <circle
                    key={`pulse-${nodeId}`}
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    filter="url(#bsim-glow-pos)"
                  >
                    <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                );
              })}

              {/* Nodes */}
              {NODES.map(node => {
                const ns = getNodeStyle(node.id, activeAction);
                const isPulsing = pulseNodes.includes(node.id) && currentAction?.type === 'positive';
                return (
                  <circle
                    key={node.id}
                    cx={node.x}
                    cy={node.y}
                    r={ns.r}
                    fill={ns.fill}
                    opacity={ns.opacity}
                    filter={isPulsing ? 'url(#bsim-glow-pos)' : ns.dimmed ? 'url(#bsim-glow-neg)' : 'none'}
                    style={{ transition: 'all 0.35s ease', cursor: 'default' }}
                  />
                );
              })}

              {/* Amber accent nodes on positive hover */}
              {activeAction && currentAction?.type === 'positive' && [9, 15, 21, 30].map(nodeId => {
                const node = NODES[nodeId];
                if (!node) return null;
                return (
                  <circle
                    key={`accent-${nodeId}`}
                    cx={node.x}
                    cy={node.y}
                    r="4.5"
                    fill="#f59e0b"
                    opacity="0.9"
                    filter="url(#bsim-glow-pos)"
                  >
                    <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                );
              })}
            </svg>

            {/* Status indicator */}
            <div className={`bsim-status ${activeAction ? (currentAction?.type === 'positive' ? 'bsim-status--positive' : 'bsim-status--negative') : 'bsim-status--idle'}`}>
              {activeAction ? (
                <>
                  <span className="bsim-status-dot" />
                  <span className="bsim-status-text">{currentAction?.desc}</span>
                </>
              ) : (
                <>
                  <span className="bsim-status-dot bsim-status-dot--idle" />
                  <span className="bsim-status-text">Hover an action to see its effect on the brain</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right action column — negative */}
        <div className="bsim-col bsim-col--right">
          <div className="bsim-col-label bsim-col-label--negative">
            <span className="bsim-col-dot bsim-col-dot--negative" />
            Negative Factors
          </div>
          {negativeActions.map(action => (
            <button
              key={action.id}
              className={`bsim-action bsim-action--negative ${activeAction === action.id ? 'bsim-action--active-neg' : ''}`}
              onMouseEnter={() => handleActionEnter(action.id)}
              onMouseLeave={handleActionLeave}
              onFocus={() => handleActionEnter(action.id)}
              onBlur={handleActionLeave}
            >
              <span className="bsim-action-icon">{action.icon}</span>
              <span className="bsim-action-label">{action.label}</span>
            </button>
          ))}

          {/* Science badge */}
          <div className="bsim-science-note">
            <div className="bsim-science-note-icon">🔬</div>
            <p>Backed by Harvard Center on the Developing Child &amp; CDC research</p>
          </div>
        </div>
      </div>
    </div>
  );
}
