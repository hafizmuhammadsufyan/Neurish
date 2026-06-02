import React, { createContext, useContext, useState, useMemo } from 'react';
import ARTICLES from '../data/articles';
import ACTIVITIES from '../data/activities';
import MILESTONES from '../data/milestones';
import RESEARCH_SOURCES from '../data/researchSources';
import { getRecommendations } from '../utils/recommendations';
import calculateAge from '../utils/calculateAge';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  // --- Personalization Profiles State ---
  const [childProfiles, setChildProfiles] = useState([
    {
      id: 'zain',
      name: 'Zain',
      dob: '2024-12-01', // ~1.5 Years Old
      gender: 'Male',
      concerns: ['Speech Development', 'Sleep Issues'],
      notes: 'Enjoys stacking blocks but gets frustrated quickly.'
    },
    {
      id: 'ayesha',
      name: 'Ayesha',
      dob: '2022-12-01', // ~3.5 Years Old
      gender: 'Female',
      concerns: ['Tantrums', 'Screen Time'],
      notes: 'Very energetic, loves drawing. Stubborn during meals.'
    }
  ]);
  
  const [activeChildId, setActiveChildId] = useState('zain');
  
  // --- Saved Articles & Checklisted Milestones State ---
  const [savedArticles, setSavedArticles] = useState(['a1']);
  const [completedMilestones, setCompletedMilestones] = useState(['m_c1', 'm_s1']);

  // Derived Active Child
  const activeChild = useMemo(() => {
    return childProfiles.find(c => c.id === activeChildId) || childProfiles[0];
  }, [childProfiles, activeChildId]);

  // Derived Recommendations using rule-based utility
  const recommendations = useMemo(() => {
    return getRecommendations({
      child: activeChild,
      articles: ARTICLES,
      activities: ACTIVITIES,
      milestones: MILESTONES
    });
  }, [activeChild]);

  // Handler: Select child profile
  const selectChild = (id) => {
    if (childProfiles.some(c => c.id === id)) {
      setActiveChildId(id);
    }
  };

  // Handler: Add child profile
  const addChildProfile = (newProfile) => {
    const id = newProfile.name.toLowerCase().replace(/\s+/g, '-') || `child-${Date.now()}`;
    const formattedProfile = {
      id,
      name: newProfile.name || 'Unnamed Child',
      dob: newProfile.dob || '2024-01-01',
      gender: newProfile.gender || 'Male',
      concerns: newProfile.concerns && newProfile.concerns.length > 0 ? newProfile.concerns : ['General Development'],
      notes: newProfile.notes || ''
    };

    setChildProfiles(prev => [...prev, formattedProfile]);
    setActiveChildId(id);
    return id;
  };

  // Handler: Toggle milestones completion
  const toggleMilestone = (id) => {
    setCompletedMilestones(prev => {
      if (prev.includes(id)) {
        return prev.filter(mId => mId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handler: Save/unsave articles
  const toggleSaveArticle = (id) => {
    setSavedArticles(prev => {
      if (prev.includes(id)) {
        return prev.filter(aId => aId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handler: Update child profile details
  const updateChildProfile = (id, updatedFields) => {
    setChildProfiles(prev => prev.map(child => {
      if (child.id === id) {
        return { ...child, ...updatedFields };
      }
      return child;
    }));
  };

  const contextValue = {
    childProfiles,
    activeChildId,
    activeChild,
    savedArticles,
    completedMilestones,
    recommendations,
    articles: ARTICLES,
    activities: ACTIVITIES,
    milestones: MILESTONES,
    researchSources: RESEARCH_SOURCES,
    selectChild,
    addChildProfile,
    toggleMilestone,
    toggleSaveArticle,
    updateChildProfile,
    calculateAge
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
}
