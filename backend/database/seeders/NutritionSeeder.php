<?php

namespace Database\Seeders;

use App\Models\NutritionItem;
use App\Models\NutritionResearchSource;
use Illuminate\Database\Seeder;

class NutritionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nutritionItems = [
            [
                'name' => 'Avocado',
                'image_name' => 'Avocado',
                'age_group' => '0-6 Months',
                'age_group_value' => '0-6',
                'brain_benefits' => 'Rich in lutein and zeaxanthin, supports neural development and visual system maturation. Monounsaturated fats aid cognitive development.',
                'body_benefits' => 'Promotes healthy bone development and contains potassium for muscle function.',
                'nutrients' => ['Healthy Fats (Monounsaturated)', 'Potassium', 'Folate', 'Vitamin E', 'Lutein'],
                'ages_suitable' => '6+ months (mashed)',
                'prep_time' => '2 mins',
                'preparation' => "1. Choose a ripe avocado (yields to gentle pressure). 2. Cut in half, remove the pit. 3. Scoop flesh into a bowl. 4. Mash with a fork until smooth, add breast milk or formula to thin if needed. 5. Serve immediately.",
                'research_sources' => [
                    ['title' => 'Lutein in Infant Vision Development', 'url' => 'https://academic.oup.com/ajcn'],
                    ['title' => 'Monounsaturated Fats and Brain Development', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed']
                ]
            ],
            [
                'name' => 'Ghee (Clarified Butter)',
                'image_name' => 'Ghee',
                'age_group' => '0-6 Months',
                'age_group_value' => '0-6',
                'brain_benefits' => 'Contains butyrate which supports gut-brain axis. Supports myelin formation essential for neural signal transmission.',
                'body_benefits' => 'Aids fat-soluble vitamin absorption (A, D, K, E). Supports calcium absorption for bone development.',
                'nutrients' => ['Butyric Acid', 'Fat-Soluble Vitamins', 'Conjugated Linoleic Acid (CLA)', 'Omega-3 Fatty Acids'],
                'ages_suitable' => '4+ months (small amounts)',
                'prep_time' => '1 min',
                'preparation' => '1. Use pure, homemade ghee or high-quality store-bought. 2. Add 1/4 teaspoon to dal (lentil soup) or rice cereal. 3. Mix well to distribute. 4. Cool before serving to baby. 5. Start with tiny amounts, increase gradually.',
                'research_sources' => [
                    ['title' => 'Butyrate and Infant Gut Development', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed'],
                    ['title' => 'Fat-Soluble Vitamin Absorption in Infants', 'url' => 'https://pediatrics.aappublications.org']
                ]
            ],
            [
                'name' => 'Banana',
                'image_name' => 'Banana',
                'age_group' => '0-6 Months',
                'age_group_value' => '0-6',
                'brain_benefits' => 'High in vitamin B6, crucial for neurotransmitter synthesis. Supports dopamine production for cognitive development.',
                'body_benefits' => 'Natural prebiotic supports healthy gut microbiome. Pectin aids digestion.',
                'nutrients' => ['Vitamin B6', 'Potassium', 'Magnesium', 'Pectin', 'Vitamin C'],
                'ages_suitable' => '6+ months',
                'prep_time' => '3 mins',
                'preparation' => '1. Choose a ripe banana with yellow skin. 2. Peel and slice into chunks. 3. Mash with a fork until creamy. 4. Add breast milk or formula if too thick. 5. Serve fresh or freeze in ice cube trays.',
                'research_sources' => [
                    ['title' => 'Vitamin B6 and Neurotransmitter Synthesis', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed'],
                    ['title' => 'Prebiotic Fibers in Infant Development', 'url' => 'https://academic.oup.com/ajcn']
                ]
            ],
            [
                'name' => 'Lentils (Daal)',
                'image_name' => 'Lentils',
                'age_group' => '6-12 Months',
                'age_group_value' => '6-12',
                'brain_benefits' => 'High in iron, essential for oxygen transport to the brain. Supports cognitive function and concentration.',
                'body_benefits' => 'Complete protein with all amino acids. Supports muscle growth and bone development.',
                'nutrients' => ['Iron', 'Protein', 'Folate', 'Fiber', 'Zinc'],
                'ages_suitable' => '6+ months (well-cooked, mashed)',
                'prep_time' => '45 mins',
                'preparation' => '1. Rinse lentils thoroughly. 2. Cook with water (ratio 1:3) until very soft (30-40 mins). 3. Cool and mash or blend until smooth. 4. Mix with ghee and cumin powder for flavor. 5. Serve as a warm porridge.',
                'research_sources' => [
                    ['title' => 'Iron and Cognitive Development in Infants', 'url' => 'https://pediatrics.aappublications.org'],
                    ['title' => 'Plant-Based Proteins in Early Childhood', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed']
                ]
            ],
            [
                'name' => 'Egg Yolk',
                'image_name' => 'Egg Yolk',
                'age_group' => '6-12 Months',
                'age_group_value' => '6-12',
                'brain_benefits' => 'Rich in choline, critical for memory formation and brain structure development. Contains DHA for neural connectivity.',
                'body_benefits' => 'High-quality protein supports muscle development. Lutein supports eye health.',
                'nutrients' => ['Choline', 'DHA/EPA', 'Selenium', 'Vitamin D', 'Protein'],
                'ages_suitable' => '7-8+ months',
                'prep_time' => '10 mins',
                'preparation' => '1. Boil egg until hard-cooked (8-10 mins). 2. Cool and peel. 3. Separate yolk from white. 4. Mash yolk with a fork. 5. Mix with mashed vegetables or rice. Start with small amounts.',
                'research_sources' => [
                    ['title' => 'Choline and Early Brain Development', 'url' => 'https://academic.oup.com/ajcn'],
                    ['title' => 'DHA in Infant Cognitive Development', 'url' => 'https://pediatrics.aappublications.org']
                ]
            ],
            [
                'name' => 'Spinach (Palak)',
                'image_name' => 'Spinach',
                'age_group' => '6-12 Months',
                'age_group_value' => '6-12',
                'brain_benefits' => 'High in vitamin K and folate, supports myelin formation. Antioxidants protect developing neural tissue.',
                'body_benefits' => 'Iron-rich (though less bioavailable than animal sources). Supports red blood cell formation.',
                'nutrients' => ['Iron', 'Folate', 'Vitamin K', 'Lutein', 'Oxalic Acid (low when boiled)'],
                'ages_suitable' => '8+ months (mixed with other foods)',
                'prep_time' => '15 mins',
                'preparation' => '1. Wash spinach thoroughly. 2. Chop finely and boil for 2-3 mins. 3. Cool and blend until smooth. 4. Mix with potato or rice for better iron absorption. 5. Serve warm.',
                'research_sources' => [
                    ['title' => 'Vitamin K and Brain Development', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed'],
                    ['title' => 'Iron Absorption Strategies in Infants', 'url' => 'https://academic.oup.com/ajcn']
                ]
            ],
            [
                'name' => 'Yogurt',
                'image_name' => 'Yogurt',
                'age_group' => '6-12 Months',
                'age_group_value' => '6-12',
                'brain_benefits' => 'Probiotics support gut-brain axis communication. Supports healthy neurotransmitter production.',
                'body_benefits' => 'Calcium and protein support bone and muscle development. Probiotics aid digestion.',
                'nutrients' => ['Probiotics', 'Calcium', 'Protein', 'Vitamin B12', 'Vitamin D'],
                'ages_suitable' => '6+ months (unsweetened, full-fat)',
                'prep_time' => '2 mins',
                'preparation' => '1. Use plain, full-fat, unsweetened yogurt (no honey for babies under 1 year). 2. Serve at room temperature or slightly chilled. 3. Mix with mashed fruit for flavor. 4. Start with 1-2 tablespoons, increase gradually.',
                'research_sources' => [
                    ['title' => 'Probiotics and Infant Gut Development', 'url' => 'https://pediatrics.aappublications.org'],
                    ['title' => 'Gut-Brain Axis in Early Development', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed']
                ]
            ],
            [
                'name' => 'Sweet Potato',
                'image_name' => 'Sweet Potato',
                'age_group' => '1-2 Years',
                'age_group_value' => '1-2',
                'brain_benefits' => 'Rich in beta-carotene (Vitamin A), supports visual cortex development. Complex carbs provide steady glucose for brain.',
                'body_benefits' => 'Fiber supports digestive health. Potassium supports muscle function.',
                'nutrients' => ['Beta-Carotene', 'Fiber', 'Potassium', 'Manganese', 'Vitamin C'],
                'ages_suitable' => '6+ months (cooked and mashed)',
                'prep_time' => '20 mins',
                'preparation' => '1. Wash sweet potato thoroughly. 2. Bake at 180°C for 15-20 mins or boil for 12 mins. 3. Cool and peel. 4. Mash with a fork. 5. Add ghee and cumin for flavor. Freeze extras.',
                'research_sources' => [
                    ['title' => 'Beta-Carotene and Visual Development', 'url' => 'https://academic.oup.com/ajcn'],
                    ['title' => 'Complex Carbohydrates in Child Cognition', 'url' => 'https://pediatrics.aappublications.org']
                ]
            ],
            [
                'name' => 'Almonds (Badam)',
                'image_name' => 'Almonds',
                'age_group' => '1-2 Years',
                'age_group_value' => '1-2',
                'brain_benefits' => 'Rich in vitamin E, powerful antioxidant protecting brain cells. Contains arginine for cognitive function.',
                'body_benefits' => 'Supports bone development and muscle function.',
                'nutrients' => ['Vitamin E', 'Magnesium', 'Calcium', 'Monounsaturated Fats', 'Protein'],
                'ages_suitable' => '12+ months (nut butter) or 18+ months (finely ground)',
                'prep_time' => '5 mins',
                'preparation' => '1. Soak almonds in water overnight. 2. Peel the brown skin. 3. Grind into fine powder or nut butter. 4. Mix 1 teaspoon into milk or oatmeal. 5. Serve warm. Avoid whole nuts due to choking hazard.',
                'research_sources' => [
                    ['title' => 'Vitamin E and Neuroprotection in Childhood', 'url' => 'https://www.ncbi.nlm.nih.gov/pubmed'],
                    ['title' => 'Plant Proteins in Early Childhood Nutrition', 'url' => 'https://academic.oup.com/ajcn']
                ]
            ],
            [
                'name' => 'Salmon',
                'image_name' => 'Salmon',
                'age_group' => '1-2 Years',
                'age_group_value' => '1-2',
                'brain_benefits' => 'Exceptional source of DHA and EPA, essential for brain structure and cognitive development. Supports synaptic plasticity.',
                'body_benefits' => 'High-quality protein supports muscle growth. Omega-3s reduce inflammation.',
                'nutrients' => ['DHA/EPA', 'Protein', 'Selenium', 'Vitamin D', 'Iodine'],
                'ages_suitable' => '8+ months (well-cooked, flaked)',
                'prep_time' => '15 mins',
                'preparation' => '1. Steam salmon fillet for 8-10 mins until cooked through. 2. Cool and flake carefully, removing all bones. 3. Mix with mashed vegetables. 4. Start with small portions (1-2 teaspoons). 5. Ensure no bones remain.',
                'research_sources' => [
                    ['title' => 'Omega-3 Fatty Acids and Brain Development', 'url' => 'https://pediatrics.aappublications.org'],
                    ['title' => 'DHA Requirements in Early Childhood', 'url' => 'https://academic.oup.com/ajcn']
                ]
            ]
        ];

        foreach ($nutritionItems as $item) {
            $food = NutritionItem::firstOrCreate(
                ['name' => $item['name']],
                [
                    'image_name' => $item['image_name'],
                    'age_group' => $item['age_group'],
                    'age_group_value' => $item['age_group_value'],
                    'brain_benefits' => $item['brain_benefits'],
                    'body_benefits' => $item['body_benefits'],
                    'nutrients' => $item['nutrients'],
                    'ages_suitable' => $item['ages_suitable'],
                    'prep_time' => $item['prep_time'],
                    'preparation' => $item['preparation'],
                ]
            );

            // Add research sources
            foreach ($item['research_sources'] as $source) {
                NutritionResearchSource::firstOrCreate([
                    'nutrition_item_id' => $food->id,
                    'title' => $source['title'],
                    'url' => $source['url'],
                ]);
            }
        }
    }
}
