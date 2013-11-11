'use strict';

/* Directives */



angular.module('myApp.directives', []).
    directive('appVersion', function (version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }).
    directive('paging', function () {
        return {
            template:'<ul><li><a href=""#><button class="blank_btn" href="#" ng-disabled="!hasPrevious()" ng-click="onPrev()">← Previous</button></a></li><li class="active"><a href="#">{{start()}} - {{end()}} out of {{size()}} </a></li><li><a href="#"> <button class="blank_btn" href="#" ng-disabled="!hasNext()" ng-click="onNext()">Next → </button></a></li><li ng-transclude=""></li> </ul>',
            restrict:'AEC',
            transclude:true,
            scope:{
                'currentPage':'=',
                'pageSize':'=',
                'data':'&'
 
            },
            link:function($scope, element, attrs){
 
                $scope.size = function(){
 
                    return angular.isDefined($scope.data()) ? $scope.data().length : 0;
                };
 
                $scope.end = function(){
                    return $scope.start() + $scope.pageSize;
                };
 
                $scope.start = function(){
                    return $scope.currentPage * $scope.pageSize;
                };
 
                $scope.page = function(){
                    return !!$scope.size() ? ( $scope.currentPage + 1 ) : 0;
                };
 
                $scope.hasNext = function(){
                    return $scope.page() < ( $scope.size() / $scope.pageSize ) ;
                };
 
                $scope.onNext = function(){
                    $scope.currentPage = parseInt($scope.currentPage) + 1;
                };
 
                $scope.hasPrevious = function(){
                    return !!$scope.currentPage;
                } ;
 
                $scope.onPrev = function(){
                    $scope.currentPage=$scope.currentPage-1;
                };
 
                try{
                    if ( typeof($scope.data) == "undefined"){
                        $scope.data = [];
                    }
                    if ( typeof($scope.currentPage) == "undefined" ){
                        $scope.currentPage = 0;
                    }
                    if ( typeof($scope.pageSize) == "undefined"){
                        $scope.pageSize = 10;
                    }
                }catch(e){
                    console.log(e);
                }
            }
 
        }
 
    })  
    .directive('ensureUnique', ['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, ele, attrs, c) {
                scope.$watch(attrs.ngModel, function() {
                    var val = ele.val();
                    if(val){
                        $http({
                            method: 'POST',
                            url: '/ischeck/'+attrs.ensureUnique,
                            data: {
                                'field':val
                            }
                        }).success(function(data, status, headers, cfg) {
                            c.$setValidity('unique', data.isUnique);
                        }).error(function(data, status, headers, cfg) {
                            c.$setValidity('unique', false);
                        });
                    }
                });
            }
        }
    }]).directive('map', ['$http', function($http) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function(scope, ele, attrs, c) {
             
                 var markers = [];
                 var markerCluster;
                var center = new google.maps.LatLng(37.4419, -122.1419);

                var map = new google.maps.Map(document.getElementById('geocluster_map'), {
                    zoom: 2,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
        
        
        
               $http({
                    method: 'POST',
                    data: {
                                'limit':scope.limit
                            },
                    url: '/geocluster_data'
                }).
                success(function (data, status, headers, config){
     
                   scope.clusterdata=data;
                  
                    //add markers
                   add_cluster_marker();
                            
               }).
                error(function (data, status, headers, config) {
                    scope.clusterdata = 'Error!'
                });
                
                
                //watch
                
               scope.$watch('limit', function(value) {
                    
                   scope.limit=value; 
                   
                   update_map();
                    
         
                    
                });
                
        
                //function to add cluster marker
                function add_cluster_marker(){
                    //clear_map();
                    if(markerCluster)
                     markerCluster.clearMarkers();
                    for (var i = 0; i < scope.clusterdata.length; i++) {
                        var dataPhoto = scope.clusterdata[i];
                        //alert(dataPhoto.latitude);
                        var latLng = new google.maps.LatLng(dataPhoto.latitude,
                            dataPhoto.longitude);
                        var marker = new google.maps.Marker({
                            position: latLng
                        });
                        markers.push(marker);
                    }
        
                    markerCluster = new MarkerClusterer(map, markers);
                    
                    
                }//add cluster marker end
                
                
                //map update
                function update_map(){
                    
                                 $http({
                    method: 'POST',
                    data: {
                                'limit':scope.limit
                            },
                    url: '/geocluster_data'
                }).
                success(function (data, status, headers, config){
     
                   scope.clusterdata=data;
                  
                    //add markers
                   add_cluster_marker();
                            
               }).
                error(function (data, status, headers, config) {
                    scope.clusterdata = 'Error!'
                });
                    
                }//update map ends
                
                
                function clear_map(){
                    
                    for (var i = 0, marker; marker = markers[i]; i++) {
                        
                        marker.setMap(null);
                      }
                    
                    
                }
                
        
      
        
        
        
        
            }
        }
    }]);




    
