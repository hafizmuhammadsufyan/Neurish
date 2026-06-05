import { Brain, Layers, Sparkles, Compass } from 'lucide-react';

const GAMES_DATA = [
  {
    id: 'brain-builder',
    name: 'Brain Builder',
    icon: Brain,
    category: 'Spatial Reasoning',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    description: 'Complete premium construction challenges by choosing the right pathway pieces.',
    skills: ['Planning', 'Spatial Reasoning', 'Problem Solving', 'Attention'],
    skillBadges: ['Logic', 'Shapes', 'Planning'],
    researchBacking: 'Spatial reasoning and planning support early STEM success by strengthening executive function and visual problem solving.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6346184/',
    difficulty: 1,
    maxDifficulty: 4,
    gameConfig: {
      level1: 'Simple bridge placements with clear shapes.',
      level2: 'Longer pathways and more tile choices.',
      level3: 'Mixed routes with extra planning.',
      level4: 'Advanced sequences for strong spatial growth.'
    },
    tips: 'Let your child explain why each shape fits before placing it, boosting reasoning and confidence.',
    videoUrl: null
  },
  {
    id: 'pattern-detective',
    name: 'Pattern Detective',
    icon: Layers,
    category: 'Pattern Logic',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    description: 'Find the missing shape in a sequence and uncover the hidden rule.',
    skills: ['Pattern Recognition', 'Sequencing', 'Critical Thinking', 'Visual Logic'],
    skillBadges: ['Patterns', 'Reasoning', 'Focus'],
    researchBacking: 'Pattern recognition is foundational for math and reading readiness, supporting neural circuits for prediction and reasoning.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7326173/',
    difficulty: 1,
    maxDifficulty: 4,
    gameConfig: {
      level1: 'Repeating sequences with clear shape patterns.',
      level2: 'Alternating shapes and simple rules.',
      level3: 'Two-attribute patterns and more options.',
      level4: 'Multi-step sequences that require careful thinking.'
    },
    tips: 'Ask your child to say the pattern aloud before choosing the next shape.',
    videoUrl: null
  },
  {
    id: 'memory-kingdom',
    name: 'Memory Kingdom',
    icon: Sparkles,
    category: 'Working Memory',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    description: 'Remember the hidden kingdom objects and select the right location from memory.',
    skills: ['Working Memory', 'Attention', 'Visual Recall', 'Focus'],
    skillBadges: ['Memory', 'Recall', 'Focus'],
    researchBacking: 'Strong working memory supports learning across reading, math, and following instructions by improving attention and recall.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4969883/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      level1: 'Short boards with three target items.',
      level2: 'Larger boards and more objects to remember.',
      level3: 'Advanced recall with extra placement challenge.'
    },
    tips: 'Encourage a quick memory check before selecting each item.',
    videoUrl: null
  },
  {
    id: 'logic-adventure',
    name: 'Logic Adventure',
    icon: Compass,
    category: 'Reasoning',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    description: 'Make thoughtful story choices that build cause-and-effect logic and empathy.',
    skills: ['Reasoning', 'Decision Making', 'Social Awareness', 'Empathy'],
    skillBadges: ['Choices', 'Thinking', 'Stories'],
    researchBacking: 'Story-based decision games help children practice cause-and-effect reasoning and social-emotional awareness in a safe, playful context.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6123373/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      level1: 'Simple story choices with clear outcomes.',
      level2: 'More nuanced decisions and impacts.',
      level3: 'Complex reasoning with multiple outcomes.'
    },
    tips: 'Ask your child why they chose each answer to reinforce thoughtful reasoning.',
    videoUrl: null
  }
];

export default GAMES_DATA;
