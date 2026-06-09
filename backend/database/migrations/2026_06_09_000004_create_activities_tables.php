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
        Schema::create('activities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('benefit');
            $table->string('duration');
            $table->enum('category', ['Problem Solving', 'Creativity', 'Language', 'Motor Skills', 'Emotional Learning', 'Memory']);
            $table->enum('involvement', ['Parent-Led', 'Guided', 'Independent', 'Co-play']);
            $table->string('age_group');
            $table->json('instructions');
            
            // Audit columns
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });

        Schema::create('activity_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('child_profile_id');
            $table->uuid('activity_id');
            $table->timestamp('completed_at')->useCurrent();
            $table->text('notes')->nullable();
            $table->tinyInteger('rating')->nullable(); // 1 to 5 rating
            
            // Audit columns
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('child_profile_id')->references('id')->on('child_profiles')->onDelete('cascade');
            $table->foreign('activity_id')->references('id')->on('activities')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('activities');
    }
};
