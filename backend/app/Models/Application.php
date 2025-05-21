<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'freelancer_id',
        'cover_letter',
        'proposed_rate',
        'estimated_hours',
        'status',
    ];

    protected $casts = [
        'proposed_rate' => 'decimal:2',
        'estimated_hours' => 'integer',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function freelancer()
    {
        return $this->belongsTo(Freelancer::class);
    }
} 