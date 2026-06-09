<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, UsesUuid, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // --- Relationships ---

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'model_has_roles', 'model_id', 'role_id')
            ->wherePivot('model_type', self::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'model_has_permissions', 'model_id', 'permission_id')
            ->wherePivot('model_type', self::class);
    }

    public function childProfiles()
    {
        return $this->hasMany(ChildProfile::class, 'user_id');
    }

    public function savedArticles()
    {
        return $this->belongsToMany(Article::class, 'saved_articles', 'user_id', 'article_id');
    }

    // --- Helper Methods ---

    /**
     * Check if user has a role.
     */
    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }

    /**
     * Assign a role to user.
     */
    public function assignRole(string $roleName)
    {
        $role = Role::where('name', $roleName)->first();
        if ($role) {
            $this->roles()->syncWithoutDetaching([
                $role->id => ['model_type' => self::class]
            ]);
        }
    }

    /**
     * Check if user has a permission.
     */
    public function hasPermissionTo(string $permission): bool
    {
        // Direct permission check
        if ($this->permissions()->where('name', $permission)->exists()) {
            return true;
        }

        // Role permission check
        foreach ($this->roles as $role) {
            if ($role->permissions()->where('name', $permission)->exists()) {
                return true;
            }
        }

        return false;
    }
}
