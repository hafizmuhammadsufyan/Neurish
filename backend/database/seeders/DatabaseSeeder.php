<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Run Core System Seeders
        $this->call([
            RolePermissionSeeder::class,
            ConcernSeeder::class,
            MilestoneSeeder::class,
            ActivitySeeder::class,
            ArticleSeeder::class,
            NutritionSeeder::class,
            GameSeeder::class,
        ]);

        // 2. Create Default Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@neurish.com'],
            [
                'name' => 'Neurish Admin',
                'password' => Hash::make('admin123'),
            ]
        );
        $admin->assignRole('admin');

        // 3. Create Default Parent User
        $parent = User::firstOrCreate(
            ['email' => 'parent@neurish.com'],
            [
                'name' => 'Neurish Parent',
                'password' => Hash::make('parent123'),
            ]
        );
        $parent->assignRole('parent');

        // 4. Create child profiles under the default parent user
        $zain = $parent->childProfiles()->firstOrCreate(
            ['name' => 'Zain'],
            [
                'dob' => '2024-12-01', // ~1.5 years old
                'gender' => 'Male',
                'notes' => 'Enjoys stacking blocks but gets frustrated quickly.',
            ]
        );

        $ayesha = $parent->childProfiles()->firstOrCreate(
            ['name' => 'Ayesha'],
            [
                'dob' => '2022-12-01', // ~3.5 years old
                'gender' => 'Female',
                'notes' => 'Very energetic, loves drawing. Stubborn during meals.',
            ]
        );

        // Link concerns to Zain (Speech Development, Sleep Issues)
        $speechConcern = \App\Models\Concern::where('name', 'Speech Development')->first();
        $sleepConcern = \App\Models\Concern::where('name', 'Sleep Issues')->first();
        if ($speechConcern && $sleepConcern) {
            $zain->concerns()->sync([$speechConcern->id, $sleepConcern->id]);
        }

        // Link concerns to Ayesha (Tantrums, Screen Time)
        $tantrumConcern = \App\Models\Concern::where('name', 'Tantrums')->first();
        $screenConcern = \App\Models\Concern::where('name', 'Screen Time')->first();
        if ($tantrumConcern && $screenConcern) {
            $ayesha->concerns()->sync([$tantrumConcern->id, $screenConcern->id]);
        }

        // Seed some completed milestones to match AppContext state
        $m_c1 = \App\Models\Milestone::where('title', 'like', 'Finds hidden objects%')->first();
        $m_s1 = \App\Models\Milestone::where('title', 'like', 'Points to show you something%')->first();
        if ($m_c1 && $m_s1) {
            $zain->completedMilestones()->sync([$m_c1->id, $m_s1->id]);
        }

        // Seed some saved articles
        $art1 = \App\Models\Article::first();
        if ($art1) {
            $parent->savedArticles()->sync([$art1->id]);
        }
    }
}
