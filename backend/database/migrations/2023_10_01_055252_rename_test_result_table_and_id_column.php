<?php
/**
* Student: Tung Le
* Student ID: 4936809
*/

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTestResultTableAndIdColumn extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Rename the table from 'testResult' to 'test_result'
        Schema::rename('testResult', 'test_result');

        // Rename 'id' column to 'test_rsult_id'
        Schema::table('test_result', function(Blueprint $table) {
            $table->renameColumn('id', 'test_result_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert column name from 'test_result_id' to 'id'
        Schema::table('test_result', function(Blueprint $table) {
            $table->renameColumn('test_result_id', 'id');
        });

        // Revert table name from 'test_result' to 'testResult'
        Schema::rename('test_result', 'testResult');
    }
};
