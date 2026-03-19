@extends('emails.layout')

@section('content')
    <div style="text-align: center;">
        <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 16px;">Verify your identity</h1>
        <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 32px;">
            Welcome to Swiftly! Click the button below to verify your email address and get started.
        </p>

        <!-- Magic Link Button -->
        <a href="{{ config('app.frontend_url') }}/verify-email?email={{ urlencode($email) }}&code={{ $otp }}" class="btn"
            style="background-color: #fbbf24; color: #000000 !important; padding: 16px 40px; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block;">
            Verify Account
        </a>
    </div>

    <div style="margin-top: 40px; border-top: 1px solid #27272a; padding-top: 30px; text-align: center;">
        <p style="font-size: 14px; color: #71717a; margin-bottom: 15px;">Or enter this code manually:</p>

        <div class="otp-container"
            style="background-color: #000000; border: 1px solid #27272a; border-radius: 12px; padding: 15px 30px; display: inline-block;">
            <span class="otp-code"
                style="color: #fbbf24; font-size: 32px; font-weight: 700; letter-spacing: 6px; font-family: monospace;">{{ $otp }}</span>
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #52525b; word-break: break-all;">
            Link not working? Paste this URL:<br>
            <a href="{{ config('app.frontend_url') }}/verify-email?email={{ urlencode($email) }}&code={{ $otp }}"
                style="color: #71717a; text-decoration: underline;">
                {{ config('app.frontend_url') }}/verify-email?email={{ urlencode($email) }}&code={{ $otp }}
            </a>
        </p>
    </div>
@endsection