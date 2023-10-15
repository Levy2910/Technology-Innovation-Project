<?php
/**
 * Name: Yujia Xie 
 * Student ID: 104520641
 */
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTestResultTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //php 
        Schema::create('test_result', function (Blueprint $table) {
            $table->increments('test_result_id');  //primary key
            $table->bigInteger('user_id')->unsigned()->nullable(); //foreign key
            $table->binary('test_result',20)->notNull();   //test_result can't be null
            $table->date('test_date')->nullable();
            $table->binary('risk_exposure',20)->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('SET NULL')->onUpdate('CASCADE');  //foreign key
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('test_result', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        // drop the table
        Schema::dropIfExists('test_result');
    }
}
