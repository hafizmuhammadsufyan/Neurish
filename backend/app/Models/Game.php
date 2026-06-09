<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'slug',
        'name',
        'category',
        'age_group',
        'age_group_value',
        'description',
        'skills',
        'skill_badges',
        'research_backing',
        'research_url',
        'difficulty',
        'max_difficulty',
        'game_config',
        'tips',
        'video_url',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'skills' => 'array',
        'skill_badges' => 'array',
        'game_config' => 'array',
    ];

    public function playSessions()
    {
        return $this->hasMany(GamePlaySession::class, 'game_id');
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
