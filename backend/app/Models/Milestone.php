<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Milestone extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'category',
        'age_range_months_start',
        'age_range_months_end',
        'created_by',
        'updated_by',
    ];

    public function childProfiles()
    {
        return $this->belongsToMany(ChildProfile::class, 'completed_milestones');
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
