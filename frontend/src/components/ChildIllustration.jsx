import React from 'react';

// ─── Stage: Newborn ────────────────────────────────────────────────────────────
function NewbornSVG() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-label="Newborn child">
      <defs>
        <radialGradient id="ng1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ng2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow rings */}
      <circle cx="160" cy="160" r="130" fill="url(#ng1)" />
      <circle cx="160" cy="160" r="100" fill="url(#ng2)" />
      <circle cx="160" cy="160" r="108" fill="none" stroke="#0d9488" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 9" />
      <circle cx="160" cy="160" r="80" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.12" strokeDasharray="2 7" />

      {/* Baby body — curled position */}
      <ellipse cx="165" cy="180" rx="48" ry="38" fill="#0d9488" fillOpacity="0.07" stroke="#0d9488" strokeWidth="1.8" />

      {/* Head */}
      <circle cx="160" cy="130" r="30" fill="#f59e0b" fillOpacity="0.06" stroke="#0d9488" strokeWidth="1.8" />

      {/* Sleeping face */}
      <path d="M150 128 Q155 124 160 128" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M162 128 Q167 124 172 128" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M156 137 Q160 141 164 137" fill="none" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round" />

      {/* Arms curled */}
      <path d="M122 168 Q110 155 120 142 Q132 130 145 142" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M200 172 Q213 158 202 145 Q190 132 176 144" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" />

      {/* Legs curled */}
      <path d="M140 208 Q125 225 132 238" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M185 208 Q200 225 193 238" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" />

      {/* Floating neural dots around */}
      {[0,1,2,3,4,5,6,7,8,9].map(i => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 118;
        const x = 160 + r * Math.cos(angle);
        const y = 160 + r * Math.sin(angle);
        return (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.5 : 2} fill={i % 2 === 0 ? '#0d9488' : '#f59e0b'} opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        );
      })}

      {/* Connection lines from dots to center */}
      {[0, 3, 6].map(i => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 118;
        const x = 160 + r * Math.cos(angle);
        const y = 160 + r * Math.sin(angle);
        return (
          <line key={i} x1="160" y1="160" x2={x} y2={y} stroke="#0d9488" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 5" />
        );
      })}
    </svg>
  );
}

// ─── Stage: Exploring ─────────────────────────────────────────────────────────
function ExploringSVG() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-label="Child exploring">
      <defs>
        <radialGradient id="eg1" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="170" r="120" fill="url(#eg1)" />

      {/* Ground line */}
      <path d="M60 258 Q160 248 260 258" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Body */}
      <line x1="160" y1="185" x2="160" y2="238" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />

      {/* Head */}
      <circle cx="160" cy="165" r="26" fill="#f59e0b" fillOpacity="0.08" stroke="#0d9488" strokeWidth="1.8" />

      {/* Eyes — wide, curious */}
      <circle cx="153" cy="162" r="3.5" fill="#0d9488" opacity="0.7" />
      <circle cx="167" cy="162" r="3.5" fill="#0d9488" opacity="0.7" />
      <circle cx="154.5" cy="161" r="1.2" fill="white" opacity="0.9" />
      <circle cx="168.5" cy="161" r="1.2" fill="white" opacity="0.9" />

      {/* Smile */}
      <path d="M152 173 Q160 180 168 173" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />

      {/* Arms spread wide — reaching out */}
      <path d="M160 200 L110 185 L92 178" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M160 200 L210 185 L228 178" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Legs */}
      <path d="M160 238 L145 260 L138 278" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
      <path d="M160 238 L175 260 L182 278" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />

      {/* Environment elements — leaf, star, block */}
      <path d="M82 175 Q72 162 88 155 Q104 148 96 165 Q88 182 82 175Z" fill="#0d9488" fillOpacity="0.15" stroke="#0d9488" strokeWidth="1.2" />
      <polygon points="232,170 236,160 240,170 251,170 243,177 246,188 236,181 226,188 229,177 221,170" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
      <rect x="80" y="228" width="22" height="22" rx="3" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="228" cy="230" r="12" fill="#0d9488" fillOpacity="0.10" stroke="#0d9488" strokeWidth="1.2" />

      {/* Floating dots — wonder */}
      {[
        [130, 130], [200, 125], [105, 200], [220, 210], [165, 105], [145, 290], [240, 260]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={i % 2 === 0 ? '#0d9488' : '#f59e0b'} opacity="0.45">
          <animate attributeName="cy" values={`${y};${y - 8};${y}`} dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

// ─── Stage: Challenged ────────────────────────────────────────────────────────
function ChallengedSVG() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-label="Child facing challenges">
      <defs>
        <radialGradient id="cg1" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="200" r="100" fill="url(#cg1)" />

      {/* Pressure shapes above — abstract stress elements */}
      <rect x="100" y="60" width="40" height="28" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="3 4" />
      <rect x="178" y="72" width="32" height="24" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="3 4" />
      <line x1="120" y1="88" x2="155" y2="128" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 4" />
      <line x1="194" y1="96" x2="168" y2="130" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 4" />

      {/* Screen rectangle */}
      <rect x="195" y="55" width="50" height="38" rx="5" fill="none" stroke="#475569" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="214" y1="93" x2="227" y2="93" stroke="#475569" strokeWidth="1" strokeOpacity="0.3" />

      {/* Child sitting with knees up */}
      {/* Head */}
      <circle cx="160" cy="155" r="24" fill="#0d9488" fillOpacity="0.07" stroke="#0d9488" strokeWidth="1.8" />

      {/* Looking up slightly */}
      <ellipse cx="153" cy="151" rx="3" ry="3.5" fill="#0d9488" opacity="0.6" />
      <ellipse cx="167" cy="150" rx="3" ry="3.5" fill="#0d9488" opacity="0.6" />
      <path d="M154 163 Q160 160 166 163" fill="none" stroke="#0d9488" strokeWidth="1.3" strokeLinecap="round" />

      {/* Torso */}
      <path d="M160 179 L160 215" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />

      {/* Arms wrapped around knees */}
      <path d="M160 195 Q140 205 132 225 Q130 238 145 242" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M160 195 Q180 205 188 225 Q190 238 175 242" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Knees up */}
      <path d="M145 242 Q142 256 148 268" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
      <path d="M175 242 Q178 256 172 268" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />

      {/* Ground */}
      <path d="M80 275 Q160 268 240 275" fill="none" stroke="#0d9488" strokeWidth="1.2" strokeOpacity="0.25" />

      {/* Rain drops — soft, not harsh */}
      {[[110,95],[135,80],[155,100],[175,82],[200,98],[222,84]].map(([x,y],i) => (
        <line key={i} x1={x} y1={y} x2={x-4} y2={y+14} stroke="#0d9488" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  );
}

// ─── Stage: Learning ──────────────────────────────────────────────────────────
function LearningSVG() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-label="Child learning">
      <defs>
        <radialGradient id="lg1" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lg2" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="128" fill="url(#lg1)" />
      <circle cx="160" cy="160" r="90" fill="url(#lg2)" />

      {/* Light beams from above */}
      {[-30, -10, 10, 30].map((offset, i) => (
        <line key={i} x1={160 + offset} y1="50" x2={160 + offset * 1.5} y2="145" stroke="#f59e0b" strokeWidth={i % 2 === 0 ? 1.5 : 0.8} strokeOpacity={i % 2 === 0 ? 0.3 : 0.15} strokeLinecap="round" />
      ))}

      {/* Book */}
      <rect x="118" y="215" width="84" height="56" rx="4" fill="#0d9488" fillOpacity="0.08" stroke="#0d9488" strokeWidth="1.8" />
      <line x1="160" y1="215" x2="160" y2="271" stroke="#0d9488" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="128" y1="232" x2="155" y2="232" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="128" y1="242" x2="155" y2="242" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="128" y1="252" x2="155" y2="252" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="165" y1="232" x2="193" y2="232" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="165" y1="242" x2="193" y2="242" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />

      {/* Child sitting cross-legged */}
      {/* Head */}
      <circle cx="160" cy="145" r="26" fill="#f59e0b" fillOpacity="0.08" stroke="#0d9488" strokeWidth="1.8" />

      {/* Wonder eyes — looking down at book with interest */}
      <circle cx="153" cy="143" r="3.5" fill="#0d9488" opacity="0.65" />
      <circle cx="167" cy="143" r="3.5" fill="#0d9488" opacity="0.65" />
      <circle cx="154.5" cy="142" r="1.2" fill="white" opacity="0.9" />
      <path d="M153 154 Q160 158 167 154" fill="none" stroke="#0d9488" strokeWidth="1.4" strokeLinecap="round" />

      {/* Torso */}
      <path d="M160 171 L160 210" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />

      {/* Arms out on book */}
      <path d="M160 195 L130 215" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
      <path d="M160 195 L190 215" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />

      {/* Cross-legged */}
      <path d="M160 210 Q142 218 128 215" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M160 210 Q178 218 192 215" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Floating knowledge symbols */}
      {[
        [88, 110, '÷'], [230, 100, '+'], [78, 170, '∞'],
        [238, 165, '★'], [95, 240, '?'], [225, 248, '!']
      ].map(([x, y, sym], i) => (
        <text key={i} x={x} y={y} fontSize="14" fill={i % 2 === 0 ? '#0d9488' : '#f59e0b'} opacity="0.35" fontWeight="700">
          {sym}
          <animate attributeName="opacity" values="0.35;0.65;0.35" dur={`${2 + i * 0.6}s`} repeatCount="indefinite" />
        </text>
      ))}
    </svg>
  );
}

// ─── Stage: Confident ─────────────────────────────────────────────────────────
function ConfidentSVG() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-label="Confident child">
      <defs>
        <linearGradient id="cong1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="cong2" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sunrise gradient backdrop */}
      <ellipse cx="160" cy="268" rx="140" ry="40" fill="url(#cong2)" />

      {/* Sunrise rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI - Math.PI / 2;
        const x1 = 160 + 50 * Math.cos(angle);
        const y1 = 270 + 50 * Math.sin(angle);
        const x2 = 160 + 135 * Math.cos(angle);
        const y2 = 270 + 135 * Math.sin(angle);
        if (y1 > 270) return null;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.18" strokeLinecap="round" />
        );
      })}

      {/* Horizon line */}
      <path d="M55 268 Q160 258 265 268" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeOpacity="0.35" />

      {/* Standing child — tall, arms wide */}
      {/* Head */}
      <circle cx="160" cy="128" r="28" fill="url(#cong1)" stroke="#0d9488" strokeWidth="1.8" />

      {/* Face — confident, slight smile */}
      <circle cx="153" cy="125" r="3" fill="#0d9488" opacity="0.7" />
      <circle cx="167" cy="125" r="3" fill="#0d9488" opacity="0.7" />
      <circle cx="154" cy="124" r="1" fill="white" opacity="0.9" />
      <circle cx="168" cy="124" r="1" fill="white" opacity="0.9" />
      <path d="M152 137 Q160 144 168 137" fill="none" stroke="#0d9488" strokeWidth="1.6" strokeLinecap="round" />

      {/* Torso — upright, proud */}
      <path d="M160 156 L160 225" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />

      {/* Arms spread wide and slightly upward — triumphant */}
      <path d="M160 175 L118 158 L96 148" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M160 175 L202 158 L224 148" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Legs — confident stride */}
      <path d="M160 225 L148 252 L142 270" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M160 225 L172 252 L178 270" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />

      {/* Neural connections around head — fully lit */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = 58;
        const x = 160 + r * Math.cos(angle);
        const y = 128 + r * Math.sin(angle);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill={i % 3 === 0 ? '#f59e0b' : '#0d9488'} opacity="0.7">
              <animate attributeName="opacity" values="0.7;1;0.7" dur={`${1.8 + i * 0.25}s`} repeatCount="indefinite" />
            </circle>
            <line x1="160" y1="128" x2={x} y2={y} stroke={i % 3 === 0 ? '#f59e0b' : '#0d9488'} strokeWidth="0.8" strokeOpacity="0.25" />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
const STAGES = { newborn: NewbornSVG, exploring: ExploringSVG, challenged: ChallengedSVG, learning: LearningSVG, confident: ConfidentSVG };

export default function ChildIllustration({ stage = 'newborn', className = '', style = {} }) {
  const SVGComponent = STAGES[stage] || NewbornSVG;
  return (
    <div className={`child-illustration child-illustration--${stage} ${className}`} style={style}>
      <SVGComponent />
    </div>
  );
}
