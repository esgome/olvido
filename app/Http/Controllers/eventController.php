<?php

namespace App\Http\Controllers;
use Response;
use \Carbon\Carbon;

use App\Evento;
use Request;
class eventController extends Controller
{


        public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }
    /**
     * Send back all comments as JSON
     *
     * @return Response
     */
    public function index()
    {
        return Response::json(Evento::get());
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
 //       $user = new Evento;




  
$data = Request::json()->all();


if(isset($data['_id'])){

$event=Evento::find($data['_id'])->update($data);

} else {$event=Evento::create($data);}


//$user->save();

//Evento::create($data);

//$user->title =$data['title'];
//$user->start = new Carbon(Request::input('start'));
//$user->end = new Carbon(Request::input('end'));

//$user->save();
    
        return Response::json( $event);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        Evento::destroy($id);
    
        return Response::json(array('success' => true));
    }
}
