<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('freelancers', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('user_id');
            $table->json('experience')->nullable()->after('education');
            $table->enum('freelancer_level', ['fresher', 'beginner', 'intermediate', 'expert'])->default('fresher')->after('hourly_rate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('freelancers', function (Blueprint $table) {
            $table->dropColumn(['phone', 'experience', 'freelancer_level']);
        });
    }
};
