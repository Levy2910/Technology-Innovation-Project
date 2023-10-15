<?php

namespace App\Http\Controllers;

use App\Models\AnonymousUser;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnonymousUserController extends Controller
{
    // track the activity of anonymous users to see if they come back to visit the wesite.
    function trackAnonymousUser(Request $req) {
        // get information from the front-end
        $ip_address = $req->input('ip_address');

        // check if there is an ip address
        if (empty($ip_address) || ($ip_address == 'unavailable')) {
            return response()->json([
                'message' => 'Welcome to HIV Support Community'
            ]);
        }

        // check if the anonymouse user accessed the website before
        $anonymous_user = AnonymousUser::where('ip_address', $ip_address)->first();

        if (!$anonymous_user) {
            AnonymousUser::create(['ip_address' => $ip_address, 'last_visited' => now()]);
            return response()->json([
                'message' => 'Welcome to HIV Support Community'
            ]);
        } else {
            // Check if the difference between the current time and the last_visited time is more than 1 second
            $timeDifference = Carbon::now()->diffInSeconds($anonymous_user->created_at);

            if ($timeDifference > 1) {
                $anonymous_user->update(['last_visited' => now()]);
                return response()->json([
                    'message' => 'Glad to have you back to HIV Support Community'
                ]);
            } else {
                return response()->json([
                    'message' => 'Welcome to HIV Support Community'
                ]);
            }
        }
    } 
}
