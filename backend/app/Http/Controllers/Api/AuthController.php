<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Freelancer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:freelancer,client',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Create freelancer record if role is freelancer
        if ($request->role === 'freelancer') {
            $freelancer = Freelancer::create([
                'user_id' => $user->id,
                'is_approved' => false,
                'is_verified' => false,
                'is_suspended' => false,
                'skills' => [],
                'hourly_rate' => null,
                'availability' => 'available',
                'education' => [],
                'languages' => [],
                'completed_projects_count' => 0,
                'average_rating' => 0,
                'portfolio' => []
            ]);
            \Log::info('Freelancer created for user', ['user_id' => $user->id, 'freelancer_id' => $freelancer->id]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Format user data with profile picture URL
        $userData = $user->toArray();
        if ($user->profile_picture) {
            $userData['profile_picture'] = asset('storage/profile_pictures/' . $user->profile_picture);
        }

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => [
                'user' => $userData,
                'token' => $token
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Block suspended freelancers from logging in
        if ($user->role === 'freelancer' && $user->freelancer && $user->freelancer->is_suspended) {
            // Log out the user if they were logged in
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => ['Your account has been suspended. Please contact support for more information.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Format user data with profile picture URL
        $userData = $user->toArray();
        if ($user->profile_picture) {
            $userData['profile_picture'] = asset('storage/profile_pictures/' . $user->profile_picture);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $userData,
                'token' => $token
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $userData = $user->toArray();
        
        // Format user data with profile picture URL
        if ($user->profile_picture) {
            $userData['profile_picture'] = asset('storage/profile_pictures/' . $user->profile_picture);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $userData
            ]
        ]);
    }
} 