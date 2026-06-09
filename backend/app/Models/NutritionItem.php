<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NutritionItem extends Model
{
    use HasFactory, UsesUuid, SoftDeletes;

    protected $table = 'nutrition_items';

    protected $fillable = [
        'name',
        'image_name',
        'age_group',
        'age_group_value',
        'brain_benefits',
        'body_benefits',
        'nutrients',
        'ages_suitable',
        'prep_time',
        'preparation',
        'video_url',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'nutrients' => 'array',
    ];

    public function researchSources()
    {
        return $this->hasMany(NutritionResearchSource::class, 'nutrition_item_id');
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
