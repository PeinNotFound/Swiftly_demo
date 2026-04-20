<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\FreelancerDashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\FreelancerController;
use App\Models\Message;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
Route::get('/freelancers', [FreelancerController::class, 'index']);

// Public job routes
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/profile', [ProfileController::class, 'update']);

    // Protected job routes
    Route::post('/jobs', [JobController::class, 'store']);
    Route::patch('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // User Management
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::put('/users/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::get('/stats', [AdminController::class, 'getStats']);

        // Job Management
        Route::get('/jobs', [AdminController::class, 'getJobs']);
        Route::delete('/jobs/{id}', [AdminController::class, 'deleteJob']);
        Route::patch('/jobs/{id}/status', [AdminController::class, 'updateJobStatus']);

        // Freelancer Management
        Route::get('/freelancers', [AdminController::class, 'getFreelancers']);
        Route::put('/freelancers/{id}/verify', [AdminController::class, 'verifyFreelancer']);
        Route::put('/freelancers/{id}/suspend', [AdminController::class, 'suspendFreelancer']);
        Route::get('/freelancers/stats', [AdminController::class, 'getFreelancerStats']);

        // Verification Requests
        Route::get('/verification-requests', [AdminController::class, 'getVerificationRequests']);
        Route::post('/verification-requests/{id}/approve', [AdminController::class, 'approveVerification']);
        Route::post('/verification-requests/{id}/reject', [AdminController::class, 'rejectVerification']);

        // Appeals
        Route::post('/freelancers/{id}/reject-appeal', [AdminController::class, 'rejectAppeal']);
    });

    // Freelancer routes
    Route::middleware('role:freelancer')->group(function () {
        Route::get('/freelancers/profile', [ProfileController::class, 'getFreelancerProfile']);
        Route::put('/freelancers/profile', [ProfileController::class, 'updateFreelancerProfile']);

        // Dashboard
        Route::get('/freelancer/dashboard', [FreelancerDashboardController::class, 'index']);

        // Verification & Resume
        Route::post('/freelancers/resume/parse', [FreelancerController::class, 'parseResume']);
        Route::post('/freelancers/verification/request', [FreelancerController::class, 'requestVerification']);
        Route::post('/freelancers/onboarding/complete', [FreelancerController::class, 'completeOnboarding']);
        Route::post('/freelancers/appeal', [FreelancerController::class, 'submitAppeal']);
    });

    // Client routes
    Route::middleware('role:client')->group(function () {
        Route::put('/clients/profile', [ProfileController::class, 'updateClientProfile']);
    });
});

// Freelancer Management Routes (Admin only)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/freelancers/{id}/approve', [FreelancerController::class, 'approve']);
    Route::post('/freelancers/{id}/reject', [FreelancerController::class, 'reject']);
    Route::post('/freelancers/{id}/verify', [FreelancerController::class, 'verify']);
    Route::post('/freelancers/{id}/suspend', [FreelancerController::class, 'suspend']);
    Route::post('/freelancers/{id}/unsuspend', [FreelancerController::class, 'unsuspend']);
});

Route::get('/mongo-test', function () {
    try {
        $msg = Message::create([
            'userId' => 'testUser',
            'freelancerId' => 'testFreelancer',
            'content' => 'Testing MongoDB connection!',
            'timestamp' => now(),
        ]);
        return response()->json(['success' => true, 'message' => $msg]);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'error' => $e->getMessage()]);
    }
});
