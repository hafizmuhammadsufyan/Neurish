// Nutrition & Development Hub Data
// Evidence-based nutrition recommendations for child development
// Structured for scalability with future database/API integration

const NUTRITION_DATA = [
  {
    id: 'nut1',
    name: 'Avocado',
    image: '🥑',
    ageGroup: '0-6 Months',
    ageGroupValue: '0-6',
    brainBenefits: 'Rich in lutein and zeaxanthin, supports neural development and visual system maturation. Monounsaturated fats aid cognitive development.',
    bodyBenefits: 'Promotes healthy bone development and contains potassium for muscle function.',
    nutrients: ['Healthy Fats (Monounsaturated)', 'Potassium', 'Folate', 'Vitamin E', 'Lutein'],
    agesSuitable: '6+ months (mashed)',
    prepTime: '2 mins',
    preparation: '1. Choose a ripe avocado (yields to gentle pressure). 2. Cut in half, remove the pit. 3. Scoop flesh into a bowl. 4. Mash with a fork until smooth, add breast milk or formula to thin if needed. 5. Serve immediately.',
    videoUrl: null,
    researchSources: [
      { title: 'Lutein in Infant Vision Development', url: 'https://academic.oup.com/ajcn' },
      { title: 'Monounsaturated Fats and Brain Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' }
    ]
  },
  {
    id: 'nut2',
    name: 'Ghee (Clarified Butter)',
    image: '🥄',
    ageGroup: '0-6 Months',
    ageGroupValue: '0-6',
    brainBenefits: 'Contains butyrate which supports gut-brain axis. Supports myelin formation essential for neural signal transmission.',
    bodyBenefits: 'Aids fat-soluble vitamin absorption (A, D, K, E). Supports calcium absorption for bone development.',
    nutrients: ['Butyric Acid', 'Fat-Soluble Vitamins', 'Conjugated Linoleic Acid (CLA)', 'Omega-3 Fatty Acids'],
    agesSuitable: '4+ months (small amounts)',
    prepTime: '1 min',
    preparation: '1. Use pure, homemade ghee or high-quality store-bought. 2. Add 1/4 teaspoon to dal (lentil soup) or rice cereal. 3. Mix well to distribute. 4. Cool before serving to baby. 5. Start with tiny amounts, increase gradually.',
    videoUrl: null,
    researchSources: [
      { title: 'Butyrate and Infant Gut Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Fat-Soluble Vitamin Absorption in Infants', url: 'https://pediatrics.aappublications.org' }
    ]
  },
  {
    id: 'nut3',
    name: 'Banana',
    image: '🍌',
    ageGroup: '0-6 Months',
    ageGroupValue: '0-6',
    brainBenefits: 'High in vitamin B6, crucial for neurotransmitter synthesis. Supports dopamine production for cognitive development.',
    bodyBenefits: 'Natural prebiotic supports healthy gut microbiome. Pectin aids digestion.',
    nutrients: ['Vitamin B6', 'Potassium', 'Magnesium', 'Pectin', 'Vitamin C'],
    agesSuitable: '6+ months',
    prepTime: '3 mins',
    preparation: '1. Choose a ripe banana with yellow skin. 2. Peel and slice into chunks. 3. Mash with a fork until creamy. 4. Add breast milk or formula if too thick. 5. Serve fresh or freeze in ice cube trays.',
    videoUrl: null,
    researchSources: [
      { title: 'Vitamin B6 and Neurotransmitter Synthesis', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Prebiotic Fibers in Infant Development', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut4',
    name: 'Lentils (Daal)',
    image: '🫘',
    ageGroup: '6-12 Months',
    ageGroupValue: '6-12',
    brainBenefits: 'High in iron, essential for oxygen transport to the brain. Supports cognitive function and concentration.',
    bodyBenefits: 'Complete protein with all amino acids. Supports muscle growth and bone development.',
    nutrients: ['Iron', 'Protein', 'Folate', 'Fiber', 'Zinc'],
    agesSuitable: '6+ months (well-cooked, mashed)',
    prepTime: '45 mins',
    preparation: '1. Rinse lentils thoroughly. 2. Cook with water (ratio 1:3) until very soft (30-40 mins). 3. Cool and mash or blend until smooth. 4. Mix with ghee and cumin powder for flavor. 5. Serve as a warm porridge.',
    videoUrl: null,
    researchSources: [
      { title: 'Iron and Cognitive Development in Infants', url: 'https://pediatrics.aappublications.org' },
      { title: 'Plant-Based Proteins in Early Childhood', url: 'https://www.ncbi.nlm.nih.gov/pubmed' }
    ]
  },
  {
    id: 'nut5',
    name: 'Egg Yolk',
    image: '🥚',
    ageGroup: '6-12 Months',
    ageGroupValue: '6-12',
    brainBenefits: 'Rich in choline, critical for memory formation and brain structure development. Contains DHA for neural connectivity.',
    bodyBenefits: 'High-quality protein supports muscle development. Lutein supports eye health.',
    nutrients: ['Choline', 'DHA/EPA', 'Selenium', 'Vitamin D', 'Protein'],
    agesSuitable: '7-8+ months',
    prepTime: '10 mins',
    preparation: '1. Boil egg until hard-cooked (8-10 mins). 2. Cool and peel. 3. Separate yolk from white. 4. Mash yolk with a fork. 5. Mix with mashed vegetables or rice. Start with small amounts.',
    videoUrl: null,
    researchSources: [
      { title: 'Choline and Early Brain Development', url: 'https://academic.oup.com/ajcn' },
      { title: 'DHA in Infant Cognitive Development', url: 'https://pediatrics.aappublications.org' }
    ]
  },
  {
    id: 'nut6',
    name: 'Spinach (Palak)',
    image: '🥬',
    ageGroup: '6-12 Months',
    ageGroupValue: '6-12',
    brainBenefits: 'High in vitamin K and folate, supports myelin formation. Antioxidants protect developing neural tissue.',
    bodyBenefits: 'Iron-rich (though less bioavailable than animal sources). Supports red blood cell formation.',
    nutrients: ['Iron', 'Folate', 'Vitamin K', 'Lutein', 'Oxalic Acid (low when boiled)'],
    agesSuitable: '8+ months (mixed with other foods)',
    prepTime: '15 mins',
    preparation: '1. Wash spinach thoroughly. 2. Chop finely and boil for 2-3 mins. 3. Cool and blend until smooth. 4. Mix with potato or rice for better iron absorption. 5. Serve warm.',
    videoUrl: null,
    researchSources: [
      { title: 'Vitamin K and Brain Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Iron Absorption Strategies in Infants', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut7',
    name: 'Yogurt',
    image: '🍶',
    ageGroup: '6-12 Months',
    ageGroupValue: '6-12',
    brainBenefits: 'Probiotics support gut-brain axis communication. Supports healthy neurotransmitter production.',
    bodyBenefits: 'Calcium and protein support bone and muscle development. Probiotics aid digestion.',
    nutrients: ['Probiotics', 'Calcium', 'Protein', 'Vitamin B12', 'Vitamin D'],
    agesSuitable: '6+ months (unsweetened, full-fat)',
    prepTime: '2 mins',
    preparation: '1. Use plain, full-fat, unsweetened yogurt (no honey for babies under 1 year). 2. Serve at room temperature or slightly chilled. 3. Mix with mashed fruit for flavor. 4. Start with 1-2 tablespoons, increase gradually.',
    videoUrl: null,
    researchSources: [
      { title: 'Probiotics and Infant Gut Development', url: 'https://pediatrics.aappublications.org' },
      { title: 'Gut-Brain Axis in Early Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' }
    ]
  },
  {
    id: 'nut8',
    name: 'Sweet Potato',
    image: '🍠',
    ageGroup: '1-2 Years',
    ageGroupValue: '1-2',
    brainBenefits: 'Rich in beta-carotene (Vitamin A), supports visual cortex development. Complex carbs provide steady glucose for brain.',
    bodyBenefits: 'Fiber supports digestive health. Potassium supports muscle function.',
    nutrients: ['Beta-Carotene', 'Fiber', 'Potassium', 'Manganese', 'Vitamin C'],
    agesSuitable: '6+ months (cooked and mashed)',
    prepTime: '20 mins',
    preparation: '1. Wash sweet potato thoroughly. 2. Bake at 180°C for 15-20 mins or boil for 12 mins. 3. Cool and peel. 4. Mash with a fork. 5. Add ghee and cumin for flavor. Freeze extras.',
    videoUrl: null,
    researchSources: [
      { title: 'Beta-Carotene and Visual Development', url: 'https://academic.oup.com/ajcn' },
      { title: 'Complex Carbohydrates in Child Cognition', url: 'https://pediatrics.aappublications.org' }
    ]
  },
  {
    id: 'nut9',
    name: 'Almonds (Badam)',
    image: '🌰',
    ageGroup: '1-2 Years',
    ageGroupValue: '1-2',
    brainBenefits: 'Rich in vitamin E, powerful antioxidant protecting brain cells. Contains arginine for cognitive function.',
    bodyBenefits: 'Supports bone development and muscle function.',
    nutrients: ['Vitamin E', 'Magnesium', 'Calcium', 'Monounsaturated Fats', 'Protein'],
    agesSuitable: '12+ months (nut butter) or 18+ months (finely ground)',
    prepTime: '5 mins',
    preparation: '1. Soak almonds in water overnight. 2. Peel the brown skin. 3. Grind into fine powder or nut butter. 4. Mix 1 teaspoon into milk or oatmeal. 5. Serve warm. Avoid whole nuts due to choking hazard.',
    videoUrl: null,
    researchSources: [
      { title: 'Vitamin E and Neuroprotection in Childhood', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Plant Proteins in Early Childhood Nutrition', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut10',
    name: 'Salmon',
    image: '🐟',
    ageGroup: '1-2 Years',
    ageGroupValue: '1-2',
    brainBenefits: 'Exceptional source of DHA and EPA, essential for brain structure and cognitive development. Supports synaptic plasticity.',
    bodyBenefits: 'High-quality protein supports muscle growth. Omega-3s reduce inflammation.',
    nutrients: ['DHA/EPA', 'Protein', 'Selenium', 'Vitamin D', 'Iodine'],
    agesSuitable: '8+ months (well-cooked, flaked)',
    prepTime: '15 mins',
    preparation: '1. Steam salmon fillet for 8-10 mins until cooked through. 2. Cool and flake carefully, removing all bones. 3. Mix with mashed vegetables. 4. Start with small portions (1-2 teaspoons). 5. Ensure no bones remain.',
    videoUrl: null,
    researchSources: [
      { title: 'Omega-3 Fatty Acids and Brain Development', url: 'https://pediatrics.aappublications.org' },
      { title: 'DHA Requirements in Early Childhood', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut11',
    name: 'Broccoli (Hara Phool Gobhi)',
    image: '🥦',
    ageGroup: '1-2 Years',
    ageGroupValue: '1-2',
    brainBenefits: 'High in choline and sulforaphane, supports memory and neuroprotection. Vitamin K aids myelin formation.',
    bodyBenefits: 'Boosts immune system with vitamin C. Supports bone health.',
    nutrients: ['Choline', 'Sulforaphane', 'Vitamin K', 'Vitamin C', 'Fiber'],
    agesSuitable: '8+ months (cooked and finely chopped)',
    prepTime: '12 mins',
    preparation: '1. Wash broccoli and cut into small florets. 2. Steam for 10 mins until very soft. 3. Chop finely or mash. 4. Mix with cheese or ghee for palatability. 5. Serve warm. Introduce gradually to watch for gas.',
    videoUrl: null,
    researchSources: [
      { title: 'Choline and Childhood Memory Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Sulforaphane and Neuroprotection', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut12',
    name: 'Blueberries',
    image: '🫐',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    brainBenefits: 'Rich in anthocyanins, powerful antioxidants protecting brain cells from oxidative stress. Improves memory and focus.',
    bodyBenefits: 'Supports immune system. Natural anti-inflammatory properties.',
    nutrients: ['Anthocyanins', 'Vitamin C', 'Vitamin K', 'Fiber', 'Antioxidants'],
    agesSuitable: '8+ months',
    prepTime: '5 mins',
    preparation: '1. Wash blueberries thoroughly. 2. For younger toddlers, mash or cut into quarters to prevent choking. 3. Serve fresh or frozen (thawed). 4. Mix into yogurt or oatmeal. 5. Freeze on a tray for natural popsicles.',
    videoUrl: null,
    researchSources: [
      { title: 'Anthocyanins and Cognitive Function in Children', url: 'https://pediatrics.aappublications.org' },
      { title: 'Berry Antioxidants and Brain Health', url: 'https://www.ncbi.nlm.nih.gov/pubmed' }
    ]
  },
  {
    id: 'nut13',
    name: 'Chickpeas (Chana)',
    image: '💛',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    brainBenefits: 'High in folate, essential for neural tube development and neurotransmitter synthesis. Supports mood regulation.',
    bodyBenefits: 'Complete plant protein with fiber. Supports sustained energy.',
    nutrients: ['Folate', 'Plant Protein', 'Fiber', 'Iron', 'Manganese'],
    agesSuitable: '12+ months (well-cooked, mashed)',
    prepTime: '40 mins (if from dried)',
    preparation: '1. Soak chickpeas overnight. 2. Pressure cook for 15 mins or boil until very soft. 3. Cool and mash or blend. 4. Season with turmeric and mild spices. 5. Mix into vegetable puree or serve as hummus with naan.',
    videoUrl: null,
    researchSources: [
      { title: 'Folate and Neurological Development', url: 'https://academic.oup.com/ajcn' },
      { title: 'Plant-Based Complete Proteins for Children', url: 'https://pediatrics.aappublications.org' }
    ]
  },
  {
    id: 'nut14',
    name: 'Oats',
    image: '🌾',
    ageGroup: '2-3 Years',
    ageGroupValue: '2-3',
    brainBenefits: 'Beta-glucans support healthy cholesterol for optimal brain function. Sustained glucose release improves focus.',
    bodyBenefits: 'Fiber supports digestive health. Iron aids energy levels.',
    nutrients: ['Beta-Glucans', 'Complex Carbs', 'Iron', 'Fiber', 'B Vitamins'],
    agesSuitable: '6+ months (cooked into porridge)',
    prepTime: '10 mins',
    preparation: '1. Use rolled oats or steel-cut oats. 2. Cook in water or milk (ratio 1:2) for 5-10 mins. 3. Mash well for younger toddlers. 4. Add mashed fruit, nut butter, or honey (12+ months only). 5. Serve warm.',
    videoUrl: null,
    researchSources: [
      { title: 'Oats and Cholesterol in Child Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Complex Carbohydrates and School Readiness', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut15',
    name: 'Pomegranate',
    image: '🍇',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    brainBenefits: 'High in polyphenols, supports brain blood flow and neuroprotection. Improves attention span.',
    bodyBenefits: 'Boosts immune system with vitamin C. Anti-inflammatory properties.',
    nutrients: ['Polyphenols', 'Vitamin C', 'Antioxidants', 'Fiber', 'Potassium'],
    agesSuitable: '12+ months (as juice diluted) or 2+ years (seeds)',
    prepTime: '10 mins',
    preparation: '1. Cut pomegranate in half. 2. Extract seeds using a bowl of water (reduces mess). 3. For juice: blend seeds and strain through cheesecloth. Dilute 1:1 with water. 4. For seeds: serve 1-2 teaspoons as a treat.',
    videoUrl: null,
    researchSources: [
      { title: 'Polyphenols and Cognitive Performance', url: 'https://pediatrics.aappublications.org' },
      { title: 'Pomegranate Antioxidants in Neuroprotection', url: 'https://www.ncbi.nlm.nih.gov/pubmed' }
    ]
  },
  {
    id: 'nut16',
    name: 'Beetroot (Chukandar)',
    image: '💜',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    brainBenefits: 'Nitrates improve blood flow to the brain, enhancing oxygen delivery. Supports executive function and memory.',
    bodyBenefits: 'Iron-rich for energy. Supports healthy liver function.',
    nutrients: ['Nitrates', 'Folate', 'Iron', 'Manganese', 'Betalains'],
    agesSuitable: '8+ months (cooked, mashed)',
    prepTime: '30 mins',
    preparation: '1. Wash beetroot thoroughly. 2. Boil or roast at 180°C for 25 mins until tender. 3. Cool and peel. 4. Cut into small pieces or grate. 5. Mix into rice or curry. Small amounts (1-2 teaspoons) due to natural sugars.',
    videoUrl: null,
    researchSources: [
      { title: 'Dietary Nitrates and Cerebral Blood Flow', url: 'https://academic.oup.com/ajcn' },
      { title: 'Folate and Executive Function in Children', url: 'https://pediatrics.aappublications.org' }
    ]
  },
  {
    id: 'nut17',
    name: 'Peanut Butter',
    image: '🥜',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    brainBenefits: 'High in vitamin E and resveratrol, supports brain cell protection. Arginine improves cognitive function.',
    bodyBenefits: 'Healthy fats support sustained energy. Protein supports muscle growth.',
    nutrients: ['Vitamin E', 'Arginine', 'Monounsaturated Fats', 'Protein', 'Magnesium'],
    agesSuitable: '18+ months (if no allergy family history)',
    prepTime: '2 mins',
    preparation: '1. Use natural, no-sugar-added peanut butter. 2. Spread thin layer on banana, apple, or toast. 3. Mix 1 teaspoon into oatmeal or smoothie. 4. Always supervise eating. 5. Introduce between 12-18 months if no family allergies.',
    videoUrl: null,
    researchSources: [
      { title: 'Peanut Allergen Introduction and Prevention', url: 'https://pediatrics.aappublications.org' },
      { title: 'Monounsaturated Fats in Child Development', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut18',
    name: 'Whole Grain Bread',
    image: '🍞',
    ageGroup: '3-5 Years',
    ageGroupValue: '3-5',
    brainBenefits: 'B vitamins support neurotransmitter production. Sustained glucose release improves concentration.',
    bodyBenefits: 'Fiber supports digestive health. Iron aids development.',
    nutrients: ['B Vitamins', 'Fiber', 'Iron', 'Complex Carbs', 'Manganese'],
    agesSuitable: '8-10+ months (soft crust)',
    prepTime: '1 min',
    preparation: '1. Choose whole grain bread (rye, multigrain, brown bread). 2. Toast lightly to reduce choking risk. 3. Cut into small strips or cubes for toddlers. 4. Serve with mashed avocado, nut butter, or soft cheese. 5. Avoid white bread with added sugars.',
    videoUrl: null,
    researchSources: [
      { title: 'B Vitamins and Cognitive Development', url: 'https://www.ncbi.nlm.nih.gov/pubmed' },
      { title: 'Whole Grains and School Readiness', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut19',
    name: 'Carrots',
    image: '🥕',
    ageGroup: '5+ Years',
    ageGroupValue: '5+',
    brainBenefits: 'Beta-carotene converts to vitamin A, crucial for visual cortex development. Supports attention.',
    bodyBenefits: 'Crunchy texture supports jaw development. Aids eye health.',
    nutrients: ['Beta-Carotene', 'Vitamin A', 'Fiber', 'Potassium', 'Antioxidants'],
    agesSuitable: '6+ months (cooked, mashed); 2+ years (raw, grated)',
    prepTime: '15 mins',
    preparation: '1. Wash carrots thoroughly. 2. For young toddlers: steam for 12 mins, then mash. 3. For older children: grate raw or cut into sticks. 4. Serve raw sticks with hummus as snack. 5. Add to soups and curries.',
    videoUrl: null,
    researchSources: [
      { title: 'Beta-Carotene and Visual Development', url: 'https://pediatrics.aappublications.org' },
      { title: 'Antioxidants and Cognitive Protection', url: 'https://academic.oup.com/ajcn' }
    ]
  },
  {
    id: 'nut20',
    name: 'Milk & Paneer (Cottage Cheese)',
    image: '🥛',
    ageGroup: '5+ Years',
    ageGroupValue: '5+',
    brainBenefits: 'Excellent source of calcium essential for neurotransmitter release. Supports nerve signal transmission.',
    bodyBenefits: 'High-quality protein supports muscle and bone development. Critical mineral for growth.',
    nutrients: ['Calcium', 'Protein', 'Phosphorus', 'Vitamin B12', 'Vitamin D'],
    agesSuitable: '12+ months (milk); 8+ months (paneer)',
    prepTime: '5 mins',
    preparation: '1. Use full-fat milk (whole milk, not skimmed for under 5 years). 2. Warm and serve plain or with natural flavors. 3. For paneer: cut into small cubes and add to vegetable curry. 4. Serve with meals to ensure adequate calcium intake.',
    videoUrl: null,
    researchSources: [
      { title: 'Calcium and Neurological Development', url: 'https://academic.oup.com/ajcn' },
      { title: 'Dairy and Cognitive Function in Children', url: 'https://pediatrics.aappublications.org' }
    ]
  }
];

export default NUTRITION_DATA;
