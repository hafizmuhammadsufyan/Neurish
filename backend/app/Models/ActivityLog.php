<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ActivityLog extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'child_profile_id',
        'activity_id',
        'completed_at',
        'notes',
        'rating',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'rating' => 'integer',
    ];

    public function childProfile()
    {
        return $this->belongsTo(ChildProfile::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
