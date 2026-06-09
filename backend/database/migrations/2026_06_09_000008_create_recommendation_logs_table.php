<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recommendation_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('child_profile_id');
            $table->uuid('recommended_article_id')->nullable();
            $table->uuid('recommended_activity_id')->nullable();
            $table->uuid('recommended_nutrition_id')->nullable();
            $table->text('focus_text')->nullable();
            $table->timestamp('served_at')->useCurrent();
            $table->timestamps();

            $table->foreign('child_profile_id')->references('id')->on('child_profiles')->onDelete('cascade');
            $table->foreign('recommended_article_id')->references('id')->on('articles')->onDelete('set null');
            $table->foreign('recommended_activity_id')->references('id')->on('activities')->onDelete('set null');
            $table->foreign('recommended_nutrition_id')->references('id')->on('nutrition_items')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendation_logs');
    }
};
