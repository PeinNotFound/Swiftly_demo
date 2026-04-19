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
        'freelancer_id',
        'status',
        'progress',
        'due_date',
    ];

    protected $casts = [
        'skills'    => 'array',
        'due_date'  => 'date',
        'created_at'=> 'datetime',
        'updated_at'=> 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}