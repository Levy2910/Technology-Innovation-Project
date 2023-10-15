<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    protected $table = 'key_table'; 
    
    protected $fillable = [
        'user_id',           
        'encryption_key',   
        'iv',                
    ];
}
