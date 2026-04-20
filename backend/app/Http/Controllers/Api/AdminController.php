<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\VerificationRequest;
use Illuminate\Support\Facades\Auth;

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
            ->with('freelancer')
            ->get()
            ->map(function ($user) {
                $fl = $user->freelancer;
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_approved' => $fl ? $fl->is_approved : false,
                    'is_verified' => $fl ? $fl->is_verified : false,
                    'is_suspended' => $fl ? $fl->is_suspended : false,
                    'hourly_rate' => $fl ? $fl->hourly_rate : null,
                    'title' => $fl ? $fl->title : null,
                    'bio' => $fl ? $fl->bio : null,
                    'location' => $fl ? $fl->location : null,
                    'experience_years' => $fl ? $fl->experience_years : null,
                    'education' => $fl ? $fl->education : [],
                    'languages' => $fl ? $fl->languages : [],
                    'availability' => $fl ? $fl->availability : null,
                    'completed_projects' => $fl ? $fl->completed_projects_count : 0,
                    'rating' => $fl ? $fl->average_rating : 0,
                    'created_at' => $user->created_at,
                    'profile_picture' => $user->profile_picture_url,
                    'skills' => $fl && is_string($fl->skills) ? json_decode($fl->skills, true) : ($fl->skills ?? []),
                    'portfolio' => $fl ? $fl->portfolio : [],
                    'suspension_reason' => $fl ? $fl->suspension_reason : null,
                    'appeal_message' => $fl ? $fl->appeal_message : null,
                    'appeal_status' => $fl ? $fl->appeal_status : 'none',
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

        if ($user->role === 'admin' && $user->id !== auth()->id()) {
            return response()->json([
                'message' => 'Forbidden: You cannot modify another admin.'
            ], 403);
        }

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

        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Forbidden: Admin users cannot be deleted.'
            ], 403);
        }

        // Prevent deleting the last admin (though we just blocked deleting ANY admin, keeping it as fallback logic)
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
                    'rejection_count' => $req->rejection_count ?? 0,
                ];
            });

        return response()->json(['requests' => $requests]);
    }

    public function approveVerification($id)
    {
        $request = VerificationRequest::findOrFail($id);
        $request->update(['status' => 'approved']);

        $request->freelancer->update([
            'is_verified' => true,
            'is_approved' => true
        ]);

        return response()->json(['message' => 'Verification request approved']);
    }

    public function rejectVerification(Request $request, $id)
    {
        $request->validate(['reason' => 'required|string|min:5']);

        $req = VerificationRequest::with(['freelancer.user'])->findOrFail($id);
        $newCount = ($req->rejection_count ?? 0) + 1;

        $req->update([
            'status' => 'rejected',
            'admin_notes' => $request->reason,
            'rejection_count' => $newCount,
        ]);

        $freelancer = $req->freelancer;
        $user = $freelancer?->user;

        if ($newCount >= 2) {
            // 2nd rejection — auto-suspend and allow appeal
            if ($freelancer) {
                $freelancer->update([
                    'is_suspended' => true,
                    'suspension_reason' => 'Verification rejected twice: ' . $request->reason,
                    'appeal_status' => 'none',
                ]);
            }
        }

        return response()->json(['message' => 'Verification request rejected', 'rejection_count' => $newCount]);
    }

    /**
     * Reject a freelancer appeal — bans their email permanently
     */
    public function rejectAppeal($id)
    {
        $freelancer = \App\Models\Freelancer::where('user_id', $id)->firstOrFail();
        $user = $freelancer->user;

        $freelancer->update([
            'is_suspended' => true,
            'appeal_status' => 'rejected',
            'appeal_message' => null,
        ]);

        // Ban the email — blocked from logging in
        $user->update(['is_blocked' => true]);

        return response()->json(['message' => 'Appeal rejected and email banned']);
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