<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestResult extends Model
{
    use HasFactory;

    protected $table = 'test_result';
    protected  $primaryKey = 'test_result_id';
    public $timestamps=false;
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    //encrypt and decrypt functions

    //fields to be encrypted/decrypted
    protected $encryptedFields = ['test_result', 'risk_exposure', 'reason_for_test'];
    public function decryptTestFields()
    {
        foreach ($this->encryptedFields as $field) {
            if (!empty($this->$field)) {
                $userCrypt = Key::where('user_id', $this->user_id)->first();
                $key = $userCrypt->encryption_key;
                $iv = $userCrypt->iv;
                $this->$field = openssl_decrypt($this->$field, 'aes-256-cbc', $key, 0, $iv);
            }
        }
    }

    public function encryptTestFields()
    {
        foreach ($this->encryptedFields as $field) {
            if (!empty($this->$field)) {
                $userCrypt = Key::where('user_id', $this->user_id)->first();
                $key = $userCrypt->encryption_key;
                $iv = $userCrypt->iv;
                $this->$field = openssl_encrypt($this->$field, 'aes-256-cbc', $key, 0, $iv);
            }
        }
    }

}
