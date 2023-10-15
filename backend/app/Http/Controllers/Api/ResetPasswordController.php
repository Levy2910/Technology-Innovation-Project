<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ResetPasswordController extends Controller
{
    // Reset Password
    public function reset(Request $request, $user_id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422); // HTTP status code 422 for validation errors
        }

        // Check if the user with the provided user_id exists
        $user = User::find($user_id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's password
        $user->password = Hash::make($request->input('password'));
        $user->save();
        
        return response()->json([
            'status' => true,
            'message' => 'Password change successful',
        ], 200);
    }
}
