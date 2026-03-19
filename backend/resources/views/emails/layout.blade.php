<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }}</title>
    <style>
        /* Modern Reset */
        body {
            margin: 0;
            padding: 0;
            background-color: #09090b;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #e4e4e7;
            -webkit-font-smoothing: antialiased;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #09090b;
            padding: 40px 0;
        }

        /* Glass-like darker card */
        .content {
            max-width: 500px;
            margin: 0 auto;
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .header {
            padding: 40px 0 30px;
            text-align: center;
            border-bottom: 1px solid #27272a;
        }

        /* Modern Button */
        .btn {
            display: inline-block;
            padding: 16px 40px;
            background-color: #fbbf24;
            color: #000000 !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            margin-top: 30px;
            letter-spacing: 0.5px;
            transition: transform 0.2s;
        }

        .btn:hover {
            background-color: #f59e0b;
        }

        h1 {
            margin: 0 0 16px;
            font-size: 26px;
            color: #ffffff;
            font-weight: 800;
            letter-spacing: -0.5px;
        }

        p {
            margin: 0 0 24px;
            color: #a1a1aa;
            line-height: 1.7;
            font-size: 16px;
        }

        a {
            color: #fbbf24;
            text-decoration: none;
            font-weight: 500;
        }

        a:hover {
            text-decoration: underline;
        }

        .footer {
            padding-top: 30px;
            text-align: center;
            font-size: 13px;
            color: #52525b;
        }

        .footer a {
            color: #71717a !important;
            text-decoration: none;
        }

        .otp-container {
            background-color: #000000;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            border: 1px solid #27272a;
            display: inline-block;
            margin: 20px 0;
        }

        .otp-code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 32px;
            font-weight: 700;
            color: #fbbf24;
            letter-spacing: 6px;
        }
    </style>
</head>

<body>
    <div class="wrapper" style="background-color: #09090b;">
        <div class="content" style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px;">
            <!-- Header with Logo -->
            <div class="header" style="border-bottom: 1px solid #27272a;">
                <img src="{{ asset('images/logo.png') }}" alt="Swiftly" width="50" height="50"
                    style="display: block; margin: 0 auto; border: 0; border-radius: 12px;">
                <div
                    style="margin-top: 15px; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                    Swiftly<span style="color: #fbbf24;">.</span></div>
            </div>

            <!-- Body -->
            <div style="padding: 40px;">
                @yield('content')
            </div>
        </div>

        <!-- Footer -->
        <div class="footer" style="padding-top: 30px; text-align: center; font-size: 13px; color: #52525b;">
            &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.<br>
            <span style="opacity: 0.6;">Automated message, please do not reply.</span>
        </div>
    </div>
</body>

</html>