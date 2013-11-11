'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
    controller('AppCtrl', function ($scope, $http) {

        $http({
            method: 'GET',
            url: '/api/name'
        }).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!'
        });

    }).
    controller('dashController', function ($scope, $http) {
        $scope.name='name';
        $scope.headers = ["name","count"];
        $scope.dataPageSize = 10;
       
        $scope.setPageSize = function(pageSize){
            $scope.dataPageSize = pageSize;
        }
        $scope.toggleHeader = function( header ){
            var headerIndex = $scope.headers.indexOf(header);
            if ( headerIndex >= 0 ){
                $scope.headers.splice(headerIndex,1);
            }else{
                $scope.headers.push(header);
            }
        };
        $scope.orderHeader = 'count';
        $scope.orderDirection = true;

        $scope.orderTableBy = function(header){
	
            if ( $scope.orderHeader == header && $scope.orderDirection == false){
                $scope.orderHeader = null; // clear sort.
            }
            else if ( $scope.orderHeader == header ){
                $scope.orderDirection = false;
            }else{
                $scope.orderHeader = header;
                $scope.orderDirection = true;
            }
        };
 
        $scope.availableHeaders = [];


        $http.get('/dash/today_top_content').success(function(d) {
            $scope.data = d;
            for ( header in $scope.data[0] ){
                $scope.availableHeaders.push(header);
            }
            console.log($scope.data)
            $scope.$apply(function(){
	
                $scope.data = d;
                for ( header in $scope.data[0] ){
                    $scope.availableHeaders.push(header);
                }
                console.log($scope.data)
            });	
			
        });


    }).
    controller('signupController', function ($scope) {
        // write Ctrl here
        $scope.submitted = false;
        $scope.signupForm = function() {
            if ($scope.signup_form.$valid) {
            // Submit as normal
            } else {
                $scope.signup_form.submitted = true;
            }
        }
    }).
    controller('sitesController', function ($scope, $http) {
        // write Ctrl here
      /* $scope.sites = [
{name:'learn angular', value:234},
{name:'learn angular', value:234},
{name:'learn angular', value:234},
{name:'learn angular', value:234},
{name:'learn angular', value:234},
{name:'build an angular app', value:345}];*/

  $http.get('/sites/get_sites').success(function(d) {
            $scope.sites = d;
            });
       
    }).controller('geoclusterController', function ($scope, $http) {

        $scope.name = 'cluster';
        $scope.limit = 5;
       

    });
        
        
       