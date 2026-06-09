<?php

namespace Database\Seeders;

use App\Models\Concern;
use Illuminate\Database\Seeder;

class ConcernSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $concerns = [
            [
                'name' => 'Speech Development',
                'description' => 'Delays in vocalization, sound formation, word acquisition, or expressive language.'
            ],
            [
                'name' => 'Screen Time',
                'description' => 'Concerns surrounding excessive exposure to mobile devices, televisions, or digital media.'
            ],
            [
                'name' => 'Sleep Issues',
                'description' => 'Difficulty falling asleep, frequent night awakenings, or irregular sleep cycles.'
            ],
            [
                'name' => 'Tantrums',
                'description' => 'Frequent emotional outbursts, stubbornness during transitions, or behavioral friction.'
            ],
            [
                'name' => 'Behavior Challenges',
                'description' => 'Aggressive physical reactions, difficulty obeying prompts, or high oppositionality.'
            ],
            [
                'name' => 'Excessive Crying',
                'description' => 'Prolonged bouts of crying or difficulties with soothing and self-calming.'
            ],
            [
                'name' => 'Emotional Regulation',
                'description' => 'Struggling to manage intense emotions, identify feelings, or wind down from high arousal.'
            ],
            [
                'name' => 'Social Skills',
                'description' => 'Challenges in sharing toys, taking turns, showing interest in peers, or cooperative play.'
            ],
            [
                'name' => 'Learning & Attention',
                'description' => 'Difficulties with visual focus, short working memory tasks, or sorting objects.'
            ]
        ];

        foreach ($concerns as $concern) {
            Concern::firstOrCreate(
                ['name' => $concern['name']],
                ['description' => $concern['description']]
            );
        }
    }
}
