<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Key;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\TestResult;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    // Register User
    public function registerUser(Request $request){
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:users,email|email',
            'password' => 'required|string|min:8|confirmed',
            'gender' => 'required|string',
            'age' => 'required|integer|gte:10|lte:100',
            'nationality' => 'required|string|max:255',
            'postcode' => 'required|integer|digits_between:1,4', // Updated to allow for 4 digits
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422); // HTTP status code 422 for validation errors
        }

         //generate salt and iv for encryption
         $salt = random_bytes(16);
         $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));

        //gen key
         $key = hash_pbkdf2('sha256', $request->input('password'), $salt, 10000, 32, true);

        $user = User::create([
            'username' => $request->input('username'),
            'name' => openssl_encrypt($request->input('name'), 'aes-256-cbc', $key, 0, $iv),
            'email' => openssl_encrypt($request->input('email'), 'aes-256-cbc', $key, 0, $iv),
            'password' => openssl_encrypt($request->input('password'), 'aes-256-cbc', $key, 0, $iv),
            'gender' => openssl_encrypt($request->input('gender'), 'aes-256-cbc', $key, 0, $iv),
            'age' => openssl_encrypt($request->input('age'), 'aes-256-cbc', $key, 0, $iv),
            'nationality' => openssl_encrypt($request->input('nationality'), 'aes-256-cbc', $key, 0, $iv),
            'postcode' => openssl_encrypt($request->input('postcode'), 'aes-256-cbc', $key, 0, $iv),
            'role' => 0, // role is 0 by default for user registration indicating a normal user
            'last_login' => now(),
            
        ]);
        //create key table row with user id key and iv
        $usercrypt = Key::create([
            'user_id' => $user -> user_id,
            'encryption_key' => $key,
            'iv' => $iv,
        ]);
        return response()->JSON([
            'status' => true,
            'message' => 'Account Creation Successful. Please login to Proceed',
            'token' => $user->createToken('REGISTER TOKEN')->plainTextToken
        ], 200);
    }
    // Add User For Dashboard
    public function addUser(Request $request){
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:users,email|email',
            'password' => 'required|string|min:8|confirmed',
            'gender' => 'required|string',
            'age' => 'required|integer|gte:10|lte:100',
            'role' => 'required|integer|gte:0|lte:1',
            'nationality' => 'required|string|max:255',
            'postcode' => 'required|integer|digits_between:1,4',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422); // HTTP status code 422 for validation errors
        }

         //generate salt and iv for encryption
         $salt = random_bytes(16);
         $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));

        //gen key
         $key = hash_pbkdf2('sha256', $request->input('password'), $salt, 10000, 32, true);

        $user = User::create([
            'username' => $request->input('username'),
            'name' => openssl_encrypt($request->input('name'), 'aes-256-cbc', $key, 0, $iv),
            'email' => openssl_encrypt($request->input('email'), 'aes-256-cbc', $key, 0, $iv),
            'password' => openssl_encrypt($request->input('password'), 'aes-256-cbc', $key, 0, $iv),
            'gender' => openssl_encrypt($request->input('gender'), 'aes-256-cbc', $key, 0, $iv),
            'age' => openssl_encrypt($request->input('age'), 'aes-256-cbc', $key, 0, $iv),
            'nationality' => openssl_encrypt($request->input('nationality'), 'aes-256-cbc', $key, 0, $iv),
            'postcode' => openssl_encrypt($request->input('postcode'), 'aes-256-cbc', $key, 0, $iv),
            'role' => $request->input('role'),
            'last_login' => now(),
        ]);
        //create key table row with user id key and iv
        $usercrypt = Key::create([
            'user_id' => $user -> user_id,
            'encryption_key' => $key,
            'iv' => $iv,
        ]);
        return response()->JSON([
            'status' => true,
            'message' => 'User Added Successfully.',
            'token' => $user->createToken('REGISTER TOKEN')->plainTextToken
        ], 200);
    }
    public function login(Request $request)
    {
        //validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422); // HTTP status code 422 for validation errors
        }

        //get user from db using id
        $user = User::where('username', $request->input('username'))->first();
        //does user exist
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Username',
            ], 401); // HTTP status code 401 for unauthorized access
        }
        //get key from db using id
        $usercrypt = Key::where('user_id', $user->user_id)->first();
        //does user exist in key table
        if (!$usercrypt) {
            return response()->json([
                'status' => false,
                'message' => 'User encryption key not found',
            ], 401); // HTTP status code 401 for unauthorized access
        }
        //decrypt
        $key = $usercrypt->encryption_key;
        $iv = $usercrypt->iv;
        $decryptedPassword = openssl_decrypt($user->password, 'aes-256-cbc', $key, 0, $iv);



        // Attempt to log in the user with decrypted password
        if ($decryptedPassword === $request->input('password')) {
            // Update the last login time for the user
            $user->update(['last_login' => now()]);
            //decrypt user fields
            $user->decryptFields();
            // Generate Login token for the user
            $token = $user->createToken('LOGIN Token')->plainTextToken;
    
            return response()->json([
                'status' => true,
                'message' => 'Login Successful',
                'user' => $user,
                'token' => $token,
            ], 200); // HTTP status code 200 for successful login
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Credentials',
            ], 401); // HTTP status code 401 for unauthorized access
        }
    }
    // Get Users
    public function getUsers()
    {
        $users = User::where('role', 0)->get();
        foreach ($users as $user) {
            $user->decryptFields();
        }
        return response()->json(['users' => $users]);
    }
    // Get User by ID
    public function getUserById($user_id)
    {
        // Find the user by ID
        $user = User::find($user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        $user->decryptFields();
        return response()->json(['message' => 'User found', 'user' => $user], Response::HTTP_OK);
    }
    public function updateUser(Request $request, $user_id)
    {
        //retrieve the user's encrypted data from the database using user id
        $user = User::find($user_id);

        //check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        //decrypt 
        $user->decryptFields();
        $decryptedEmail = $user->email;
        $requestEmail = $request->input('email');


        //compare the decrypted email with the email provided in the request
        if ($user->email !== $request->input('email')) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|unique:users,email|email',
                'gender' => 'required|string',
                'age' => 'required|integer|gte:10|lte:100',
                'nationality' => 'required|string|max:255',
                'postcode' => 'required|integer|digits_between:1,4',
            ]);
        }

        //validate the request data and update the user's data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'gender' => 'required|string',
            'age' => 'required|integer|gte:10|lte:100',
            'nationality' => 'required|string|max:255',
            'postcode' => 'required|integer|digits_between:1,4',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422);
        }


        //respond, update user info and save
        $user->fill($request->all()); 
        //save response with unencrypted data
        $response = response()->json([
            'status' => true,
            'message' => 'Successfully updated details',
            'user' => $user,
            'token' => $user->createToken('EDIT DETAILS TOKEN')->plainTextToken
        ], 200);
        //encrypt before saving
        $user->encryptFields();
        $user->save(); 
        return $response;
    }

    // Delete User
    public function deleteUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['status'=> false, 'message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['status'=> true, 'message' => 'User deleted successfully'], 200);
    }


    public function getAllUsersWithTestResults()
{
    //join users and test results
    $usersWithAllTestResults = DB::table('test_result')
    ->join('users', 'test_result.user_id', '=', 'users.user_id')
    ->get();

    //decrypt encrypted fields
    $encryptedFields = ['name', 'email', 'password', 'gender', 'age', 'nationality', 'postcode', 'test_result', 'risk_exposure', 'reason_for_test'];

    foreach ($usersWithAllTestResults as $record) {
        $usercrypt = Key::where('user_id', $record->user_id)->first();
        $key = $usercrypt->encryption_key;
        $iv = $usercrypt->iv;

        foreach ($encryptedFields as $field) {
            if (!empty($record->$field)) {
                $record->$field = openssl_decrypt($record->$field, 'aes-256-cbc', $key, 0, $iv);
            }
        }
    }



    return response()->json($usersWithAllTestResults);
}


}