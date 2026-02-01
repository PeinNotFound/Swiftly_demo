<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000000;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #ffffff;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #000000;
            padding-bottom: 40px;
        }

        .content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #111111;
            border: 1px solid #333333;
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            background-color: #111111;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #333333;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #fbbf24;
            text-decoration: none;
            letter-spacing: 1px;
        }

        .body {
            padding: 40px 30px;
            text-align: center;
        }

        .footer {
            background-color: #000000;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #fbbf24;
            color: #000000;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }

        h1 {
            margin: 0 0 20px;
            font-size: 24px;
            color: #ffffff;
        }

        p {
            margin: 0 0 20px;
            color: #cccccc;
            line-height: 1.6;
        }

        .otp-box {
            background-color: #222222;
            border: 1px dashed #444444;
            padding: 20px;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #fbbf24;
            display: inline-block;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="content">
            <!-- Header -->
            <div class="header">
                <a href="{{ config('app.url') }}" class="logo">
                    Swiftly.
                </a>
            </div>

            <!-- Body -->
            <div class="body">
                @yield('content')
            </div>

            <!-- Footer -->
            <div class="footer">
                &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.<br>
                If you didn't request this email, you can safely ignore it.
            </div>
        </div>
    </div>
</body>

</html>