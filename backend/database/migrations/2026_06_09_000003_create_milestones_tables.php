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
        Schema::create('milestones', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['Cognitive', 'Physical', 'Communication', 'Social', 'Emotional']);
            $table->integer('age_range_months_start');
            $table->integer('age_range_months_end');
            
            // Audit columns
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });

        Schema::create('completed_milestones', function (Blueprint $table) {
            $table->uuid('child_profile_id');
            $table->uuid('milestone_id');
            $table->timestamp('completed_at')->useCurrent();

            $table->foreign('child_profile_id')->references('id')->on('child_profiles')->onDelete('cascade');
            $table->foreign('milestone_id')->references('id')->on('milestones')->onDelete('cascade');
            $table->primary(['child_profile_id', 'milestone_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('completed_milestones');
        Schema::dropIfExists('milestones');
    }
};
