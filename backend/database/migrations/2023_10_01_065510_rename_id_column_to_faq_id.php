<?php
/**
* Student: Tung Le
* Student ID: 4936809
*/
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
        Schema::table('faq', function (Blueprint $table) {
            // Raname 'id' column to 'faq_id' column
            $table->renameColumn('id', 'faq_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('faq', function (Blueprint $table) {
            // Revert 'faq_id' column to 'id'
            $table->renameColumn('faq_id', 'id');
        });
    }
};
