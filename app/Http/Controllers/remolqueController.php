<?php

namespace App\Http\Controllers;
use Response;
use \Carbon\Carbon;
use \App\Role;
use \App\Permission;

use App\Remolque;
use Request;
use Entrust;
class remolqueController extends Controller
{

   public function __construct()
    {
      
        $this->middleware('ability:admin,list', ['only' => ['index']]);
        $this->middleware('ability:admin,create-users',   ['only' => ['store']]);
        $this->middleware('ability:admin,create-users',   ['only' => ['destroy']]);
    }
    /**
     * Send back all comments as JSON
     *
     * @return Response
     */
    public function index()
    {

        if(Entrust::can('create-users')){
        return Response::json(Remolque::get());
    } else {
        return Response::json([]);
    }
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
 //       $user = new Remolque;




  
$data = Request::json()->all();


if(isset($data['_id'])){

$event=Remolque::find($data['_id'])->update($data);

} else {$event=Remolque::create($data);}


//$user->save();

//Remolque::create($data);

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
        Remolque::destroy($id);
    
        return Response::json(array('success' => true));
    }
}