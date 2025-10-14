<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date'
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    // Statuts possibles
    const STATUS_PENDING = 'pending';
    const STATUS_UNEXECUTED = 'unexecuted';
    const STATUS_EXECUTED = 'executed';

    public static function getStatuses()
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_UNEXECUTED,
            self::STATUS_EXECUTED,
        ];
    }
}