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
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('freelancers');
    }
}; 