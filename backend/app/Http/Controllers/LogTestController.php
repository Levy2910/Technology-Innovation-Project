<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TestResult;
use Illuminate\Support\Facades\Date; 

class LogTestController extends Controller
{
    //
    function logTest(Request $req) 
    {   
        // Customise error messages
        $messages = [
            'user_id.required' => 'User ID is required',
            'user_id.integer' => 'User ID must be integer',
            'user_id.exists' => 'User with the the provided ID does is not found',
            'test_result.required' => 'Test result is required.',
            'test_result.string' => 'Test result must be a string.',
            'test_result.max' => 'Test result length must not be greater than 20 characters.',
            'test_date.date' => 'Test date is invalid',
            'risk_exposure.string' => 'Risk exposure must be a string',
            'risk_exposure.max' => 'Risk exposure must not exceed 20 characters',
            //'reason_for_test.string' => 'Reason for test must be a string',
            //'risk_exposure.max' => 'Reason for test must not exceed 255 characters',
        ];


        // validate the request data
         $validator = Validator::make($req->all(), [
            'user_id' => 'required|integer|exists:users,user_id',
            'test_result' => 'required|string|max:20',
            'risk_exposure' => 'nullable|string|max:20',
            //'reason_for_test' => 'nullable|string|max:255',
        ], $messages);

        // check if the validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error'=> $validator->errors()
            ], 400);
        }      

        // Create a new testResult
        $testResult = new TestResult;
        $testResult->user_id = $req->input('user_id');
        $testResult->test_result = $req->input('test_result');
        $testResult->test_date = $req->input('test_date');
        $testResult->risk_exposure = $req->input('risk_exposure');
        //generate date in yy-mm-dd format
        $testDate = Date::now()->format('Y-m-d');
        $testResult->test_date = $testDate;  
        //$testResult->reason_for_test = $req->input('reason_for_test');

        // save data collected to the database
        $testResult->save();

        return $req->input();
    }
}
