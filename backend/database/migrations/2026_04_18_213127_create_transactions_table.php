<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('freelancer_id');  // references users.id (the freelancer user)
            $table->unsignedBigInteger('client_id');       // references users.id (the client user)
            $table->unsignedBigInteger('job_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('description')->nullable();
            $table->enum('type', ['payment', 'withdrawal', 'refund'])->default('payment');
            $table->enum('status', ['pending', 'completed', 'failed'])->default('completed');
            $table->timestamps();

            $table->foreign('freelancer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
