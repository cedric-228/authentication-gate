<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('category');
            $table->string('duration');
            $table->boolean('is_paid')->default(false);
            $table->string('amount')->nullable();
            $table->json('skills');
            $table->string('location');
            $table->string('organization');
            $table->date('deadline');
            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('missions');
    }
};
