import React, { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  Award, 
  User, 
  ChevronRight, 
  Plus, 
  Heart, 
  Clock, 
  Info, 
  ChevronDown, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  UserPlus, 
  ArrowLeft, 
  FileText,
  AlertTriangle,
  X,
  Check
} from 'lucide-react';

/* ==========================================================================
   MOCK DATA (STARTUP QUALITY EVIDENCE-BASED SCHEMAS)
   ========================================================================== */

// Trusted scientific sources for the Research Center
const SCIENTIFIC_SOURCES = [
  { id: 'who', name: 'World Health Organization (WHO)', logoText: 'WHO' },
  { id: 'unicef', name: 'UNICEF (Early Childhood Development)', logoText: 'UNICEF' },
  { id: 'harvard', name: 'Harvard Center on the Developing Child', logoText: 'HARVARD' },
  { id: 'cdc', name: 'Centers for Disease Control and Prevention (CDC)', logoText: 'CDC' },
  { id: 'aap', name: 'American Academy of Pediatrics (AAP)', logoText: 'AAP' },
  { id: 'nih', name: 'National Institutes of Health (NIH)', logoText: 'NIH' }
];

// Reference studies
const STUDIES = [
  {
    id: 's1',
    title: 'The Science of Early Childhood Development: Laying the Foundation',
    source: 'Harvard Center on the Developing Child',
    year: '2020',
    finding: '90% of brain development occurs before the age of 5. Early relationships and experiences shape brain architecture.'
  },
  {
    id: 's2',
    title: 'Screen Time and Early Child Cognitive Development',
    source: 'American Academy of Pediatrics (AAP)',
    year: '2021',
    finding: 'Excessive screen time in toddler years is associated with delays in language acquisition and emotional regulation.'
  },
  {
    id: 's3',
    title: 'Play-based Learning and Fine Motor Control in Early Childhood',
    source: 'UNICEF Research',
    year: '2019',
    finding: 'Guided interactive play-based learning shows a 40% higher retention of cognitive tasks in children aged 2-4.'
  },
  {
    id: 's4',
    title: 'Parental Stress and Child Behavioral Outcomes',
    source: 'WHO Bulletin',
    year: '2022',
    finding: 'Supporting parental mental wellbeing directly correlates with a reduction in child tantrums and hyper-reactive behaviors.'
  }
];

// Learn Hub Articles
const ARTICLES = [
  {
    id: 'a1',
    title: 'Navigating Tantrums: A Guide for Pakistani Parents',
    category: 'Behavior & Tantrums',
    readTime: '5 min read',
    difficulty: 'Actionable',
    ageGroup: '1–3 Years',
    concern: 'Tantrums',
    summary: 'Practical scientific ways to de-escalate toddlers tantrums using "emotional mirroring" tailored to multi-generational Pakistani households.',
    body: 'Tantrums are a normal biological response to frustration in early childhood. For toddlers, emotional expression is raw. In Pakistani joint family settings, tantrums can often feel heightened due to multiple caregivers reacting differently. The scientific solution is "emotional mirroring" and maintaining a calm demeanor. Set clear boundaries while showing empathy. Do not bribe or scold; instead, name the feeling: "I know you are angry, but we do not throw toys." Once the child is calm, redirect them to a physical activity.',
    author: 'Dr. Sarah Khan, Pediatric Neuroscientist',
    reference: 'American Academy of Pediatrics (2020) Study on Emotion Dysregulation.',
    sourceId: 'aap'
  },
  {
    id: 'a2',
    title: 'Building Early Vocabulary: Talking Beyond Urdu & English',
    category: 'Communication',
    readTime: '4 min read',
    difficulty: 'Easy',
    ageGroup: '0–2 Years',
    concern: 'Speech Development',
    summary: 'How speaking to your baby in descriptive sentences (narrating your day) boosts cognitive synapse connections.',
    body: 'Language development is driven by high-quality talk. Rather than using flashcards, descriptive narration is key. Narrate your everyday actions in Urdu, Punjabi, English or your native language. Say things like, "Look, I am cutting this red apple, it is crunchy." Babies who hear a high frequency of descriptive words develop stronger neural paths. Studies show this is far more effective than baby-talk or educational videos.',
    author: 'Zainab Qureshi, Speech-Language Pathologist',
    reference: 'CDC Pediatric Language Acquisition Milestones (2022).',
    sourceId: 'cdc'
  },
  {
    id: 'a3',
    title: 'Screen Time Limits and Alternatives in Modern Homes',
    category: 'Screen Time',
    readTime: '6 min read',
    difficulty: 'Actionable',
    ageGroup: '1–5 Years',
    concern: 'Screen Time',
    summary: 'A roadmap to replacing screens with high-cognitive physical play without causing family friction.',
    body: 'The Harvard Center on the Developing Child warns that excessive screens can weaken the "serve-and-return" interaction needed for brain growth. To replace screens: 1) Implement absolute screen-free zones (dining table, bedrooms). 2) Introduce structured toy rotations. 3) Engage in 15 minutes of dedicated "co-play". When transitioning away from screens, do not just switch the TV off; announce a fun tactile replacement like playing with dough or water.',
    author: 'Dr. Bilal Haroon, Child Psychiatrist',
    reference: 'Harvard Center on the Developing Child (2021).',
    sourceId: 'harvard'
  },
  {
    id: 'a4',
    title: 'Understanding Pediatric Sleep Cycles & Sleep Training',
    category: 'Sleep',
    readTime: '5 min read',
    difficulty: 'Actionable',
    ageGroup: '0–2 Years',
    concern: 'Sleep Issues',
    summary: 'Establishing a wind-down routine that works within Pakistani family dynamics and typical late dinner schedules.',
    body: 'Establishing healthy sleep habits requires biological alignment. Toddlers require 11 to 14 hours of total sleep per day. Late dinners (common in Pakistan) can push bedtime past the child\'s natural circadian window, leading to cortisol spikes and hyper-active behaviour. Create a 30-minute low-light routine before bed: dim the lights, read a picture book, and play soft white noise or a lullaby. Avoid physical excitement right before bed.',
    author: 'Dr. Amina Yusuf, Sleep Specialist',
    reference: 'WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep for Children Under 5 Years.',
    sourceId: 'who'
  },
  {
    id: 'a5',
    title: 'Fostering Confidence through Emotional Expression',
    category: 'Emotional Development',
    readTime: '4 min read',
    difficulty: 'Easy',
    ageGroup: '3–5 Years',
    concern: 'Emotional Regulation',
    summary: 'Teaching your child to label their emotions instead of repressing or throwing fits.',
    body: 'Emotional regulation starts with identification. Use simple emotion faces or descriptive terms to help them say: "I feel frustrated" or "I am sad." When a child can label an emotion, they engage the prefrontal cortex, which dampens the amygdala (fear/rage center). In Pakistani parenting culture, we often say "chup ho jao" (be quiet), which blocks emotional learning. Encouraging healthy emotional labeling fosters resilience.',
    author: 'Dr. Sarah Khan, Pediatric Neuroscientist',
    reference: 'American Academy of Pediatrics (2020) Child Development Research.',
    sourceId: 'aap'
  },
  {
    id: 'a6',
    title: 'Developing Social Skills through Cooperative Play',
    category: 'Social Development',
    readTime: '5 min read',
    difficulty: 'Easy',
    ageGroup: '2–5 Years',
    concern: 'Social Skills',
    summary: 'Engaging toddlers in simple turn-taking exercises that build active sharing neural circuits.',
    body: 'Social skills are learned, not innate. Turn-taking is the building block of empathy and cooperation. Start with simple games like rolling a ball back and forth, saying, "My turn, now Ayesha\'s turn!" This simple loop trains the brain to wait, cooperate, and read basic social cues. In multi-child environments, structure turn-taking with visual cues like a simple sand-timer or a soft toy to represent the "speaker".',
    author: 'Zainab Qureshi, Speech-Language Pathologist',
    reference: 'UNICEF Play-based learning guidelines.',
    sourceId: 'unicef'
  }
];

// Milestone checklist divided by Age Range and Category
const MILESTONES = {
  // Toddler Age: 1-2 Years (approx 12-24 months)
  toddler: [
    { id: 'm_c1', category: 'Cognitive', text: 'Finds hidden objects under covers (Object permanence/Memory)', guidance: 'Shows child has mental representations of objects. Tip: Hide a block under a cup and ask where it is.', ref: 'harvard' },
    { id: 'm_c2', category: 'Cognitive', text: 'Points to at least one body part when asked', guidance: 'Demonstrates basic conceptual mapping. Action: Practice naming eyes/nose during bath time.', ref: 'cdc' },
    { id: 'm_e1', category: 'Emotional', text: 'Shows affection to familiar caregivers (hugs, kisses)', guidance: 'Indicates healthy secure attachment. Essential for emotional resilience.', ref: 'who' },
    { id: 'm_e2', category: 'Emotional', text: 'Shows frustration when goals aren\'t met (tantrums)', guidance: 'Tantrums at this age are normal limits of communication. Mirror and label their frustration.', ref: 'aap' },
    { id: 'm_s1', category: 'Social', text: 'Points to show you something interesting (Joint attention)', guidance: 'Key social developmental step. Acknowledge and name what they point to.', ref: 'harvard' },
    { id: 'm_s2', category: 'Social', text: 'Clings to familiar adults in new situations', guidance: 'Normal stranger anxiety. Provide comfort, do not force them into new hands immediately.', ref: 'unicef' },
    { id: 'm_cm1', category: 'Communication', text: 'Says 3–5 single words clearly (like Mama, Baba)', guidance: 'Language base forming. Narrate daily life. Avoid screen media for speech.', ref: 'cdc' },
    { id: 'm_cm2', category: 'Communication', text: 'Follows 1-step verbal commands (e.g. "Come here")', guidance: 'Shows receptive language is working. Keep commands simple and visual.', ref: 'cdc' },
    { id: 'm_p1', category: 'Physical', text: 'Walks independently without holding walls', guidance: 'Gross motor milestone. Ensure safe, clutter-free spaces for exploration.', ref: 'who' },
    { id: 'm_p2', category: 'Physical', text: 'Uses fingers to feed self small pieces of food', guidance: 'Fine motor milestone. Encourage pincer grasp with boiled carrots or soft peas.', ref: 'unicef' }
  ],
  // Preschool Age: 3-5 Years (approx 36-60 months)
  preschool: [
    { id: 'm_c3', category: 'Cognitive', text: 'Draws a circle or a person with at least 3 body parts', guidance: 'Shows visual-spatial awareness and symbolic thought. Support with thick crayons.', ref: 'unicef' },
    { id: 'm_c4', category: 'Cognitive', text: 'Counts up to 5 objects aloud accurately', guidance: 'Demonstrates understanding of 1-to-1 correspondence. Count daily objects like plates.', ref: 'harvard' },
    { id: 'm_e3', category: 'Emotional', text: 'Labels feelings like "Happy", "Sad", "Angry"', guidance: 'Emotional literacy. Helps reduce intensity of behavioral tantrums.', ref: 'aap' },
    { id: 'm_e4', category: 'Emotional', text: 'Calms down within 10 minutes when caregiver leaves', guidance: 'Indicates capacity for self-regulation and secure safety model.', ref: 'cdc' },
    { id: 'm_s3', category: 'Social', text: 'Shares toys and takes turns with other children', guidance: 'Cooperative play neural pathways. Use visual timers to build turn-taking skills.', ref: 'unicef' },
    { id: 'm_s4', category: 'Social', text: 'Acts out simple roles in pretend play (e.g. Doctor, Chef)', guidance: 'Shows developmental empathy and theory of mind. Join the play!', ref: 'harvard' },
    { id: 'm_cm3', category: 'Communication', text: 'Speaks in full sentences of 4–5 words', guidance: 'Active speech development. Ask open-ended questions about their drawings.', ref: 'cdc' },
    { id: 'm_cm4', category: 'Communication', text: 'Answers simple "Who", "What", "Where" questions', guidance: 'Cognitive language synthesis. Read storybooks and ask questions.', ref: 'aap' },
    { id: 'm_p3', category: 'Physical', text: 'Balances on one foot for 3–5 seconds', guidance: 'Gross motor balance control. Play simple jumping/hopping games safely.', ref: 'who' },
    { id: 'm_p4', category: 'Physical', text: 'Uses safety scissors to cut paper lines', guidance: 'Advanced fine motor milestone. Fosters hand-eye coordination and concentration.', ref: 'unicef' }
  ]
};

// Activity Database
const ACTIVITIES = [
  {
    id: 'act1',
    title: 'The Hidden Toy Hunt',
    ageGroup: '0–1 Year',
    category: 'Memory',
    duration: '5–10 mins',
    benefit: 'Develops object permanence & visual tracking',
    involvement: 'Co-play',
    setup: 'A clean cotton cloth or small towel, and 2-3 colorful rattle toys.',
    instructions: '1. Lay your child on a soft blanket. 2. Show them a colorful rattle toy and shake it. 3. Slowly cover the toy with the cloth while they watch. 4. Say "Where did the toy go?" and encourage them to pull the cloth. 5. Celebrate when they uncover it! Repeat with different toys.',
    reference: 'Harvard Center on the Developing Child: Serve & Return Play Guidelines.',
    refId: 'harvard'
  },
  {
    id: 'act2',
    title: 'Descriptive Kitchen Narration',
    ageGroup: '1–2 Years',
    category: 'Language',
    duration: '10–15 mins',
    benefit: 'Boosts descriptive vocabulary & word associations',
    involvement: 'Guided',
    setup: 'A safe kitchen corner, clean steel bowl, wooden spoon, and vegetables.',
    instructions: '1. Place your toddler in a high chair or safe spot in the kitchen. 2. While preparing food, describe your actions aloud: "I am washing the green, cold ladyfinger (Bhindi). It feels bumpy!" 3. Hand them a steel bowl and wooden spoon to bang. 4. Narrate: "Zain is banging the spoon! Loud sound, boom boom!" 5. This builds audio-context linkages.',
    reference: 'CDC Language Milestones & Sensory Association Guidelines.',
    refId: 'cdc'
  },
  {
    id: 'act3',
    title: 'DIY Playdough Sculpting',
    ageGroup: '2–3 Years',
    category: 'Creativity',
    duration: '20 mins',
    benefit: 'Develops finger strength & tactile sensors',
    involvement: 'Co-play',
    setup: '1 cup flour (Maida), 1/2 cup water, 1 tbsp cooking oil, pinch of food color.',
    instructions: '1. Mix ingredients in a bowl together. Let the toddler knead the squishy dough. 2. Encourage them to roll the dough into balls, flat rotis, or snake shapes. 3. Ask them to make shapes: "Can we make a round laddu?" 4. This build hand muscles essential for writing later.',
    reference: 'UNICEF Early Learning: Fine Motor & Sensory Expression.',
    refId: 'unicef'
  },
  {
    id: 'act4',
    title: 'Cardboard Box Shape Sorter',
    ageGroup: '1–2 Years',
    category: 'Problem Solving',
    duration: '15 mins',
    benefit: 'Spatial reasoning & hand-eye coordination',
    involvement: 'Guided',
    setup: 'An empty shoe box, scissors, 3 different sized balls or small plastic toys.',
    instructions: '1. Cut three circular holes in the lid of the box, corresponding to the sizes of the toys. 2. Show the child the box and a ball. 3. Demonstrate dropping the smallest ball in the smallest hole. 4. Hand a ball to your child and guide their hand to the matching hole. 5. Encourage them to figure out which hole fits which object.',
    reference: 'Harvard Center on the Developing Child: Executive Function Play.',
    refId: 'harvard'
  },
  {
    id: 'act5',
    title: 'Emotion Face Mirror Mimic',
    ageGroup: '3–5 Years',
    category: 'Emotional Learning',
    duration: '10 mins',
    benefit: 'Fosters emotional recognition & empathy',
    involvement: 'Co-play',
    setup: 'A safe hand mirror or bathroom mirror.',
    instructions: '1. Sit with your child in front of the mirror. 2. Say: "Let\'s make a super happy face!" Smile widely and look in the mirror. 3. Point out details: "Look at our crinkled eyes and big smiles!" 4. Say: "Now, let\'s make a sad face, or an angry face." 5. Discuss what makes them feel those emotions. "What makes Zain feel sad?"',
    reference: 'American Academy of Pediatrics (AAP): Socio-Emotional Wellness Toolkit.',
    refId: 'aap'
  },
  {
    id: 'act6',
    title: 'One-Foot Hopscotch (Safe Indoors)',
    ageGroup: '3–5 Years',
    category: 'Motor Skills',
    duration: '15 mins',
    benefit: 'Strengthens leg muscles & balance coordination',
    involvement: 'Guided',
    setup: 'Masking tape or colored string laid on carpet/floor.',
    instructions: '1. Tape 3 squares in a straight line on the floor. 2. Show your child how to jump with both feet into square 1, then hop on one foot in square 2. 3. Hold their hand to guide their balance on one foot. 4. Encourage them to try balancing for 3 seconds: "1, 2, 3, jump!" 5. This strengthens cerebellum motor networks.',
    reference: 'WHO Physical Development Milestones for Preschoolers.',
    refId: 'who'
  }
];

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export default function App() {
  // --- Navigation & Flow State ---
  const [currentScreen, setCurrentScreen] = useState('Home'); // Home, Onboarding, Dashboard, Learn, Tracker, Activities, Profile, ResearchCenter
  
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
  const activeChild = childProfiles.find(c => c.id === activeChildId) || childProfiles[0];
  
  // --- Onboarding Flow Form State ---
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [newChildName, setNewChildName] = useState('');
  const [newChildDob, setNewChildDob] = useState('2024-01-01');
  const [newChildGender, setNewChildGender] = useState('Male');
  const [newChildConcerns, setNewChildConcerns] = useState([]);
  const [newChildNotes, setNewChildNotes] = useState('');

  // --- Saved Articles & Checklisted Milestones State ---
  const [savedArticles, setSavedArticles] = useState(['a1']);
  const [completedMilestones, setCompletedMilestones] = useState(new Set(['m_c1', 'm_s1']));

  // --- Tabs & Filter States ---
  const [activeLearnCategory, setActiveLearnCategory] = useState('All');
  const [activeTrackerCategory, setActiveTrackerCategory] = useState('Cognitive');
  const [activeActivityAge, setActiveActivityAge] = useState('All');
  const [activeActivityCategory, setActiveActivityCategory] = useState('All');

  // --- Modal Views State ---
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMilestoneInfo, setSelectedMilestoneInfo] = useState(null);
  
  // --- Child switcher UI state ---
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);

  // Helper: Calculate child age in Years / Months
  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    
    if (years === 0) {
      return `${months} Months`;
    }
    return `${years}.${months} Years`;
  };

  // Helper: Get milestone dataset based on child age category
  const getActiveMilestones = () => {
    const dob = new Date(activeChild.dob);
    const years = Math.abs(new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970);
    return years >= 3 ? MILESTONES.preschool : MILESTONES.toddler;
  };

  // Handler: Toggle milestones completion
  const handleToggleMilestone = (id) => {
    const updated = new Set(completedMilestones);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setCompletedMilestones(updated);
  };

  // Handler: Save/unsave articles
  const handleToggleSaveArticle = (id) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(item => item !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  // Handler: Handle concern selection during onboarding
  const handleToggleOnboardingConcern = (concern) => {
    if (newChildConcerns.includes(concern)) {
      setNewChildConcerns(newChildConcerns.filter(c => c !== concern));
    } else {
      setNewChildConcerns([...newChildConcerns, concern]);
    }
  };

  // Handler: Finish Onboarding & Create Profile
  const handleFinishOnboarding = () => {
    const newId = newChildName.toLowerCase().replace(/\s+/g, '-') || `child-${Date.now()}`;
    const newProfile = {
      id: newId,
      name: newChildName || 'Unnamed Child',
      dob: newChildDob,
      gender: newChildGender,
      concerns: newChildConcerns.length > 0 ? newChildConcerns : ['General Development'],
      notes: newChildNotes
    };
    
    setChildProfiles([...childProfiles, newProfile]);
    setActiveChildId(newId);
    setCurrentScreen('Dashboard');
    // Reset forms
    setNewChildName('');
    setNewChildConcerns([]);
    setNewChildNotes('');
    setOnboardingStep(1);
  };

  // Switch Active Child
  const selectChild = (id) => {
    setActiveChildId(id);
    setIsChildDropdownOpen(false);
  };

  /* ==========================================================================
     LAYOUT SHELL (HEADER, SIDEBAR, NAVIGATION)
     ========================================================================== */
  const renderSidebar = () => {
    const menuItems = [
      { name: 'Dashboard', icon: LayoutDashboard, screen: 'Dashboard' },
      { name: 'Learn', icon: BookOpen, screen: 'Learn' },
      { name: 'Tracker', icon: CheckSquare, screen: 'Tracker' },
      { name: 'Activities', icon: Award, screen: 'Activities' },
      { name: 'Research Center', icon: FileText, screen: 'ResearchCenter' },
      { name: 'Profile Settings', icon: User, screen: 'Profile' }
    ];

    return (
      <div className="sidebar">
        <div className="sidebar-logo">
          <div style={{ backgroundColor: 'var(--primary)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>N</div>
          <span>Neurish</span>
        </div>

        {/* Dynamic Child Selector in Sidebar */}
        <div className="child-selector-container">
          <button className="child-selector-btn" onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)} style={{ width: '100%', justifyContent: 'space-between' }}>
            <div className="flex align-center gap-8">
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div>
              <span>{activeChild.name} ({calculateAge(activeChild.dob)})</span>
            </div>
            <ChevronDown size={16} />
          </button>
          
          {isChildDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginTop: 4, zIndex: 300, boxShadow: 'var(--shadow-md)' }}>
              {childProfiles.map(child => (
                <button 
                  key={child.id} 
                  onClick={() => selectChild(child.id)} 
                  style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid var(--border)', fontWeight: child.id === activeChildId ? '600' : '400', color: child.id === activeChildId ? 'var(--primary)' : 'var(--text-primary)' }}
                >
                  {child.name} ({calculateAge(child.dob)})
                </button>
              ))}
              <button 
                onClick={() => { setCurrentScreen('Onboarding'); setOnboardingStep(2); setIsChildDropdownOpen(false); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 16px', border: 'none', background: 'var(--primary-light)', textAlign: 'left', cursor: 'pointer', fontSize: 13, color: 'var(--primary)', fontWeight: '600' }}
              >
                <Plus size={14} /> Add Child Profile
              </button>
            </div>
          )}
        </div>

        <ul className="sidebar-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <li key={item.name}>
                <button 
                  onClick={() => setCurrentScreen(item.screen)}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-profile-box">
          <div className="flex align-center gap-12">
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>P</div>
            <div>
              <p className="text-sm font-semibold">Pakistani Parent</p>
              <button onClick={() => setCurrentScreen('Home')} style={{ border: 'none', background: 'none', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer', textDecoration: 'underline' }}>Logout (Demo)</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileNav = () => {
    return (
      <div className="mobile-nav">
        <button className={`mobile-nav-item ${currentScreen === 'Dashboard' ? 'active' : ''}`} onClick={() => setCurrentScreen('Dashboard')}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        <button className={`mobile-nav-item ${currentScreen === 'Learn' ? 'active' : ''}`} onClick={() => setCurrentScreen('Learn')}>
          <BookOpen size={20} />
          <span>Learn</span>
        </button>
        <button className={`mobile-nav-item ${currentScreen === 'Tracker' ? 'active' : ''}`} onClick={() => setCurrentScreen('Tracker')}>
          <CheckSquare size={20} />
          <span>Tracker</span>
        </button>
        <button className={`mobile-nav-item ${currentScreen === 'Activities' ? 'active' : ''}`} onClick={() => setCurrentScreen('Activities')}>
          <Award size={20} />
          <span>Activities</span>
        </button>
        <button className={`mobile-nav-item ${currentScreen === 'Profile' ? 'active' : ''}`} onClick={() => setCurrentScreen('Profile')}>
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 1: LANDING PAGE (PUBLIC MARKETING FLOW)
     ========================================================================== */
  const renderLandingPage = () => {
    return (
      <div style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
        {/* Landing Navbar */}
        <div className="landing-navbar">
          <div className="container flex justify-between align-center">
            <div className="flex align-center gap-8" style={{ fontSize: 22, fontWeight: 800 }}>
              <div style={{ backgroundColor: 'var(--primary)', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16 }}>N</div>
              <span>Neurish</span>
            </div>
            <div className="flex gap-24 align-center">
              <button onClick={() => setCurrentScreen('ResearchCenter')} className="btn-text" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Scientific Base</button>
              <button onClick={() => { setCurrentScreen('Onboarding'); setOnboardingStep(1); }} className="btn btn-primary btn-sm">Get Started</button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="landing-hero">
          <div className="container" style={{ maxWidth: 800 }}>
            <div className="badge badge-primary" style={{ marginBottom: 16 }}>Research-backed Early Childhood Platform</div>
            <h1 className="text-4xl font-bold" style={{ marginBottom: 24, lineHeight: 1.15 }}>
              Scientifically Informed Decisions for Your Child’s Most Critical Years
            </h1>
            <p className="text-lg text-secondary-color" style={{ marginBottom: 32, maxWidth: 650, margin: '0 auto 32px' }}>
              Designed specifically for Pakistani families. Connect your child’s daily play and milestones directly to developmental pediatric science (0 to 5 Years).
            </p>
            <div className="flex justify-between align-center gap-16" style={{ justifyContent: 'center' }}>
              <button onClick={() => { setCurrentScreen('Onboarding'); setOnboardingStep(1); }} className="btn btn-primary btn-lg">Create Free Child Profile</button>
              <button onClick={() => { setCurrentScreen('Dashboard'); }} className="btn btn-secondary btn-lg">Explore Demo Dashboard</button>
            </div>
          </div>
        </div>

        {/* Scientific Trust Logostrip */}
        <div className="trust-logo-strip">
          <div className="container">
            <p className="text-xs text-muted-color font-semibold" style={{ textAlign: 'center', marginBottom: 16, textTransform: 'uppercase' }}>Built on research foundations established by</p>
            <div className="logo-grid">
              {SCIENTIFIC_SOURCES.map(source => (
                <div key={source.id} className="logo-placeholder">{source.logoText}</div>
              ))}
            </div>
          </div>
        </div>

        {/* The Problem / Value Prop */}
        <div className="container" style={{ paddingBottom: 80 }}>
          <h2 className="text-3xl font-semibold" style={{ textAlign: 'center', marginBottom: 48 }}>Why Neurish is Different</h2>
          <div className="grid grid-3">
            <div className="card">
              <div style={{ backgroundColor: 'var(--primary-light)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: 16 }}><Heart size={24} /></div>
              <h3 className="card-title">Pakistani Context</h3>
              <p className="text-sm text-secondary-color">Milestones and activities adapted for local environments, resources, and multi-generational households.</p>
            </div>
            <div className="card">
              <div style={{ backgroundColor: 'var(--primary-light)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: 16 }}><CheckSquare size={24} /></div>
              <h3 className="card-title">Evidence-Based</h3>
              <p className="text-sm text-secondary-color">Every activity, article, and milestone checklist is sourced from verified scientific pediatric organizations (CDC, WHO).</p>
            </div>
            <div className="card">
              <div style={{ backgroundColor: 'var(--primary-light)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: 16 }}><LayoutDashboard size={24} /></div>
              <h3 className="card-title">Age-Personalized</h3>
              <p className="text-sm text-secondary-color">No generic tips. Recommendations align precisely with your child\'s physical age and your parenting priorities.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '40px 0', backgroundColor: 'white' }}>
          <div className="container flex justify-between align-center flex-col" style={{ gap: 16 }}>
            <p className="text-sm text-muted-color">© 2026 Neurish Parenting Platform. All rights reserved.</p>
            <p className="text-xs text-muted-color">This is a startup-grade wireframe demonstration showcasing UX architecture, interactive flows, and personalization.</p>
          </div>
        </div>
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 2: USER ONBOARDING (MULTI-STEP WIZARD)
     ========================================================================== */
  const renderOnboardingFlow = () => {
    return (
      <div className="onboarding-container">
        <div className="onboarding-card">
          {/* Step indicator */}
          <div className="flex justify-between align-center" style={{ marginBottom: 32 }}>
            <span className="text-xs font-semibold text-muted-color">STEP {onboardingStep} OF 3</span>
            <div className="flex gap-8">
              <div style={{ width: 24, height: 6, borderRadius: 3, backgroundColor: onboardingStep >= 1 ? 'var(--primary)' : 'var(--border)' }}></div>
              <div style={{ width: 24, height: 6, borderRadius: 3, backgroundColor: onboardingStep >= 2 ? 'var(--primary)' : 'var(--border)' }}></div>
              <div style={{ width: 24, height: 6, borderRadius: 3, backgroundColor: onboardingStep >= 3 ? 'var(--primary)' : 'var(--border)' }}></div>
            </div>
          </div>

          {onboardingStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold" style={{ marginBottom: 12 }}>Join Neurish</h2>
              <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>Let\'s begin setting up your scientifically guided parenting environment.</p>
              
              <div className="flex flex-col gap-16" style={{ marginBottom: 24 }}>
                <div className="input-group">
                  <label className="input-label">Your Email</label>
                  <input type="email" placeholder="parent@domain.com" className="input-field" />
                </div>
                <div className="input-group">
                  <label className="input-label">Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
              </div>
              
              <button onClick={() => setOnboardingStep(2)} className="btn btn-primary" style={{ width: '100%' }}>Continue to Child Profile</button>
            </div>
          )}

          {onboardingStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold" style={{ marginBottom: 12 }}>Tell Us About Your Child</h2>
              <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>This initializes the personalization engine for age-based activities and developmental milestones.</p>
              
              <div className="flex flex-col gap-16" style={{ marginBottom: 24 }}>
                <div className="input-group">
                  <label className="input-label">Child\'s Name</label>
                  <input type="text" placeholder="e.g. Zain or Ayesha" value={newChildName} onChange={(e) => setNewChildName(e.target.value)} className="input-field" />
                </div>
                
                <div className="grid grid-2 gap-16">
                  <div className="input-group">
                    <label className="input-label">Date of Birth</label>
                    <input type="date" value={newChildDob} onChange={(e) => setNewChildDob(e.target.value)} className="input-field" />
                  </div>
                  
                  <div className="input-group">
                    <label className="input-label">Gender</label>
                    <select value={newChildGender} onChange={(e) => setNewChildGender(e.target.value)} className="input-field">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Optional Notes (Special habits, keywords)</label>
                  <textarea placeholder="e.g. loves stacking cups, active only after afternoon nap" value={newChildNotes} onChange={(e) => setNewChildNotes(e.target.value)} className="input-field" style={{ minHeight: 80, resize: 'none' }}></textarea>
                </div>
              </div>
              
              <div className="flex gap-16">
                <button onClick={() => setOnboardingStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>Back</button>
                <button onClick={() => setOnboardingStep(3)} className="btn btn-primary" style={{ flex: 2 }}>Next: Select Concerns</button>
              </div>
            </div>
          )}

          {onboardingStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold" style={{ marginBottom: 8 }}>What concerns you most?</h2>
              <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>We will customize your learning resources, activity prompts, and dashboards to address these first.</p>
              
              <div className="chip-grid" style={{ marginBottom: 32 }}>
                {[
                  'Tantrums',
                  'Excessive Crying',
                  'Screen Time',
                  'Sleep Issues',
                  'Speech Development',
                  'Learning & Attention',
                  'Emotional Regulation',
                  'Social Skills',
                  'Behavior Challenges'
                ].map(concern => {
                  const isActive = newChildConcerns.includes(concern);
                  return (
                    <div 
                      key={concern}
                      onClick={() => handleToggleOnboardingConcern(concern)}
                      className={`chip ${isActive ? 'active' : ''}`}
                    >
                      {concern}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-16">
                <button onClick={() => setOnboardingStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>Back</button>
                <button onClick={handleFinishOnboarding} className="btn btn-primary" style={{ flex: 2 }}>Complete Profile Setup</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 3: PARENT DASHBOARD (LOGGED IN APP CENTRAL HUB)
     ========================================================================== */
  const renderDashboard = () => {
    // Personalize guidance tip based on active child's concerns
    const primaryConcern = activeChild.concerns[0] || 'General Development';
    
    // Find articles matches primary concern
    const personalizedArticle = ARTICLES.find(a => a.concern === primaryConcern) || ARTICLES[0];
    
    // Find activities suitable for active child's age group
    const childYears = Math.abs(new Date(Date.now() - new Date(activeChild.dob).getTime()).getUTCFullYear() - 1970);
    const targetAgeGroup = childYears >= 3 ? '3–5 Years' : '1–2 Years';
    const personalizedActivity = ACTIVITIES.find(act => act.ageGroup === targetAgeGroup && act.category !== 'Memory') || ACTIVITIES[0];

    // Calculate overall milestones progress
    const activeMilestoneList = getActiveMilestones();
    const completedCount = activeMilestoneList.filter(m => completedMilestones.has(m.id)).length;
    const progressPercent = Math.round((completedCount / activeMilestoneList.length) * 100);

    return (
      <div>
        {/* Welcome Header */}
        <div className="flex justify-between align-center" style={{ marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="text-3xl font-bold">Good morning, Parent!</h1>
            <p className="text-sm text-secondary-color">Here is today\'s scientific focus for <span className="font-semibold text-primary-color">{activeChild.name}</span> ({calculateAge(activeChild.dob)} old).</p>
          </div>
          <div className="flex gap-12">
            <button className="btn btn-secondary" onClick={() => { setCurrentScreen('Onboarding'); setOnboardingStep(2); }}>
              <Plus size={16} /> Add Profile
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentScreen('Tracker')}>
              Check Milestones
            </button>
          </div>
        </div>

        {/* Dynamic Personalization Alert Banner */}
        <div style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', display: 'flex', gap: 16, marginBottom: 32, alignItems: 'flex-start' }}>
          <div style={{ color: 'var(--primary)', marginTop: 2 }}><Info size={20} /></div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 4 }}>Engine Tailored to {activeChild.name}</h4>
            <p className="text-xs text-secondary-color">
              Currently addressing concerns: <strong style={{ color: 'var(--text-primary)' }}>{activeChild.concerns.join(', ')}</strong>. Dashboard recommendations are generated based on research data matching the <strong>{calculateAge(activeChild.dob)}</strong> age threshold.
            </p>
          </div>
        </div>

        {/* Key Layout Blocks */}
        <div className="grid grid-3" style={{ marginBottom: 32 }}>
          
          {/* Block 1: Daily Scientific Guidance Tip */}
          <div className="card flex flex-col justify-between" style={{ gridColumn: 'span 2' }}>
            <div>
              <div className="flex justify-between align-center" style={{ marginBottom: 16 }}>
                <span className="badge badge-primary">Daily Focus Tip</span>
                <span className="science-ref-badge" onClick={() => setCurrentScreen('ResearchCenter')}>
                  <Award size={12} /> Sourced: {personalizedArticle.reference.split(' ')[0]}
                </span>
              </div>
              <h3 className="card-title text-xl">{personalizedArticle.title}</h3>
              <p className="text-sm text-secondary-color" style={{ marginBottom: 16 }}>
                {personalizedArticle.summary}
              </p>
            </div>
            <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
              <span className="text-xs text-muted-color">{personalizedArticle.readTime} • Written by {personalizedArticle.author.split(',')[0]}</span>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedArticle(personalizedArticle)}>Read Full Guide</button>
            </div>
          </div>

          {/* Block 2: Milestone Circular Progress Card */}
          <div className="card flex flex-col justify-between">
            <div>
              <h3 className="card-title">Development Progress</h3>
              <p className="text-xs text-secondary-color" style={{ marginBottom: 24 }}>Milestones tracking for {targetAgeGroup} category.</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <div style={{ position: 'relative', width: 100, height: 100, borderRadius: '50%', border: '8px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: 'var(--border) var(--primary) var(--primary) var(--primary)', transform: 'rotate(45deg)' }}>
                  <div style={{ transform: 'rotate(-45deg)', fontSize: 24, fontWeight: 'bold' }}>
                    {progressPercent}%
                  </div>
                </div>
              </div>
              <p className="text-xs text-secondary-color" style={{ textAlign: 'center' }}>{completedCount} of {activeMilestoneList.length} milestones complete.</p>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 16 }} onClick={() => setCurrentScreen('Tracker')}>Go to Checklist</button>
          </div>
        </div>

        {/* Bottom Section: Activities & Learn Hub Prompts */}
        <div className="grid grid-2">
          
          {/* Activity Spotlight */}
          <div className="card flex flex-col justify-between">
            <div>
              <div className="flex justify-between align-center" style={{ marginBottom: 16 }}>
                <span className="badge badge-outline">Today\'s Suggested Activity</span>
                <span className="text-xs text-muted-color">{personalizedActivity.duration}</span>
              </div>
              <h3 className="card-title">{personalizedActivity.title}</h3>
              <p className="text-sm text-secondary-color" style={{ marginBottom: 16 }}>
                {personalizedActivity.benefit}
              </p>
              <div className="flex gap-8" style={{ marginBottom: 16 }}>
                <span className="badge text-xs">{personalizedActivity.category}</span>
                <span className="badge text-xs">{personalizedActivity.involvement}</span>
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setSelectedActivity(personalizedActivity)} style={{ alignSelf: 'flex-start' }}>Start Activity Guide</button>
          </div>

          {/* Quick Stats & Saved Content */}
          <div className="card flex flex-col justify-between">
            <div>
              <h3 className="card-title">Saved Scientific Guides</h3>
              <p className="text-xs text-secondary-color" style={{ marginBottom: 16 }}>Your bookmarked references for reference.</p>
              
              {savedArticles.length === 0 ? (
                <p className="text-sm text-muted-color" style={{ padding: '20px 0', textAlign: 'center' }}>No guides saved yet. Bookmark cards in the Learn section.</p>
              ) : (
                <div className="flex flex-col gap-12">
                  {savedArticles.map(artId => {
                    const article = ARTICLES.find(a => a.id === artId);
                    if (!article) return null;
                    return (
                      <div key={artId} className="flex justify-between align-center" style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-app)' }}>
                        <span className="text-xs font-medium" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '75%' }}>{article.title}</span>
                        <button className="btn-text text-xs" onClick={() => setSelectedArticle(article)}>Read</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 16 }} onClick={() => setCurrentScreen('Learn')}>Browse All Topics</button>
          </div>

        </div>
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 4: KNOWLEDGE HUB (LEARN SECTION)
     ========================================================================== */
  const renderLearnHub = () => {
    const categories = [
      'All',
      'Emotional Development',
      'Cognitive Development',
      'Communication',
      'Behavior & Tantrums',
      'Screen Time',
      'Sleep',
      'Social Development'
    ];

    const filteredArticles = ARTICLES.filter(art => {
      if (activeLearnCategory === 'All') return true;
      return art.category === activeLearnCategory;
    });

    return (
      <div>
        <div className="flex justify-between align-center" style={{ marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="text-3xl font-bold">Knowledge Hub</h1>
            <p className="text-sm text-secondary-color">Evidence-based parenting advice and development science.</p>
          </div>
          <div className="flex align-center gap-8" style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search guides..." className="input-field" style={{ paddingLeft: 36, width: 220, height: 40 }} />
          </div>
        </div>

        {/* Categorized filter row */}
        <div className="tabs-header">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`tab-btn ${activeLearnCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveLearnCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content list Grid */}
        {filteredArticles.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
            <AlertTriangle size={32} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
            <p className="text-secondary-color">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {filteredArticles.map(art => {
              const isSaved = savedArticles.includes(art.id);
              return (
                <div key={art.id} className="card card-interactive flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
                      <span className="badge text-xs">{art.category}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleToggleSaveArticle(art.id); }} 
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: isSaved ? 'var(--primary)' : 'var(--text-muted)' }}
                      >
                        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                      </button>
                    </div>
                    
                    <h3 className="card-title text-base" onClick={() => setSelectedArticle(art)}>{art.title}</h3>
                    <p className="text-xs text-secondary-color" style={{ marginBottom: 16 }}>{art.summary}</p>
                  </div>
                  
                  <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 12 }}>
                    <span className="text-xs text-muted-color">{art.readTime} • {art.ageGroup}</span>
                    <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => setSelectedArticle(art)}>Read Guide</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 5: DEVELOPMENT TRACKER (MILESTONES SYSTEM)
     ========================================================================== */
  const renderTracker = () => {
    const categories = ['Cognitive', 'Emotional', 'Social', 'Communication', 'Physical'];
    const activeMilestonesList = getActiveMilestones();
    
    // Filter by tab
    const filteredMilestones = activeMilestonesList.filter(m => m.category === activeTrackerCategory);

    // Calculate percentage progress for the current categories
    const countCompleted = (cat) => activeMilestonesList.filter(m => m.category === cat && completedMilestones.has(m.id)).length;
    const countTotal = (cat) => activeMilestonesList.filter(m => m.category === cat).length;

    return (
      <div>
        <div style={{ marginBottom: 32 }}>
          <h1 className="text-3xl font-bold">Milestone Tracker</h1>
          <p className="text-sm text-secondary-color">
            Verify child\'s milestones based on CDC & WHO standards for <span className="font-semibold text-primary-color">{activeChild.name}</span>.
          </p>
        </div>

        {/* Visual Category Cards with Mini Progress Bars */}
        <div className="grid grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {categories.map(cat => {
            const completed = countCompleted(cat);
            const total = countTotal(cat);
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const isActive = activeTrackerCategory === cat;

            return (
              <div 
                key={cat} 
                className={`card card-interactive ${isActive ? 'active' : ''}`}
                style={{ padding: 16, borderColor: isActive ? 'var(--primary)' : 'var(--border)', backgroundColor: isActive ? 'var(--primary-light)' : 'white' }}
                onClick={() => setActiveTrackerCategory(cat)}
              >
                <p className="text-sm font-semibold" style={{ color: isActive ? 'var(--primary)' : 'var(--text-primary)', marginBottom: 8 }}>{cat}</p>
                <div className="progress-container" style={{ height: 6, marginBottom: 8 }}>
                  <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-xs text-muted-color">{completed}/{total} Complete ({percent}%)</p>
              </div>
            );
          })}
        </div>

        {/* Milestone Checklist Container */}
        <div className="card">
          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
            <h3 className="card-title">{activeTrackerCategory} Milestone Checklist</h3>
            <span className="text-xs text-muted-color">Checking items updates child\'s profile telemetry.</span>
          </div>

          <div className="flex flex-col">
            {filteredMilestones.map(m => {
              const isChecked = completedMilestones.has(m.id);
              return (
                <div key={m.id} className="milestone-item">
                  <div 
                    onClick={() => handleToggleMilestone(m.id)}
                    className={`milestone-checkbox ${isChecked ? 'checked' : ''}`}
                  >
                    {isChecked && <Check size={14} />}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <p className="text-sm font-medium" style={{ textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                      {m.text}
                    </p>
                    <p className="text-xs text-secondary-color" style={{ marginTop: 4 }}>
                      {m.guidance}
                    </p>
                    
                    <div style={{ marginTop: 8 }}>
                      <span 
                        className="science-ref-badge"
                        onClick={() => {
                          const study = STUDIES.find(s => s.id === (m.ref === 'harvard' ? 's1' : m.ref === 'cdc' ? 's2' : 's3'));
                          setSelectedMilestoneInfo({ milestone: m, study });
                        }}
                      >
                        <Info size={10} /> Research Rationale
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 6: CHILD ACTIVITIES HUB
     ========================================================================== */
  const renderActivitiesHub = () => {
    const ageGroups = ['All', '0–1 Year', '1–2 Years', '2–3 Years', '3–5 Years', '5+ Years'];
    const categories = ['All', 'Memory', 'Language', 'Creativity', 'Problem Solving', 'Emotional Learning', 'Motor Skills'];

    const filteredActivities = ACTIVITIES.filter(act => {
      const ageMatch = activeActivityAge === 'All' || act.ageGroup === activeActivityAge;
      const catMatch = activeActivityCategory === 'All' || act.category === activeActivityCategory;
      return ageMatch && catMatch;
    });

    return (
      <div>
        <div style={{ marginBottom: 32 }}>
          <h1 className="text-3xl font-bold">Child Activities Hub</h1>
          <p className="text-sm text-secondary-color">Play-based, low-prep developmental activities tailored to child ages.</p>
        </div>

        {/* Age Filter Row */}
        <div style={{ marginBottom: 16 }}>
          <p className="text-xs text-muted-color font-semibold" style={{ textTransform: 'uppercase', marginBottom: 8 }}>Filter by Age Group</p>
          <div className="flex gap-8" style={{ overflowX: 'auto', paddingBottom: 8 }}>
            {ageGroups.map(age => (
              <button 
                key={age} 
                onClick={() => setActiveActivityAge(age)}
                className={`btn ${activeActivityAge === age ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Row */}
        <div style={{ marginBottom: 32 }}>
          <p className="text-xs text-muted-color font-semibold" style={{ textTransform: 'uppercase', marginBottom: 8 }}>Filter by Category</p>
          <div className="flex gap-8" style={{ overflowX: 'auto', paddingBottom: 8 }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveActivityCategory(cat)}
                className={`btn ${activeActivityCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activities List */}
        {filteredActivities.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 0' }}>
            <AlertTriangle size={32} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
            <p className="text-secondary-color">No activities found matching filters.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {filteredActivities.map(act => (
              <div key={act.id} className="card card-interactive flex flex-col justify-between" onClick={() => setSelectedActivity(act)}>
                <div>
                  <div className="flex justify-between align-center" style={{ marginBottom: 12 }}>
                    <span className="badge badge-primary">{act.ageGroup}</span>
                    <span className="text-xs text-muted-color">{act.duration}</span>
                  </div>
                  <h3 className="card-title text-base">{act.title}</h3>
                  <p className="text-xs text-secondary-color" style={{ marginBottom: 16 }}>{act.benefit}</p>
                </div>

                <div>
                  <div className="flex gap-8" style={{ marginBottom: 16 }}>
                    <span className="badge text-xs" style={{ fontSize: 10 }}>{act.category}</span>
                    <span className="badge text-xs" style={{ fontSize: 10 }}>{act.involvement}</span>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>View Instructions</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 7: PROFILE SETTINGS & CHILD MANAGEMENT
     ========================================================================== */
  const renderProfile = () => {
    return (
      <div>
        <div style={{ marginBottom: 32 }}>
          <h1 className="text-3xl font-bold">Profile & Child Management</h1>
          <p className="text-sm text-secondary-color">Manage family profiles, specific concerns, and account preferences.</p>
        </div>

        <div className="grid grid-3">
          {/* Child Profiles list */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <h3 className="card-title" style={{ marginBottom: 16 }}>Registered Child Profiles</h3>
            
            <div className="flex flex-col gap-16" style={{ marginBottom: 24 }}>
              {childProfiles.map(child => (
                <div key={child.id} className="flex justify-between align-center" style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <h4 className="text-base font-semibold">{child.name}</h4>
                    <p className="text-xs text-secondary-color">DOB: {child.dob} ({calculateAge(child.dob)}) • Gender: {child.gender}</p>
                    <div style={{ marginTop: 8 }}>
                      {child.concerns.map(c => (
                        <span key={c} className="badge text-xs" style={{ marginRight: 6, marginBottom: 4 }}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => selectChild(child.id)}>Active</button>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={() => { setCurrentScreen('Onboarding'); setOnboardingStep(2); }}>
              <Plus size={16} /> Register New Child
            </button>
          </div>

          {/* Core App Information Settings */}
          <div className="card flex flex-col justify-between">
            <div>
              <h3 className="card-title">Account Details</h3>
              <div className="flex flex-col gap-12" style={{ marginTop: 16 }}>
                <div className="input-group">
                  <label className="input-label">Parent Account Name</label>
                  <input type="text" className="input-field" defaultValue="Pakistani Parent" />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Notification Triggers</label>
                  <div className="flex align-center gap-8" style={{ marginTop: 4 }}>
                    <input type="checkbox" defaultChecked />
                    <span className="text-xs text-secondary-color">Weekly developmental summary</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="btn btn-secondary" style={{ marginTop: 24 }} onClick={() => setCurrentScreen('Home')}>Log Out</button>
          </div>
        </div>
      </div>
    );
  };

  /* ==========================================================================
     SCREEN 8: RESEARCH CENTER (SCIENTIFIC BASE)
     ========================================================================== */
  const renderResearchCenter = () => {
    return (
      <div>
        <div style={{ marginBottom: 32 }}>
          <h1 className="text-3xl font-bold">Research Center</h1>
          <p className="text-sm text-secondary-color">The scientific foundations and evidence supporting Neurish activities and recommendations.</p>
        </div>

        {/* Academic Trust Partners */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Evidence Sourced From</h3>
          <p className="text-sm text-secondary-color" style={{ marginBottom: 24 }}>
            Neurish synthesizes guidelines and clinical data from leading local and global pediatric authority bodies. We map child progress directly to these established models.
          </p>
          <div className="logo-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {SCIENTIFIC_SOURCES.map(src => (
              <div key={src.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)' }}>
                <span className="text-sm font-bold text-primary-color" style={{ fontFamily: 'Outfit' }}>{src.logoText}</span>
                <span className="text-xs text-secondary-color" style={{ textAlign: 'center', marginTop: 4 }}>{src.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Study Explorer */}
        <h3 className="text-xl font-bold" style={{ marginBottom: 16 }}>Key Peer-Reviewed Research</h3>
        <div className="grid grid-2">
          {STUDIES.map(study => (
            <div key={study.id} className="card">
              <div className="flex justify-between align-center" style={{ marginBottom: 8 }}>
                <span className="badge badge-primary" style={{ fontSize: 10 }}>{study.source}</span>
                <span className="text-xs text-muted-color">{study.year}</span>
              </div>
              <h4 className="text-base font-semibold" style={{ marginBottom: 8 }}>{study.title}</h4>
              <p className="text-sm text-secondary-color">
                <strong>Core Finding:</strong> {study.finding}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ==========================================================================
     MODALS FOR DRILL DOWN VIEWS
     ========================================================================== */

  // Modal 1: Article Reader View
  const renderArticleModal = () => {
    if (!selectedArticle) return null;
    return (
      <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedArticle(null)}><X size={20} /></button>
          
          <div style={{ marginBottom: 20 }}>
            <span className="badge badge-primary" style={{ marginBottom: 12 }}>{selectedArticle.category}</span>
            <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
            <p className="text-xs text-muted-color" style={{ marginTop: 8 }}>Written by {selectedArticle.author}</p>
          </div>

          <div style={{ borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)', padding: '12px 0', margin: '20px 0' }} className="flex justify-between">
            <span className="text-xs font-semibold text-secondary-color"><Clock size={12} style={{ marginRight: 4 }} /> {selectedArticle.readTime}</span>
            <span className="text-xs font-semibold text-secondary-color">Age: {selectedArticle.ageGroup}</span>
            <span className="text-xs font-semibold text-secondary-color">Difficulty: {selectedArticle.difficulty}</span>
          </div>

          <p className="text-sm text-secondary-color" style={{ lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 24 }}>
            {selectedArticle.body}
          </p>

          <div style={{ backgroundColor: 'var(--bg-app)', padding: 16, borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
            <p className="text-xs font-bold text-primary-color" style={{ marginBottom: 4 }}>RESEARCH FOOTNOTE</p>
            <p className="text-xs text-secondary-color">
              <strong>Source Study:</strong> {selectedArticle.reference}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Modal 2: Activity Instructions View
  const renderActivityModal = () => {
    if (!selectedActivity) return null;
    return (
      <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedActivity(null)}><X size={20} /></button>
          
          <div style={{ marginBottom: 20 }}>
            <div className="flex gap-8" style={{ marginBottom: 12 }}>
              <span className="badge badge-primary">{selectedActivity.ageGroup}</span>
              <span className="badge badge-outline">{selectedActivity.category}</span>
            </div>
            <h2 className="text-2xl font-bold">{selectedActivity.title}</h2>
            <p className="text-xs text-muted-color" style={{ marginTop: 8 }}>Est. Time: {selectedActivity.duration} • Involvement: {selectedActivity.involvement}</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-app)', padding: 16, borderRadius: 'var(--radius-md)', marginBottom: 20 }}>
            <h4 className="text-xs font-bold text-secondary-color" style={{ textTransform: 'uppercase', marginBottom: 4 }}>What You Need</h4>
            <p className="text-xs text-secondary-color">{selectedActivity.setup}</p>
          </div>

          <h4 className="text-sm font-semibold" style={{ marginBottom: 8 }}>Step-by-Step Instructions</h4>
          <p className="text-sm text-secondary-color" style={{ lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: 24 }}>
            {selectedActivity.instructions}
          </p>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }} className="flex justify-between align-center">
            <span className="text-xs text-muted-color">Research Sourced from: <strong>{selectedActivity.reference}</strong></span>
            <button className="btn btn-primary btn-sm" onClick={() => setSelectedActivity(null)}>Got it</button>
          </div>
        </div>
      </div>
    );
  };

  // Modal 3: Milestone scientific detail reference
  const renderMilestoneModal = () => {
    if (!selectedMilestoneInfo) return null;
    const { milestone, study } = selectedMilestoneInfo;

    return (
      <div className="modal-overlay" onClick={() => setSelectedMilestoneInfo(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelectedMilestoneInfo(null)}><X size={20} /></button>
          
          <h2 className="text-xl font-bold" style={{ marginBottom: 12 }}>Pediatric Research Evidence</h2>
          <div style={{ backgroundColor: 'var(--primary-light)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)', marginBottom: 20 }}>
            <h4 className="text-xs font-bold text-primary-color" style={{ textTransform: 'uppercase' }}>Tracked Milestone</h4>
            <p className="text-sm font-medium" style={{ marginTop: 4 }}>{milestone.text}</p>
          </div>

          <h4 className="text-sm font-semibold" style={{ marginBottom: 8 }}>Why This Matters (Developmental Science)</h4>
          <p className="text-sm text-secondary-color" style={{ marginBottom: 20 }}>
            {milestone.guidance}
          </p>

          {study && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <span className="badge text-xs" style={{ marginBottom: 8 }}>Supporting Study</span>
              <h4 className="text-xs font-bold text-secondary-color">{study.title}</h4>
              <p className="text-xs text-secondary-color" style={{ marginTop: 4 }}>
                <strong>Institution:</strong> {study.source} ({study.year})
              </p>
              <p className="text-xs text-secondary-color" style={{ marginTop: 8 }}>
                <strong>Key Insight:</strong> {study.finding}
              </p>
            </div>
          )}

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setSelectedMilestoneInfo(null)}>Back to Tracker</button>
          </div>
        </div>
      </div>
    );
  };

  /* ==========================================================================
     GLOBAL ROUTER & PAGE WRAPPING
     ========================================================================== */
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return renderLandingPage();
      case 'Onboarding':
        return renderOnboardingFlow();
      case 'Dashboard':
        return renderDashboard();
      case 'Learn':
        return renderLearnHub();
      case 'Tracker':
        return renderTracker();
      case 'Activities':
        return renderActivitiesHub();
      case 'Profile':
        return renderProfile();
      case 'ResearchCenter':
        return renderResearchCenter();
      default:
        return renderLandingPage();
    }
  };

  // If we are on public Home or Onboarding, do not render Sidebar/App-shell layouts
  const isAppShell = !['Home', 'Onboarding'].includes(currentScreen);

  return (
    <div>
      {isAppShell ? (
        <div className="app-shell">
          {renderSidebar()}
          <div className="main-content">
            {renderActiveScreen()}
          </div>
          {renderMobileNav()}
        </div>
      ) : (
        renderActiveScreen()
      )}

      {/* Popovers / Overlays Modals */}
      {renderArticleModal()}
      {renderActivityModal()}
      {renderMilestoneModal()}
    </div>
  );
}
