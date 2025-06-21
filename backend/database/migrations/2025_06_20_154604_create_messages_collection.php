<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use App\Models\Message;

return new class extends Migration
{
    public function getConnection()
    {
        return 'mongodb';
    }

    /**
     * Run the migrations.
     */
    public function up()
    {
        // Example: create an index on userId and freelancerId
        Schema::connection('mongodb')->table('messages', function ($collection) {
            $collection->index(['userId' => 1, 'freelancerId' => 1]);
        });
    }

    public function down()
    {
        Schema::connection('mongodb')->table('messages', function ($collection) {
            $collection->dropIndex(['userId' => 1, 'freelancerId' => 1]);
        });
    }
};
