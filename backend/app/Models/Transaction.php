<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'freelancer_id',
        'client_id',
        'job_id',
        'amount',
        'description',
        'type',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
