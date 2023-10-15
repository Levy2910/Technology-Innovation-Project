<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'gender',
        'age',
        'nationality',
        'postcode',
        'role',
        'last_login'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        
    ];
    protected $primaryKey = 'user_id';
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    use Notifiable;

    // Reset Password

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
    public function testResults()
    {
        return $this->hasMany(TestResult::class, 'user_id', 'user_id');
    }

    protected $encryptedFields = ['name', 'email', 'password', 'gender', 'age', 'nationality', 'postcode'];
    public function decryptFields()
    {
        foreach ($this->encryptedFields as $field) {
            if (!empty($this->$field)) {
                $usercrypt = Key::where('user_id', $this->user_id)->first();
                $key = $usercrypt->encryption_key;
                $iv = $usercrypt->iv;
                $this->$field = openssl_decrypt($this->$field, 'aes-256-cbc', $key, 0, $iv);
            }
        }
    }

    public function encryptFields()
    {
        foreach ($this->encryptedFields as $field) {
            if (!empty($this->$field)) {
                $usercrypt = Key::where('user_id', $this->user_id)->first();
                $key = $usercrypt->encryption_key;
                $iv = $usercrypt->iv;
                $this->$field = openssl_encrypt($this->$field, 'aes-256-cbc', $key, 0, $iv);
            }
        }
    }


}
