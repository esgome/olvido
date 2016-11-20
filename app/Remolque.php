<?php

namespace App;


use Moloquent\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Model;

class Remolque extends Eloquent
{


		  protected $fillable = ['numEco','modelo','placas','numSer','poliza','fecha-poliza','mantenimiento'];
}
