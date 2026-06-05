import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, BookOpen, Sun, Droplet, Home, Leaf, Bug, ShoppingBag, Flame, Truck, MapPin, Activity, IceCream } from 'lucide-react';

export default function StorySequencer({ difficulty = 1, onClose }) {
  const stories = [
    {
      name: 'Morning Routine',
      sequence: [
        { Icon: Sun, text: 'Wake up' },
        { Icon: Droplet, text: 'Get ready' },
        { Icon: BookOpen, text: 'Eat breakfast' },
        { Icon: Home, text: 'Leave for school' }
      ]
    },
    {
      name: 'Planting a Garden',
      sequence: [
        { Icon: Seedling, text: 'Plant a seed' },
        { Icon: Droplet, text: 'Water it' },
        { Icon: Sun, text: 'Let the sun help' },
        { Icon: Bug, text: 'A bug visits' },
        { Icon: Activity, text: 'A flower blooms' }
      ]
    },
    {
      name: 'Cooking Together',
      sequence: [
        { Icon: ShoppingBag, text: 'Gather ingredients' },
        { Icon: Flame, text: 'Cook on the stove' },
        { Icon: Activity, text: 'Stir with care' },
        { Icon: BookOpen, text: 'Serve the meal' },
        { Icon: IceCream, text: 'Enjoy together' }
      ]
    },
    {
      name: 'Day at the Park',
      sequence: [
        { Icon: Home, text: 'Leave home' },
        { Icon: Truck, text: 'Travel to the park' },
        { Icon: MapPin, text: 'Arrive and explore' },
        { Icon: Activity, text: 'Play with friends' },
        { Icon: IceCream, text: 'Have a snack' },
        { Icon: Home, text: 'Go home' }
      ]
    }
  ];

  const storysByDifficulty = {
    1: stories.slice(0, 1),
    2: stories.slice(0, 2),
    3: stories
  };

  const availableStories = storysByDifficulty[difficulty];

  const [currentStory, setCurrentStory] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    newStory();
  }, []);

  const newStory = () => {
    const story = availableStories[currentStory];
    const shuffled = [...story.sequence].sort(() => Math.random() - 0.5);
    setSequence(shuffled);
    setFeedback('');
  };

  const moveUp = (index) => {
    if (index > 0) {
      const newSeq = [...sequence];
      [newSeq[index], newSeq[index - 1]] = [newSeq[index - 1], newSeq[index]];
      setSequence(newSeq);
    }
  };

  const moveDown = (index) => {
    if (index < sequence.length - 1) {
      const newSeq = [...sequence];
      [newSeq[index], newSeq[index + 1]] = [newSeq[index + 1], newSeq[index]];
      setSequence(newSeq);
    }
  };

  const checkAnswer = () => {
    const story = availableStories[currentStory];
    const isCorrect = sequence.every((item, idx) => item.text === story.sequence[idx].text);

    if (isCorrect) {
      setFeedback('Perfect! You solved it.');
      setCorrect((prev) => prev + 1);
      setScore((prev) => prev + 20);
      setTimeout(() => {
        if (currentStory < availableStories.length - 1) {
          setCurrentStory((prev) => prev + 1);
          newStory();
        } else {
          setFeedback('You completed all stories! Fantastic.');
        }
      }, 1200);
    } else {
      setFeedback('Not quite right. Try rearranging the cards.');
    }
  };

  const story = availableStories[currentStory];

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Story Sequencer</h3>
          <p className="text-xs text-secondary-color">Arrange the story in the right order.</p>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Story</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>
              {currentStory + 1}/{availableStories.length}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="text-xs text-muted-color">Score</span>
            <p className="text-lg font-bold" style={{ margin: 0, color: 'var(--primary)' }}>{score}</p>
          </div>
        </div>
      </div>

      <div style={{
        padding: 16,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 24,
        textAlign: 'center',
        borderLeft: '4px solid var(--primary)'
      }}>
        <p className="text-base font-bold text-primary-color" style={{ margin: 0 }}>
          <BookOpen size={18} /> {story.name}
        </p>
        <p className="text-xs text-secondary-color" style={{ margin: '8px 0 0 0' }}>
          Move the cards to place the story in the correct order.
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        {sequence.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: 12,
              alignItems: 'center',
              padding: 12,
              backgroundColor: 'white',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 8,
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 12
            }}>
              {idx + 1}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <item.Icon size={24} color="var(--primary)" />
              <span className="font-semibold text-primary-color">{item.text}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                style={{
                  padding: 6,
                  border: 'none',
                  backgroundColor: idx === 0 ? 'var(--border)' : 'var(--bg-app)',
                  color: idx === 0 ? 'var(--text-muted)' : 'var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  cursor: idx === 0 ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === sequence.length - 1}
                style={{
                  padding: 6,
                  border: 'none',
                  backgroundColor: idx === sequence.length - 1 ? 'var(--border)' : 'var(--bg-app)',
                  color: idx === sequence.length - 1 ? 'var(--text-muted)' : 'var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  cursor: idx === sequence.length - 1 ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {feedback && (
        <div style={{
          padding: 16,
          backgroundColor: feedback.startsWith('Perfect') ? '#DBEAFE' : '#FED7D7',
          border: feedback.startsWith('Perfect') ? '1px solid #93C5FD' : '1px solid #FC8181',
          borderRadius: 'var(--radius-md)',
          marginBottom: 16,
          textAlign: 'center'
        }}>
          <p className="text-sm font-semibold" style={{
            color: feedback.startsWith('Perfect') ? 'var(--primary)' : '#DC2626',
            margin: 0
          }}>
            {feedback}
          </p>
        </div>
      )}

      <button
        className="btn btn-primary"
        onClick={checkAnswer}
        style={{ width: '100%', marginBottom: 24 }}
      >
        Check Answer
      </button>

      <div style={{
        padding: 16,
        backgroundColor: 'var(--bg-app)',
        borderRadius: 'var(--radius-lg)',
        borderLeft: '4px solid var(--primary)'
      }}>
        <p className="text-xs font-bold text-primary-color" style={{ marginBottom: 8 }}>
          Sequencing helps with:
        </p>
        <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
          • Understanding cause and effect
          • Building language and story skills
          • Developing logical thinking
          • Planning and organizing actions
        </p>
      </div>
    </div>
  );
}
