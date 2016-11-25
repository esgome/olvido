var routerApp = angular.module('routerApp', ['ui.router','ngMaterial', 'angularSpinner','ngMessages','ui.calendar', 'satellizer','ui.bootstrap','scrollable-table']);

routerApp.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide,$mdDateLocaleProvider) {
      


  $mdDateLocaleProvider.months = [
    'enero', 'febrero', 'marzo',
    'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre',
    'octubre', 'noviembre', 'diciembre'
  ];

  $mdDateLocaleProvider.shortMonths = [
    'ene', 'feb', 'mar',
    'abr', 'may', 'jun',
    'jul', 'ago', 'sep',
    'oct', 'nov', 'dic'
  ];

  $mdDateLocaleProvider.days = [
    'lunes', 'martes', 'miercoles', 'jueves', 'viernes',
    'sabado', 'domingo'
  ];
  $mdDateLocaleProvider.shortDays = [
    'Lu', 'Ma', 'Mi', 'Je', 'Vi', 'Sa', 'Do'
  ];

  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = new Date(dateString);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('L');
  };
  $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
    return $mdDateLocaleProvider.shortMonths[date.getMonth()] + ' ' + date.getFullYear();
  };
  $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    return 'Semana ' + weekNumber;
  };
  $mdDateLocaleProvider.msgCalendar = 'Calendario';
  $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';



      function redirectWhenLoggedOut($q, $injector) {

        return {

          responseError: function(rejection) {
            console.log('rejection', rejection);
            // Need to use $injector.get to bring in $state or else we get
            // a circular dependency error
            var $state = $injector.get('$state');

            // Instead of checking for a status code of 400 which might be used
            // for other reasons in Laravel, we check for the specific rejection
            // reasons to tell us if we need to redirect to the login state
            var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid','invalid_credentials'];

            // Loop through each rejection reason and redirect to the login
            // state if one is encountered
            angular.forEach(rejectionReasons, function(value, key) {

              if(rejection.data.error === value) {
                
                // If we get a rejection corresponding to one of the reasons
                // in our array, we know we need to authenticate the user so 
                // we can remove the current user from local storage
                localStorage.removeItem('user');

                // Send the user to the auth state so they can login
                $state.go('auth');
              }
            });

            return $q.reject(rejection);
          }
        }
      }

      $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

      // Push the new factory onto the $http interceptor array
      $httpProvider.interceptors.push('redirectWhenLoggedOut');

      $authProvider.loginUrl = '/api/authenticate';

      $urlRouterProvider.otherwise('/auth');



  $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
          url: '/home',
          templateUrl: 'templates/partial-home.html',
          controller: 'eventsCtrl',
          data: {loginRequired: true},

          resolve: {  
          dbTrac:  function(Database){return Database.get('tractors')},
          dbBit: function(Database){return Database.get('eventos')}

        },   
        params: {event: null}
      }).state('auth', {
                    url: '/auth',
                    templateUrl: 'templates/authView.html',
                    controller: 'AuthController as auth'
      }).state('users', {
                    url: '/users',
                    templateUrl: 'templates/userView.html',
                    controller: 'UserController as user',
                    data: {loginRequired: true}
                })
        
        // nested list with custom controller
        .state('home.list', {
          url: '/list',
          templateUrl: 'templates/partial-home-list.html'

        }).state('home.crud', {
          url: '/crud',
          templateUrl: "templates/crud.html",   
          params: {event: null}

        }).state('home.crud.modal', {

          views:{
           "modal": { templateUrl: 'templates/modal.html'}
         },

         url: '/modal',
         onEnter: ["$state", function($state) {
          $(document).on("keyup", function(e) {
            if(e.keyCode == 27) {
              $(document).off("keyup");
              $state.go('home.crud');
            }
          });

          $(document).on("click", ".Modal-backdrop, .Modal-holder", function() {
            $state.go('home.crud');
          });

          $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
            e.stopPropagation();
          });
        }],
        abstract: true

      }).state('home.calendar', {
        url: '/calendar',
        templateUrl:'templates/calendar.html'
      }).state('home.crud.modal.trac', {
        url: '/trac',

        views: {
          "modal": {
            templateUrl: 'templates/crud.trac.html'      }
          }      



        }).state('home.crud.modal.rem', {
        url: '/rem',

        views: {
          "modal": {
            templateUrl: 'templates/rem.html'      }
          }      



        }).state('home.crud.modal.viaticos', {
        url: '/viaticos',

        views: {
          "modal": {
            templateUrl: 'templates/viaticos.html'      }
          }      



        }).state('home.crud.modal.admin', {
          url: '/admin',

          views: {
            "modal": {
              templateUrl: 'templates/admon.html'      }
            }      

            
            
          }).state('db', {
          url: '/db',

          templateUrl: "templates/databases.html",
          controller: "traclistController",
                    data: {loginRequired: true}


            
            
          })


        .state('db.views', {
          url: '/views',
          views:{

            'tractors':{templateUrl: "templates/traclist.html",

                        resolve:{dbTrac:  function(Database){return Database.get('tractors')}}
          },
            'remolques':{templateUrl: "templates/remlist.html"}






        }

  

            
            
          }).state('db.views.modal', {

          views:{
           "modalTrac": { templateUrl: 'templates/modal.html'}
         },

         url: '/modal',
         onEnter: ["$state", function($state) {
          $(document).on("keyup", function(e) {
            if(e.keyCode == 27) {
              $(document).off("keyup");
              $state.go('db.views');
            }
          });

          $(document).on("click", ".Modal-backdrop, .Modal-holder", function() {
            $state.go('db.views');
          });

          $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
            e.stopPropagation();
          });
        }],
        abstract: true

      }).state('db.views.modal.dbcrudtractor', {
        url: '/dbcrudtractor',

        views: {
          'modal': {templateUrl: 'templates/crudtractor.html' }

          }      



        }).state('db.views.modal.spinner', {
        url: '/spinner',

        views: {
          'modal': {template: '<span us-spinner></span>' }

          }      



        }).state('db.views.modal.dbcrudremolque', {
        url: '/dbcrudremolque',

        views: {
          'modal': {templateUrl: 'templates/crudremolque.html' }

          }      



        }).state('home.remolques', {
          url: '/remolques',

          templateUrl: "templates/remlist.html",
          controller: "remlistController"     

            
            
          }).state('home.remolques.modal', {

          views:{
           "modalTrac": { templateUrl: 'templates/modal.html'}
         },

         url: '/rem/modal',
         onEnter: ["$state", function($state) {
          $(document).on("keyup", function(e) {
            if(e.keyCode == 27) {
              $(document).off("keyup");
              $state.go('home.remolques');
            }
          });

          $(document).on("click", ".Modal-backdrop, .Modal-holder", function() {
            $state.go('home.remolques');
          });

          $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
            e.stopPropagation();
          });
        }],
        abstract: true

      }).state('home.remolques.modal.crudremolque', {
        url: '/crudtractor',

        views: {
          "modal": {
            templateUrl: 'templates/crudremolque.html'      }
          }      



        })
        
        // nested list with just some random string data
        
        
      });




routerApp.run(function($rootScope, $state, $auth){

      // $stateChangeStart is fired whenever the state changes. We can use some parameters
      // such as toState to hook into details about the state as it is changing
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {



         var loginRequired = false;

// check to see if to access this state they need to log in
if(toState.data && toState.data.loginRequired)
loginRequired = true;

// if login is required and user isn't authenticated
// and they're not already going to login page
// redirect them to login page
if(loginRequired && !$auth.isAuthenticated() && toState.name != 'auth') {
event.preventDefault();
$state.go('auth');

// Remove the authenticated user from the local storage
localStorage.removeItem('user');

}


        // Grab the user from local storage and parse it to an object
        var user = JSON.parse(localStorage.getItem('user'));      

        // If there is any user data in local storage then the user is quite
        // likely authenticated. If their token is expired, or if they are
        // otherwise not actually authenticated, they will be redirected to
        // the auth state because of the rejected request anyway
        if(user && $auth.isAuthenticated()) {

          // The user's authenticated state gets flipped to
          // true so we can now show parts of the UI that rely
          // on the user being logged in
          $rootScope.authenticated = true;

          // Putting the u  ser's data on $rootScope allows
          // us to access it anywhere across the app. Here
          // we are grabbing what is in local storage
          $rootScope.currentUser = user;

          $rootScope.fromState = fromState;
          $rootScope.toState = toState;

          // If the user is logged in and we hit the auth route we don't need
          // to stay there and can send the user to the main state
          if(toState.name === "auth") {

            // Preventing the default behavior allows us to use $state.go
            // to change states
            event.preventDefault();

            // go to the "main" state which in our case is users
            $state.go('home');
          }   
        }
      });
});

routerApp.factory('Database',['$http','$state', function($http,$state) {

    return {
        // get all the comments
        get : function(database) {

            return $http.get('/api/'+database);
        },

        // save a comment (pass in comment data)
        save : function(commentData,database) {
         
            return $http({
                method: 'POST',
                url: '/api/'+database,
                headers: { 'Content-Type' : 'application/json' },
                data: commentData
            });
        },

        // destroy a comment
        destroy : function(id,database) {
            return $http.delete('/api/'+database+'/' + id);
        }
    }

}]);

