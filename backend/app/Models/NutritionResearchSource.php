<?php

namespace App\Models;

use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class NutritionResearchSource extends Model
{
    use UsesUuid;

    protected $table = 'nutrition_research_sources';

    protected $fillable = [
        'nutrition_item_id',
        'title',
        'url',
    ];

    public function nutritionItem()
    {
        return $this->belongsTo(NutritionItem::class);
    }
}
