'use strict';

var app = angular.module('app', [
	'user', 'welcome', 'findcause', 'header', 'dropmenu', 'login', 'ui.router',
	'opportunities', 'application', 'alert', 'profile'
]
//	,function($rootScopeProvider){
//	  $rootScopeProvider.digestTtl(45);
//	}
);

app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

app.config(function($httpProvider) {
  // Supposed to speed loading time by grouping together template loads into
  // small batches that then trigger only one digest cycle.
  // see https://docs.angularjs.org/api/ng/provider/$httpProvider
  $httpProvider.useApplyAsync(true);
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	// Default to the welcome state
	$urlRouterProvider.otherwise('/')

	$stateProvider.state('welcome', {
		url: '/',
		template: '<welcome></welcome>'

	}).state('findcause', {
		url: '/findcause',
		template: '<findcause></findcause>'

	}).state('opportunities', {
		url: '/opportunities',
		template: '<opportunities></opportunities>'

	}).state('apply', {
		url: '/apply/{opportunityid}',
		template: '<application opportunityid="opportunityid"></application>',
		controller: function ($scope, $stateParams) {
			$scope.opportunityid = $stateParams['opportunityid'];
		}

	}).state('profile', {
		url: '/profile/{userid}',
		template: '<profile-view userid="userid"></profile-view>',
		controller: function ($scope, $stateParams) {
			$scope.userid = $stateParams['userid'];
		}

	});

}])
