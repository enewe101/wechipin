angular.module('header').directive('header', ['userService', function(userService){
	return {
		scope: {
			state: '=?',
			transitions: '=?'
		},
		templateUrl: '/frontend-app/header/header.template.html',
		controller: 'headerController',
		link: function(scope, element) {

			// The state parameter decides the default state of the header
			scope.state = (
				(typeof scope.state == 'undefined')? true : scope.state
			);

			// The transitions parameter decides whether the header animates during
			// scrolling.  Default to true if undefined.
			scope.transitions = (
				(typeof scope.transitions == 'undefined')? true : scope.transitions
			);

			console.log(scope.transitions);

			scope.scroll_state = null;
			let NOT_SCROLLED = 0;
			let SCROLLED = 1;

			// Define a function that checks the scroll position and updates the
			// class of the header accordingly.
			function check_scroll() {
				if (!scope.transitions) {
					console.log('no transitions!');
					return;
				}

				// If we scrolled down (but were not already scrolled down), update
				// the style to reflect that we have scrolled down.
				if( $(document).scrollTop() > 100 && scope.scroll_state !== SCROLLED) {
					element.addClass('scrolled');
					element.removeClass('not-scrolled');
					scope.scroll_state = SCROLLED;
					console.log('scrolled down!')

				// If we scrolled up (but were not previously scrolled up), update
				// the style to reflect that we have scrolled down.
				} else if ($(document).scrollTop() <= 100 && scope.scroll_state !== NOT_SCROLLED) {
					element.removeClass('scrolled');
					element.addClass('not-scrolled');
					scope.scroll_state = NOT_SCROLLED;
					console.log('scrolled up!')
				}
			}

			// Register the function check_scroll to fire whenever page is scrolled
			$(document).on('scroll', check_scroll);

			// Run check_scroll once to initialize the state.
			check_scroll();

		}
	}
}])

angular.module('header').controller('headerController', ['$scope', 'userService', function($scope, userService){
			$scope.user = userService.user;
			$scope.user_email = userService.user.email;

}]);
