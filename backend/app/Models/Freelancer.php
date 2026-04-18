<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Freelancer extends Model
{
    protected $fillable = [
        'user_id',
        'is_approved',
        'is_verified',
        'is_suspended',
        'skills',
        'hourly_rate',
        'freelancer_level',
        'availability',
        'phone',
        'education',
        'experience',
        'languages',
        'completed_projects_count',
        'average_rating',
        'portfolio',
        'is_onboarded',
        'suspension_reason',
        'appeal_message',
        'appeal_status'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'is_verified' => 'boolean',
        'is_suspended' => 'boolean',
        'skills' => 'array',
        'hourly_rate' => 'float',
        'availability' => 'array',
        'education' => 'array',
        'experience' => 'array',
        'languages' => 'array',
        'portfolio' => 'array',
        'completed_projects_count' => 'integer',
        'average_rating' => 'float',
        'is_onboarded' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function verificationRequest(): HasOne
    {
        return $this->hasOne(VerificationRequest::class);
    }
}