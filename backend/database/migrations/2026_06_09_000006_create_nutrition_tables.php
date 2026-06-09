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
        Schema::create('nutrition_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('image_name');
            $table->string('age_group');
            $table->string('age_group_value');
            $table->text('brain_benefits');
            $table->text('body_benefits');
            $table->json('nutrients');
            $table->string('ages_suitable');
            $table->string('prep_time');
            $table->text('preparation');
            $table->string('video_url')->nullable();
            
            // Audit columns
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });

        Schema::create('nutrition_research_sources', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('nutrition_item_id');
            $table->string('title');
            $table->string('url');
            $table->timestamps();

            $table->foreign('nutrition_item_id')->references('id')->on('nutrition_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition_research_sources');
        Schema::dropIfExists('nutrition_items');
    }
};
