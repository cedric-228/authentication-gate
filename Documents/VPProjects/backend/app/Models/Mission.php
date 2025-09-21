<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'duration',
        'is_paid',
        'amount',
        'skills',
        'location',
        'organization',
        'deadline',
        'user_id',
        'status',
    ];

    protected $casts = [
        'is_paid' => 'boolean',
        'skills' => 'array',
        'deadline' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
