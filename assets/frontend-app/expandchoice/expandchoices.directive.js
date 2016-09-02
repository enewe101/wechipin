angular.module('expandchoice').directive('expandchoices', function(){
	return {
		scope: {
			'choices': '=',
			'onchange': '='
		},
		template: '<div class="expandchoicetarget"></div>',
		controller: 'expandchoicescontroller',
	};
});

angular.module('expandchoice').controller('expandchoicescontroller',
['$scope', '$element', '$compile', function($scope, $element, $compile){


	function onexpand(index) {
		$scope.$broadcast('close-expandchoices', {index:index});
	}

	var state = {};

	function onchange(index, tag, choice, value) {
		console.log(tag);
		state[tag][choice] = value;
		//state[tag][choice] = value;
		$scope.onchange(tag, choice, value);
		console.log('onchange');
	}

	let choice_template = [
		'<expandchoice ',
			'choicespec="choicespec" ',
			'index="index" ',
			'onexpand="onexpand" ',
			'onchange="onchange">',
		'</expandchoice>'
	].join('');

	let target = $element.find('.expandchoicetarget');
	let choice_handles = [];
	for (let i = 0; i < $scope.choices.length; i++) {

		// Create a new scope for the choice group, and bind some data to it
		let new_scope = $scope.$new(false);
		new_scope.choicespec = $scope.choices[i];
		new_scope.index = i;
		new_scope.onexpand = onexpand;
		new_scope.onchange = onchange;

		state[$scope.choices[i].tag] = {}
		for (let j = 0; j < $scope.choices[i]['choices'].length; j++) {
			state[$scope.choices[i].tag][$scope.choices[i]['choices'][j]] = true;
		}

		// Create the html element for the new choice group, bind the scope to it
		// and append it to the choicegroups target div
		let new_expandchoice = $compile(choice_template)(new_scope);
		target.append(new_expandchoice);

		// Keep a reference to the created scopes and html elements
		choice_handles.push([new_scope, new_expandchoice]);
	}

}]);
