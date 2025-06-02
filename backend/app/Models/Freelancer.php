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
        'skills',
        'hourly_rate',
        'availability',
        'education',
        'languages',
        'completed_projects_count',
        'average_rating',
        'portfolio'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'is_verified' => 'boolean',
        'is_suspended' => 'boolean',
        'skills' => 'array',
        'hourly_rate' => 'float',
        'availability' => 'array',
        'education' => 'array',
        'languages' => 'array',
        'portfolio' => 'array',
        'completed_projects_count' => 'integer',
        'average_rating' => 'float'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
} 