import React, { useState, useEffect } from 'react';
import { RotateCcw, Smile, Frown, Meh, AlertCircle, CloudRain, Zap } from 'lucide-react';

export default function EmotionDetective({ difficulty = 1, onClose }) {
  const emotions = [
    { Icon: Smile, name: 'Happy', description: 'A bright smile and cheerful expression.' },
    { Icon: Frown, name: 'Sad', description: 'A downturned mouth and quiet eyes.' },
    { Icon: AlertCircle, name: 'Surprised', description: 'Wide eyes and an open expression.' },
    { Icon: CloudRain, name: 'Worried', description: 'A tense face with thoughtful eyes.' },
    { Icon: Zap, name: 'Excited', description: 'Energetic and eager to participate.' },
    { Icon: Meh, name: 'Calm', description: 'A relaxed look and gentle expression.' }
  ];

  const emotionsByDifficulty = {
    1: emotions.slice(0, 3),
    2: emotions.slice(0, 5),
    3: emotions
  };

  const availableEmotions = emotionsByDifficulty[difficulty];

  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    nextEmotion();
  }, []);

  const nextEmotion = () => {
    const randomIdx = Math.floor(Math.random() * availableEmotions.length);
    setCurrentEmotion(randomIdx);
    setSelected(null);
    setFeedback('');
    setTotal((prev) => prev + 1);
  };

  const checkAnswer = (emotion) => {
    const currentEmotionName = availableEmotions[currentEmotion].name;

    if (emotion.name === currentEmotionName) {
      setFeedback('Correct! Great job.');
      setCorrect((prev) => prev + 1);
      setScore((prev) => prev + 10);
      setTimeout(() => nextEmotion(), 1500);
    } else {
      setFeedback(`Not quite. That was ${emotion.name}, while the prompt shows ${currentEmotionName}.`);
      setTimeout(() => nextEmotion(), 2000);
    }
    setSelected(emotion.name);
  };

  const emotion = availableEmotions[currentEmotion];

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Emotion Detective</h3>
          <p className="text-xs text-secondary-color">Match the emotion to the expression.</p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Correct</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{correct}/{total}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Score</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{score}</p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setScore(0);
              setCorrect(0);
              setTotal(1);
              nextEmotion();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div style={{
        padding: 40,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 24,
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 72,
          marginBottom: 16,
          color: 'var(--primary)'
        }}>
          <emotion.Icon size={72} />
        </div>
        <p className="text-base font-semibold text-primary-color" style={{ marginBottom: 8 }}>
          Which emotion does this show?
        </p>
        <p className="text-sm text-secondary-color">
          {emotion.description}
        </p>
      </div>

      {feedback && (
        <div style={{
          padding: 16,
          backgroundColor: feedback.startsWith('Correct') ? '#DBEAFE' : '#FED7D7',
          border: feedback.startsWith('Correct') ? '1px solid #93C5FD' : '1px solid #FC8181',
          borderRadius: 'var(--radius-md)',
          marginBottom: 24,
          textAlign: 'center'
        }}>
          <p className="text-sm font-semibold" style={{
            color: feedback.startsWith('Correct') ? 'var(--primary)' : '#DC2626',
            margin: 0
          }}>
            {feedback}
          </p>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 12 }}>
          Choose the emotion:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 12
        }}>
          {availableEmotions.map((emot, idx) => (
            <button
              key={idx}
              onClick={() => checkAnswer(emot)}
              disabled={feedback !== ''}
              style={{
                padding: 16,
                border: '2px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: selected === emot.name ? (feedback.startsWith('Correct') ? '#DBEAFE' : '#FED7D7') : 'white',
                borderColor: selected === emot.name ? (feedback.startsWith('Correct') ? 'var(--primary)' : '#DC2626') : 'var(--border)',
                cursor: feedback === '' ? 'pointer' : 'default',
                transition: 'all 0.2s',
                opacity: feedback === '' ? 1 : 0.6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}
            >
              <emot.Icon size={28} color="var(--primary)" />
              <span className="text-xs font-semibold text-primary-color">{emot.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        width: '100%',
        height: 8,
        backgroundColor: 'var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: 20
      }}>
        <div style={{
          height: '100%',
          width: `${(correct / Math.max(total, 1)) * 100}%`,
          backgroundColor: 'var(--primary)',
          transition: 'width 0.3s'
        }} />
      </div>

      <div style={{
        padding: 16,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--primary)'
      }}>
        <p className="text-xs font-bold text-primary-color" style={{ marginBottom: 8 }}>
          Why emotions matter:
        </p>
        <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
          Recognizing emotions helps kids develop empathy and social skills. When children understand how others feel, they can respond with kindness and make better friends.
        </p>
      </div>
    </div>
  );
}
