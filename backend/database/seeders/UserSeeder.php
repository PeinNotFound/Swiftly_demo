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
            'name'    => 'Admin User',
            'email'   => 'admin@example.com',
            'password'=> Hash::make('password'),
            'role'    => 'admin',
            'company' => 'Admin Company'
        ]);

        User::create([
            'name'    => 'Client User',
            'email'   => 'client@example.com',
            'password'=> Hash::make('password'),
            'role'    => 'client',
            'company' => 'Tech Solutions Inc.'
        ]);

        $freelancerUser = User::create([
            'name'            => 'Alex Johnson',
            'email'           => 'freelancer@example.com',
            'password'        => Hash::make('password'),
            'role'            => 'freelancer',
            'title'           => 'Senior Full Stack Developer',
            'bio'             => 'Experienced full stack developer with 6+ years building scalable web apps. Passionate about clean code and great UX.',
            'location'        => 'Remote, USA',
            'profile_picture' => null
        ]);

        Freelancer::create([
            'user_id'                  => $freelancerUser->id,
            'is_approved'             => true,
            'is_verified'             => true,
            'is_suspended'            => false,
            'is_onboarded'            => true,
            'skills'                  => json_encode(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'TailwindCSS']),
            'hourly_rate'             => 65.00,
            'availability'            => 'available',
            'experience_years'        => 6,
            'education'               => json_encode([
                [
                    'degree'      => 'Bachelor of Science in Computer Science',
                    'institution' => 'University of Technology',
                    'year'        => 2018
                ]
            ]),
            'languages'               => json_encode(['English', 'French']),
            'completed_projects_count'=> 18,
            'average_rating'          => 4.9,
            'portfolio'               => json_encode([
                [
                    'title'       => 'E-commerce Platform',
                    'description' => 'Built a full-stack e-commerce platform using React and Node.js',
                    'url'         => 'https://example.com/project1'
                ],
                [
                    'title'       => 'Real-time Chat App',
                    'description' => 'Developed a real-time chat application using Socket.io and React',
                    'url'         => 'https://example.com/project2'
                ]
            ])
        ]);
    }
}
