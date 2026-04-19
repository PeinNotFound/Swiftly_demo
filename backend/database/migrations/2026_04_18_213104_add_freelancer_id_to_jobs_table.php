<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->unsignedBigInteger('freelancer_id')->nullable()->after('client_id');
            $table->integer('progress')->default(0)->after('status'); // 0-100
            $table->date('due_date')->nullable()->after('progress');

            $table->foreign('freelancer_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropForeign(['freelancer_id']);
            $table->dropColumn(['freelancer_id', 'progress', 'due_date']);
        });
    }
};
