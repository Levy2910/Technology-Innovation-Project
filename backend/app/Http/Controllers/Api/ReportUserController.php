<?php
/**
 * Name: Yujia Xie 
 * Student ID: 104520641
 */
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB; // Import DB Facade
use Exception;
use Illuminate\Http\Request;

class ReportUserController extends Controller
{
    public function usersLoggedInLastNDays($days)
    {
        try {
            $result = DB::select("
                SELECT
                    DATE(NOW()) AS 'current_date',
                    SUM(CASE WHEN last_login >= DATE(NOW()) - INTERVAL ? DAY THEN 1 ELSE 0 END) AS no_of_users_logged_in_last_{$days}_days
                FROM users
            ", [$days]);

            return response()->json($result[0]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function usersRegisteredPerPeriod($period)
    {
        try {
            $period = strtolower($period);

            switch ($period) {
                case 'week':
                    $interval = '%Y-%U';
                    break;
                case 'month':
                    $interval = '%Y-%m';
                    break;
                case 'year':
                    $interval = '%Y';
                    break;
                default:
                    throw new Exception('Invalid period provided.');
            }

            $result = DB::select("
                SELECT
                    DATE_FORMAT(created_at, ?) AS date_group,
                    COUNT(*) AS total_users_registered
                FROM users
                GROUP BY date_group
                ORDER BY date_group ASC
            ", [$interval]);

            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
