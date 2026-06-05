import React, { useState, useEffect } from 'react';
import { RotateCcw, HelpCircle, Leaf, Star, Shield, Sparkles, Globe2, HeartPulse, Zap, Circle, Square, Triangle } from 'lucide-react';

export default function MemoryMatch({ difficulty = 1, onClose }) {
  const cardIcons = [Leaf, Star, Shield, Sparkles, Globe2, HeartPulse, Zap, Circle, Square, Triangle];
  const maxCards = difficulty === 1 ? 4 : difficulty === 2 ? 8 : 12;

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const selectedIcons = cardIcons.slice(0, maxCards / 2);
    const cardArray = selectedIcons.flatMap((Icon) => [
      { id: Math.random(), Icon },
      { id: Math.random(), Icon }
    ]).sort(() => Math.random() - 0.5);

    setCards(cardArray);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setGameWon(false);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first]?.Icon === cards[second]?.Icon) {
        setMatched((prev) => [...prev, first, second]);
        setScore((prev) => prev + 10);
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 800);
        return () => clearTimeout(timer);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const handleCardClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped((prev) => [...prev, index]);
    }
  };

  const isFlipped = (index) => flipped.includes(index) || matched.includes(index);

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Memory Match</h3>
          <p className="text-xs text-secondary-color">Find all matching pairs.</p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Moves</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{moves}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Score</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{score}</p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={initializeGame}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.sqrt(maxCards)}, minmax(0, 1fr))`,
        gap: 12,
        marginBottom: 24,
        padding: 16,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)'
      }}>
        {cards.map((card, index) => {
          const Icon = card.Icon;
          const visible = isFlipped(index);
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={visible || gameWon}
              style={{
                padding: 0,
                aspectRatio: '1',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                backgroundColor: visible ? '#ffffff' : 'var(--primary)',
                color: visible ? 'var(--text-primary)' : '#ffffff',
                cursor: visible || gameWon ? 'default' : 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: visible ? '0 2px 12px rgba(15, 23, 42, 0.08)' : '0 6px 18px rgba(15, 23, 42, 0.16)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              {visible ? <Icon size={28} color="var(--primary)" /> : <HelpCircle size={28} color="rgba(255,255,255,0.85)" />}
            </button>
          );
        })}
      </div>

      {gameWon && (
        <div style={{
          padding: 20,
          backgroundColor: '#DBEAFE',
          border: '1px solid #93C5FD',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          marginBottom: 20
        }}>
          <p className="text-sm font-bold text-primary-color" style={{ marginBottom: 8 }}>
            Well done! You completed the board.
          </p>
          <p className="text-xs text-secondary-color">
            You matched every pair in <strong>{moves} moves</strong> and earned <strong>{score} points</strong>.
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={initializeGame}
            style={{ marginTop: 12 }}
          >
            Play Again
          </button>
        </div>
      )}

      <div style={{
        padding: 16,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--primary)'
      }}>
        <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
          <strong>Tip:</strong> Use your visual memory to remember where each icon is placed. This exercise builds working memory and attention.
        </p>
      </div>
    </div>
  );
}
