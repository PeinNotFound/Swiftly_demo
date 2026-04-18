<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Freelancer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\VerificationRequest;
use App\Services\ResumeParserService;
use Illuminate\Support\Facades\Storage;

class FreelancerController extends Controller
{
    public function index()
    {
        $freelancers = User::where('role', 'freelancer')
            ->whereHas('freelancer', function ($query) {
                $query->where('is_suspended', false);
            })
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
        $freelancer->update([
            'is_approved' => true,
            'is_verified' => true
        ]);
        return response()->json(['message' => 'Freelancer approved and verified successfully']);
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

    public function suspend(Request $request, $id)
    {
        $request->validate(['reason' => 'required|string']);
        $freelancer = Freelancer::where('user_id', $id)->firstOrFail();
        $freelancer->update([
            'is_suspended' => true,
            'suspension_reason' => $request->reason,
            'appeal_status' => 'none',
            'appeal_message' => null
        ]);
        return response()->json(['message' => 'Freelancer suspended successfully']);
    }

    public function unsuspend($id)
    {
        $freelancer = Freelancer::where('user_id', $id)->firstOrFail();
        $freelancer->update([
            'is_suspended' => false,
            'suspension_reason' => null,
            'appeal_status' => 'approved',
            'appeal_message' => null
        ]);
        return response()->json(['message' => 'Freelancer unsuspended successfully']);
    }

    public function submitAppeal(Request $request)
    {
        $request->validate(['appeal_message' => 'required|string']);
        $freelancer = Auth::user()->freelancer;

        if (!$freelancer || !$freelancer->is_suspended) {
            return response()->json(['message' => 'You are not suspended'], 400);
        }

        $freelancer->update([
            'appeal_message' => $request->appeal_message,
            'appeal_status' => 'pending'
        ]);

        return response()->json(['message' => 'Appeal submitted successfully']);
    }

    public function parseResume(Request $request, ResumeParserService $parser)
    {
        $request->validate(['resume' => 'required|mimes:pdf|max:10240']);

        try {
            $data = $parser->parse($request->file('resume'));
            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function requestVerification(Request $request)
    {
        $user = Auth::user();

        // Ensure user has a freelancer profile
        if (!$user->freelancer) {
            return response()->json(['message' => 'Freelancer profile not found'], 404);
        }

        $request->validate([
            'id_document' => 'required|file|mimes:jpg,jpeg,png,pdf|max:10240',
            'certificates' => 'nullable|array',
            'certificates.*' => 'file|mimes:jpg,jpeg,png,pdf|max:10240',
            'project_links' => 'nullable|array' // Expecting JSON array or just array from form-data if properly indexed
        ]);

        $freelancer = $user->freelancer;

        // Check if pending request exists
        if ($freelancer->verificationRequest && $freelancer->verificationRequest->status === 'pending') {
            return response()->json(['message' => 'You already have a pending verification request'], 400);
        }

        // Upload ID
        $idPath = $request->file('id_document')->store('verification_documents', 'public');

        // Upload Certificates
        $certPaths = [];
        if ($request->hasFile('certificates')) {
            foreach ($request->file('certificates') as $cert) {
                $certPaths[] = $cert->store('verification_documents', 'public');
            }
        }

        // Handle project_links (it might come as a string if using FormData in a simple way, but let's assume array or handle JSON decoding)
        $projectLinks = $request->project_links;
        if (is_string($projectLinks)) {
            $projectLinks = json_decode($projectLinks, true) ?? [];
        }

        VerificationRequest::updateOrCreate(
            ['freelancer_id' => $freelancer->id],
            [
                'id_document_path' => $idPath,
                'certificate_paths' => $certPaths,
                'project_links' => $projectLinks,
                'status' => 'pending',
                'admin_notes' => null
            ]
        );

        return response()->json(['success' => true, 'message' => 'Verification request submitted successfully']);
    }

    public function completeOnboarding(Request $request)
    {
        $user = Auth::user();
        $freelancer = $user->freelancer;

        if (!$freelancer) {
            return response()->json(['message' => 'Freelancer profile not found'], 404);
        }

        // Update profile fields if provided
        $freelancer->update([
            'is_onboarded' => true,
            'phone' => $request->input('phone'),
            'freelancer_level' => $request->input('freelancer_level', 'beginner'),
            'skills' => $request->input('skills', []), // Expecting array
            'education' => $request->input('education', []),
            'experience' => $request->input('experience', []),
        ]);

        return response()->json(['success' => true, 'message' => 'Onboarding completed']);
    }
}