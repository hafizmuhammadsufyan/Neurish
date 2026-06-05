import React, { useState } from 'react';
import { ArrowRight, RefreshCcw, Award, Compass, Sparkles } from 'lucide-react';

const SCENES = [
  {
    title: 'Forest Crossing',
    description: 'A bridge has fallen away. Your friend is unsure whether to cross the stream.',
    prompt: 'What should you do first?',
    choices: [
      { label: 'Look for a safe path', result: 'You take a moment to find a sturdy route.', score: 10, positive: true },
      { label: 'Run straight across', result: 'The stream is slippery and your friend feels worried.', score: 0, positive: false },
      { label: 'Turn around immediately', result: 'You miss the adventure and stay stuck.', score: 0, positive: false }
    ]
  },
  {
    title: 'Market Mystery',
    description: 'The marketplace is busy and there is a stranger with a mysterious gift.',
    prompt: 'How do you respond?',
    choices: [
      { label: 'Ask a grown-up for help', result: 'Your choice keeps everyone safe and calm.', score: 10, positive: true },
      { label: 'Take the gift without asking', result: 'You feel unsure and a little uneasy.', score: 0, positive: false },
      { label: 'Ignore the stranger and walk away', result: 'You lose a chance to learn something useful.', score: 5, positive: false }
    ]
  },
  {
    title: 'Sky Lantern',
    description: 'You can light a lantern to help your village find the way home.',
    prompt: 'Which choice helps the village most?',
    choices: [
      { label: 'Light the lantern carefully', result: 'The lantern glows bright and guides everyone safely.', score: 10, positive: true },
      { label: 'Light it too quickly', result: 'The flame flickers and the light is weak.', score: 0, positive: false },
      { label: 'Leave it unlit', result: 'The path stays dark and the villagers feel lost.', score: 0, positive: false }
    ]
  }
];

export default function LogicAdventure({ game, difficulty = 1, onClose }) {
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [achievement, setAchievement] = useState('');

  const scene = SCENES[Math.min(sceneIndex, SCENES.length - 1)];

  const startGame = () => {
    setStarted(true);
    setSceneIndex(0);
    setSelected(null);
    setFeedback('');
    setScore(0);
    setCompleted(false);
    setAchievement('');
  };

  const chooseOption = (choice) => {
    setSelected(choice);
    setFeedback(choice.result);
    setScore((prev) => prev + choice.score);
    if (choice.score >= 10) {
      setAchievement((prev) => (prev.includes('Insight') ? prev : 'Cause & Effect Insight'));
    }
  };

  const nextScene = () => {
    if (sceneIndex + 1 >= SCENES.length) {
      setCompleted(true);
      setFeedback('You successfully navigated the adventure with thoughtful choices.');
      setAchievement(score >= 25 ? 'Adventure Leader' : 'Careful Thinker');
      return;
    }
    setSceneIndex((prev) => prev + 1);
    setSelected(null);
    setFeedback('');
  };

  const reset = () => {
    setStarted(false);
    setSceneIndex(0);
    setSelected(null);
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
            <h3 className="text-lg font-bold">Logic Adventure</h3>
            <p className="text-xs text-secondary-color" style={{ margin: '12px 0' }}>
              Engage in a story-driven decision game that builds cause-and-effect thinking and careful planning.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {game.skills.map((skill, index) => (
                <span key={index} className="badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontSize: 11, padding: '6px 10px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'center' }} onClick={startGame}>
            Begin Adventure
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <p className="text-xs text-primary-color font-semibold" style={{ marginBottom: 8 }}>Decision Story</p>
          <p className="text-sm text-secondary-color">Three scenes that reward thoughtful choices and help your child practice reasoning in a playful story world.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h3 className="text-lg font-bold">Logic Adventure</h3>
          <p className="text-xs text-secondary-color">Scene {sceneIndex + 1} of {SCENES.length}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span className="badge badge-primary" style={{ fontSize: 11 }}>Score {score}</span>
          <button className="btn btn-secondary btn-sm" onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCcw size={14} /> Restart
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Exit
          </button>
        </div>
      </div>

      <div style={{ padding: 24, backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-lg)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h4 className="text-base font-bold text-primary-color" style={{ marginBottom: 12 }}>{scene.title}</h4>
            <p className="text-sm text-secondary-color" style={{ marginBottom: 18 }}>{scene.description}</p>
            <p className="text-xs text-secondary-color">{scene.prompt}</p>
          </div>
          <div style={{ minWidth: 200, padding: 20, backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 15px 30px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Compass size={18} style={{ color: 'var(--primary)' }} />
              <span className="text-xs font-semibold text-primary-color">Decision meter</span>
            </div>
            <p className="text-xs text-secondary-color" style={{ lineHeight: 1.7 }}>{selected ? selected.result : 'Choose the best response to the story prompt.'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        {scene.choices.map((choice, index) => (
          <button
            key={index}
            type="button"
            onClick={() => chooseOption(choice)}
            disabled={!!selected}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: '18px',
              border: '1px solid var(--border)',
              backgroundColor: selected === choice ? '#EFF6FF' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: selected ? 'default' : 'pointer'
            }}
          >
            <div>
              <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}>{choice.label}</p>
              <p className="text-xs text-secondary-color">{choice.positive ? 'Thoughtful choice' : 'Risky choice'}</p>
            </div>
            <Sparkles size={22} style={{ color: choice.positive ? '#22C55E' : '#F59E0B' }} />
          </button>
        ))}
      </div>

      {selected && !completed && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={nextScene}>
            {sceneIndex + 1 === SCENES.length ? 'Finish Adventure' : 'Next Scene'}
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {completed && (
        <div style={{ padding: 24, backgroundColor: '#D1FAE5', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid #10B981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Award size={18} style={{ color: '#10B981' }} />
            <h4 className="text-sm font-bold text-primary-color" style={{ margin: 0 }}>Adventure Complete</h4>
          </div>
          <p className="text-sm text-secondary-color" style={{ marginBottom: 16 }}>
            You guided the story with thoughtful choices and built stronger cause-and-effect reasoning.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="badge badge-primary">{achievement}</span>
            <span className="badge" style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>Final score: {score}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={reset}>
            Retry Adventure
          </button>
        </div>
      )}
    </div>
  );
}
