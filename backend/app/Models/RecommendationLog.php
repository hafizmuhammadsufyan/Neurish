<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class RecommendationLog extends Model
{
    use UsesUuid;

    protected $fillable = [
        'child_profile_id',
        'recommended_article_id',
        'recommended_activity_id',
        'recommended_nutrition_id',
        'focus_text',
        'served_at',
    ];

    protected $casts = [
        'served_at' => 'datetime',
    ];

    public function childProfile()
    {
        return $this->belongsTo(ChildProfile::class);
    }

    public function recommendedArticle()
    {
        return $this->belongsTo(Article::class, 'recommended_article_id');
    }

    public function recommendedActivity()
    {
        return $this->belongsTo(Activity::class, 'recommended_activity_id');
    }

    public function recommendedNutrition()
    {
        return $this->belongsTo(NutritionItem::class, 'recommended_nutrition_id');
    }
}
