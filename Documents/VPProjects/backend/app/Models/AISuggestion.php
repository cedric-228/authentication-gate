<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AISuggestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
        'duration',
        'is_paid',
        'amount',
        'skills',
        'location',
        'difficulty_level',
        'ai_generated',
        'status',
        'generated_at',
    ];

    protected $casts = [
        'is_paid' => 'boolean',
        'skills' => 'array',
        'ai_generated' => 'boolean',
        'generated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function convertToMission()
    {
        return Mission::create([
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'duration' => $this->duration,
            'is_paid' => $this->is_paid,
            'amount' => $this->amount,
            'skills' => $this->skills,
            'location' => $this->location,
            'organization' => 'YŌVO IA Assistant',
            'deadline' => now()->addDays(30),
            'user_id' => $this->user_id,
        ]);
    }
}
