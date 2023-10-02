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
        Schema::create('testResult', function (Blueprint $table) {
            $table->increments('id');  //primary key
            $table->bigInteger('user_id')->unsigned(); //foreign key
            $table->string('test_result',20)->notNull();   //test_result can't be null
            $table->date('test_date')->nullable();
            $table->string('risk_exposure',20)->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('user_id')->references('user_id')->on('users');  //foreign key
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('testResult');
    }
}
