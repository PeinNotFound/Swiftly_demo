<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('freelancers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('is_approved')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_suspended')->default(false);
            $table->json('skills')->nullable();
            $table->decimal('hourly_rate', 10, 2)->nullable();
            $table->string('availability')->default('available');
            $table->integer('experience_years')->nullable();
            $table->json('education')->nullable();
            $table->json('languages')->nullable();
            $table->integer('completed_projects_count')->default(0);
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->json('portfolio')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('freelancers');
    }
}; 