import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, RefreshCcw, Award, Sparkles, Circle, Square, Triangle, Star } from 'lucide-react';

const LEVELS = [
  {
    title: 'Sky Bridge',
    subtitle: 'Build a balanced bridge by placing each shape in the correct slot.',
    targets: [
      { id: 'slot-1', label: 'Circle', type: 'Circle' },
      { id: 'slot-2', label: 'Square', type: 'Square' },
      { id: 'slot-3', label: 'Triangle', type: 'Triangle' }
    ],
    pieces: ['Circle', 'Square', 'Triangle']
  },
  {
    title: 'Harvest Gate',
    subtitle: 'Place the correct pieces to complete the gate and keep the path strong.',
    targets: [
      { id: 'slot-1', label: 'Triangle', type: 'Triangle' },
      { id: 'slot-2', label: 'Square', type: 'Square' },
      { id: 'slot-3', label: 'Star', type: 'Star' },
      { id: 'slot-4', label: 'Circle', type: 'Circle' }
    ],
    pieces: ['Circle', 'Square', 'Triangle', 'Star']
  },
  {
    title: 'Tower Shield',
    subtitle: 'Match the right pieces so the tower stands tall and steady.',
    targets: [
      { id: 'slot-1', label: 'Square', type: 'Square' },
      { id: 'slot-2', label: 'Square', type: 'Square' },
      { id: 'slot-3', label: 'Triangle', type: 'Triangle' },
      { id: 'slot-4', label: 'Circle', type: 'Circle' },
      { id: 'slot-5', label: 'Star', type: 'Star' }
    ],
    pieces: ['Square', 'Square', 'Triangle', 'Circle', 'Star']
  }
];

const ICONS = {
  Circle,
  Square,
  Triangle,
  Star
};

export default function BrainBuilder({ game, difficulty = 1, onClose }) {
  const [started, setStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [activePiece, setActivePiece] = useState(null);
  const [placed, setPlaced] = useState({});
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [achievement, setAchievement] = useState('');

  const level = useMemo(() => {
    const index = Math.min((difficulty - 1) + currentRound, LEVELS.length - 1);
    return LEVELS[index];
  }, [difficulty, currentRound]);

  const pieceOptions = useMemo(() => {
    return [...level.pieces].sort(() => Math.random() - 0.5);
  }, [level]);

  useEffect(() => {
    if (!started) return;
    setFeedback('');
    setPlaced({});
    setActivePiece(null);
    setCompleted(false);
  }, [level, started]);

  useEffect(() => {
    if (!started) return;
    if (Object.keys(placed).length === level.targets.length) {
      const allCorrect = level.targets.every((target) => placed[target.id] === target.type);
      if (allCorrect) {
        setCompleted(true);
        const totalScore = score + 20;
        setScore(totalScore);
        setAchievement(totalScore >= 60 ? 'Master Builder' : 'Skilled Architect');
      } else {
        setFeedback('A few pieces need adjustment. Try the next round.');
      }
    }
  }, [placed, level, score, started]);

  const startGame = () => {
    setStarted(true);
    setCurrentRound(0);
    setScore(0);
    setAchievement('');
    setFeedback('');
  };

  const selectPiece = (piece) => {
    setActivePiece(piece);
    setFeedback(`Selected ${piece}. Tap a slot to place it.`);
  };

  const placePiece = (targetId) => {
    if (!activePiece || placed[targetId]) return;
    const target = level.targets.find((item) => item.id === targetId);
    const isCorrect = target.type === activePiece;

    setPlaced((prev) => ({ ...prev, [targetId]: activePiece }));
    setFeedback(isCorrect ? 'Nice placement!' : 'This one may need a second look.');
    setScore((prev) => Math.max(0, prev + (isCorrect ? 10 : -5)));
    setActivePiece(null);
  };

  const nextRound = () => {
    setCurrentRound((prev) => Math.min(prev + 1, LEVELS.length - 1));
    setFeedback('');
    setCompleted(false);
    setPlaced({});
    setActivePiece(null);
  };

  const restart = () => {
    setStarted(false);
    setScore(0);
    setCurrentRound(0);
    setPlaced({});
    setActivePiece(null);
    setFeedback('');
    setCompleted(false);
    setAchievement('');
  };

  if (!started) {
    return (
      <div style={{ padding: '20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 className="text-lg font-bold">Brain Builder</h3>
            <p className="text-xs text-secondary-color" style={{ margin: '12px 0' }}>
              A premium spatial reasoning challenge designed to train planning, shape matching, and logical structure building.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {game.skills.map((skill, index) => (
                <span key={index} className="badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontSize: 11, padding: '6px 10px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={startGame}>
            Start Builder
            <ArrowRight size={16} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <p className="text-xs text-primary-color font-semibold" style={{ marginBottom: 8 }}>Levels</p>
            <p className="text-sm text-secondary-color">Three progressive construction challenges with increasing shape complexity.</p>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <p className="text-xs text-primary-color font-semibold" style={{ marginBottom: 8 }}>Achievements</p>
            <p className="text-sm text-secondary-color">Earn badges for quick completion and precision placement.</p>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <p className="text-xs text-primary-color font-semibold" style={{ marginBottom: 8 }}>Replay Value</p>
            <p className="text-sm text-secondary-color">Every round randomizes pieces so the next build feels fresh.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Brain Builder</h3>
          <p className="text-xs text-secondary-color">Round {currentRound + 1} of {LEVELS.length} — {level.title}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="badge badge-primary" style={{ fontSize: 11 }}>Score {score}</span>
          <button className="btn btn-secondary btn-sm" onClick={restart} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCcw size={14} /> Restart
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Exit
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24, alignItems: 'start' }}>
        <div>
          <div style={{ padding: 24, backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary)', marginBottom: 24 }}>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 12 }}>Placement Board</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
              {level.targets.map((target) => {
                const Icon = ICONS[target.type];
                const placedType = placed[target.id];
                return (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() => placePiece(target.id)}
                    style={{
                      minHeight: 120,
                      borderRadius: '18px',
                      border: '2px dashed var(--border)',
                      backgroundColor: placedType ? '#ffffff' : '#F8FAFC',
                      color: 'var(--text-primary)',
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: placedType ? 'default' : 'pointer'
                    }}
                  >
                    {placedType ? <Icon size={28} color="var(--primary)" /> : <Sparkles size={22} color="var(--text-secondary)" />}
                    <span className="text-xs text-secondary-color">{target.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: 20, backgroundColor: '#F3F4F6', borderRadius: 'var(--radius-lg)' }}>
            <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 10 }}>Shape Palette</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {pieceOptions.map((piece, index) => {
                const Icon = ICONS[piece];
                const isActive = activePiece === piece;
                return (
                  <button
                    key={`${piece}-${index}`}
                    type="button"
                    onClick={() => selectPiece(piece)}
                    style={{
                      minWidth: 96,
                      padding: 16,
                      borderRadius: '18px',
                      border: isActive ? '2px solid var(--primary)' : '2px solid var(--border)',
                      backgroundColor: isActive ? '#DBEAFE' : '#ffffff',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    <Icon size={28} color="var(--primary)" />
                    <span className="text-xs text-secondary-color" style={{ marginTop: 6 }}>{piece}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div style={{ padding: 24, backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-lg)', marginBottom: 24 }}>
            <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 12 }}>Level Details</p>
            <p className="text-xs text-secondary-color" style={{ lineHeight: 1.7, marginBottom: 18 }}>
              {level.subtitle}
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="text-xs text-secondary-color">Selected piece</span>
                <span className="text-xs font-semibold text-primary-color">{activePiece || 'Tap a shape'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="text-xs text-secondary-color">Correct placements</span>
                <span className="text-xs font-semibold text-primary-color">{Object.keys(placed).length}/{level.targets.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="text-xs text-secondary-color">Achievement</span>
                <span className="text-xs font-semibold text-primary-color">{achievement || 'None yet'}</span>
              </div>
            </div>
          </div>

          {feedback && (
            <div style={{ padding: 18, backgroundColor: '#EFF6FF', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary)', marginBottom: 24 }}>
              <p className="text-sm text-primary-color" style={{ margin: 0 }}>{feedback}</p>
            </div>
          )}

          {completed && (
            <div style={{ padding: 24, backgroundColor: '#ECFDF5', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid #34D399' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Award size={18} style={{ color: '#10B981' }} />
                <h4 className="text-sm font-bold text-primary-color" style={{ margin: 0 }}>Round Complete</h4>
              </div>
              <p className="text-sm text-secondary-color" style={{ marginBottom: 16 }}>
                Great work! Your structure is stable and the board is cleared for the next challenge.
              </p>
              <button className="btn btn-primary btn-sm" onClick={nextRound}>
                Continue to next build
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
