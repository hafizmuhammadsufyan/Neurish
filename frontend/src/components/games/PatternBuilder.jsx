import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle, XCircle, Circle, Square, Triangle, Star, Repeat } from 'lucide-react';

export default function PatternBuilder({ difficulty = 1, onClose }) {
  const patterns = [
    { name: 'Alternating Shapes', items: [Circle, Square, Circle, Square, null], options: [Circle, Square, Triangle] },
    { name: 'Size Rhythm', items: [Star, Star, Triangle, Triangle, null], options: [Star, Triangle, Square] },
    { name: 'Shape Sequence', items: [Square, Triangle, Square, Triangle, null], options: [Square, Triangle, Star] },
    { name: 'Color Logic', items: [Circle, Circle, Square, Square, null], options: [Circle, Square, Triangle] },
    { name: 'Pattern Pulse', items: [Triangle, Square, Triangle, Square, null], options: [Triangle, Square, Star] },
    { name: 'Mirror Sequence', items: [Star, Circle, Star, Circle, null], options: [Star, Circle, Square] }
  ];

  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    resetLevel();
  }, []);

  const resetLevel = () => {
    setCurrentPattern(Math.floor(Math.random() * patterns.length));
    setSelected(null);
    setFeedback('');
  };

  const checkAnswer = (option) => {
    const correctAnswer = patterns[currentPattern].items[4];
    if (!correctAnswer) return;

    if (option === correctAnswer) {
      setFeedback('Correct! Great work.');
      setCorrect((prev) => prev + 1);
      setScore((prev) => prev + 10 * currentLevel);
      setTimeout(() => {
        if (correct + 1 >= 3) {
          nextLevel();
        } else {
          resetLevel();
        }
      }, 1200);
    } else {
      setFeedback('Not quite. Try that again.');
      setTimeout(() => setFeedback(''), 1500);
    }
    setSelected(option);
  };

  const nextLevel = () => {
    if (currentLevel < 4) {
      setCurrentLevel((prev) => prev + 1);
      setCorrect(0);
      resetLevel();
    }
  };

  const pattern = patterns[currentPattern];

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Pattern Builder</h3>
          <p className="text-xs text-secondary-color">Complete the sequence.</p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Level</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{currentLevel}/4</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Score</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{score}</p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setCurrentLevel(1);
              setScore(0);
              setCorrect(0);
              resetLevel();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div style={{
        padding: 24,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 24,
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          {pattern.items.map((Item, idx) => (
            <div key={idx} style={{
              width: 56,
              height: 56,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: Item ? '#ffffff' : 'var(--border)',
              borderRadius: 'var(--radius-md)',
              border: Item ? '1px solid var(--border)' : '2px dashed var(--text-primary)'
            }}>
              {Item ? <Item size={28} color="var(--primary)" /> : <Repeat size={24} color="var(--text-secondary)" />}
            </div>
          ))}
        </div>

        {feedback && (
          <div style={{
            padding: 12,
            backgroundColor: feedback.includes('Correct') ? '#DBEAFE' : '#FED7D7',
            border: feedback.includes('Correct') ? '1px solid #93C5FD' : '1px solid #FC8181',
            borderRadius: 'var(--radius-md)',
            marginBottom: 16
          }}>
            <p className="text-sm font-semibold" style={{
              color: feedback.includes('Correct') ? 'var(--primary)' : '#DC2626',
              margin: 0
            }}>
              {feedback}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 12 }}>
          Which icon completes the pattern?
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 12
        }}>
          {pattern.options.map((Option, idx) => (
            <button
              key={idx}
              onClick={() => checkAnswer(Option)}
              disabled={feedback !== ''}
              style={{
                padding: 16,
                border: '2px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: selected === Option ? (feedback.includes('Correct') ? '#DBEAFE' : '#FED7D7') : 'white',
                borderColor: selected === Option ? (feedback.includes('Correct') ? 'var(--primary)' : '#DC2626') : 'var(--border)',
                cursor: feedback === '' ? 'pointer' : 'default',
                transition: 'all 0.2s',
                opacity: feedback === '' ? 1 : 0.6,
                display: 'grid',
                placeItems: 'center',
                minHeight: 96
              }}
            >
              <Option size={32} color="var(--primary)" />
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 20
      }}>
        {[1, 2, 3].map(num => (
          <div key={num} style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: num <= correct ? 'var(--primary)' : 'var(--border)'
          }} />
        ))}
      </div>

      <div style={{
        padding: 16,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--primary)'
      }}>
        <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
          <strong>Tip:</strong> Pay attention to the repeating shapes and colors. Spotting the pattern builds logical thinking and attention.
        </p>
      </div>
    </div>
  );
}
