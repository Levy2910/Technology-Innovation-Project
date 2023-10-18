<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TestResult;
use App\Models\User;
use App\Models\Key;
use Illuminate\Support\Facades\Date; 
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use PDF;

class LogTestController extends Controller
{
    // log test result to the database
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
            'risk_exposure.max' => 'Risk exposure must not exceed 50 characters',
            'reason_for_test.string' => 'Reason for test must be a string',
            'reason_for_test.max' => 'Reason for test must not exceed 255 characters',
        ];


        // validate the request data
         $validator = Validator::make($req->all(), [
            'user_id' => 'required|integer|exists:users,user_id',
            'test_result' => 'required|string|max:20',
            'risk_exposure' => 'nullable|string|max:50',
            'reason_for_test' => 'nullable|string|max:255',
        ], $messages);

        // check if the validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error'=> $validator->errors()
            ], 400);
        }      

        //create a new testResult
        $testResult = new TestResult;
        $testResult->user_id = $req->input('user_id');
        $usercrypt = Key::where('user_id', $req->input('user_id'))->first();
        $key = $usercrypt->encryption_key;
        $iv = $usercrypt->iv;
        $testResult->test_result =openssl_encrypt($req->input('test_result'), 'aes-256-cbc', $key, 0, $iv);
        $testResult->test_date = $req->input('test_date');
        $testResult->risk_exposure =openssl_encrypt($req->input('risk_exposure'), 'aes-256-cbc', $key, 0, $iv);
        $testDate = Date::now()->format('Y-m-d');         //generate date in yy-mm-dd format
        $testResult->test_date = $testDate;  
        $testResult->reason_for_test = openssl_encrypt($req->input('reason_for_test'), 'aes-256-cbc', $key, 0, $iv);   


        //save data collected to the database
        $testResult->save();

        //decrypt from db
        $user = User::find($testResult->user_id); 
        //get latest entry
        $result = TestResult::where('user_id', $testResult->user_id)
    ->orderBy('test_date', 'desc')
    ->orderBy('test_result_id', 'desc')
    ->first();

        $user->decryptFields();
        $result->decryptTestFields();
        
        
        //generate a PDF
        $pdf = PDF::loadView('pdf.test_result', ['testResult' => $result, 'user' => $user]);


        //customize PDF file name
        $pdfFileName = 'test_result_' . $testResult->user_id . '.pdf';

       

        //save the PDF to the public storage directory
        $pdf->save(storage_path('app/public/pdf/' . $pdfFileName));

        //return a response with a JSON message that includes the PDF download URL
        return [
            'status' => true,
            'message' => 'Test result logged successfully',
            'pdf_url' => url('storage/pdf/' . $pdfFileName),
        ];
    }
    public function getRiskExposureForPieChart()
    {
        //get total
        $totalEntries = TestResult::count();
    
        //get risk exposure
        $riskExposureData = TestResult::select('user_id', 'risk_exposure')
            ->get();
    
        //decrypt and count
        $count = [];
        foreach ($riskExposureData as $record) {
            $usercrypt = Key::where('user_id', $record->user_id)->first();
            $key = $usercrypt->encryption_key;
            $iv = $usercrypt->iv;
            $decryptedRiskExposure = openssl_decrypt($record->risk_exposure, 'aes-256-cbc', $key, 0, $iv);
    
            //count
            if (isset($count[$decryptedRiskExposure])) {
                $count[$decryptedRiskExposure]++;
            } else {
                $count[$decryptedRiskExposure] = 1;
            }
        }
    
        //calc percentage
        $pieChartData = [];
        foreach ($count as $riskExposure => $occurrences) {
            $percentage = ($occurrences / $totalEntries) * 100;
            $pieChartData[] = [
                'label' => $riskExposure,
                'percentage' => round($percentage, 2) 
            ];
        }
    
        return response()->json($pieChartData);
    }
}    