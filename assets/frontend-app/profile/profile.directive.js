angular.module('profile').directive('profile', [function(){
	return {
		scope: {
			user: '=?'
		},
		templateUrl: '/frontend-app/profile/profile.template.html',
		controller: 'profileController',
		link: function(scope, element) {
			console.log(scope.user);
		}
	};
}]);

angular.module('profile').controller('profileController', ['$scope', '$sce',
function($scope, $sce){
	$scope.filter_val = function(val) {
		if(typeof val === 'undefined') {
			return $sce.trustAsHtml('<span class="not-specified">not specified</span>');
		}
		return val;
	}
}]);
