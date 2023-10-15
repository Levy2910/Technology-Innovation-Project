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
        Schema::table('test_result', function (Blueprint $table) {
            // add reason_for_test column
            $table->binary('reason_for_test')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('test_result', function (Blueprint $table) {
            // drop reason_for_test column
            $table->dropColumn('reason_for_test');
        });
    }
};
