<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'job_type',
        'experience_level',
        'budget',
        'skills_required',
        'status',
        'deadline',
    ];

    protected $casts = [
        'skills_required' => 'array',
        'deadline' => 'datetime',
        'budget' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function freelancers()
    {
        return $this->belongsToMany(Freelancer::class, 'applications');
    }
} 