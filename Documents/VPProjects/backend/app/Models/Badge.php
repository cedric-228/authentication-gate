<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'icon',
        'color',
        'user_id',
        'date_earned',
    ];

    protected $casts = [
        'date_earned' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
