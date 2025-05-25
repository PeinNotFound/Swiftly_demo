<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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

        User::create([
            'name' => 'Freelancer User',
            'email' => 'freelancer@example.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
            'company' => null
        ]);
    }
}
