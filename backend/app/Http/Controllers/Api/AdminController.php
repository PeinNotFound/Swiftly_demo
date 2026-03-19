<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\VerificationRequest;

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
            ->get()
            ->map(function ($freelancer) {
                return [
                    'id' => $freelancer->id,
                    'name' => $freelancer->name,
                    'email' => $freelancer->email,
                    'hourly_rate' => $freelancer->hourly_rate,
                    'title' => $freelancer->title,
                    'bio' => $freelancer->bio,
                    'location' => $freelancer->location,
                    'experience_years' => $freelancer->experience_years,
                    'education' => $freelancer->education,
                    'languages' => $freelancer->languages,
                    'availability' => $freelancer->availability,
                    'completed_projects' => $freelancer->completed_projects_count ?? 0,
                    'rating' => $freelancer->average_rating ?? 0,
                    'created_at' => $freelancer->created_at,
                    'profile_picture' => $freelancer->profile_picture_url,
                    'skills' => $freelancer->skills ?? [],
                    'portfolio' => $freelancer->portfolio ?? [],
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
            'total_jobs' => \App\Models\Job::count(),
            'active_jobs' => \App\Models\Job::whereIn('status', ['open', 'in_progress'])->count(),
            'pending_verifications' => VerificationRequest::where('status', 'pending')->count(),
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
            'pending_verifications' => VerificationRequest::where('status', 'pending')->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Get verification requests
     */
    public function getVerificationRequests()
    {
        $requests = VerificationRequest::with(['freelancer.user'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($req) {
                return [
                    'id' => $req->id,
                    'freelancer_name' => $req->freelancer->user->name ?? 'Unknown',
                    'freelancer_email' => $req->freelancer->user->email ?? 'Unknown',
                    'freelancer_title' => $req->freelancer->user->title ?? 'No title',
                    'skills' => is_string($req->freelancer->skills) ? json_decode($req->freelancer->skills, true) : ($req->freelancer->skills ?? []),
                    'freelancer_level' => $req->freelancer->freelancer_level ?? 'beginner',
                    'phone' => $req->freelancer->phone ?? 'Not provided',
                    'id_document_url' => asset('storage/' . $req->id_document_path),
                    'certificate_urls' => collect($req->certificate_paths)->map(fn($p) => asset('storage/' . $p)),
                    'project_links' => $req->project_links,
                    'submitted_at' => $req->created_at,
                ];
            });

        return response()->json(['requests' => $requests]);
    }

    public function approveVerification($id)
    {
        $request = VerificationRequest::findOrFail($id);
        $request->update(['status' => 'approved']);

        $request->freelancer->update(['is_verified' => true]);

        return response()->json(['message' => 'Verification request approved']);
    }

    public function rejectVerification(Request $request, $id)
    {
        $req = VerificationRequest::findOrFail($id);
        $req->update([
            'status' => 'rejected',
            'admin_notes' => $request->reason
        ]);

        if ($request->block_user) {
            $user = clone $req->freelancer->user; // Reference the user
            $user->update(['is_active' => false]);
            $req->freelancer->update(['is_suspended' => true]);
        }

        return response()->json(['message' => 'Verification request rejected']);
    }

    /**
     * Get all jobs (Admin)
     */
    public function getJobs()
    {
        $jobs = \App\Models\Job::with('client:id,name,email,company')->orderBy('created_at', 'desc')->get();
        return response()->json(['jobs' => $jobs]);
    }

    public function deleteJob($id)
    {
        $job = \App\Models\Job::findOrFail($id);
        $job->delete();
        return response()->json(['message' => 'Job deleted successfully']);
    }

    public function updateJobStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);
        $job = \App\Models\Job::findOrFail($id);
        $job->update(['status' => $request->status]);
        return response()->json(['message' => 'Job status updated successfully']);
    }
}