<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('freelancer_id');  // references users.id
            $table->unsignedBigInteger('client_id');       // references users.id
            $table->unsignedBigInteger('job_id')->nullable();
            $table->tinyInteger('rating');                 // 1–5
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->foreign('freelancer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
