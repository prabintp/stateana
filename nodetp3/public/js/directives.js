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
    }]);
  




    
