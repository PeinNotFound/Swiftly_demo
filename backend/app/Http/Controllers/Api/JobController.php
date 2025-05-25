<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with('client:id,name,email,company')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company,
                    'location' => $job->location,
                    'type' => $job->type,
                    'salary' => $job->salary,
                    'description' => $job->description,
                    'skills' => $job->skills,
                    'jobType' => $job->jobType,
                    'experienceLevel' => $job->experienceLevel,
                    'projectSize' => $job->projectSize,
                    'estimatedDuration' => $job->estimatedDuration,
                    'additionalDetails' => $job->additionalDetails,
                    'status' => $job->status,
                    'created_at' => $job->created_at,
                    'client' => [
                        'id' => $job->client->id,
                        'name' => $job->client->name,
                        'email' => $job->client->email,
                        'company' => $job->client->company
                    ]
                ];
            });

        return response()->json(['jobs' => $jobs]);
    }

    public function show($id)
    {
        $job = Job::with('client:id,name,email,company')
            ->findOrFail($id);

        return response()->json(['job' => [
            'id' => $job->id,
            'title' => $job->title,
            'company' => $job->company,
            'location' => $job->location,
            'type' => $job->type,
            'salary' => $job->salary,
            'description' => $job->description,
            'skills' => $job->skills,
            'jobType' => $job->jobType,
            'experienceLevel' => $job->experienceLevel,
            'projectSize' => $job->projectSize,
            'estimatedDuration' => $job->estimatedDuration,
            'additionalDetails' => $job->additionalDetails,
            'status' => $job->status,
            'created_at' => $job->created_at,
            'client' => [
                'id' => $job->client->id,
                'name' => $job->client->name,
                'email' => $job->client->email,
                'company' => $job->client->company
            ]
        ]]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Full-time,Part-time,Contract,Freelance',
            'salary' => 'required|string|max:255',
            'description' => 'required|string',
            'skills' => 'required|array',
            'jobType' => 'required|string|in:Fixed Price,Hourly',
            'experienceLevel' => 'required|string|in:Entry Level,Intermediate,Expert',
            'projectSize' => 'required|string|in:Small,Medium,Large',
            'estimatedDuration' => 'required|string|max:255',
            'additionalDetails' => 'required|string'
        ]);

        $job = new Job($request->all());
        $job->client_id = Auth::id();
        $job->save();

        return response()->json([
            'message' => 'Job created successfully',
            'job' => $job
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        if ($job->client_id !== Auth::id()) {
            return response()->json(['message' => 'Not authorized to update this job'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'company' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|in:Full-time,Part-time,Contract,Freelance',
            'salary' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'skills' => 'sometimes|required|array',
            'jobType' => 'sometimes|required|string|in:Fixed Price,Hourly',
            'experienceLevel' => 'sometimes|required|string|in:Entry Level,Intermediate,Expert',
            'projectSize' => 'sometimes|required|string|in:Small,Medium,Large',
            'estimatedDuration' => 'sometimes|required|string|max:255',
            'additionalDetails' => 'sometimes|required|string'
        ]);

        $job->update($request->all());
        return response()->json([
            'message' => 'Job updated successfully',
            'job' => $job
        ]);
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);

        if ($job->client_id !== Auth::id()) {
            return response()->json(['message' => 'Not authorized to delete this job'], 403);
        }

        $job->delete();
        return response()->json([
            'message' => 'Job deleted successfully'
        ]);
    }
} 