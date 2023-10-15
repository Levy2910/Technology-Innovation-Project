<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\TestResult;
use App\Models\User;
use App\Models\Key;

class TestResultController extends Controller
{
    // group positive cases by postcode
    function getPositiveCasesByPostcodes(Request $req) {
        //join test result and users using user id
        $allTestResults = DB::table('test_result')
            ->join('users', 'test_result.user_id', '=', 'users.user_id')
            ->select('test_result.*', 'users.postcode')
            ->get();
        //positive case array
        $positiveCasesByPostcode = [];

        //iterate through each record and decrypt
        foreach ($allTestResults as $record) {
            $usercrypt = Key::where('user_id', $record->user_id)->first();
            $key = $usercrypt->encryption_key;
            $iv = $usercrypt->iv;

            //decrypt test result and postcode
            $record->test_result = openssl_decrypt($record->test_result, 'aes-256-cbc', $key, 0, $iv);
             $record->postcode = openssl_decrypt($record->postcode, 'aes-256-cbc', $key, 0, $iv);

            //is test result positive
            if ($record->test_result === 'positive') {
                //count
                if (!isset($positiveCasesByPostcode[$record->postcode])) {
                    $positiveCasesByPostcode[$record->postcode] = 1;
                } else {
                    $positiveCasesByPostcode[$record->postcode]++;
                }
            }
        }

        //return error message if no positive cases found
        if (empty($positiveCasesByPostcode)) {
            return response()->json([
                'status' => false,
                'message' => 'No positive cases found for the provided postcodes',
            ]);
        }

        //return the positive cases grouped by postcode
        return response()->json([
            'status' => true,
            'data' => $positiveCasesByPostcode,
        ]);
    }
}
