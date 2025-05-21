<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isFreelancer()) {
            $applications = Application::where('freelancer_id', $user->freelancer->id)
                ->with(['job.user'])
                ->latest()
                ->paginate(10);
        } else {
            $applications = Application::whereHas('job', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with(['freelancer.user', 'job'])
            ->latest()
            ->paginate(10);
        }

        return response()->json($applications);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'cover_letter' => 'required|string',
            'proposed_rate' => 'required|numeric|min:0',
            'estimated_hours' => 'required|integer|min:1',
        ]);

        $user = $request->user();
        if (!$user->isFreelancer()) {
            return response()->json(['message' => 'Only freelancers can apply for jobs'], 403);
        }

        $job = Job::findOrFail($request->job_id);
        if ($job->status !== 'open') {
            return response()->json(['message' => 'This job is not accepting applications'], 400);
        }

        $existingApplication = Application::where('job_id', $job->id)
            ->where('freelancer_id', $user->freelancer->id)
            ->exists();

        if ($existingApplication) {
            return response()->json(['message' => 'You have already applied for this job'], 400);
        }

        $application = Application::create([
            'job_id' => $job->id,
            'freelancer_id' => $user->freelancer->id,
            'cover_letter' => $request->cover_letter,
            'proposed_rate' => $request->proposed_rate,
            'estimated_hours' => $request->estimated_hours,
        ]);

        return response()->json($application->load(['job', 'freelancer']), 201);
    }

    public function show(Application $application)
    {
        $this->authorize('view', $application);
        return response()->json($application->load(['job', 'freelancer.user']));
    }

    public function update(Request $request, Application $application)
    {
        $this->authorize('update', $application);

        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $application->update([
            'status' => $request->status,
        ]);

        if ($request->status === 'accepted') {
            $application->job->update(['status' => 'in_progress']);
        }

        return response()->json($application);
    }

    public function destroy(Application $application)
    {
        $this->authorize('delete', $application);

        if ($application->status !== 'pending') {
            return response()->json(['message' => 'Cannot withdraw a processed application'], 400);
        }

        $application->delete();

        return response()->json(null, 204);
    }
} 