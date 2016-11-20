<?php

namespace App;

use \Carbon\Carbon;
use Moloquent\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Model;

class Evento extends Eloquent
{
	  protected $fillable = ['title','start','end','backgroundColor','admin','viaticos','tractor','rem1','rem2','chofer'];
}
