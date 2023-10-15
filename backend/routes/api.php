<?php


use App\Http\Controllers\ChatController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LogTestController;
use App\Http\Controllers\FaqController;

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ReportUserController;
use App\Http\Controllers\Api\WebsiteVisitsController;
use App\Http\Controllers\AnonymousUserController;
use App\Http\Controllers\TestResultController;
  
use App\Http\Controllers\PDFController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Ashmin
// Public Routes
Route::post('/register', [UserController::class, 'registerUser']);
Route::post('/login',  [UserController::class, 'login']);

Route::post('/add-user', [UserController::class, 'addUser']);
// Password Reset
Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);

// Route::get('/password/reset/{token}', [ResetPasswordController::class, 'reset'])->name('password.reset-form');

Route::post('/password/reset/{user_id}', [ResetPasswordController::class, 'reset'])->name('password.reset');
Route::get('/users', [UserController::class, 'getUsers']);
Route::get('/users/{user_id}', [UserController::class, 'getUserByID']);
Route::post('/users/{user_id}', [UserController::class, 'updateUser']);
Route::delete('users/{id}', [UserController::class, 'deleteUser']);
Route::get('/users-with-test-results', [UserController::class, 'getAllUsersWithTestResults']);
Route::get('/risk-exposure-pie-chart', [LogTestController::class, 'getRiskExposureForPieChart']);

// Route::get('/users', [UserController::class, 'getUsers'])->middleware('checkUserRole:1');
// Route::middleware(['auth:api', 'checkUserRole:admin'])->group(function () {
// });
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//tungle-routes
Route::post('/logTest', [LogTestController::class, 'logTest']);
Route::post('/addFaq', [FaqController::class, 'addFaq']);
Route::get('/listFaq', [FaqController::class, 'listFaq']);
Route::delete('/deleteFaq/{id}', [FaqController::class, 'deleteFaq']);
Route::get('/getFaq/{id}', [FaqController::class, 'getFaq']);
Route::post('/updateFaq/{id}', [FaqController::class, 'updateFaq']);
Route::get('/searchFaq/{key}', [FaqController::class, 'searchFaq']);
Route::post('/chat', [ChatController::class, 'chat']);
Route::post('/trackAnonymousUser', [AnonymousUserController::class, 'trackAnonymousUser']);
Route::get('/positiveCasesByPostcodes', [TestResultController::class, 'getPositiveCasesByPostcodes']);

//yujia
Route::get('/storeServices', [ServiceController::class, 'storeServices']);
Route::get('/getServices', [ServiceController::class, 'getServices']);
Route::post('/searchService', [ServiceController::class, 'searchService']);
Route::delete('/deleteService/{id}', [ServiceController::class, 'deleteService']);
Route::post('/addService', [ServiceController::class, 'addService']);
Route::post('/updateService/{id}', [ServiceController::class, 'updateService']);
Route::get('/usersLoggedInLastNDays/{days}', [ReportUserController::class, 'usersLoggedInLastNDays']);
Route::get('/usersRegisteredPerPeriod/{period}', [ReportUserController::class, 'usersRegisteredPerPeriod']);
Route::get('/websiteVisitsInLastNDays/{days}', [WebsiteVisitsController::class, 'getWebsiteVisits']);
Route::post('/services/sort', 'App\Http\Controllers\ListController@sortServices');
