angular.module('message').directive('message', function(){
	return {
		scope: {
			'spec' : '='
		},
		templateUrl: '/frontend-app/message/message.template.html',
		controller: 'messageController'
	};
})

angular.module('message').controller('messageController', ['$scope', function($scope){
	$scope.spec['createdAt'] = date_format($scope.spec['createdAt'], 'M jS, Y');
}]);
