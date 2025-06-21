<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    // Send a message
    public function send(Request $request)
    {
        $message = Message::create([
            'userId' => $request->userId,
            'freelancerId' => $request->freelancerId,
            'content' => $request->content,
            'timestamp' => now(),
        ]);
        return response()->json($message, 201);
    }

    // Get conversation between client and freelancer
    public function conversation(Request $request)
    {
        $messages = Message::where(function ($query) use ($request) {
                $query->where('userId', $request->userId)
                      ->where('freelancerId', $request->freelancerId);
            })
            ->orWhere(function ($query) use ($request) {
                $query->where('userId', $request->freelancerId)
                      ->where('freelancerId', $request->userId);
            })
            ->orderBy('timestamp')
            ->get();

        return response()->json($messages);
    }
}