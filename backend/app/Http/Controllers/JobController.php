<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with('user')->latest()->paginate(10);
        return response()->json($jobs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'job_type' => 'required|in:full-time,part-time,contract,freelance',
            'experience_level' => 'required|in:entry,intermediate,expert',
            'budget' => 'nullable|numeric|min:0',
            'skills_required' => 'required|array',
            'deadline' => 'nullable|date|after:today',
        ]);

        $job = $request->user()->jobs()->create($request->all());

        return response()->json($job, 201);
    }

    public function show(Job $job)
    {
        return response()->json($job->load(['user', 'applications.freelancer']));
    }

    public function update(Request $request, Job $job)
    {
        $this->authorize('update', $job);

        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'job_type' => 'in:full-time,part-time,contract,freelance',
            'experience_level' => 'in:entry,intermediate,expert',
            'budget' => 'nullable|numeric|min:0',
            'skills_required' => 'array',
            'status' => 'in:open,in_progress,completed,cancelled',
            'deadline' => 'nullable|date|after:today',
        ]);

        $job->update($request->all());

        return response()->json($job);
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);

        $job->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = Job::query()->with('user');

        if ($request->has('skills')) {
            $skills = $request->get('skills');
            $query->whereJsonContains('skills_required', $skills);
        }

        if ($request->has('job_type')) {
            $query->where('job_type', $request->get('job_type'));
        }

        if ($request->has('experience_level')) {
            $query->where('experience_level', $request->get('experience_level'));
        }

        if ($request->has('budget_min')) {
            $query->where('budget', '>=', $request->get('budget_min'));
        }

        if ($request->has('budget_max')) {
            $query->where('budget', '<=', $request->get('budget_max'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->get('status'));
        }

        return response()->json($query->latest()->paginate(10));
    }
} 