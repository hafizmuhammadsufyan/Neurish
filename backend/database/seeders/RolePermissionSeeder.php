<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create permissions
        $permissions = [
            'manage-content', // for admin panel (articles, activities, nutrition, games, milestones)
            'view-dashboard',
            'manage-children',
        ];

        $permissionModels = [];
        foreach ($permissions as $permName) {
            $permissionModels[$permName] = Permission::firstOrCreate([
                'name' => $permName,
                'guard_name' => 'api',
            ]);
        }

        // 2. Create roles
        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'api',
        ]);

        $parentRole = Role::firstOrCreate([
            'name' => 'parent',
            'guard_name' => 'api',
        ]);

        // 3. Assign permissions to roles
        // Admin gets everything
        $adminRole->permissions()->sync(array_values(array_map(fn($p) => $p->id, $permissionModels)));

        // Parent gets dashboard and children management
        $parentRole->permissions()->sync([
            $permissionModels['view-dashboard']->id,
            $permissionModels['manage-children']->id,
        ]);
    }
}
