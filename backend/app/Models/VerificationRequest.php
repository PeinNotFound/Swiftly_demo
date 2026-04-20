<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VerificationRequest extends Model
{
    protected $fillable = [
        'freelancer_id',
        'id_document_path',
        'certificate_paths',
        'project_links',
        'status',
        'admin_notes',
        'rejection_count',
    ];

    protected $casts = [
        'certificate_paths' => 'array',
        'project_links' => 'array',
        'rejection_count' => 'integer',
    ];

    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
}
