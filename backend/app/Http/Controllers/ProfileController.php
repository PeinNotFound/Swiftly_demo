<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            Log::info('Profile update request data:', $request->all());

            // Base validation rules
            $rules = [
                'name' => ['sometimes', 'string', 'max:255'],
                'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
                'current_password' => ['required_with:new_password', 'current_password'],
                'new_password' => ['nullable', 'min:8', 'confirmed'],
                'bio' => ['nullable', 'string', 'max:1000'],
                'skills' => ['nullable', 'string', 'max:255'],
                'hourly_rate' => ['nullable', 'numeric', 'min:0'],
                'availability' => ['nullable', 'string', Rule::in(['available', 'busy', 'unavailable'])],
                'profile_picture' => ['nullable', 'image', 'max:5120'], // 5MB max
            ];

            // Only validate fields that are present in the request
            $validated = $request->validate($rules);
            Log::info('Validated data:', $validated);

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                try {
                    // Delete old profile picture if exists
                    if ($user->profile_picture) {
                        Storage::delete('public/profile_pictures/' . $user->profile_picture);
                    }

                    // Store new profile picture
                    $fileName = time() . '_' . $request->file('profile_picture')->getClientOriginalName();
                    $request->file('profile_picture')->storeAs('public/profile_pictures', $fileName);
                    $validated['profile_picture'] = $fileName;
                } catch (\Exception $e) {
                    Log::error('Profile picture upload failed:', ['error' => $e->getMessage()]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to upload profile picture'
                    ], 500);
                }
            }

            // Update password if provided
            if (isset($validated['new_password'])) {
                $validated['password'] = Hash::make($validated['new_password']);
                unset($validated['new_password']);
                unset($validated['current_password']);
            }

            // Remove validation fields that shouldn't be stored
            unset($validated['current_password']);
            unset($validated['new_password_confirmation']);

            Log::info('Data to update:', $validated);

            // Update user with only the fields that were provided
            foreach ($validated as $key => $value) {
                $user->$key = $value;
            }
            
            $updated = $user->save();

            if (!$updated) {
                Log::error('User update failed');
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update profile'
                ], 500);
            }

            // Get fresh user data with all relationships
            $updatedUser = User::find($user->id);
            
            // Add profile picture URL to the response
            $userData = $updatedUser->toArray();
            if ($updatedUser->profile_picture) {
                $userData['profile_picture'] = asset('storage/profile_pictures/' . $updatedUser->profile_picture);
            } else {
                $userData['profile_picture'] = null;
            }

            Log::info('Profile updated successfully:', [
                'user_id' => $user->id,
                'user_data' => $userData,
                'original_request' => $request->all()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => $userData
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed:', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Profile update failed:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the profile'
            ], 500);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Get freelancer profile information.
     */
    public function getFreelancerProfile(Request $request)
    {
        try {
            $user = auth()->user();
            
            // Ensure user is a freelancer
            if ($user->role !== 'freelancer') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Only freelancers can access this endpoint.'
                ], 403);
            }

            // Get fresh user data with all relationships
            $freelancer = User::find($user->id);
            
            // Add profile picture URL to the response
            $freelancerData = $freelancer->toArray();
            if ($freelancer->profile_picture) {
                $freelancerData['profile_picture'] = asset('storage/profile_pictures/' . $freelancer->profile_picture);
            } else {
                $freelancerData['profile_picture'] = null;
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'freelancer' => $freelancerData
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get freelancer profile:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching the profile'
            ], 500);
        }
    }

    /**
     * Update freelancer profile information.
     */
    public function updateFreelancerProfile(Request $request)
    {
        try {
            $user = auth()->user();
            // Ensure user is a freelancer
            if ($user->role !== 'freelancer') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Only freelancers can access this endpoint.'
                ], 403);
            }

            Log::info('Freelancer profile update request data:', $request->all());

            // Validation rules
            $rules = [
                'name' => ['sometimes', 'string', 'max:255'],
                'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
                'current_password' => ['required_with:new_password', 'current_password'],
                'new_password' => ['nullable', 'min:8', 'confirmed'],
                'bio' => ['nullable', 'string', 'max:1000'],
                'profile_picture' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif', 'max:5120'],
                'title' => ['nullable', 'string', 'max:255'],
                'location' => ['nullable', 'string', 'max:255'],
                // Freelancer fields
                'skills' => ['nullable', 'array'],
                'skills.*' => ['string', 'max:255'],
                'hourly_rate' => ['nullable', 'numeric', 'min:0'],
                'availability' => ['nullable', 'string', Rule::in(['available', 'busy', 'unavailable'])],
            ];

            $validated = $request->validate($rules);

            // Split fields for User and Freelancer
            $userFields = ['name', 'email', 'bio', 'profile_picture', 'title', 'location', 'new_password', 'current_password'];
            $freelancerFields = ['skills', 'hourly_rate', 'availability'];

            $userData = [];
            $freelancerData = [];

            foreach ($validated as $key => $value) {
                if (in_array($key, $userFields)) {
                    $userData[$key] = $value;
                }
                if (in_array($key, $freelancerFields)) {
                    $freelancerData[$key] = $value;
                }
            }

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                try {
                    if ($user->profile_picture) {
                        Storage::delete('public/profile_pictures/' . $user->profile_picture);
                    }
                    $file = $request->file('profile_picture');
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file->storeAs('public/profile_pictures', $fileName);
                    $userData['profile_picture'] = $fileName;
                } catch (\Exception $e) {
                    Log::error('Profile picture upload failed:', [
                        'error' => $e->getMessage(),
                        'file_info' => $request->file('profile_picture') ? [
                            'name' => $request->file('profile_picture')->getClientOriginalName(),
                            'mime' => $request->file('profile_picture')->getMimeType(),
                            'size' => $request->file('profile_picture')->getSize()
                        ] : 'No file'
                    ]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to upload profile picture: ' . $e->getMessage()
                    ], 500);
                }
            }

            // Update password if provided
            if (isset($userData['new_password'])) {
                $userData['password'] = Hash::make($userData['new_password']);
                unset($userData['new_password']);
                unset($userData['current_password']);
            }
            unset($userData['current_password']);
            unset($userData['new_password_confirmation']);

            Log::info('User data to update:', $userData);
            Log::info('Freelancer data to update:', $freelancerData);

            // Update User fields
            foreach ($userData as $key => $value) {
                $user->$key = $value;
            }
            $user->save();

            // Update Freelancer fields
            $freelancer = $user->freelancer;
            if ($freelancer) {
                foreach ($freelancerData as $key => $value) {
                    $freelancer->$key = $value;
                }
                $freelancer->save();
            }

            // Get fresh user data with all relationships
            $updatedFreelancer = User::with('freelancer')->find($user->id);
            $freelancerDataArr = $updatedFreelancer->toArray();
            if ($updatedFreelancer->profile_picture) {
                $freelancerDataArr['profile_picture'] = asset('storage/profile_pictures/' . $updatedFreelancer->profile_picture);
            } else {
                $freelancerDataArr['profile_picture'] = null;
            }

            Log::info('Freelancer profile updated successfully:', [
                'user_id' => $user->id,
                'freelancer_data' => $freelancerDataArr,
                'updated_fields' => array_keys($validated)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'freelancer' => $freelancerDataArr
                ]
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed:', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Freelancer profile update failed:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the profile'
            ], 500);
        }
    }

    /**
     * Update client profile information.
     */
    public function updateClientProfile(Request $request)
    {
        try {
            $user = auth()->user();
            // Ensure user is a client
            if ($user->role !== 'client') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Only clients can access this endpoint.'
                ], 403);
            }

            Log::info('Client profile update request data:', $request->all());

            // Base validation rules for clients
            $rules = [
                'name' => ['sometimes', 'string', 'max:255'],
                'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
                'current_password' => ['required_with:new_password', 'current_password'],
                'new_password' => ['nullable', 'min:8', 'confirmed'],
                'bio' => ['nullable', 'string', 'max:1000'],
                'profile_picture' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif', 'max:5120'],
            ];

            $validated = $request->validate($rules);

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                try {
                    if ($user->profile_picture) {
                        Storage::delete('public/profile_pictures/' . $user->profile_picture);
                    }
                    $file = $request->file('profile_picture');
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file->storeAs('public/profile_pictures', $fileName);
                    $validated['profile_picture'] = $fileName;
                } catch (\Exception $e) {
                    Log::error('Profile picture upload failed:', ['error' => $e->getMessage()]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to upload profile picture: ' . $e->getMessage()
                    ], 500);
                }
            }

            // Update password if provided
            if (isset($validated['new_password'])) {
                $validated['password'] = Hash::make($validated['new_password']);
                unset($validated['new_password']);
                unset($validated['current_password']);
            }

            unset($validated['current_password']);
            unset($validated['new_password_confirmation']);

            Log::info('Data to update:', $validated);

            foreach ($validated as $key => $value) {
                $user->$key = $value;
            }
            $updated = $user->save();

            if (!$updated) {
                Log::error('Client update failed');
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update profile'
                ], 500);
            }

            $updatedUser = User::find($user->id);
            $userData = $updatedUser->toArray();
            if ($updatedUser->profile_picture) {
                $userData['profile_picture'] = asset('storage/profile_pictures/' . $updatedUser->profile_picture);
            } else {
                $userData['profile_picture'] = null;
            }

            Log::info('Client profile updated successfully:', [
                'user_id' => $user->id,
                'user_data' => $userData,
                'original_request' => $request->all()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => $userData
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed:', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Client profile update failed:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the profile'
            ], 500);
        }
    }
}
