<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $client = User::where('role', 'client')->first();
        $freelancer = User::where('email', 'freelancer@example.com')->first();

        if (!$client) {
            $client = User::create([
                'name'    => 'Sample Client',
                'email'   => 'client@example.com',
                'password'=> bcrypt('password'),
                'role'    => 'client',
                'company' => 'Tech Solutions Inc.'
            ]);
        }

        // --- OPEN JOBS (available marketplace) ---
        $openJobs = [
            [
                'title'            => 'Senior Full Stack Developer',
                'company'          => 'Tech Solutions Inc.',
                'location'         => 'Remote',
                'type'             => 'Full-time',
                'salary'           => '$80k - $120k',
                'description'      => 'We are looking for an experienced Full Stack Developer to join our team.',
                'skills'           => ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
                'jobType'          => 'Fixed Price',
                'experienceLevel'  => 'Expert',
                'projectSize'      => 'Large',
                'estimatedDuration'=> '6-12 months',
                'additionalDetails'=> 'Long-term position with opportunities for growth.',
                'client_id'        => $client->id,
                'status'           => 'open',
                'progress'         => 0,
            ],
            [
                'title'            => 'UI/UX Designer',
                'company'          => 'Creative Designs Co.',
                'location'         => 'New York, NY',
                'type'             => 'Contract',
                'salary'           => '$50/hr',
                'description'      => 'Looking for a talented UI/UX Designer to create beautiful user interfaces.',
                'skills'           => ['Figma', 'Adobe XD', 'UI/UX', 'User Research', 'Prototyping'],
                'jobType'          => 'Hourly',
                'experienceLevel'  => 'Intermediate',
                'projectSize'      => 'Medium',
                'estimatedDuration'=> '3-6 months',
                'additionalDetails'=> 'Remote possible. Must be available for EST hours.',
                'client_id'        => $client->id,
                'status'           => 'open',
                'progress'         => 0,
            ],
            [
                'title'            => 'DevOps Engineer',
                'company'          => 'Cloud Systems Ltd.',
                'location'         => 'Remote',
                'type'             => 'Full-time',
                'salary'           => '$90k - $130k',
                'description'      => 'Seeking a DevOps Engineer to maintain and improve our cloud infrastructure.',
                'skills'           => ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
                'jobType'          => 'Fixed Price',
                'experienceLevel'  => 'Expert',
                'projectSize'      => 'Large',
                'estimatedDuration'=> 'Permanent',
                'additionalDetails'=> 'Must have experience with large-scale cloud deployments.',
                'client_id'        => $client->id,
                'status'           => 'open',
                'progress'         => 0,
            ],
        ];

        foreach ($openJobs as $job) {
            Job::create($job);
        }

        if (!$freelancer) return; // Skip enriched seeding if no freelancer found

        // --- ACTIVE JOBS assigned to the default freelancer ---
        $job1 = Job::create([
            'title'            => 'E-commerce Website Redesign',
            'company'          => $client->company,
            'location'         => 'Remote',
            'type'             => 'Contract',
            'salary'           => '$5,000',
            'description'      => "Redesign and rebuild the client's e-commerce storefront using React and TailwindCSS.",
            'skills'           => ['React', 'TailwindCSS', 'Node.js'],
            'jobType'          => 'Fixed Price',
            'experienceLevel'  => 'Expert',
            'projectSize'      => 'Large',
            'estimatedDuration'=> '2-3 months',
            'additionalDetails'=> 'Full redesign of existing store.',
            'client_id'        => $client->id,
            'freelancer_id'    => $freelancer->id,
            'status'           => 'in_progress',
            'progress'         => 65,
            'due_date'         => Carbon::now()->addDays(30),
        ]);

        $job2 = Job::create([
            'title'            => 'REST API Development',
            'company'          => $client->company,
            'location'         => 'Remote',
            'type'             => 'Contract',
            'salary'           => '$3,000',
            'description'      => 'Build a scalable REST API with Laravel and PostgreSQL for a SaaS product.',
            'skills'           => ['Laravel', 'PostgreSQL', 'REST APIs'],
            'jobType'          => 'Fixed Price',
            'experienceLevel'  => 'Expert',
            'projectSize'      => 'Medium',
            'estimatedDuration'=> '4-6 weeks',
            'additionalDetails'=> 'Must follow RESTful conventions and include OpenAPI docs.',
            'client_id'        => $client->id,
            'freelancer_id'    => $freelancer->id,
            'status'           => 'in_progress',
            'progress'         => 90,
            'due_date'         => Carbon::now()->addDays(7),
        ]);

        // --- COMPLETED JOBS (historical) ---
        $completedJob1 = Job::create([
            'title'            => 'Dashboard UI Components',
            'company'          => $client->company,
            'location'         => 'Remote',
            'type'             => 'Contract',
            'salary'           => '$2,500',
            'description'      => 'Build reusable React dashboard component library.',
            'skills'           => ['React', 'TypeScript', 'Storybook'],
            'jobType'          => 'Fixed Price',
            'experienceLevel'  => 'Expert',
            'projectSize'      => 'Medium',
            'estimatedDuration'=> '6 weeks',
            'additionalDetails'=> 'Component library with full docs.',
            'client_id'        => $client->id,
            'freelancer_id'    => $freelancer->id,
            'status'           => 'completed',
            'progress'         => 100,
            'due_date'         => Carbon::now()->subDays(60),
            'updated_at'       => Carbon::now()->subDays(58),
        ]);

        $completedJob2 = Job::create([
            'title'            => 'AWS Infrastructure Setup',
            'company'          => $client->company,
            'location'         => 'Remote',
            'type'             => 'Contract',
            'salary'           => '$3,200',
            'description'      => 'Set up CI/CD pipelines and Terraform-managed AWS infrastructure.',
            'skills'           => ['AWS', 'Terraform', 'Docker'],
            'jobType'          => 'Fixed Price',
            'experienceLevel'  => 'Expert',
            'projectSize'      => 'Large',
            'estimatedDuration'=> '4 weeks',
            'additionalDetails'=> 'Includes full runbook documentation.',
            'client_id'        => $client->id,
            'freelancer_id'    => $freelancer->id,
            'status'           => 'completed',
            'progress'         => 100,
            'due_date'         => Carbon::now()->subDays(90),
            'updated_at'       => Carbon::now()->subDays(85),
        ]);

        // --- TRANSACTIONS (past earnings) ---
        Transaction::create([
            'freelancer_id'=> $freelancer->id,
            'client_id'    => $client->id,
            'job_id'       => $completedJob1->id,
            'amount'       => 2500.00,
            'description'  => 'Payment for Dashboard UI Components',
            'type'         => 'payment',
            'status'       => 'completed',
            'created_at'   => Carbon::now()->subDays(58),
        ]);

        Transaction::create([
            'freelancer_id'=> $freelancer->id,
            'client_id'    => $client->id,
            'job_id'       => $completedJob2->id,
            'amount'       => 3200.00,
            'description'  => 'Payment for AWS Infrastructure Setup',
            'type'         => 'payment',
            'status'       => 'completed',
            'created_at'   => Carbon::now()->subDays(85),
        ]);

        Transaction::create([
            'freelancer_id'=> $freelancer->id,
            'client_id'    => $client->id,
            'job_id'       => $job1->id,
            'amount'       => 2000.00,
            'description'  => 'Milestone 1 payment - E-commerce Redesign',
            'type'         => 'payment',
            'status'       => 'completed',
            'created_at'   => Carbon::now()->subDays(15),
        ]);

        // --- REVIEWS ---
        Review::create([
            'freelancer_id'=> $freelancer->id,
            'client_id'    => $client->id,
            'job_id'       => $completedJob1->id,
            'rating'       => 5,
            'comment'      => 'Exceptional work on the component library. Very clean, well-documented code. Highly recommend!',
            'created_at'   => Carbon::now()->subDays(57),
        ]);

        Review::create([
            'freelancer_id'=> $freelancer->id,
            'client_id'    => $client->id,
            'job_id'       => $completedJob2->id,
            'rating'       => 5,
            'comment'      => 'Set up our entire AWS infrastructure flawlessly. Delivered ahead of schedule.',
            'created_at'   => Carbon::now()->subDays(84),
        ]);
    }
}