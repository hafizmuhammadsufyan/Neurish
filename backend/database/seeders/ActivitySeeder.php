<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activities = [
            [
                'title' => 'The Hidden Toy Hunt',
                'age_group' => '0–1 Year',
                'category' => 'Memory',
                'duration' => '5–10 mins',
                'benefit' => 'Develops object permanence & visual tracking',
                'involvement' => 'Co-play',
                'instructions' => [
                    'Lay your child on a soft blanket.',
                    'Show them a colorful rattle toy and shake it.',
                    'Slowly cover the toy with the cloth while they watch.',
                    'Say "Where did the toy go?" and encourage them to pull the cloth.',
                    'Celebrate when they uncover it! Repeat with different toys.'
                ]
            ],
            [
                'title' => 'Descriptive Kitchen Narration',
                'age_group' => '1–2 Years',
                'category' => 'Language',
                'duration' => '10–15 mins',
                'benefit' => 'Boosts descriptive vocabulary & word associations',
                'involvement' => 'Guided',
                'instructions' => [
                    'Place your toddler in a high chair or safe spot in the kitchen.',
                    'While preparing food, describe your actions aloud: "I am washing the green, cold ladyfinger (Bhindi). It feels bumpy!"',
                    'Hand them a steel bowl and wooden spoon to bang.',
                    'Narrate: "Zain is banging the spoon! Loud sound, boom boom!"',
                    'This builds audio-context linkages.'
                ]
            ],
            [
                'title' => 'DIY Playdough Sculpting',
                'age_group' => '2–3 Years',
                'category' => 'Creativity',
                'duration' => '20 mins',
                'benefit' => 'Develops finger strength & tactile sensors',
                'involvement' => 'Co-play',
                'instructions' => [
                    'Mix ingredients (flour, water, oil, food color) in a bowl together. Let the toddler knead the squishy dough.',
                    'Encourage them to roll the dough into balls, flat rotis, or snake shapes.',
                    'Ask them to make shapes: "Can we make a round laddu?"',
                    'This builds hand muscles essential for writing later.'
                ]
            ],
            [
                'title' => 'Cardboard Box Shape Sorter',
                'age_group' => '1–2 Years',
                'category' => 'Problem Solving',
                'duration' => '15 mins',
                'benefit' => 'Spatial reasoning & hand-eye coordination',
                'involvement' => 'Guided',
                'instructions' => [
                    'Cut three circular holes in the lid of the box, corresponding to the sizes of the toys.',
                    'Show the child the box and a ball.',
                    'Demonstrate dropping the smallest ball in the smallest hole.',
                    'Hand a ball to your child and guide their hand to the matching hole.',
                    'Encourage them to figure out which hole fits which object.'
                ]
            ],
            [
                'title' => 'Emotion Face Mirror Mimic',
                'age_group' => '3–5 Years',
                'category' => 'Emotional Learning',
                'duration' => '10 mins',
                'benefit' => 'Fosters emotional recognition & empathy',
                'involvement' => 'Co-play',
                'instructions' => [
                    'Sit with your child in front of the mirror.',
                    'Say: "Let\'s make a super happy face!" Smile widely and look in the mirror.',
                    'Point out details: "Look at our crinkled eyes and big smiles!"',
                    'Say: "Now, let\'s make a sad face, or an angry face."',
                    'Discuss what makes them feel those emotions: "What makes you feel sad?"'
                ]
            ],
            [
                'title' => 'One-Foot Hopscotch (Safe Indoors)',
                'age_group' => '3–5 Years',
                'category' => 'Motor Skills',
                'duration' => '15 mins',
                'benefit' => 'Strengthens leg muscles & balance coordination',
                'involvement' => 'Guided',
                'instructions' => [
                    'Tape 3 squares in a straight line on the floor.',
                    'Show your child how to jump with both feet into square 1, then hop on one foot in square 2.',
                    'Hold their hand to guide their balance on one foot.',
                    'Encourage them to try balancing for 3 seconds: "1, 2, 3, jump!"',
                    'This strengthens cerebellum motor networks.'
                ]
            ],
            [
                'title' => 'Sorting Nature Treasures',
                'age_group' => '5+ Years',
                'category' => 'Problem Solving',
                'duration' => '15 mins',
                'benefit' => 'Classification skills & cognitive logic',
                'involvement' => 'Guided',
                'instructions' => [
                    'Collect various items (leaves, stones, flowers) from outdoors with your child.',
                    'Place them on a tray.',
                    'Ask your child to sort them by color, then by size, then by texture (rough vs smooth).',
                    'Discuss their choices.',
                    'This strengthens cognitive grouping mechanisms.'
                ]
            ]
        ];

        foreach ($activities as $activity) {
            Activity::firstOrCreate(
                ['title' => $activity['title']],
                [
                    'age_group' => $activity['age_group'],
                    'category' => $activity['category'],
                    'duration' => $activity['duration'],
                    'benefit' => $activity['benefit'],
                    'involvement' => $activity['involvement'],
                    'instructions' => $activity['instructions']
                ]
            );
        }
    }
}
