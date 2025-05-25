<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'company',
        'location',
        'type',
        'salary',
        'description',
        'skills',
        'jobType',
        'experienceLevel',
        'projectSize',
        'estimatedDuration',
        'additionalDetails',
        'client_id',
        'status'
    ];

    protected $casts = [
        'skills' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
} 