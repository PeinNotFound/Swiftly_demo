<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Freelancer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use Carbon\Carbon;
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

        $otp = rand(100000, 999999);
        $otpExpiresAt = Carbon::now()->addMinutes(10);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'otp_code' => $otp,
            'otp_expires_at' => $otpExpiresAt,
            'is_email_verified' => false,
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

        // Send OTP Email
        try {
            Mail::to($user->email)->send(new OtpMail($otp, $user->email));
        } catch (\Exception $e) {
            \Log::error('Failed to send OTP email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Registration successful. Please check your email for verification code.',
            'data' => [
                'user' => $user,
                'requires_verification' => true
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Hard ban
        if (isset($user->is_active) && $user->is_active === 0) {
            throw ValidationException::withMessages([
                'email' => ['Your account has been permanently banned from the platform.'],
            ]);
        }

        // Block suspended freelancers but allow enough to lodge an appeal
        if ($user->role === 'freelancer' && $user->freelancer && $user->freelancer->is_suspended) {
            return response()->json([
                'success' => false,
                'is_suspended' => true,
                'suspension_reason' => $user->freelancer->suspension_reason,
                'appeal_status' => $user->freelancer->appeal_status,
                'token' => $user->createToken('auth_token')->plainTextToken,
                'message' => 'Your account has been suspended.'
            ], 403);
        }

        // Check Email Verification
        if (!$user->is_email_verified) {
            // Generate and resend OTP
            $otp = rand(100000, 999999);
            $user->otp_code = $otp;
            $user->otp_expires_at = Carbon::now()->addMinutes(10);
            $user->save();

            try {
                Mail::to($user->email)->send(new OtpMail($otp, $user->email));
            } catch (\Exception $e) {
                \Log::error('Failed to send OTP email: ' . $e->getMessage());
            }

            return response()->json([
                'success' => false,
                'message' => 'Email not verified. A new verification code has been sent.',
                'error_code' => 'EMAIL_NOT_VERIFIED',
                'data' => [
                    'email' => $user->email,
                    'requires_verification' => true
                ]
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Format user data
        $userData = $user->toArray();
        if ($user->profile_picture) {
            $userData['profile_picture'] = asset('storage/profile_pictures/' . $user->profile_picture);
        }

        if ($user->role === 'freelancer') {
            $user->load('freelancer');
            $userData['freelancer'] = $user->freelancer;
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

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found.'], 404);
        }

        if ($user->is_email_verified) {
            return response()->json(['success' => true, 'message' => 'Email already verified.']);
        }

        if ($user->otp_code !== $request->otp) {
            return response()->json(['success' => false, 'message' => 'Invalid verification code.'], 400);
        }

        if (Carbon::now()->isAfter($user->otp_expires_at)) {
            return response()->json(['success' => false, 'message' => 'Verification code expired.'], 400);
        }

        // OTP is valid
        $user->is_email_verified = true;
        $user->otp_code = null;
        $user->otp_expires_at = null;
        $user->email_verified_at = now();
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        // Format user data
        $userData = $user->toArray();
        if ($user->profile_picture) {
            $userData['profile_picture'] = asset('storage/profile_pictures/' . $user->profile_picture);
        }

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully.',
            'data' => [
                'user' => $userData,
                'token' => $token
            ]
        ]);
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found.'], 404);
        }

        if ($user->is_email_verified) {
            return response()->json(['success' => false, 'message' => 'Email already verified.'], 400);
        }

        $otp = rand(100000, 999999);
        $user->otp_code = $otp;
        $user->otp_expires_at = Carbon::now()->addMinutes(10);
        $user->save();

        try {
            Mail::to($user->email)->send(new OtpMail($otp, $user->email));
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to send OTP.'], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Verification code sent successfully.'
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

        // Format user data
        // Format user data
        if ($user->profile_picture) {
            $userData['profile_picture'] = asset('storage/profile_pictures/' . $user->profile_picture);
        }

        if ($user->role === 'freelancer') {
            $user->load('freelancer');
            $userData['freelancer'] = $user->freelancer;
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $userData
            ]
        ]);
    }
}
