<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/monodb', function () {
    $event= Evento::all();

    print_r(json_encode($event));
});

Route::get('/trac', function () {
    $trac= Tractor::all();

    print_r(json_encode($trac));
});


// Route to create a new role
Route::post('role', 'AuthenticateController@createRole');
// Route to create a new permission
Route::post('permission', 'AuthenticateController@createPermission');
// Route to assign role to user
Route::post('assign-role', 'AuthenticateController@assignRole');
// Route to attache permission to a role
Route::post('attach-permission', 'AuthenticateController@attachPermission');



// API ROUTES ==================================  

    // since we will be using this just for CRUD, we won't need create and edit
    // Angular will handle both of those forms
    // this ensures that a user can't access api/create or api/edit when there's nothing there
  






Route::group(['prefix' => 'api'], function()
{
Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);

Route::post('authenticate', 'AuthenticateController@authenticate');
Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

    Route::resource('tractors', 'tractorController', 
        array('only' => array('index', 'store', 'destroy')));

    Route::resource('eventos', 'eventController', 
        array('only' => array('index', 'store', 'destroy')));

        Route::resource('remolques', 'remolqueController', 
        array('only' => array('index', 'store', 'destroy')));
Route::post('user-detail',['uses'=> 'AuthenticateController@checkRoles']);

});



