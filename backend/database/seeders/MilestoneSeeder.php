<?php

namespace Database\Seeders;

use App\Models\Milestone;
use Illuminate\Database\Seeder;

class MilestoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $milestones = [
            // Toddler (12–35 months)
            [
                'title' => 'Finds hidden objects under covers',
                'description' => 'Finds hidden objects under covers (Object permanence/Memory). guidance: Shows child has mental representations of objects. Tip: Hide a block under a cup and ask where it is.',
                'category' => 'Cognitive',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Points to at least one body part when asked',
                'description' => 'Demonstrates basic conceptual mapping. Action: Practice naming eyes/nose during bath time.',
                'category' => 'Cognitive',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Shows affection to familiar caregivers',
                'description' => 'Shows affection to familiar caregivers (hugs, kisses). guidance: Indicates healthy secure attachment. Essential for emotional resilience.',
                'category' => 'Emotional',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Shows frustration when goals aren\'t met',
                'description' => 'Shows frustration when goals aren\'t met (tantrums). guidance: Tantrums at this age are normal limits of communication. Validate and label their frustration.',
                'category' => 'Emotional',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Points to show you something interesting',
                'description' => 'Points to show you something interesting (Joint attention). guidance: Key social developmental step. Acknowledge and name what they point to.',
                'category' => 'Social',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Clings to familiar adults in new situations',
                'description' => 'Normal stranger anxiety. Provide comfort, do not force them into new hands immediately.',
                'category' => 'Social',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Says 3–5 single words clearly',
                'description' => 'Says 3–5 single words clearly (like Mama, Baba). guidance: Language base forming. Narrate daily life. Avoid screen media for speech.',
                'category' => 'Communication',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Follows 1-step verbal commands',
                'description' => 'Follows 1-step verbal commands (e.g. "Come here"). guidance: Shows receptive language is working. Keep commands simple and visual.',
                'category' => 'Communication',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Walks independently without holding walls',
                'description' => 'Gross motor milestone. Ensure safe, clutter-free spaces for exploration.',
                'category' => 'Physical',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],
            [
                'title' => 'Uses fingers to feed self small food pieces',
                'description' => 'Fine motor milestone. Encourage pincer grasp with boiled carrots or soft peas.',
                'category' => 'Physical',
                'age_range_months_start' => 12,
                'age_range_months_end' => 35,
            ],

            // Preschool (36–60 months)
            [
                'title' => 'Draws a circle or a person with 3 body parts',
                'description' => 'Shows visual-spatial awareness and symbolic thought. Support with thick crayons.',
                'category' => 'Cognitive',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Counts up to 5 objects aloud accurately',
                'description' => 'Demonstrates understanding of 1-to-1 correspondence. Count daily objects like plates.',
                'category' => 'Cognitive',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Labels feelings like "Happy", "Sad", "Angry"',
                'description' => 'Emotional literacy. Helps reduce intensity of behavioral tantrums.',
                'category' => 'Emotional',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Calms down within 10 minutes of caregiver leaving',
                'description' => 'Indicates capacity for self-regulation and secure safety model.',
                'category' => 'Emotional',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Shares toys and takes turns with others',
                'description' => 'Cooperative play neural pathways. Use visual timers to build turn-taking skills.',
                'category' => 'Social',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Acts out simple roles in pretend play',
                'description' => 'Acts out simple roles in pretend play (e.g. Doctor, Chef). guidance: Shows developmental empathy and theory of mind. Join the play!',
                'category' => 'Social',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Speaks in full sentences of 4–5 words',
                'description' => 'Active speech development. Ask open-ended questions about their drawings.',
                'category' => 'Communication',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Answers simple "Who", "What", "Where" questions',
                'description' => 'Cognitive language synthesis. Read storybooks and ask questions.',
                'category' => 'Communication',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Balances on one foot for 3–5 seconds',
                'description' => 'Gross motor balance control. Play simple jumping/hopping games safely.',
                'category' => 'Physical',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
            [
                'title' => 'Uses safety scissors to cut paper lines',
                'description' => 'Advanced fine motor milestone. Fosters hand-eye coordination and concentration.',
                'category' => 'Physical',
                'age_range_months_start' => 36,
                'age_range_months_end' => 60,
            ],
        ];

        foreach ($milestones as $milestone) {
            Milestone::firstOrCreate(
                ['title' => $milestone['title']],
                [
                    'description' => $milestone['description'],
                    'category' => $milestone['category'],
                    'age_range_months_start' => $milestone['age_range_months_start'],
                    'age_range_months_end' => $milestone['age_range_months_end'],
                ]
            );
        }
    }
}
