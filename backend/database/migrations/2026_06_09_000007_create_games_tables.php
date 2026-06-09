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
        Schema::create('games', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug')->unique(); // e.g., 'brain-builder'
            $table->string('name');
            $table->string('category');
            $table->string('age_group');
            $table->string('age_group_value');
            $table->text('description');
            $table->json('skills');
            $table->json('skill_badges');
            $table->text('research_backing');
            $table->string('research_url')->nullable();
            $table->integer('difficulty')->default(1);
            $table->integer('max_difficulty')->default(4);
            $table->json('game_config')->nullable();
            $table->text('tips')->nullable();
            $table->string('video_url')->nullable();
            
            // Audit columns
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });

        Schema::create('game_play_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('child_profile_id');
            $table->uuid('game_id');
            $table->integer('score')->nullable();
            $table->integer('level_reached')->nullable();
            $table->integer('duration_seconds')->nullable();
            $table->timestamp('played_at')->useCurrent();
            $table->timestamps();

            $table->foreign('child_profile_id')->references('id')->on('child_profiles')->onDelete('cascade');
            $table->foreign('game_id')->references('id')->on('games')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_play_sessions');
        Schema::dropIfExists('games');
    }
};
