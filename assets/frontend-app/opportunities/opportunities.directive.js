angular.module('opportunities').directive('opportunities', function(){
	return {
		templateUrl: '/frontend-app/opportunities/opportunities.template.html',
		controller: 'opportunitiescontroller'
	}
})


angular.module('opportunities').controller('opportunitiescontroller',
['$scope', '$element', '$compile', 'opportunitysearchservice', 'constantsService',
function($scope, $element, $compile, opportunitysearchservice, constantsService){



	// Place the choices list on the scope, which lets it be passed to the
	// child expandchoices scope
	$scope.choices = constantsService.choices;

	$scope.onchange = function(key, choice, value){

		if(value) {
			opportunitysearchservice['filters'][key].push(choice);
		} else {
			let index = opportunitysearchservice['filters'][key].indexOf(choice);
			if(index > -1) {
				opportunitysearchservice['filters'][key].splice(index, 1);
			}
		}

		console.log(opportunitysearchservice['filters']);
		opportunitysearchservice.filter(render_opportunities);
	}

	$scope.onsearch = function(query){
		console.log('Performing text search: ' + query);
		opportunitysearchservice.textquery = query;
		opportunitysearchservice.filter(render_opportunities);
	}

	let opportunities_container = $element.find('#opportunities-container');
	let opportunity_template = '<opportunity job="job"></opportunity>';

	// Stores a reference to the opportunities (each is a tuple, first is the
	// scope object, second is the html object)
	job_handles = [];
	function render_opportunities() {
		// First destroy any existing opporutnitites
		for (let i = 0; i < job_handles.length; i++) {
			job_handles[i][0].$destroy();
		}
		job_handlesl = []
		opportunities_container.empty();

		for (let i = 0; i < opportunitysearchservice.opportunities.length; i++) {
			let job = opportunitysearchservice.opportunities[i];
			let new_scope = $scope.$new(false);
			new_scope.job = job;
			let new_opportunity = $compile(opportunity_template)(new_scope);
			opportunities_container.append(new_opportunity);
			job_handles.push([new_scope, new_opportunity]);
		}
	}

	opportunitysearchservice.onload(render_opportunities);

	// Iterate over all of the jobs (opportunities): for each, build a scope, then
	// compile an html element from the scope.

}]);
