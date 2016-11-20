<?php

namespace App\Http\Controllers;
use Response;
use \Carbon\Carbon;

use App\Tractor;
use Request;
class tractorController extends Controller
{
 
    /**
     * Send back all comments as JSON
     *
     * @return Response
     */
    public function index()
    {
        return Response::json(Tractor::get());
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
 //       $user = new Tractor;




  
$data = Request::json()->all();


if(isset($data['_id'])){

$event=Tractor::find($data['_id'])->update($data);

} else {$event=Tractor::create($data);}


//$user->save();

//Tractor::create($data);

//$user->title =$data['title'];
//$user->start = new Carbon(Request::input('start'));
//$user->end = new Carbon(Request::input('end'));

//$user->save();
    
        return Response::json( $data);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        Tractor::destroy($id);
    
        return Response::json(array('success' => true));
    }
}