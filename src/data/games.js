// Brain Games Hub Data
// Child-friendly interactive games for cognitive development
// Structured for scalability with future database/API integration

const GAMES_DATA = [
  {
    id: 'game1',
    name: 'Memory Match',
    category: 'Memory',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    description: 'Flip cards to find matching pairs',
    skills: ['Working Memory', 'Focus', 'Pattern Recognition', 'Attention'],
    skillBadges: ['🧠 Working Memory', '🎯 Focus', '👁️ Visual Processing'],
    researchBacking: 'Working memory is fundamental for learning, problem-solving, and following instructions. This game strengthens neural pathways in the prefrontal cortex.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6346184/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      easyCards: 4,
      mediumCards: 8,
      hardCards: 12,
      cardImages: ['🐱', '🐶', '🦋', '🌻', '🍎', '🚀', '⭐', '🎈', '🦁', '🐠', '🎨', '🎵'],
      description: 'Difficulty 1: 4 cards, Difficulty 2: 8 cards, Difficulty 3: 12 cards'
    },
    tips: 'Start with 4 cards. Increase difficulty as child improves. Play in short sessions (5-10 mins). Celebrate attempts, not just wins.',
    videoUrl: null
  },
  {
    id: 'game2',
    name: 'Pattern Builder',
    category: 'Logic',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    description: 'Continue visual patterns by selecting the correct next element',
    skills: ['Logical Thinking', 'Problem Solving', 'Pattern Recognition', 'Sequential Reasoning'],
    skillBadges: ['🔍 Pattern Recognition', '💭 Logic', '📊 Reasoning'],
    researchBacking: 'Pattern recognition and logical thinking are crucial for STEM learning and executive function. These skills develop the child\'s ability to analyze, predict, and solve problems.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7326173/',
    difficulty: 1,
    maxDifficulty: 4,
    gameConfig: {
      level1: 'Simple color patterns (Red, Blue, Red, Blue, ?)',
      level2: 'Size patterns (Big, Small, Big, Small, ?)',
      level3: 'Shape patterns (Circle, Square, Circle, Square, ?)',
      level4: 'Complex multi-attribute patterns (Red Circle, Blue Square, Red Circle, Blue Square, ?)'
    },
    tips: 'Discuss the pattern aloud with your child. Ask "What comes next?" before showing answers. Use real-world objects as patterns.',
    videoUrl: null
  },
  {
    id: 'game3',
    name: 'Emotion Detective',
    category: 'Emotional Intelligence',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    description: 'Identify emotions from facial expressions and describe how they feel',
    skills: ['Emotional Intelligence', 'Social Awareness', 'Empathy', 'Self-Recognition'],
    skillBadges: ['😊 Emotions', '🤝 Social Skills', '❤️ Empathy'],
    researchBacking: 'Emotional literacy (understanding and naming emotions) is linked to better social relationships, academic performance, and mental health. Early exposure helps develop emotional regulation.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5789985/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      emotions: ['Happy', 'Sad', 'Angry', 'Scared', 'Surprised', 'Calm'],
      level1: 'Basic emotions (Happy, Sad, Angry)',
      level2: 'Extended emotions (add Scared, Surprised)',
      level3: 'Complex emotions (add Calm, Excited, Confused)',
      facialExpressions: ['😊', '😢', '😠', '😨', '😲', '😌']
    },
    tips: 'Name emotions during everyday activities. Ask "How are you feeling today?" Use a feelings chart. Validate all emotions.',
    videoUrl: null
  },
  {
    id: 'game4',
    name: 'Story Sequencer',
    category: 'Language & Creativity',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    description: 'Arrange image cards into the correct story order',
    skills: ['Creativity', 'Language Skills', 'Sequencing', 'Narrative Thinking'],
    skillBadges: ['📖 Stories', '✨ Creativity', '🧩 Sequencing'],
    researchBacking: 'Narrative skills are predictive of reading comprehension and literacy success. Sequencing develops logical thinking and temporal understanding crucial for learning and communication.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6123373/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      level1: '3 cards - Simple story (Wake up, Eat, Play)',
      level2: '4 cards - Connected story (Get dressed, Breakfast, School, Homework)',
      level3: '5 cards - Complex narrative (Morning routine, Travel, School, Snack, Bedtime)',
      storyExamples: [
        { title: 'Morning Routine', sequence: ['😴 Wake up', '🚿 Shower', '🥣 Breakfast', '🎒 Go to School'] },
        { title: 'Garden Adventure', sequence: ['🌱 Plant seed', '💧 Water it', '☀️ Sun shines', '🌻 Flower grows'] },
        { title: 'Cooking Together', sequence: ['👨‍🍳 Get ingredients', '🥄 Mix together', '🔥 Cook', '🍲 Eat!'] }
      ]
    },
    tips: 'Use picture books to teach story structure. Ask "What happened first, next, last?" Create story cards with your child.',
    videoUrl: null
  },
  {
    id: 'game5',
    name: 'Shape Sorter',
    category: 'Problem Solving',
    ageGroup: '1-2 Years',
    ageGroupValue: '1-2',
    description: 'Match shapes to their corresponding holes',
    skills: ['Shape Recognition', 'Problem Solving', 'Hand-Eye Coordination', 'Spatial Reasoning'],
    skillBadges: ['🔷 Shapes', '🎯 Accuracy', '✋ Coordination'],
    researchBacking: 'Shape recognition and spatial reasoning are foundational for mathematics, reading, and navigating the physical world. Sorting activities develop fine motor skills and cognitive flexibility.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5789978/',
    difficulty: 1,
    maxDifficulty: 2,
    gameConfig: {
      level1: 'Shapes: Circle, Square, Triangle',
      level2: 'Shapes: Circle, Square, Triangle, Star, Heart, Diamond',
      shapes: ['⭕', '◽', '△', '⭐', '❤️', '🔷']
    },
    tips: 'Play with household objects. Name shapes during daily activities. Try sorting toys by shape.',
    videoUrl: null
  },
  {
    id: 'game6',
    name: 'Color Match',
    category: 'Perception',
    ageGroup: '1-2 Years',
    ageGroupValue: '1-2',
    description: 'Match colors and learn color names',
    skills: ['Color Recognition', 'Visual Perception', 'Classification', 'Vocabulary'],
    skillBadges: ['🎨 Colors', '👁️ Vision', '🔠 Naming'],
    researchBacking: 'Color perception and naming support language development, visual processing, and categorization skills essential for cognitive development.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4969883/',
    difficulty: 1,
    maxDifficulty: 2,
    gameConfig: {
      level1: 'Primary colors: Red, Blue, Yellow',
      level2: 'Extended colors: Red, Blue, Yellow, Green, Purple, Orange',
      colors: ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠']
    },
    tips: 'Point out colors in nature. Sort household items by color. Play with colored blocks or scarves.',
    videoUrl: null
  },
  {
    id: 'game7',
    name: 'Counting Adventure',
    category: 'Numeracy',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    description: 'Count objects and match to numbers',
    skills: ['Number Recognition', 'Counting', 'Quantity Awareness', 'Mathematical Foundation'],
    skillBadges: ['🔢 Numbers', '📊 Counting', '🧮 Math'],
    researchBacking: 'Early numeracy skills are strong predictors of later mathematical success. Counting games develop subitizing (recognizing quantity without counting) and number sense.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6005234/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      level1: 'Count 1-5 objects',
      level2: 'Count 1-10 objects',
      level3: 'Count and identify numbers 1-20'
    },
    tips: 'Count objects during daily routines. Use fingers to count. Play number songs and rhymes.',
    videoUrl: null
  },
  {
    id: 'game8',
    name: 'Sound Detective',
    category: 'Auditory Processing',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    description: 'Listen to sounds and identify what made them',
    skills: ['Auditory Processing', 'Attention', 'Listening Skills', 'Environmental Awareness'],
    skillBadges: ['👂 Listening', '🎵 Sounds', '🧠 Processing'],
    researchBacking: 'Auditory processing and listening skills are foundational for language development, reading, and learning. Sound discrimination develops neural pathways for phonemic awareness.',
    researchUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6124567/',
    difficulty: 1,
    maxDifficulty: 3,
    gameConfig: {
      level1: 'Familiar sounds: Dog, Car, Doorbell',
      level2: 'Extended sounds: Animals, instruments, nature sounds',
      level3: 'Complex sounds: Multiple sounds, sound sequences'
    },
    tips: 'Listen to nature sounds together. Make different sounds with household items. Discuss what each sound means.',
    videoUrl: null
  }
];

export default GAMES_DATA;
