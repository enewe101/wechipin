angular.module('application').directive('application', function(){
	return {
		templateUrl: '/frontend-app/application/application.template.html',
		scope: {
			opportunityid: '='
		},
		controller: 'applicationController'
	}
})

angular.module('application').controller('applicationController',
['$scope', 'opportunitysearchservice',
function($scope, opportunitysearchservice){

	$scope.test_val = $scope.opportunityid;
}]);
