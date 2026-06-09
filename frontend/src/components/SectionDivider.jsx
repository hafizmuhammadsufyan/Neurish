export default function SectionDivider({ variant = 'wave', flip = false, color = 'var(--lp-bg)' }) {
  const style = {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    transform: flip ? 'scaleY(-1)' : 'none',
    position: 'relative',
    zIndex: 2,
    marginBottom: flip ? 0 : -1,
    marginTop: flip ? -1 : 0,
  };

  if (variant === 'wave') {
    return (
      <div style={style}>
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <defs>
            <linearGradient id={`sdg-${variant}-${flip}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          {/* Neural flow line */}
          <path
            d="M0 36 Q180 16 360 36 Q540 56 720 36 Q900 16 1080 36 Q1260 56 1440 36"
            fill="none"
            stroke={`url(#sdg-${variant}-${flip})`}
            strokeWidth="2"
            strokeOpacity="0.5"
          >
            <animate
              attributeName="d"
              values="M0 36 Q180 16 360 36 Q540 56 720 36 Q900 16 1080 36 Q1260 56 1440 36;M0 36 Q180 56 360 36 Q540 16 720 36 Q900 56 1080 36 Q1260 16 1440 36;M0 36 Q180 16 360 36 Q540 56 720 36 Q900 16 1080 36 Q1260 56 1440 36"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>

          {/* Particle dots along the wave */}
          {[0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1.0].map((t, i) => {
            const x = t * 1440;
            const y = 36 + 20 * Math.sin(t * Math.PI * 2);
            return (
              <circle key={i} cx={x} cy={y} r="2.5" fill={i % 2 === 0 ? '#0d9488' : '#f59e0b'} opacity="0.4">
                <animate
                  attributeName="opacity"
                  values="0.4;0.8;0.4"
                  dur={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}

          {/* Fill shape to fill background */}
          <path
            d="M0 54 Q180 34 360 54 Q540 74 720 54 Q900 34 1080 54 Q1260 74 1440 54 L1440 72 L0 72Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'neural') {
    return (
      <div style={{ ...style, height: 60 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          {/* Neural pathway lines flowing downward */}
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((t, i) => {
            const x1 = t * 1440;
            const x2 = x1 + (i % 2 === 0 ? 60 : -60);
            return (
              <line key={i} x1={x1} y1="0" x2={x2} y2="60"
                stroke={i % 3 === 0 ? '#f59e0b' : '#0d9488'}
                strokeWidth="1"
                strokeOpacity="0.15"
                strokeLinecap="round"
              />
            );
          })}
          {/* Connector dots */}
          {[150, 350, 550, 750, 950, 1150, 1350].map((x, i) => (
            <circle key={i} cx={x} cy={30} r="2" fill="#0d9488" opacity="0.25">
              <animate attributeName="cy" values="10;50;10" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>
    );
  }

  return null;
}
