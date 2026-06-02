// Milestones database for Neurish
// Sourced from CDC and WHO developmental milestones checklists.

const MILESTONES = {
  // Toddler Age: 1-2 Years (approx 12-24 months)
  toddler: [
    { id: 'm_c1', category: 'Cognitive', text: 'Finds hidden objects under covers (Object permanence/Memory)', guidance: 'Shows child has mental representations of objects. Tip: Hide a block under a cup and ask where it is.', ref: 'harvard' },
    { id: 'm_c2', category: 'Cognitive', text: 'Points to at least one body part when asked', guidance: 'Demonstrates basic conceptual mapping. Action: Practice naming eyes/nose during bath time.', ref: 'cdc' },
    { id: 'm_e1', category: 'Emotional', text: 'Shows affection to familiar caregivers (hugs, kisses)', guidance: 'Indicates healthy secure attachment. Essential for emotional resilience.', ref: 'who' },
    { id: 'm_e2', category: 'Emotional', text: 'Shows frustration when goals aren\'t met (tantrums)', guidance: 'Tantrums at this age are normal limits of communication. Validate and label their frustration.', ref: 'aap' },
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

export default MILESTONES;
