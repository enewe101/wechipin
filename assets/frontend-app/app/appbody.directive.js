var app = angular.module('app');

app.directive('appbody', function($compile) {
  return {
    link: function(scope, element){},
    controller: 'appcontroller',
		templateUrl: '/frontend-app/app/appbody.template.html'
  };
});

app.controller('appcontroller', ['$rootScope', '$scope', 'userService',
function($rootScope, $scope, userService){

			// Create a watch that keeps track of the number of digests happening
			// in the app
      var nbDigest = 0;
      $rootScope.$watch(function() {
        nbDigest++;
        console.log('digest-' + nbDigest);
      })

			// Determine if a user is signed in
			$scope.userService = userService;

}]);
