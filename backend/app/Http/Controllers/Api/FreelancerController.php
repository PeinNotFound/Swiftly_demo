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
        \Log::info('Triggered requestVerification (V2)');
        try {
            $user = Auth::user();
            \Log::info('User found:', ['id' => $user->id]);

            // Ensure user has a freelancer profile
            if (!$user->freelancer) {
                \Log::info('Creating missing freelancer profile');
                $user->freelancer()->create([
                    'is_approved' => false,
                    'is_verified' => false,
                    'is_suspended' => false,
                    'skills' => [],
                    'education' => [],
                    'languages' => [],
                    'portfolio' => [],
                    'completed_projects_count' => 0,
                    'average_rating' => 0
                ]);
                $user->load('freelancer');
            }

            \Log::info('Validating request');
            $request->validate([
                'id_document' => 'required|file|max:10240',
                'certificates' => 'nullable|array',
            ]);

            $freelancer = $user->freelancer;
            \Log::info('Freelancer validation passed', ['freelancer_id' => $freelancer->id]);

            // Upload ID
            $idPath = $request->file('id_document')->store('verification_documents', 'public');
            \Log::info('ID document stored at: ' . $idPath);

            // Upload Certificates
            $certPaths = [];
            if ($request->hasFile('certificates')) {
                foreach ($request->file('certificates') as $cert) {
                    $certPaths[] = $cert->store('verification_documents', 'public');
                }
            }

            \Log::info('Creating verification request in DB');
            VerificationRequest::updateOrCreate(
                ['freelancer_id' => $freelancer->id],
                [
                    'id_document_path' => $idPath,
                    'certificate_paths' => $certPaths,
                    'project_links' => [],
                    'status' => 'pending',
                    'admin_notes' => null
                ]
            );

            \Log::info('Request verification fully completed successfully');
            return response()->json(['success' => true, 'message' => 'Verification request submitted successfully']);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation error: ' . json_encode($e->errors()));
            return response()->json(['success' => false, 'message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Exception in requestVerification: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['success' => false, 'message' => 'Internal Server Error: ' . $e->getMessage()], 500);
        }
    }

    public function completeOnboarding(Request $request)
    {
        \Log::info('Triggered completeOnboarding (V2)');
        try {
            $user = Auth::user();
            $freelancer = $user->freelancer;
            \Log::info('User found in completeOnboarding', ['id' => $user->id]);

            if (!$freelancer) {
                \Log::info('Creating missing freelancer profile in completeOnboarding');
                $user->freelancer()->create([
                    'is_approved' => false,
                    'is_verified' => false,
                    'is_suspended' => false,
                    'is_onboarded' => true,
                    'skills' => [],
                    'education' => [],
                    'languages' => [],
                    'portfolio' => [],
                    'completed_projects_count' => 0,
                    'average_rating' => 0
                ]);
                $freelancer = $user->fresh()->freelancer;
            }

            // Update profile fields if provided
            \Log::info('Updating freelancer profile');
            $freelancer->update([
                'phone' => $request->input('phone'),
                'freelancer_level' => $request->input('freelancer_level', 'beginner'),
                'skills' => $request->input('skills', []), // Expecting array
                'education' => $request->input('education', []),
                'experience' => $request->input('experience', []),
                'is_onboarded' => true,
            ]);

            \Log::info('Onboarding fully completed');
            return response()->json(['success' => true, 'message' => 'Onboarding completed']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation error in completeOnboarding: ' . json_encode($e->errors()));
            return response()->json(['success' => false, 'message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Exception in completeOnboarding: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['success' => false, 'message' => 'Internal Server Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Submit an appeal after account suspension
     */
    public function submitAppeal(Request $request)
    {
        $request->validate(['appeal_message' => 'required|string|min:10']);

        $user = Auth::user();
        $freelancer = $user->freelancer;

        if (!$freelancer || !$freelancer->is_suspended) {
            return response()->json(['success' => false, 'message' => 'Your account is not suspended.'], 403);
        }

        if ($freelancer->appeal_status === 'pending') {
            return response()->json(['success' => false, 'message' => 'You already have a pending appeal.'], 409);
        }

        if ($freelancer->appeal_status === 'rejected') {
            return response()->json(['success' => false, 'message' => 'Your appeal was already rejected. Your account is permanently banned.'], 403);
        }

        $freelancer->update([
            'appeal_message' => $request->appeal_message,
            'appeal_status' => 'pending',
        ]);

        return response()->json(['success' => true, 'message' => 'Appeal submitted successfully.']);
    }
}