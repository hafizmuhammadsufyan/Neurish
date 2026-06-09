<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChildProfile extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'dob',
        'gender',
        'notes',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'dob' => 'date',
    ];

    // --- Relationships ---

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function concerns()
    {
        return $this->belongsToMany(Concern::class, 'child_concern');
    }

    public function completedMilestones()
    {
        return $this->belongsToMany(Milestone::class, 'completed_milestones')
            ->withPivot('completed_at');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function gamePlaySessions()
    {
        return $this->hasMany(GamePlaySession::class);
    }

    public function recommendationLogs()
    {
        return $this->hasMany(RecommendationLog::class);
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'model');
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
