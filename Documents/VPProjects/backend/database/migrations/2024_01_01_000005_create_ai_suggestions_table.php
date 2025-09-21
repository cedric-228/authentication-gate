<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ai_suggestions', function (Blueprint $table) {
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
            $table->boolean('ai_generated')->default(true);
            $table->enum('status', ['suggested', 'accepted', 'rejected', 'converted'])->default('suggested');
            $table->timestamp('generated_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ai_suggestions');
    }
};
