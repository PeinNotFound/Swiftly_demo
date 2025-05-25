<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        // Get a client user to associate with jobs
        $client = User::where('role', 'client')->first();

        if (!$client) {
            // Create a client if none exists
            $client = User::create([
                'name' => 'Sample Client',
                'email' => 'client@example.com',
                'password' => bcrypt('password'),
                'role' => 'client',
                'company' => 'Tech Solutions Inc.'
            ]);
        }

        $jobs = [
            [
                'title' => 'Senior Full Stack Developer',
                'company' => 'Tech Solutions Inc.',
                'location' => 'Remote',
                'type' => 'Full-time',
                'salary' => '$80k - $120k',
                'description' => 'We are looking for an experienced Full Stack Developer to join our team. The ideal candidate should have strong experience with React, Node.js, and PostgreSQL.',
                'skills' => ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
                'jobType' => 'Fixed Price',
                'experienceLevel' => 'Expert',
                'projectSize' => 'Large',
                'estimatedDuration' => '6-12 months',
                'additionalDetails' => 'This is a long-term position with opportunities for growth and leadership roles.',
                'client_id' => $client->id,
                'status' => 'open'
            ],
            [
                'title' => 'UI/UX Designer',
                'company' => 'Creative Designs Co.',
                'location' => 'New York, NY',
                'type' => 'Contract',
                'salary' => '$50/hr',
                'description' => 'Looking for a talented UI/UX Designer to help create beautiful and intuitive user interfaces for our web applications.',
                'skills' => ['Figma', 'Adobe XD', 'UI/UX', 'User Research', 'Prototyping'],
                'jobType' => 'Hourly',
                'experienceLevel' => 'Intermediate',
                'projectSize' => 'Medium',
                'estimatedDuration' => '3-6 months',
                'additionalDetails' => 'Remote work possible. Must be available for team meetings during EST hours.',
                'client_id' => $client->id,
                'status' => 'open'
            ],
            [
                'title' => 'DevOps Engineer',
                'company' => 'Cloud Systems Ltd.',
                'location' => 'Remote',
                'type' => 'Full-time',
                'salary' => '$90k - $130k',
                'description' => 'Seeking a DevOps Engineer to help maintain and improve our cloud infrastructure and CI/CD pipelines.',
                'skills' => ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
                'jobType' => 'Fixed Price',
                'experienceLevel' => 'Expert',
                'projectSize' => 'Large',
                'estimatedDuration' => 'Permanent',
                'additionalDetails' => 'Must have experience with large-scale cloud deployments and automation.',
                'client_id' => $client->id,
                'status' => 'open'
            ],
            [
                'title' => 'Content Writer',
                'company' => 'Digital Marketing Pro',
                'location' => 'Remote',
                'type' => 'Part-time',
                'salary' => '$30/hr',
                'description' => 'Looking for a skilled content writer to create engaging blog posts and social media content.',
                'skills' => ['Content Writing', 'SEO', 'Social Media', 'Copywriting'],
                'jobType' => 'Hourly',
                'experienceLevel' => 'Intermediate',
                'projectSize' => 'Small',
                'estimatedDuration' => 'Ongoing',
                'additionalDetails' => 'Flexible hours, work from anywhere. Must meet weekly deadlines.',
                'client_id' => $client->id,
                'status' => 'open'
            ],
            [
                'title' => 'Mobile App Developer',
                'company' => 'App Innovations',
                'location' => 'San Francisco, CA',
                'type' => 'Contract',
                'salary' => '$70/hr',
                'description' => 'Need an experienced mobile app developer to help build our next-generation iOS and Android applications.',
                'skills' => ['React Native', 'Swift', 'Kotlin', 'Firebase', 'REST APIs'],
                'jobType' => 'Hourly',
                'experienceLevel' => 'Expert',
                'projectSize' => 'Medium',
                'estimatedDuration' => '4-8 months',
                'additionalDetails' => 'Must have published apps in the App Store and Play Store.',
                'client_id' => $client->id,
                'status' => 'open'
            ]
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
} 