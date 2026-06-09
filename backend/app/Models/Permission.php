<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use UsesUuid;

    protected $fillable = ['name', 'guard_name'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_has_permissions', 'permission_id', 'role_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'model_has_permissions', 'permission_id', 'model_id')
            ->where('model_type', User::class);
    }
}
