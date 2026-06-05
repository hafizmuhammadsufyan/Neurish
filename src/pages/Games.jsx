import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import GAMES_DATA from '../data/games';
import GameCard from '../components/games/GameCard';
import BrainBuilder from '../components/games/BrainBuilder';
import LogicAdventure from '../components/games/LogicAdventure';
import MemoryKingdom from '../components/games/MemoryKingdom';
import PatternDetective from '../components/games/PatternDetective';
import { Gamepad2, Award, ArrowLeft, TrendingUp, Lightbulb, Clock, BookOpen } from 'lucide-react';

export default function Games() {
  const { activeChild, calculateAge } = useApp();
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameDifficulty, setGameDifficulty] = useState(1);

  const childAge = activeChild ? calculateAge(activeChild.dob) : '';
  const childName = activeChild?.name || 'Your Child';

  // Game renderer component
  const GameRenderer = ({ gameId, difficulty, game }) => {
    const gameMap = {
      'brain-builder': <BrainBuilder game={game} difficulty={difficulty} onClose={() => setSelectedGame(null)} />,
      'pattern-detective': <PatternDetective game={game} difficulty={difficulty} onClose={() => setSelectedGame(null)} />,
      'memory-kingdom': <MemoryKingdom game={game} difficulty={difficulty} onClose={() => setSelectedGame(null)} />,
      'logic-adventure': <LogicAdventure game={game} difficulty={difficulty} onClose={() => setSelectedGame(null)} />
    };
    return gameMap[gameId] || null;
  };

  if (selectedGame) {
    const game = GAMES_DATA.find(g => g.id === selectedGame);
    return (
      <div>
        {/* Back Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSelectedGame(null);
              setGameDifficulty(1);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <ArrowLeft size={14} /> Back to Games
          </button>
          <div>
            <h2 className="text-2xl font-bold" style={{ margin: 0 }}>{game.name}</h2>
            <p className="text-xs text-secondary-color" style={{ margin: '4px 0 0 0' }}>
              {game.category} • Age {game.ageGroup}
            </p>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div style={{ marginBottom: 24 }}>
          <p className="text-sm font-semibold text-primary-color" style={{ marginBottom: 12 }}>
            Select Difficulty Level
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[1, 2, 3, 4].map(level => (
              level <= game.maxDifficulty && (
                <button
                  key={level}
                  onClick={() => setGameDifficulty(level)}
                  className={gameDifficulty === level ? 'badge badge-primary' : 'badge badge-outline'}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    fontSize: 12,
                    transition: 'all 0.2s'
                  }}
                >
                  Level {level}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Game Info */}
        <div className="card" style={{ padding: 16, marginBottom: 24, backgroundColor: '#F3F4F6', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p className="text-xs font-bold text-primary-color" style={{ marginBottom: 6 }}>Skills Developed</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {game.skills.map((skill, idx) => (
                  <span key={idx} className="badge" style={{ fontSize: 10, backgroundColor: '#DBEAFE', color: 'var(--primary)', padding: '4px 8px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-primary-color" style={{ marginBottom: 6 }}>Research Backing</p>
              <p className="text-xs text-secondary-color" style={{ margin: 0 }}>
                {game.researchBacking}
              </p>
            </div>
          </div>
        </div>

        {/* Game Component */}
        <GameRenderer gameId={selectedGame} difficulty={gameDifficulty} game={game} />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Gamepad2 size={32} style={{ color: 'var(--primary)' }} />
          <h1 className="text-3xl font-bold">Brain Games Hub</h1>
        </div>
        <p className="text-sm text-secondary-color">
          Child-friendly interactive games for <span className="font-semibold text-primary-color">{childName}</span>'s cognitive development
        </p>
      </div>

      {/* Info Banner */}
      <div style={{ 
        backgroundColor: 'var(--primary-light)', 
        border: '1px solid var(--primary-border)', 
        padding: '16px 20px', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex', 
        gap: 16, 
        marginBottom: 32, 
        alignItems: 'flex-start' 
      }}>
        <div style={{ color: 'var(--primary)', marginTop: 2 }}><Gamepad2 size={20} /></div>
        <div>
          <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 4 }}>
            Learning Through Play
          </h4>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
            Research shows that interactive games strengthen working memory, problem-solving skills, emotional intelligence, and language development. Each game is designed for age-appropriate challenge and includes difficulty levels. Play in short sessions (10-15 minutes) for best results.
          </p>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-2" style={{ gap: '16px', marginBottom: 32 }}>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
            <h3 className="text-sm font-bold text-primary-color">Cognitive Skills</h3>
          </div>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.5 }}>
            Memory, focus, pattern recognition, logic, and reasoning abilities.
          </p>
        </div>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Award size={20} style={{ color: 'var(--primary)' }} />
            <h3 className="text-sm font-bold text-primary-color">Social-Emotional</h3>
          </div>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.5 }}>
            Emotional awareness, empathy, patience, and persistence.
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-2" style={{ gap: '24px', marginBottom: 40 }}>
        {GAMES_DATA.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onPlay={() => {
              setSelectedGame(game.id);
              setGameDifficulty(1);
            }}
          />
        ))}
      </div>

      {/* Tips Section */}
      <div className="card" style={{ padding: 24, backgroundColor: '#F3F4F6' }}>
        <h3 className="text-base font-bold text-primary-color" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Lightbulb size={18} /> Parenting Tips for Game Time
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><Gamepad2 size={16} /> Keep It Fun</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Focus on enjoyment, not perfection. Celebrate effort and progress, not just correct answers. Let your child set the pace.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><Clock size={16} /> Session Guidelines</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Ages 2-3: 5-10 minutes at a time. Ages 3-5: 10-15 minutes. Ages 5+: 15-20 minutes. Multiple short sessions are better than one long session.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><BookOpen size={16} /> Learn Together</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Play alongside your child. Ask questions like "What comes next?" or "How does this make you feel?" to deepen learning and bonding.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><Award size={16} /> Progress Over Perfection</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Don't skip to harder levels too quickly. Mastery at the current level builds confidence. Each game can be replayed unlimited times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
