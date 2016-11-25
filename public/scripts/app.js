


routerApp.controller('eventsCtrl', ['$scope' ,'$state','$auth','$rootScope','$compile','filterFilter','uiCalendarConfig' ,'dbBit','dbTrac' ,'$stateParams' , 'Database', function ($scope,$state,$auth,$rootScope, $compile,filterFilter ,uiCalendarConfig ,dbBit,dbTrac ,$stateParams , Database) {


  $scope.events = dbBit.data;

  if (angular.isDefined($scope.events[0])){
    console.log('fecha init',$scope.events[0])


  }
  $scope.eventSources = [$scope.events];

// $scope.eventRender = function( event, element, view ) { 
//    element.attr({'uib-tooltip': event.title+' TR: '+ event.tractor.numEco,
//     'uib-tooltip-append-to-body': true});
//  };


  function cleanCalendar(){
    if(uiCalendarConfig.calendars.myCalendar1 !=null){

      uiCalendarConfig.calendars.myCalendar1.fullCalendar('removeEventSources');



    }
  }



  function populate(dbBit){
    cleanCalendar();
    angular.forEach(dbBit,function(evento,key){
      console.log('dbBit',dbBit[key])

      evento.stick = true;


    } )
    $scope.events = dbBit;
    $scope.eventSources = [$scope.events];



  }



  $scope.uiConfig = {
    calendar:{
      height: 600,
      editable: true,
      eventLimit: true,

       header: { left: 'prev,next today', center: 'title', right: 'month,agendaWeek,agendaDay'},
      eventClick: function(evento){
delete evento.source;



        var fromDate = new Date(evento.start);
        var endDate = new Date(evento.end);
        $scope.event=evento
        $scope.event.start = fromDate;
        $scope.event.end = endDate;
        $scope.event.minDate2=fromDate;
        $state.go('home.crud');



      },
      eventRender:$scope.eventRender,
      eventDrop: function(evento,delta,revertFunc){
var temp=angular.copy(evento);
delete temp.source;
        temp.start = new Date(evento.start);
        temp.end = new Date(evento.end);

     Database.save(temp,'eventos').then(function(response){
             
          }, function errorCallback(response) {revertFunc()});

  



      },
      eventResize: function(evento,delta,revertFunc){
var temp=angular.copy(evento);
delete temp.source;
        temp.start = new Date(evento.start);
        temp.end = new Date(evento.end);

     Database.save(temp,'eventos').then(function(response){
             
          }, function errorCallback(response) {revertFunc()});

  



      },
      selectable:true,
      selectHelper:true,
      select: function(start,end){

        var fromDate = new Date(start);
        var endDate = new Date(end);
        $scope.event={};
          
        $scope.event.title = 'new';
        $scope.event.backgroundColor='#378006';
        $scope.event.start = fromDate;
        $scope.event.end = endDate;
        $scope.event.minDate2=fromDate;
        $scope.event.tractor={};
        $scope.event.stick = true;
       var temp = uiCalendarConfig.calendars.myCalendar1.fullCalendar('addEvent',$scope.event)
        console.log('nuevo evento ',temp);

        $state.go('home.crud');

      }

    }
  };





  


  $scope.editar= function(m){  


    if(angular.isUndefined(m.source)){

      $scope.event=m

      console.log('m',m);

    } else {


console.log('m.source',m.source);


      $scope.event=m.source


    }


    $state.go('home.crud');


  };


  $scope.retirar = function (m) {

    console.log('eme',m);
    console.log('$scope.event',$scope.events);
  
    Database.destroy(m._id,'eventos').then(function (response){

Database.get('eventos').then(function(newresponse){

      populate(newresponse.data);

      console.log('response',newresponse.data);
    })
    });





  };


  $scope.search='';
           $scope.sortType     = 'start'; // set the default sort type
           $scope.sortReverse  = false;


           $scope.searchDB = function(){
            $scope.eventSources = [filterFilter($scope.events,$scope.search)];

            uiCalendarConfig.calendars['myCalendar1'].fullCalendar('refetchEventSources');
            $state.reload('home.calendar')

          }


          function gofecha(){


           uiCalendarConfig.calendars.myCalendar1.fullCalendar('gotoDate',new Date(16,11,24));



         }

$scope.item={};
$scope.items=[];



         $scope.admin= function(){


        


          Database.get('remitentes').then(function (remitentes){


          if(angular.isDefined($scope.event.admin)){
   
        angular.forEach(remitentes,function(remitente,key){
            console.log('',$scope.event.admin.remitente.origen,remitente.origen)
                  if(remitente.origen == $scope.event.admin.remitente.origen){

                $scope.remitente=remitente
          }


              })
              } else {
                $scope.event.admin={
              remitente:{productos:[]},
              destinatario:""
            }

            $scope.remitente="";
              }
          $scope.remitentes=remitentes;

          console.log("remitentes",$scope.remitentes)


           $state.go('home.crud.modal.admin');


        });
         


        }


       $scope.nuevoOrigen=function(remitente){

console.log('productis',remitente)

var temp={}
angular.copy(remitente,temp)
temp.productos =[]
$scope.event.admin.remitente=temp;



      }
               

        $scope.additem = function(item){

var temp={};
angular.copy(item,temp)
$scope.event.admin.remitente.productos.push(temp);
      console.log('response',$scope.event.admin.remitente.productos);


        }

        $scope.updateAdmin=function(){


$scope.event.admin=$scope.admin


        }



        $scope.tractores= function(){
          dbtracbusy();


          $state.go('home.crud.modal.trac');


        };



        $scope.remolques= function(){
          dbrembusy();


          $state.go('home.crud.modal.rem');


        };
        
        $scope.cancel = function(){


          $state.go('home.calendar');


        };



        $scope.updateCustomer = function () {


          var fecha = $scope.event.end
              console.log('fecha ',fecha)

          Database.save(angular.copy($scope.event),'eventos').then(function(response){
             
console.log('respuesta id ',response);
          
            $state.reload('home');
            $state.go('home.calendar');

          });







        };






        $scope.itemsViaticos=["Diesel","casetas","alimentos","hospedaje","Otros"]


$scope.viaticos = function(){

if(angular.isUndefined($scope.event.viaticos)){

$scope.event.viaticos=[]

}

$state.go('home.crud.modal.viaticos')
}



$scope.addViatico=function(item){
var temp={concepto:item,cantidad:"",rederencia:"",fecha:""}
$scope.event.viaticos.push(temp)


}
  //QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ




  $scope.dbTrac=dbTrac.data;
  function dbtracbusy(){
    $scope.tracBusy=[]; 
    angular.forEach($scope.dbTrac,function(trac,key){

      var temp = {_id: trac._id,numEco:trac.numEco,event:[]}


      angular.forEach($scope.events,function(fecha, key2){
        if (fecha.tractor._id == trac._id) {




          if ((new Date(fecha.end) >= $scope.event.start  && new Date(fecha.end) <= $scope.event.end ) || (new Date(fecha.start) >= $scope.event.start  && new Date(fecha.start) <= $scope.event.end )) {

            temp.busy = true
            temp.event.push({title: fecha.title,start: fecha.start,end: fecha.end})

          } else {

          };
        } 


      });

      $scope.tracBusy.push(temp);
      if ($scope.tracBusy[key].event.length > 0)
        console.log('busy',$scope.tracBusy[key].event[0].title);


    });}



  function dbrembusy(rem){
$scope.rem=rem
   Database.get('remolques').then(function(response){
              console.log('response 2',response)
$scope.dbRem=response.data

      

    $scope.remBusy=[]; 
    angular.forEach($scope.dbRem,function(trac,key){

      var temp = {_id: trac._id,numEco:trac.numEco,event:[]}
      console.log('rem',trac)


      angular.forEach($scope.events,function(fecha, key2){
          console.log('events fin',fecha)


        if (angular.isDefined(fecha.rem1)){
          console.log('si busy',fecha.end)

                if (fecha.rem1._id == trac._id) {

console.log('si busy',fecha.end,$scope.event.start)


          if ((new Date(fecha.end) >= $scope.event.start  && new Date(fecha.end) <= $scope.event.end ) || (new Date(fecha.start) >= $scope.event.start  && new Date(fecha.start) <= $scope.event.end )) {
console.log('super',fecha.end,$scope.event.start)

            temp.busy = true;

          } 
            temp.event.push({title: fecha.title,start: fecha.start,end: fecha.end});




        };


        } 
        if (angular.isDefined(fecha.rem2)){
          console.log('si busy',fecha.end)

                if (fecha.rem2._id == trac._id) {

console.log('si busy',fecha.end)


          if ((new Date(fecha.end) >= $scope.event.start  && new Date(fecha.end) <= $scope.event.end ) || (new Date(fecha.start) >= $scope.event.start  && new Date(fecha.start) <= $scope.event.end )) {

            temp.busy = true;
            temp.event.push({title: fecha.title,start: fecha.start,end: fecha.end});

          } };


        } 

      });

      $scope.remBusy.push(temp)

     
    });



    });

}
    $scope.answer = function(m){



angular.forEach($scope.dbTrac,function(trac,key){

if(trac._id == m._id){
  $scope.event.tractor=trac
}

});





     console.log('ta aaaa',m);
     $state.go('home.crud');

         

 
}

   $scope.answerrem = function(m){



angular.forEach($scope.dbRem,function(trac,key){

if(trac._id == m._id){

  if ($scope.rem == '1'){

  $scope.event.rem1=trac

} else {
  $scope.event.rem2=trac


}
}

});





     console.log('ta aaaa',m);
     $state.go('home.crud');

         

 
}


$scope.logout = function() {

            $auth.logout().then(function() {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;

            
            });
        }





}]);

routerApp.controller('AuthController',[ '$auth','$state','$http' ,'$rootScope' ,function AuthController($auth, $state, $http, $rootScope) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            $auth.login(credentials).then(function(response) {
console.log('response 0',response)

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get('api/authenticate/user').then(function(response) {
console.log('response',response)
                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('home');
            });

            // Handle errors
            }, function(error) {
              

                vm.loginError = true;
                vm.loginErrorText = error.data.error;
                console.log('response 1',vm.loginErrorText)
                $state.go('home');

            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
            })
        }
    }]);


routerApp.controller('traclistController',['$http','$auth','$timeout','$rootScope','$state' ,'$scope','Database',function traclistController($http, $auth,$timeout, $rootScope,$state,$scope,Database) {

$scope.database= function(fuente){
  $scope.fuente=fuente;

  $state.go('db.views.modal.spinner').then(function(){

Database.get(fuente).then(function(response){

$scope.dbTrac=response.data
}).then(function(){
$state.go('db.views')

})

  });

console.log('fuente',fuente);



}

console.log('from ',$rootScope.fromState)

$scope.editarTractor=function(m,fuente){

  console.log('fuente',fuente)
$scope.formData=m;
$scope.dbview=fuente;
            $state.go('db.views.modal.dbcrud'+fuente);
console.log('from ',$rootScope.fromState)


}


  $scope.retirarTractor = function (m) {

  
    Database.destroy(m._id,'tractors').then(function (response){

Database.get('tractors').then(function(newresponse){

   $scope.dbTrac=newresponse.data;


   console.log('tractor',newresponse.data);
    })
    });
}
        $scope.updateTractor = function (fuente) {

console.log('scope tractor ',$scope.formData);

     console.log('from ',$rootScope.fromState);
   
     console.log('fuente ',fuente);

          Database.save(angular.copy($scope.formData),fuente+'s').then(function(response){
             Database.get(fuente+'s').then(function(newresponse){

   $scope.dbTrac=newresponse.data;


   console.log('tractor',newresponse.data);
    })
          

            $state.go('db.views');

          });







        };


    }
]);  



routerApp.controller('UserController',['$http','$auth','$rootScope','$state' ,function UserController($http, $auth, $rootScope,$state) {

        var vm = this;

        vm.users;
        vm.error;

        vm.getUsers = function() {

            //Grab the list of users from the API
           $http.get('api/authenticate').success(function(users) {
                vm.users = users;
            }).error(function(error) {
                vm.error = error;

            });
        }

        // We would normally put the logout method in the same
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        vm.logout = function() {

            $auth.logout().then(function() {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;

                $state.go('auth');
            });
        }
    }
]);  

    