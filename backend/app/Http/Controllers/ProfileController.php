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
}
