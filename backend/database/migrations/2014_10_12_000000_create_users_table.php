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
            $table->bigIncrements('user_id');
            $table->binary('name')->nullable();
            $table->binary('email');
            $table->string('username')->unique();
            $table->binary('gender')->nullable();
            $table->binary('age')->nullable();
            $table->string('nationality')->nullable();
            $table->binary('postcode')->nullable();
            $table->tinyInteger('role');
            $table->timestamp('last_login')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->binary('password'); 
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('key_table', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->binary('encryption_key');
            $table->binary('iv');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('key_table');
    }
};

