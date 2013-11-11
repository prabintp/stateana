'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});


$(document).ready( function() {
	
	var myData = ["7","4","2","9","8","9","12","12","1","6","5","2","2","4","7","1","4","3","26","6"];
	var mytitle= ["11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","2 AM","3 AM","4 AM","5 AM","7 AM","9 AM","10 AM","11 AM"];
    $('#tpHourVisitBar').tpgraph({
       ydata       : myData,
       xdata       : mytitle
      
	});

});
