import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, RefreshCcw, Award, Crown, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

const LEVELS = [
  {
    label: 'Castle Garden',
    gridSize: 3,
    targets: [
      { name: 'Crown', icon: Crown, position: 1 },
      { name: 'Map Marker', icon: MapPin, position: 4 },
      { name: 'Shield', icon: ShieldCheck, position: 7 }
    ]
  },
  {
    label: 'Treasure Trail',
    gridSize: 4,
    targets: [
      { name: 'Crown', icon: Crown, position: 2 },
      { name: 'Sparkle Gem', icon: Sparkles, position: 5 },
      { name: 'Map Marker', icon: MapPin, position: 9 },
      { name: 'Shield', icon: ShieldCheck, position: 13 }
    ]
  }
];

export default function MemoryKingdom({ game, difficulty = 1, onClose }) {
  const [started, setStarted] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [achievement, setAchievement] = useState('');

  const stage = useMemo(() => {
    const index = Math.min((difficulty - 1) + stageIndex, LEVELS.length - 1);
    return LEVELS[index];
  }, [difficulty, stageIndex]);

  const totalCells = stage.gridSize * stage.gridSize;
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const target = stage.targets.find((item) => item.position === index);
    return target || null;
  });

  useEffect(() => {
    if (!started) return;
    setPreviewMode(true);
    setSelectedCell(null);
    setCurrentTargetIndex(0);
    setFeedback('');
    const timer = setTimeout(() => setPreviewMode(false), 2400);
    return () => clearTimeout(timer);
  }, [stage, started]);

  const startGame = () => {
    setStarted(true);
    setScore(0);
    setStageIndex(0);
    setCompleted(false);
    setAchievement('');
    setFeedback('Remember each item location before the board hides.');
  };

  const handleCellClick = (index) => {
    if (previewMode || completed || !started) return;
    const target = stage.targets[currentTargetIndex];
    const isCorrect = target.position === index;
    setSelectedCell(index);
    if (isCorrect) {
      setScore((prev) => prev + 15);
      setFeedback(`Correct! ${target.name} was right there.`);
      if (currentTargetIndex + 1 === stage.targets.length) {
        const totalScore = score + 15;
        setAchievement(totalScore >= 45 ? 'Memory Champion' : 'Kingdom Guardian');
        setCompleted(true);
      } else {
        setCurrentTargetIndex((prev) => prev + 1);
        setTimeout(() => {
          setSelectedCell(null);
          setFeedback('Now find the next item.');
        }, 1000);
      }
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setFeedback('Not quite. Take another look at the board in your mind.');
      setTimeout(() => setSelectedCell(null), 800);
    }
  };

  const nextStage = () => {
    setStageIndex((prev) => Math.min(prev + 1, LEVELS.length - 1));
    setStarted(true);
    setCompleted(false);
    setSelectedCell(null);
    setFeedback('Review the items carefully before the board hides.');
  };

  const restart = () => {
    setStarted(false);
    setStageIndex(0);
    setSelectedCell(null);
    setScore(0);
    setCompleted(false);
    setFeedback('');
    setAchievement('');
  };

  if (!started) {
    return (
      <div style={{ padding: '20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 className="text-lg font-bold">Memory Kingdom</h3>
            <p className="text-xs text-secondary-color" style={{ margin: '12px 0' }}>
              Train working memory inside a storybook kingdom with polished visual recall challenges.
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
            Enter the Kingdom
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <p className="text-xs text-primary-color font-semibold" style={{ marginBottom: 8 }}>Preview & Recall</p>
          <p className="text-sm text-secondary-color">See the objects, then recall their locations from memory. Each stage increases the challenge.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Memory Kingdom</h3>
          <p className="text-xs text-secondary-color">Stage {stageIndex + 1} — {stage.label}</p>
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

      <div style={{ padding: 24, backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-lg)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 12 }}>Current target</p>
            <p className="text-base font-bold text-primary-color" style={{ marginBottom: 10 }}>{stage.targets[currentTargetIndex].name}</p>
            <p className="text-xs text-secondary-color">Tap the correct tile once the board hides.</p>
          </div>
          <div style={{ minWidth: 200, padding: 20, backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 15px 30px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <MapPin size={18} style={{ color: 'var(--primary)' }} />
              <span className="text-xs font-semibold text-primary-color">Memory preview</span>
            </div>
            <p className="text-xs text-secondary-color">{previewMode ? 'Watching items appear.' : 'Recall the target location from memory.'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stage.gridSize}, minmax(0, 1fr))`, gap: 12, marginBottom: 24 }}>
        {cells.map((cell, index) => {
          const isCorrect = stage.targets[currentTargetIndex]?.position === index;
          const isSelected = selectedCell === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleCellClick(index)}
              disabled={previewMode || completed}
              style={{
                minHeight: 100,
                borderRadius: '18px',
                border: '2px solid var(--border)',
                backgroundColor: previewMode && cell ? '#ffffff' : '#F8FAFC',
                opacity: previewMode && !cell ? 0.7 : 1,
                cursor: previewMode || completed ? 'default' : 'pointer',
                display: 'grid',
                placeItems: 'center',
                position: 'relative'
              }}
            >
              {previewMode && cell && <cell.icon size={32} color="var(--primary)" />}
              {!previewMode && isSelected && (
                <span style={{ position: 'absolute', top: 10, right: 10, color: isCorrect ? '#22C55E' : '#DC2626' }}>
                  {isCorrect ? '✓' : '✕'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!completed && (
        <div style={{ padding: 18, backgroundColor: '#EFF6FF', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--primary)', marginBottom: 24 }}>
          <p className="text-sm text-primary-color" style={{ margin: 0 }}>{feedback}</p>
        </div>
      )}

      {completed && (
        <div style={{ padding: 24, backgroundColor: '#ECFDF5', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid #34D399' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Award size={18} style={{ color: '#10B981' }} />
            <h4 className="text-sm font-bold text-primary-color" style={{ margin: 0 }}>Kingdom Remembered</h4>
          </div>
          <p className="text-sm text-secondary-color" style={{ marginBottom: 16 }}>
            You remembered the locations with strong focus and attention. Ready for the next level?
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="badge badge-primary">{achievement}</span>
            <span className="badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Score: {score}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={nextStage} disabled={stageIndex + 1 >= LEVELS.length}>
              {stageIndex + 1 < LEVELS.length ? 'Next Stage' : 'Replay Level'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={restart}>
              Restart Kingdom
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
