<?php

namespace App\Http\Controllers;

use App\Models\Freelancer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerController extends Controller
{
    public function index()
    {
        $freelancers = Freelancer::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($freelancer) {
                return [
                    'id' => $freelancer->user->id,
                    'name' => $freelancer->user->name,
                    'email' => $freelancer->user->email,
                    'profile_picture' => $freelancer->user->profile_picture,
                    'created_at' => $freelancer->created_at,
                    'is_approved' => $freelancer->is_approved,
                    'is_verified' => $freelancer->is_verified,
                    'is_suspended' => $freelancer->is_suspended,
                    'skills' => $freelancer->skills
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