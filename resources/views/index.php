<!DOCTYPE html>
<html>
<head>

    <!-- CSS (load bootstrap) -->
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
    <link rel="stylesheet" href="node_modules/fullcalendar/dist/fullcalendar.css">
    <link rel="stylesheet" href="node_modules/angular-scrollable-table/scrollable-table.css">


    <style>
        .navbar { border-radius:0; }

        *
        {
          box-sizing: border-box;
      }

      .Modal-backdrop
      {
       position: fixed;
       top: 0px;
       left: 0px;
       height:100%;
       width:100%;
       background: #000;
       z-index: 1;
       opacity: 0.5;
   }

   .Modal-holder
   {


     overflow: hidden;
     position: fixed;
     top: 0px;
     left: 0px;
     height:100%;
     width:100%;
     background: transparent;
     z-index: 2;
     padding: 30px 15px;
 }

 .Modal-box
 {

  margin: 0 auto;
  width: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.3);
  position: relative;

}

@media screen and (min-width: 992px)
{
  .Modal-box
  {
    width: 80%;
    padding: 30px;

}

.scrollableContainer { height: 200px; }
}
div.scroll {

    height: 300px;
    overflow-y: scroll;
}

.cajas {
  margin-top:10px;
  padding: 10px;
  border: #cdcdcd medium solid;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}







</style>
<script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>

<!-- JS (load angular, ui-router, and our custom js file) -->
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="node_modules/angular-animate/angular-animate.min.js"></script>
<script src="node_modules/angular-aria/angular-aria.min.js"></script>
<script src="node_modules/angular-messages/angular-messages.min.js"></script>
<script src="node_modules/satellizer/dist/satellizer.js"></script>
<script src="node_modules/spin.js/spin.js"></script>

<script src="node_modules/angular-spinner/angular-spinner.js"></script>

<!-- Angular Material Library -->
<script src="node_modules/angular-material/angular-material.js"></script>
<script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"></script>
<!-- jquery, moment, and angular have to get included before fullcalendar -->
<script type="text/javascript" src="node_modules/moment/min/moment.min.js"></script>
<script type="text/javascript" src="node_modules/fullcalendar/dist/fullcalendar.min.js"></script>
<script type="text/javascript" src="node_modules/angular-ui-calendar/src/calendar.js"></script>
<script type="text/javascript" src="node_modules/angular-scrollable-table/angular-scrollable-table.min.js"></script>
<script src="scripts/config.js"></script>
<script src="scripts/app.js"></script>
</head>

<!-- apply our angular app to our site -->
<body ng-app="routerApp">

    <!-- NAVIGATION -->
    <nav class="navbar navbar-inverse" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand" ui-sref="#">Transportes Olvido</a>
        </div>
        <ul class="nav navbar-nav">
            <li><a ui-sref="home">Home</a></li>
            <li><a ui-sref="db">Base de datos</a></li>
        </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <!-- THIS IS WHERE WE WILL INJECT OUR CONTENT ============================== -->
    <div class="container">
        <div ui-view></div>
    </div>

    <div class="text-center">
        <p>App by <a href="#/crud" target="_blank">esgo</a></p>

    </div>

</body>
</html>
