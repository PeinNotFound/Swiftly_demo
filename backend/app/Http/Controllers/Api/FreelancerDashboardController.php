<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Transaction;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // Active projects (in_progress jobs assigned to this freelancer)
        $activeJobs = Job::where('freelancer_id', $user->id)
            ->whereIn('status', ['in_progress', 'open'])
            ->with('client:id,name,company')
            ->orderBy('due_date')
            ->get()
            ->map(function ($job) {
                return [
                    'id'       => $job->id,
                    'title'    => $job->title,
                    'client'   => $job->client?->company ?? $job->client?->name ?? 'N/A',
                    'status'   => ucfirst(str_replace('_', ' ', $job->status)),
                    'progress' => $job->progress,
                    'due_date' => $job->due_date?->format('Y-m-d'),
                ];
            });

        // Completed projects count
        $completedCount = Job::where('freelancer_id', $user->id)
            ->where('status', 'completed')
            ->count();

        // Total active count (in_progress)
        $activeCount = Job::where('freelancer_id', $user->id)
            ->where('status', 'in_progress')
            ->count();

        // Total earnings sum from completed transactions
        $totalEarnings = Transaction::where('freelancer_id', $user->id)
            ->where('status', 'completed')
            ->where('type', 'payment')
            ->sum('amount');

        // Average rating
        $averageRating = Review::where('freelancer_id', $user->id)->avg('rating');

        // Completion rate (completed / (completed + active)) * 100
        $totalJobs = $completedCount + $activeCount;
        $completionRate = $totalJobs > 0 ? round(($completedCount / $totalJobs) * 100) : 0;

        // Recent activity (last 10 transactions + completed jobs combined)
        $recentTransactions = Transaction::where('freelancer_id', $user->id)
            ->with('job:id,title', 'client:id,name,company')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($tx) {
                return [
                    'type'    => 'payment',
                    'action'  => 'Payment Received',
                    'project' => $tx->job?->title ?? $tx->description ?? 'Direct Payment',
                    'amount'  => '$' . number_format($tx->amount, 2),
                    'time'    => $tx->created_at->diffForHumans(),
                ];
            });

        $recentCompleted = Job::where('freelancer_id', $user->id)
            ->where('status', 'completed')
            ->latest('updated_at')
            ->take(5)
            ->get()
            ->map(function ($job) {
                return [
                    'type'    => 'completion',
                    'action'  => 'Project Completed',
                    'project' => $job->title,
                    'amount'  => null,
                    'time'    => $job->updated_at->diffForHumans(),
                ];
            });

        // Merge and sort by recency (we'll return both and let frontend handle)
        $recentActivity = $recentTransactions->concat($recentCompleted)
            ->sortByDesc('time')
            ->values()
            ->take(8);

        // Freelancer profile skills
        $skills = $user->freelancer?->skills ?? [];

        return response()->json([
            'stats' => [
                'active_projects'   => $activeCount,
                'completed_projects'=> $completedCount,
                'total_earnings'    => (float) $totalEarnings,
                'average_rating'    => round((float) $averageRating, 1),
                'completion_rate'   => $completionRate,
            ],
            'active_jobs'      => $activeJobs,
            'recent_activity'  => $recentActivity,
            'skills'           => $skills,
        ]);
    }
}
