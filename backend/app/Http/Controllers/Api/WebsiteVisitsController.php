<?php
/**
 * Name: Yujia Xie 
 * Student ID: 104520641
 */
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB; // Import DB Facade
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebsiteVisitsController extends Controller
{
    public function getWebsiteVisits($days)
    {
        try {
            $result = DB::select("
                SELECT
                    DATE(NOW()) AS 'current_date',
                    COUNT(*) AS no_of_website_visits_in_last_{$days}_days
                FROM anonymous_users
                WHERE last_visited >= NOW() - INTERVAL ? DAY
            ", [$days]);

            return response()->json($result[0]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
