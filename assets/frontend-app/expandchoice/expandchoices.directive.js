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

	// This function is a callback fired whenever one of the expandchoices is
	// opened.  It in turn broadcasts this fact down to all expandchoices, so that
	// all but the one just opened will close (so that only one expandchoice is
	// open at a time.)
	function onexpand(index) {
		$scope.$broadcast('close-expandchoices', {index:index});
	}

	// The state variable tracks the state of all the expandchoices that are under
	// this set of expanchoices.
	var state = {};
	//Initialize all options of all choices to be	selected
	for (let i = 0; i < $scope.choices.length; i++) {
		state[$scope.choices[i].key] = {}
		for (let j = 0; j < $scope.choices[i]['choices'].length; j++) {
			state[$scope.choices[i].key][$scope.choices[i]['choices'][j]] = true;
		}
	}

	// This function will be passed into the individual expandchoices contained
	// in this set of expandchoices.  It's a callback that they call on change.
	// In this we also fire a callback given to this set of expandchoices.
	// That way some client scope can watch this set for changes on all
	// expandchoices
	function onchange(index, key, choice, value) {
		state[key][choice] = value;
		$scope.onchange(key, choice, value);
		console.log('onchange');
	}

	// Template used to stamp out individual expandchoices owned by this set.
	let choice_template = [
		'<expandchoice ',
			'choicespec="choicespec" ',
			'index="index" ',
			'onexpand="onexpand" ',
			'onchange="onchange">',
		'</expandchoice>'
	].join('');


	// element used to contain	all expandchoices' html
	let target = $element.find('.expandchoicetarget');
	let choice_handles = []; // Keeps a reference to expandchoices' scope and html

	// Here we compile individual expandchoices that are defined in the spec
	// bound to the scope
	for (let i = 0; i < $scope.choices.length; i++) {

		// Create a new scope for the choice group, and bind some data to it
		let new_scope = $scope.$new(false);
		new_scope.choicespec = $scope.choices[i];
		new_scope.index = i;
		new_scope.onexpand = onexpand;
		new_scope.onchange = onchange;

		// Create the html element for the new choice group, bind the scope to it
		// and append it to the choicegroups target div
		let new_expandchoice = $compile(choice_template)(new_scope);
		target.append(new_expandchoice);

		// Keep a reference to the created scopes and html elements
		choice_handles.push([new_scope, new_expandchoice]);
	}

}]);
