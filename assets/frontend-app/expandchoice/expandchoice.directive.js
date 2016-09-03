angular.module('expandchoice').directive('expandchoice', function(){
	return {
		scope: {
			choicespec: '=',
			onexpand: '=',
			onchange: '=',
			index: '='
		},
		templateUrl: '/frontend-app/expandchoice/expandchoice.template.html',
		controller: 'expandchoicecontroller',
		link: function(scope, element) {

			let header = element.find('.choice-header');
			let icon = element.find('.choice-open-icon');
			let state = 'closed';
			let container = element.find('.choice-container');

			let inputs = element.find('input');
			element.on('change', 'input', function(){
				scope.onchange(
					scope.index, scope.choicespec.key, $(this).attr('data'), $(this).prop('checked')
				);
			})

			scope.get_for = function(choice, choicespec) {
				let choice_id = choicespec.key.replace(' ', '-');
				choice_id += '_' + choice;
				return choice_id;
			}

			// Opens or closes the expandchoice
			function toggle() {
				if (state === 'closed') {
					doopen();
				} else {
					doclose();
				}
			}

			// Requests the expandchoice to open
			function open() {
				if (state === 'closed') {
					doopen();
				}
			}

			// Requests the expandchoice to close
			function close() {
				console.log('about to close, my state is ' + state);
				if (state === 'open') {
					doclose();
				}
			}

			// Opens the expandchoice
			function doopen() {
				//element.addClass('active');
				element.css('height', container.css('height'));
				icon.removeClass('glyphicon-plus-sign');
				icon.addClass('glyphicon-minus-sign');
				scope.onexpand(scope.index);
				state = 'open';
			}

			// Closes the expandchoice
			function doclose() {
				element.css('height', '40');
				element.removeClass('active');
				icon.addClass('glyphicon-plus-sign');
				icon.removeClass('glyphicon-minus-sign');
				state = 'closed';
			}

			header.on('click', toggle);

			// Respond to the 'close-expandchoices' event by closing, unless the
			// index passed along with the event matches this index.
			// This allows for the behavior in which, when one expandchoice is opened,
			// all others in the same group of expandchoices close.
			scope.$on('close-expandchoices', function(event, args){
				if(args.index != scope.index) {
					close();
				}
			})

		}
	};
});

angular.module('expandchoice').controller('expandchoicecontroller',
['$scope', function($scope){

}]);
