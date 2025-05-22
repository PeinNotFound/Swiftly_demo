<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HandleApiResponses
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($response instanceof JsonResponse) {
            $data = $response->getData(true);
            
            // If the response is already in our format, return it as is
            if (isset($data['success']) || isset($data['error'])) {
                return $response;
            }

            // Transform the response into our standard format
            $transformedData = [
                'success' => $response->getStatusCode() < 400,
                'data' => $data,
                'message' => $response->getStatusCode() < 400 ? 'Operation successful' : 'Operation failed'
            ];

            return response()->json($transformedData, $response->getStatusCode());
        }

        return $response;
    }
} 