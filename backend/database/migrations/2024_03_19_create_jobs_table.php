<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('type');
            $table->string('salary');
            $table->text('description');
            $table->json('skills');
            $table->string('jobType');
            $table->string('experienceLevel');
            $table->string('projectSize');
            $table->string('estimatedDuration');
            $table->text('additionalDetails');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->string('status')->default('open');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}; 