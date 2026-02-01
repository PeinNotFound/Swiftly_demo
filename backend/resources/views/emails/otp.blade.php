@extends('emails.layout')

@section('content')
    <h1>Verify Your Account</h1>
    <p>Welcome to Swiftly! Please confirm that you want to use this email address for your account.</p>

    <!-- Magic Link Button -->
    <a href="{{ config('app.frontend_url') }}/verify-email?email={{ urlencode($email) }}&code={{ $otp }}" class="btn">
        Verify my email
    </a>

    <p style="margin-top: 30px;">Or enter this code manually:</p>

    <div class="otp-box">
        {{ $otp }}
    </div>

    <p style="font-size: 12px; color: #666; margin-top: 20px;">
        Or paste this link into your browser:<br>
        <a href="{{ config('app.frontend_url') }}/verify-email?email={{ urlencode($email) }}&code={{ $otp }}"
            style="color: #fbbf24;">
            {{ config('app.frontend_url') }}/verify-email?email={{ urlencode($email) }}&code={{ $otp }}
        </a>
    </p>

    <p>This link/code will expire in 10 minutes.</p>
@endsection