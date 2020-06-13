<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// The registration and login requests doesn't come with tokens
// as users at that point have not been authenticated yet
// Therefore the jwtMiddleware will be exclusive of them

Route::post('user/login', 'UserController@login');
Route::post('user/register', 'UserController@register');

Route::group(['middleware' => ['jwt.auth']], function () {
    // all routes to protected resources are registered here
    Route::get('users/list','UsersController@get');
    Route::post('/table/{name}','TableController@create');
});

