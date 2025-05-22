<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/freelancers', [AdminController::class, 'getFreelancers']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/profile', [ProfileController::class, 'update']);

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
        // Add freelancer specific routes here
    });

    // Client routes
    Route::middleware('role:client')->group(function () {
        // Add client specific routes here
    });
});
