<?php

namespace App\Models\Traits;

use Illuminate\Support\Str;

trait UsesUuid
{
    /**
     * Boot function from Laravel Eloquent to auto-generate UUID on model creation.
     */
    protected static function bootUsesUuid()
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /**
     * Disable auto-increment for UUIDs.
     */
    public function getIncrementing()
    {
        return false;
    }

    /**
     * Set UUID column type to string.
     */
    public function getKeyType()
    {
        return 'string';
    }
}
