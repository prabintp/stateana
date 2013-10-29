'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }).
  filter('pagingFilter', function () {
    return function(input, currentPage, pageSize ){
    return input ? input.slice(currentPage * pageSize, currentPage * ( pageSize + 1 )) : [];
    }
  });
