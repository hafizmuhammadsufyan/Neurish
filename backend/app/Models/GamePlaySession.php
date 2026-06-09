<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class GamePlaySession extends Model
{
    use UsesUuid;

    protected $fillable = [
        'child_profile_id',
        'game_id',
        'score',
        'level_reached',
        'duration_seconds',
        'played_at',
    ];

    protected $casts = [
        'played_at' => 'datetime',
        'score' => 'integer',
        'level_reached' => 'integer',
        'duration_seconds' => 'integer',
    ];

    public function childProfile()
    {
        return $this->belongsTo(ChildProfile::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
