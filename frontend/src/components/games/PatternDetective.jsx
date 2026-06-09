import React, { useState, useMemo } from 'react';
import { ArrowRight, RefreshCcw, Award, Layers, Sparkles, Circle, Square, Triangle, Star } from 'lucide-react';

const PATTERNS = [
  {
    title: 'Shape Trail',
    items: ['Circle', 'Square', 'Circle', 'Square', null],
    options: ['Circle', 'Square', 'Triangle']
  },
  {
    title: 'Sky Sequence',
    items: ['Star', 'Circle', 'Star', 'Circle', null],
    options: ['Star', 'Square', 'Triangle']
  },
  {
    title: 'Tower Logic',
    items: ['Square', 'Square', 'Triangle', 'Triangle', null],
    options: ['Circle', 'Triangle', 'Square']
  },
  {
    title: 'Pattern Pulse',
    items: ['Triangle', 'Square', 'Triangle', 'Square', null],
    options: ['Triangle', 'Star', 'Circle']
  }
];

const ICONS = {
  Circle,
  Square,
  Triangle,
  Star
};

export default function PatternDetective({ game, difficulty = 1, onClose }) {
  const [started, setStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [achievement, setAchievement] = useState('');

  const round = useMemo(() => {
    const index = Math.min((difficulty - 1) + roundIndex, PATTERNS.length - 1);
    return PATTERNS[index];
  }, [difficulty, roundIndex]);

  const correctAnswer = round.items[round.items.length - 1];

  const startGame = () => {
    setStarted(true);
    setRoundIndex(0);
    setSelectedOption(null);
    setFeedback('');
    setScore(0);
    setCompleted(false);
    setAchievement('');
  };

  const chooseOption = (option) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      const nextScore = score + 15;
      setScore(nextScore);
      setFeedback('Correct! The pattern makes sense.');
      if (nextScore >= 45) {
        setAchievement('Pattern Master');
      }
      setTimeout(() => {
        if (roundIndex + 1 >= PATTERNS.length) {
          setCompleted(true);
          setAchievement(nextScore >= 45 ? 'Pattern Master' : 'Pattern Detective');
        } else {
          setRoundIndex((prev) => prev + 1);
          setSelectedOption(null);
          setFeedback('');
        }
      }, 1000);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setFeedback('Not quite. Look at the repeating shapes again.');
    }
  };

  const restart = () => {
    setStarted(false);
    setRoundIndex(0);
    setSelectedOption(null);
    setFeedback('');
    setScore(0);
    setCompleted(false);
    setAchievement('');
  };

  if (!started) {
    return (
      <div style={{ padding: '20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 className="text-lg font-bold">Pattern Detective</h3>
            <p className="text-xs text-secondary-color" style={{ margin: '12px 0' }}>
              Discover repeating sequences and next-step logic in a premium visual challenge.
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
            Start Investigation
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <p className="text-xs text-primary-color font-semibold" style={{ marginBottom: 8 }}>Pattern Logic</p>
          <p className="text-sm text-secondary-color">Each round asks you to spot the next item in a sequence. Visual reasoning grows stronger with every answer.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Pattern Detective</h3>
          <p className="text-xs text-secondary-color">Round {roundIndex + 1} of {PATTERNS.length}</p>
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
            <h4 className="text-base font-bold text-primary-color" style={{ marginBottom: 12 }}>{round.title}</h4>
            <p className="text-xs text-secondary-color">Which icon comes next in the sequence?</p>
          </div>
          <div style={{ minWidth: 200, padding: 20, backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 15px 30px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Layers size={18} style={{ color: 'var(--primary)' }} />
              <span className="text-xs font-semibold text-primary-color">Pattern strength</span>
            </div>
            <p className="text-xs text-secondary-color">{feedback || 'Solve the sequence to keep the case moving.'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        {round.items.map((iconKey, index) => {
          if (!iconKey) {
            return (
              <div key={index} style={{ width: 72, height: 72, borderRadius: '18px', border: '2px dashed var(--border)', display: 'grid', placeItems: 'center', backgroundColor: '#F8FAFC' }}>
                <Sparkles size={24} color="var(--text-secondary)" />
              </div>
            );
          }
          const Icon = ICONS[iconKey];
          return (
            <div key={index} style={{ width: 72, height: 72, borderRadius: '18px', border: '2px solid var(--border)', display: 'grid', placeItems: 'center', backgroundColor: 'white' }}>
              <Icon size={30} color="var(--primary)" />
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gap: 14, marginBottom: 24 }}>
        {round.options.map((option, index) => {
          const Icon = ICONS[option];
          return (
            <button
              key={index}
              type="button"
              onClick={() => chooseOption(option)}
              disabled={completed}
              style={{
                padding: 18,
                borderRadius: '18px',
                border: '1px solid var(--border)',
                backgroundColor: selectedOption === option ? '#EFF6FF' : 'white',
                cursor: completed ? 'default' : 'pointer',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 14,
                alignItems: 'center'
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '14px', backgroundColor: '#F8FAFC', display: 'grid', placeItems: 'center' }}>
                <Icon size={24} color="var(--primary)" />
              </div>
              <span className="text-sm text-primary-color">{option}</span>
            </button>
          );
        })}
      </div>

      {completed && (
        <div style={{ padding: 24, backgroundColor: '#ECFDF5', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid #34D399' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Award size={18} style={{ color: '#10B981' }} />
            <h4 className="text-sm font-bold text-primary-color" style={{ margin: 0 }}>Pattern Case Solved</h4>
          </div>
          <p className="text-sm text-secondary-color" style={{ marginBottom: 16 }}>
            Fantastic work! You tracked the logic and selected the right pattern piece.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="badge badge-primary">{achievement}</span>
            <span className="badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Score: {score}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={restart}>
            Try new pattern
          </button>
        </div>
      )}
    </div>
  );
}
