<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FreelancerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // User routes
    Route::apiResource('users', UserController::class);
    
    // Freelancer routes
    Route::apiResource('freelancers', FreelancerController::class);
    Route::get('/freelancers/search', [FreelancerController::class, 'search']);
    
    // Job routes
    Route::apiResource('jobs', JobController::class);
    Route::get('/jobs/search', [JobController::class, 'search']);
    
    // Application routes
    Route::apiResource('applications', ApplicationController::class);
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'apply']);
    Route::put('/applications/{application}/status', [ApplicationController::class, 'updateStatus']);
});
