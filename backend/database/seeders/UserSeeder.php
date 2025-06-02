<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Freelancer;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'company' => 'Admin Company'
        ]);

        User::create([
            'name' => 'Client User',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'company' => 'Tech Solutions Inc.'
        ]);

        $freelancerUser = User::create([
            'name' => 'Freelancer User',
            'email' => 'freelancer@example.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
            'title' => 'Senior Full Stack Developer',
            'bio' => 'Experienced full stack developer with expertise in modern web technologies.',
            'location' => 'Remote',
            'profile_picture' => null
        ]);

        Freelancer::create([
            'user_id' => $freelancerUser->id,
            'is_approved' => true,
            'is_verified' => true,
            'is_suspended' => false,
            'skills' => json_encode(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS']),
            'hourly_rate' => 50.00,
            'availability' => 'available',
            'experience_years' => 5,
            'education' => json_encode([
                [
                    'degree' => 'Bachelor of Science in Computer Science',
                    'institution' => 'University of Technology',
                    'year' => 2018
                ]
            ]),
            'languages' => json_encode(['English', 'Spanish']),
            'completed_projects_count' => 15,
            'average_rating' => 4.8,
            'portfolio' => json_encode([
                [
                    'title' => 'E-commerce Platform',
                    'description' => 'Built a full-stack e-commerce platform using React and Node.js',
                    'url' => 'https://example.com/project1'
                ]
            ])
        ]);
    }
}
