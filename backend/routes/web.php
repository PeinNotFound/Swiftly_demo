<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('role:admin')->get('/admin', function () {
        return 'Welcome Admin';
    });

    Route::middleware('role:freelancer')->get('/freelancer', function () {
        return 'Welcome Freelancer';
    });

    Route::middleware('role:client')->get('/client', function () {
        return 'Welcome Client';
    });

    Route::get('/dashboard', function () {
        return redirect()->intended(auth()->user()->role);
    });
});

require __DIR__.'/auth.php';
