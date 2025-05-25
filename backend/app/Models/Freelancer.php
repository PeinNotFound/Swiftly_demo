<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Freelancer extends Model
{
    protected $fillable = [
        'user_id',
        'is_approved',
        'is_verified',
        'is_suspended',
        'skills'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'is_verified' => 'boolean',
        'is_suspended' => 'boolean',
        'skills' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
} 