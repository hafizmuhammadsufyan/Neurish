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
        Schema::create('media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('model_type');
            $table->uuid('model_id');
            $table->string('collection_name');
            $table->string('name');
            $table->string('file_name');
            $table->string('mime_type')->nullable();
            $table->string('disk')->default('public');
            $table->bigInteger('size')->unsigned();
            $table->json('custom_properties')->nullable();
            
            // Audit columns
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->index(['model_type', 'model_id']);
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
