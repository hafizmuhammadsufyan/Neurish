import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Clock, Users, Play, Info } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import ActivityModal from '../components/ActivityModal';
import EmptyState from '../components/EmptyState';

export default function Activities() {
  const { activities, activeChild, calculateAge } = useApp();

  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const ageGroups = ['All', '0–1 Year', '1–2 Years', '2–3 Years', '3–5 Years', '5+ Years'];
  const categories = ['All', 'Memory', 'Language', 'Creativity', 'Problem Solving', 'Emotional Learning', 'Motor Skills'];

  // Filter activities based on parameters
  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      const matchesAge = selectedAge === 'All' || act.ageGroup === selectedAge;
      const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
      return matchesAge && matchesCategory;
    });
  }, [activities, selectedAge, selectedCategory]);

  const childName = activeChild?.name || 'Your Child';
  const childAge = activeChild ? calculateAge(activeChild.dob) : '0 Months';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="text-3xl font-bold">Child Activities Hub</h1>
        <p className="text-sm text-secondary-color">
          Play-based, low-prep developmental activities tailored to age-specific benchmarks.
        </p>
      </div>

      {/* Child age focus banner */}
      <div style={{ 
        backgroundColor: 'var(--primary-light)', 
        border: '1px solid var(--primary-border)', 
        padding: '12px 16px', 
        borderRadius: 'var(--radius-md)', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <p className="text-xs text-secondary-color" style={{ margin: 0 }}>
          Showing recommendations for <strong className="text-primary-color">{childName}</strong>'s developmental age group (<strong>{childAge}</strong>).
        </p>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => {
            // Find activity age corresponding to child age
            if (childAge.includes('Month')) {
              setSelectedAge('0–1 Year');
            } else {
              const years = parseFloat(childAge);
              if (years >= 5) setSelectedAge('5+ Years');
              else if (years >= 3) setSelectedAge('3–5 Years');
              else if (years >= 2) setSelectedAge('2–3 Years');
              else setSelectedAge('1–2 Years');
            }
            setSelectedCategory('All');
          }}
          style={{ padding: '4px 10px', fontSize: '11px', background: 'white' }}
        >
          Auto-Filter for {childName}
        </button>
      </div>

      {/* Age Filter Row */}
      <div style={{ marginBottom: 20 }}>
        <p className="text-xs text-muted-color font-semibold" style={{ textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>
          Filter by Age Group
        </p>
        <div className="flex gap-8" style={{ overflowX: 'auto', paddingBottom: 6 }}>
          {ageGroups.map(age => (
            <button 
              key={age} 
              onClick={() => setSelectedAge(age)}
              className={`btn ${selectedAge === age ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ minWidth: '80px', flexShrink: 0 }}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Row */}
      <div style={{ marginBottom: 32 }}>
        <p className="text-xs text-muted-color font-semibold" style={{ textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>
          Filter by Development Focus
        </p>
        <div className="flex gap-8" style={{ overflowX: 'auto', paddingBottom: 6 }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ borderRadius: 'var(--radius-full)', flexShrink: 0 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <EmptyState 
          title="No activities match your filters" 
          message="We don't have play guides matching this precise combination yet. Try selecting a broader age range or category."
          actionText="Show All Activities"
          onAction={() => {
            setSelectedAge('All');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-3">
          {filteredActivities.map(act => (
            <ActivityCard 
              key={act.id} 
              activity={act} 
              onOpen={() => setSelectedActivity(act)} 
            />
          ))}
        </div>
      )}

      {/* overlay modal for step details */}
      {selectedActivity && (
        <ActivityModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}
    </div>
  );
}
