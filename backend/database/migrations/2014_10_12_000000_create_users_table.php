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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('user_id')->unsigned();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('gender'); // Add gender field
            $table->integer('age');   // Add age field
            $table->string('nationality'); // Add nationality field
            $table->integer('postcode');   // Add postcode field
            $table->boolean('role');       // Add role field
            $table->timestamp('last_login'); // For last login purpose
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
