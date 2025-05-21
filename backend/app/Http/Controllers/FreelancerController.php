<?php

namespace App\Http\Controllers;

use App\Models\Freelancer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FreelancerController extends Controller
{
    public function index()
    {
        $freelancers = Freelancer::with('user')->paginate(10);
        return response()->json($freelancers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'hourly_rate' => 'required|numeric|min:0',
            'skills' => 'required|array',
            'portfolio' => 'nullable|array',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $data = $request->except('resume');

        if ($request->hasFile('resume')) {
            $path = $request->file('resume')->store('resumes', 'public');
            $data['resume'] = $path;
        }

        $freelancer = $request->user()->freelancer()->create($data);

        return response()->json($freelancer, 201);
    }

    public function show(Freelancer $freelancer)
    {
        return response()->json($freelancer->load('user'));
    }

    public function update(Request $request, Freelancer $freelancer)
    {
        $this->authorize('update', $freelancer);

        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'hourly_rate' => 'numeric|min:0',
            'skills' => 'array',
            'portfolio' => 'array',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'is_available' => 'boolean',
        ]);

        $data = $request->except('resume');

        if ($request->hasFile('resume')) {
            if ($freelancer->resume) {
                Storage::disk('public')->delete($freelancer->resume);
            }
            $path = $request->file('resume')->store('resumes', 'public');
            $data['resume'] = $path;
        }

        $freelancer->update($data);

        return response()->json($freelancer);
    }

    public function destroy(Freelancer $freelancer)
    {
        $this->authorize('delete', $freelancer);

        if ($freelancer->resume) {
            Storage::disk('public')->delete($freelancer->resume);
        }

        $freelancer->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = Freelancer::query()->with('user');

        if ($request->has('skills')) {
            $skills = $request->get('skills');
            $query->whereJsonContains('skills', $skills);
        }

        if ($request->has('hourly_rate_min')) {
            $query->where('hourly_rate', '>=', $request->get('hourly_rate_min'));
        }

        if ($request->has('hourly_rate_max')) {
            $query->where('hourly_rate', '<=', $request->get('hourly_rate_max'));
        }

        if ($request->has('available')) {
            $query->where('is_available', $request->boolean('available'));
        }

        return response()->json($query->paginate(10));
    }
} 