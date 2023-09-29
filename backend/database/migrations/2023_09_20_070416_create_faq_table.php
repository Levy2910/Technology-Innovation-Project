<?php
/**
 * Name: Yujia Xie 
 * Student ID: 104520641
 */
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaqTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('faq', function (Blueprint $table) {
            $table->increments('id');  //primary key
            $table->text('question')->unique()->notNull();  
            $table->text('answer')->notNull();   
            $table->rememberToken();
            $table->timestamps();
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
        Schema::dropIfExists('faq');
    }
}
