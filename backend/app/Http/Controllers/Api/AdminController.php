<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    /**
     * Get all users
     */
    public function getUsers()
    {
        $users = User::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'profile_picture' => $user->profile_picture_url,
            ];
        });

        return response()->json(['users' => $users]);
    }

    /**
     * Get all freelancers
     */
    public function getFreelancers()
    {
        $freelancers = User::where('role', 'freelancer')
            // ->with(['skills', 'portfolio'])
            ->get()
            ->map(function ($freelancer) {
                return [
                    'id' => $freelancer->id,
                    'name' => $freelancer->name,
                    'email' => $freelancer->email,
                    'hourly_rate' => $freelancer->hourly_rate,
                    // 'skills' => $freelancer->skills, // Remove or keep if you have a skills attribute/column
                    // 'completed_projects' => $freelancer->completed_projects_count,
                    // 'rating' => $freelancer->average_rating,
                    'created_at' => $freelancer->created_at,
                    'profile_picture' => $freelancer->profile_picture_url,
                ];
            });

        return response()->json(['freelancers' => $freelancers]);
    }

    /**
     * Verify a freelancer
     */
    public function verifyFreelancer($id)
    {
        $freelancer = User::where('role', 'freelancer')->findOrFail($id);
        $freelancer->update(['is_verified' => true]);

        return response()->json([
            'message' => 'Freelancer verified successfully',
            'freelancer' => $freelancer
        ]);
    }

    /**
     * Suspend a freelancer
     */
    public function suspendFreelancer($id)
    {
        $freelancer = User::where('role', 'freelancer')->findOrFail($id);
        $freelancer->update(['is_active' => false]);

        return response()->json([
            'message' => 'Freelancer suspended successfully',
            'freelancer' => $freelancer
        ]);
    }

    /**
     * Update user
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'role' => ['required', Rule::in(['user', 'freelancer', 'admin'])],
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'profile_picture' => $user->profile_picture_url,
            ]
        ]);
    }

    /**
     * Delete user
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting the last admin
        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return response()->json([
                'message' => 'Cannot delete the last admin user'
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get user stats
     */
    public function getStats()
    {
        $stats = [
            'total_users' => User::count(),
            'total_freelancers' => User::where('role', 'freelancer')->count(),
            'total_clients' => User::whereNotIn('role', ['admin', 'freelancer'])->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Get freelancer stats
     */
    public function getFreelancerStats()
    {
        $stats = [
            'total_freelancers' => User::where('role', 'freelancer')->count(),
        ];

        return response()->json($stats);
    }
} 