<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
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