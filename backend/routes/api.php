<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\FreelancerController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/freelancers', [AdminController::class, 'getFreelancers']);

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

        // Freelancer Management
        Route::put('/freelancers/{id}/verify', [AdminController::class, 'verifyFreelancer']);
        Route::put('/freelancers/{id}/suspend', [AdminController::class, 'suspendFreelancer']);
        Route::get('/freelancers/stats', [AdminController::class, 'getFreelancerStats']);
    });

    // Freelancer routes
    Route::middleware('role:freelancer')->group(function () {
        Route::get('/freelancers/profile', [ProfileController::class, 'getFreelancerProfile']);
        Route::put('/freelancers/profile', [ProfileController::class, 'updateFreelancerProfile']);
    });

    // Client routes
    Route::middleware('role:client')->group(function () {
        // Add client specific routes here
    });
});

// Freelancer Management Routes (Admin only)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/freelancers', [FreelancerController::class, 'index']);
    Route::post('/freelancers/{id}/approve', [FreelancerController::class, 'approve']);
    Route::post('/freelancers/{id}/reject', [FreelancerController::class, 'reject']);
    Route::post('/freelancers/{id}/verify', [FreelancerController::class, 'verify']);
    Route::post('/freelancers/{id}/suspend', [FreelancerController::class, 'suspend']);
});
