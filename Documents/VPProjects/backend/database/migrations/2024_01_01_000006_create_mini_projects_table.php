<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('mini_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('category');
            $table->string('duration');
            $table->boolean('is_paid')->default(false);
            $table->string('amount')->nullable();
            $table->json('skills');
            $table->string('location');
            $table->enum('difficulty_level', ['débutant', 'intermédiaire', 'avancé'])->default('débutant');
            $table->enum('status', ['active', 'in_progress', 'submitted', 'reviewed', 'completed', 'rejected'])->default('active');
            $table->text('submission_description')->nullable();
            $table->json('submission_files')->nullable();
            $table->text('review_feedback')->nullable();
            $table->integer('review_score')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mini_projects');
    }
};

