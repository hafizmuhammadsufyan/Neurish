<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'title',
        'benefit',
        'duration',
        'category',
        'involvement',
        'age_group',
        'instructions',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'instructions' => 'array',
    ];

    public function logs()
    {
        return $this->hasMany(ActivityLog::class);
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
