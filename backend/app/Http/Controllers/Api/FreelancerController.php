<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Freelancer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerController extends Controller
{
    public function index()
    {
        $freelancers = User::where('role', 'freelancer')
            ->with('freelancer')
            ->get()
            ->map(function ($user) {
                $skills = $user->freelancer->skills ?? [];
                if (is_string($skills)) {
                    $skills = json_decode($skills, true) ?? [];
                }
                
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_picture' => $user->profile_picture,
                    'title' => $user->title,
                    'bio' => $user->bio,
                    'location' => $user->location,
                    'hourly_rate' => $user->freelancer->hourly_rate ?? null,
                    'availability' => $user->freelancer->availability ?? [],
                    'education' => $user->freelancer->education ?? [],
                    'languages' => $user->freelancer->languages ?? [],
                    'completed_projects' => $user->freelancer->completed_projects_count ?? 0,
                    'rating' => $user->freelancer->average_rating ?? 0,
                    'created_at' => $user->created_at,
                    'skills' => $skills,
                    'is_approved' => $user->freelancer->is_approved ?? false,
                    'is_verified' => $user->freelancer->is_verified ?? false,
                    'is_suspended' => $user->freelancer->is_suspended ?? false,
                    'portfolio' => $user->freelancer->portfolio ?? []
                ];
            });

        return response()->json(['freelancers' => $freelancers]);
    }

    public function approve($id)
    {
        $freelancer = Freelancer::where('user_id', $id)->firstOrFail();
        $freelancer->update(['is_approved' => true]);
        return response()->json(['message' => 'Freelancer approved successfully']);
    }

    public function reject($id)
    {
        $freelancer = Freelancer::where('user_id', $id)->firstOrFail();
        $freelancer->delete();
        return response()->json(['message' => 'Freelancer rejected successfully']);
    }

    public function verify($id)
    {
        $freelancer = Freelancer::where('user_id', $id)->firstOrFail();
        $freelancer->update(['is_verified' => true]);
        return response()->json(['message' => 'Freelancer verified successfully']);
    }

    public function suspend($id)
    {
        $freelancer = Freelancer::where('user_id', $id)->firstOrFail();
        $freelancer->update(['is_suspended' => true]);
        return response()->json(['message' => 'Freelancer suspended successfully']);
    }
} 