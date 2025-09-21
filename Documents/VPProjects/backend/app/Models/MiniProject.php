<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MiniProject extends Model
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
        'status',
        'submission_description',
        'submission_files',
        'review_feedback',
        'review_score',
        'submitted_at',
        'reviewed_at',
    ];

    protected $casts = [
        'skills' => 'array',
        'submission_files' => 'array',
        'is_paid' => 'boolean',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'active' => 'Disponible',
            'in_progress' => 'En cours',
            'submitted' => 'Soumis',
            'reviewed' => 'Évalué',
            'completed' => 'Terminé',
            'rejected' => 'Rejeté',
            default => 'Inconnu'
        };
    }

    public function getDifficultyColorAttribute()
    {
        return match($this->difficulty_level) {
            'débutant' => 'green',
            'intermédiaire' => 'yellow',
            'avancé' => 'red',
            default => 'gray'
        };
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'active' => 'blue',
            'in_progress' => 'yellow',
            'submitted' => 'purple',
            'reviewed' => 'green',
            'completed' => 'green',
            'rejected' => 'red',
            default => 'gray'
        };
    }
}

