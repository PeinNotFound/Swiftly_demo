<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('freelancers', function (Blueprint $table) {
            $table->string('suspension_reason')->nullable();
            $table->text('appeal_message')->nullable();
            $table->enum('appeal_status', ['none', 'pending', 'approved', 'rejected'])->default('none');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('freelancers', function (Blueprint $table) {
            $table->dropColumn(['suspension_reason', 'appeal_message', 'appeal_status']);
        });
    }
};
