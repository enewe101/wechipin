'use strict';

var app = angular.module('app', ['user', 'welcome', 'header', 'dropmenu', 'login'],
function($rootScopeProvider){
  $rootScopeProvider.digestTtl(45);
});


app.config(function($httpProvider) {
  // Supposed to speed loading time by grouping together template loads into
  // small batches that then trigger only one digest cycle.
  // see https://docs.angularjs.org/api/ng/provider/$httpProvider
  $httpProvider.useApplyAsync(true);
});
