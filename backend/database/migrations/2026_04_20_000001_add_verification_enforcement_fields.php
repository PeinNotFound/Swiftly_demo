<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add rejection_count to verification_requests
        Schema::table('verification_requests', function (Blueprint $table) {
            $table->unsignedTinyInteger('rejection_count')->default(0)->after('admin_notes');
        });

        // Add is_blocked to users for email banning
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_blocked')->default(false)->after('is_email_verified');
        });
    }

    public function down(): void
    {
        Schema::table('verification_requests', function (Blueprint $table) {
            $table->dropColumn('rejection_count');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_blocked');
        });
    }
};
