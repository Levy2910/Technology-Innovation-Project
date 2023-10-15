<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\TestResult;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        /**User::factory()->create([
             'name' => 'Test User1',
             'username' => 'a1',
             'email' => 'yxie0629@gmail.com',
             'gender' => 'female',
             'age' => 17,
             'nationality' => 'au',
             'postcode' => 3168,
             'last_login' => '2023-10-01',
             'password' => '1234',
             'role' => 0,
             'created_at' => '2022-10-01'
         ]);
         User::factory()->create([
            'name' => 'Test User2',
            'username' => 'a2',
            'email' => '104520641@student.swin.edu.au',
            'gender' => 'female',
            'age' => 20,
            'nationality' => 'cn',
            'postcode' => 3128,
            'last_login' => '2023-08-30',
            'password' => '1234',
            'role' => 0,
            'created_at' => '2022-10-15'
        ]);
        User::factory()->create([
            'name' => 'Test User3',
            'username' => 'a3',
            'email' => '229571704@qq.com',
            'gender' => 'male',
            'age' => 25,
            'nationality' => 'au',
            'postcode' => 3000,
            'last_login' => '2023-09-08',
            'password' => '1234',
            'role' => 0,
            'created_at' => '2023-09-06'
        ]);
        User::factory()->create([
            'name' => 'Test User4',
            'username' => 'a4',
            'email' => '1@q.com',
            'gender' => 'male',
            'age' => 25,
            'nationality' => 'us',
            'postcode' => 3272,
            'last_login' => '2023-09-07',
            'password' => '1234',
            'role' => 0,
            'created_at' => '2020-06-01'
        ]);
        User::factory()->create([
            'name' => 'Test User5',
            'username' => 'a5',
            'email' => '2@q.com',
            'gender' => 'male',
            'age' => 25,
            'nationality' => 'uk',
            'postcode' => 3170,
            'last_login' => '2023-09-30',
            'password' => '1234',
            'role' => 0,
            'created_at' => '2023-09-28'
        ]);
        User::factory()->create([
            'name' => 'Test User6',
            'username' => 'a6',
            'email' => '3@q.com',
            'gender' => 'male',
            'age' => 33,
            'nationality' => 'au',
            'postcode' => 3172,
            'last_login' => '2023-09-30',
            'password' => '1234',
            'role' => 0,
            'created_at' => '2021-03-01'
        ]);*/

        TestResult::factory()->create([
            'user_id' => 1,
            'test_result' => 'positive',
            'test_date' => '2022-11-01'
        ]);
        TestResult::factory()->create([
            'user_id' => 1,
            'test_result' => 'positive',
            'test_date' => '2023-09-09'
        ]);
        TestResult::factory()->create([
            'user_id' => 2,
            'test_result' => 'negative',
            'test_date' => '2022-12-01'
        ]);
        TestResult::factory()->create([
            'user_id' => 2,
            'test_result' => 'negative',
            'test_date' => '2023-03-01'
        ]);
        TestResult::factory()->create([
            'user_id' => 2,
            'test_result' => 'negative',
            'test_date' => '2023-09-07'
        ]);
        TestResult::factory()->create([
            'user_id' => 4,
            'test_result' => 'negative',
            'test_date' => '2021-08-20'
        ]);
        TestResult::factory()->create([
            'user_id' => 4,
            'test_result' => 'negative',
            'test_date' => '2023-09-28'
        ]);
    }
}
