angular.module('opportunities').directive('opportunity', function(){
	return {
		scope: {
			'job': '='
		},
		link: function(scope, element){},
		templateUrl: '/frontend-app/opportunities/opportunity.template.html',
		controller: 'opportunitycontroller'
	};
});

angular.module('opportunities').controller('opportunitycontroller', ['$scope', function($scope){
	$scope.add_article = function(name) {
		if (name==='sick' || name==='differently-abled') {
			return 'the ' + name;
		}
		if (name==='poor-homeless') {
			return 'the poor / homeless';
		}
		if (name==='family') {
			return 'families';
		}
		return name;
	}
}]);
