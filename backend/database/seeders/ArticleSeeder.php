<?php

namespace Database\Seeders;

use App\Models\Article;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Understanding Toddler Tantrums: Evidence-Based De-escalation',
                'category' => 'Behavior',
                'age_group' => '1–3 Years',
                'author' => 'American Academy of Pediatrics (AAP)',
                'content' => 'Tantrums are a normal developmental response to frustration in early childhood. For toddlers, emotional expression is raw. In multi-generational joint family settings, tantrums can often feel heightened due to multiple caregivers reacting differently. The scientific solution is co-regulation: "emotional mirroring" while maintaining a calm adult presence. Set clear boundaries while showing empathy. Do not bribe or scold; instead, validate and name the feeling: "I know you are angry that we must leave, but we do not throw toys." Once the child is calm, redirect them to a physical activity.',
                'published_at' => Carbon::parse('2026-05-10'),
            ],
            [
                'title' => 'Building Early Vocabulary: Narrative Speech Methods',
                'category' => 'Communication',
                'age_group' => '0–2 Years',
                'author' => 'Centers for Disease Control and Prevention (CDC)',
                'content' => 'Language development is driven by high-quality talk. Rather than using passive flashcards, descriptive narration is key. Narrate your everyday actions to your baby. Say things like, "Look, I am cutting this red apple, it is crunchy." Babies who hear a high frequency of descriptive words develop stronger neural paths. Studies show this "serve-and-return" style is far more effective for speech acquisition than educational videos or passive audio exposure.',
                'published_at' => Carbon::parse('2026-04-22'),
            ],
            [
                'title' => 'Screen Time Guidelines and Cognitive Alternatives',
                'category' => 'Screen Time',
                'age_group' => '1–5 Years',
                'author' => 'Harvard Center on the Developing Child',
                'content' => 'Excessive screen time in early childhood can weaken the "serve-and-return" interaction needed for brain growth. To replace screens: 1) Implement screen-free zones (dining table, bedrooms). 2) Introduce structured toy rotations. 3) Engage in 15 minutes of dedicated "co-play". When transitioning away from screens, do not just switch the screen off; announce a fun tactile replacement like playing with modeling dough, kinetic sand, or doing water play.',
                'published_at' => Carbon::parse('2026-05-02'),
            ],
            [
                'title' => 'Pediatric Sleep Cycles and Wind-down Routines',
                'category' => 'Sleep',
                'age_group' => '0–2 Years',
                'author' => 'World Health Organization (WHO)',
                'content' => 'Establishing healthy sleep habits requires biological alignment. Toddlers require 11 to 14 hours of total sleep per day. Late dinners can push bedtime past the child\'s natural circadian window, leading to cortisol spikes and hyper-active behavior. Create a 30-minute low-light routine before bed: dim the lights, read a physical picture book, and play soft white noise or sing a lullaby. Avoid screen use or physical excitement right before bed.',
                'published_at' => Carbon::parse('2026-03-12'),
            ],
            [
                'title' => 'Fostering Confidence through Emotional Regulation',
                'category' => 'Emotional Development',
                'age_group' => '3–5 Years',
                'author' => 'American Academy of Pediatrics (AAP)',
                'content' => 'Emotional regulation starts with identification. Use simple emotion drawings or descriptive terms to help them say: "I feel frustrated" or "I am sad." When a child can label an emotion, they engage the prefrontal cortex, which helps regulate the amygdala (the brain\'s emotional center). Encouraging healthy emotional labeling rather than asking them to suppress expression builds long-term resilience.',
                'published_at' => Carbon::parse('2026-05-18'),
            ],
            [
                'title' => 'Developing Social Skills through Cooperative Play',
                'category' => 'Social Development',
                'age_group' => '2–5 Years',
                'author' => 'UNICEF Research',
                'content' => 'Social skills are learned, not innate. Turn-taking is the building block of empathy and cooperation. Start with simple games like rolling a ball back and forth, saying, "My turn, now your turn!" This simple loop trains the brain to wait, cooperate, and read basic social cues. In multi-child environments, structure turn-taking with visual cues like a simple sand-timer or a soft toy to represent the "speaker".',
                'published_at' => Carbon::parse('2026-02-28'),
            ],
            [
                'title' => 'Nutrition Guidelines for Toddler Brain Development',
                'category' => 'Nutrition',
                'age_group' => '1–3 Years',
                'author' => 'World Health Organization (WHO)',
                'content' => 'During the first 1,000 days, nutrition plays a crucial role in building the brain. Key nutrients include iron (found in spinach, lentils, and meat), omega-3 fatty acids, and zinc. Avoid highly processed sugary snacks common in urban areas, which cause glucose spikes and impair cognitive concentration. Focus on fresh, whole foods and continue breast milk or age-appropriate calcium intake.',
                'published_at' => Carbon::parse('2026-05-20'),
            ],
            [
                'title' => 'Cognitive Development Through Guided Play',
                'category' => 'Learning Through Play',
                'age_group' => '2–5 Years',
                'author' => 'Harvard Center on the Developing Child',
                'content' => 'Guided play combines the child-led focus of free play with gentle guidance from an adult. Studies show that when an adult asks open-ended questions during play (e.g. "What do you think happens if we put this block here?"), it stimulates higher-order cognitive networks in the prefrontal cortex, enhancing problem-solving skills, spatial awareness, and memory.',
                'published_at' => Carbon::parse('2026-05-22'),
            ],
            [
                'title' => 'Parental Wellbeing and Child Behavior Outcomes',
                'category' => 'Parent Wellbeing',
                'age_group' => 'All',
                'author' => 'National Institutes of Health (NIH)',
                'content' => 'Parental stress directly impacts parenting behavior, which in turn affects child behavior. High maternal and paternal stress levels release stress cues that children mirror. Prioritizing 10 minutes of daily mindfulness, sharing caregiving duties, and seeking peer support reduces reactive parenting, leading to calmer households and fewer behavioral tantrums in children.',
                'published_at' => Carbon::parse('2026-05-25'),
            ],
        ];

        foreach ($articles as $article) {
            Article::firstOrCreate(
                ['title' => $article['title']],
                [
                    'category' => $article['category'],
                    'age_group' => $article['age_group'],
                    'author' => $article['author'],
                    'content' => $article['content'],
                    'published_at' => $article['published_at'],
                ]
            );
        }
    }
}
