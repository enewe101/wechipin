angular.module('application').directive('application', ['$compile', 'opportunitysearchservice',
function($compile, opportunitysearchservice){
	return {
		templateUrl: '/frontend-app/application/application.template.html',
		scope: {
			opportunityid: '='
		},
		controller: 'applicationController',
		link: function(scope, element) {
			let application_template = '<visible-application job="job"></visible-application>';
			opportunitysearchservice.onload(function(){
				let new_scope = scope.$new(false);
				new_scope.job = opportunitysearchservice['opportunities_index'][scope.opportunityid]
				let new_application_elm = $compile(application_template)(new_scope);
				element.find('#application-target').html(new_application_elm);
			})
		}
	}
}])

angular.module('application').controller('applicationController',
['$scope', 'opportunitysearchservice',
function($scope, opportunitysearchservice){
}]);
