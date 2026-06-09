<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $games = [
            [
                'slug' => 'brain-builder',
                'name' => 'Brain Builder',
                'category' => 'Spatial Reasoning',
                'age_group' => '3-5 Years',
                'age_group_value' => '3-5',
                'description' => 'Complete premium construction challenges by choosing the right pathway pieces.',
                'skills' => ['Planning', 'Spatial Reasoning', 'Problem Solving', 'Attention'],
                'skill_badges' => ['Logic', 'Shapes', 'Planning'],
                'research_backing' => 'Spatial reasoning and planning support early STEM success by strengthening executive function and visual problem solving.',
                'research_url' => 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6346184/',
                'difficulty' => 1,
                'max_difficulty' => 4,
                'game_config' => [
                    'level1' => 'Simple bridge placements with clear shapes.',
                    'level2' => 'Longer pathways and more tile choices.',
                    'level3' => 'Mixed routes with extra planning.',
                    'level4' => 'Advanced sequences for strong spatial growth.'
                ],
                'tips' => 'Let your child explain why each shape fits before placing it, boosting reasoning and confidence.'
            ],
            [
                'slug' => 'pattern-detective',
                'name' => 'Pattern Detective',
                'category' => 'Pattern Logic',
                'age_group' => '3-5 Years',
                'age_group_value' => '3-5',
                'description' => 'Find the missing shape in a sequence and uncover the hidden rule.',
                'skills' => ['Pattern Recognition', 'Sequencing', 'Critical Thinking', 'Visual Logic'],
                'skill_badges' => ['Patterns', 'Reasoning', 'Focus'],
                'research_backing' => 'Pattern recognition is foundational for math and reading readiness, supporting neural circuits for prediction and reasoning.',
                'research_url' => 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7326173/',
                'difficulty' => 1,
                'max_difficulty' => 4,
                'game_config' => [
                    'level1' => 'Repeating sequences with clear shape patterns.',
                    'level2' => 'Alternating shapes and simple rules.',
                    'level3' => 'Two-attribute patterns and more options.',
                    'level4' => 'Multi-step sequences that require careful thinking.'
                ],
                'tips' => 'Ask your child to say the pattern aloud before choosing the next shape.'
            ],
            [
                'slug' => 'memory-kingdom',
                'name' => 'Memory Kingdom',
                'category' => 'Working Memory',
                'age_group' => '3-5 Years',
                'age_group_value' => '3-5',
                'description' => 'Remember the hidden kingdom objects and select the right location from memory.',
                'skills' => ['Working Memory', 'Attention', 'Visual Recall', 'Focus'],
                'skill_badges' => ['Memory', 'Recall', 'Focus'],
                'research_backing' => 'Strong working memory supports learning across reading, math, and following instructions by improving attention and recall.',
                'research_url' => 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4969883/',
                'difficulty' => 1,
                'max_difficulty' => 3,
                'game_config' => [
                    'level1' => 'Short boards with three target items.',
                    'level2' => 'Larger boards and more objects to remember.',
                    'level3' => 'Advanced recall with extra placement challenge.'
                ],
                'tips' => 'Encourage a quick memory check before selecting each item.'
            ],
            [
                'slug' => 'logic-adventure',
                'name' => 'Logic Adventure',
                'category' => 'Reasoning',
                'age_group' => '3-5 Years',
                'age_group_value' => '3-5',
                'description' => 'Make thoughtful story choices that build cause-and-effect logic and empathy.',
                'skills' => ['Reasoning', 'Decision Making', 'Social Awareness', 'Empathy'],
                'skill_badges' => ['Choices', 'Thinking', 'Stories'],
                'research_backing' => 'Story-based decision games help children practice cause-and-effect reasoning and social-emotional awareness in a safe, playful context.',
                'research_url' => 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6123373/',
                'difficulty' => 1,
                'max_difficulty' => 3,
                'game_config' => [
                    'level1' => 'Simple story choices with clear outcomes.',
                    'level2' => 'More nuanced decisions and impacts.',
                    'level3' => 'Complex reasoning with multiple outcomes.'
                ],
                'tips' => 'Ask your child why they chose each answer to reinforce thoughtful reasoning.'
            ]
        ];

        foreach ($games as $game) {
            Game::firstOrCreate(
                ['slug' => $game['slug']],
                [
                    'name' => $game['name'],
                    'category' => $game['category'],
                    'age_group' => $game['age_group'],
                    'age_group_value' => $game['age_group_value'],
                    'description' => $game['description'],
                    'skills' => $game['skills'],
                    'skill_badges' => $game['skill_badges'],
                    'research_backing' => $game['research_backing'],
                    'research_url' => $game['research_url'],
                    'difficulty' => $game['difficulty'],
                    'max_difficulty' => $game['max_difficulty'],
                    'game_config' => $game['game_config'],
                    'tips' => $game['tips']
                ]
            );
        }
    }
}
