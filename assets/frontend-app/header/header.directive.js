angular.module('header').directive('header', [function(){
	return {
		templateUrl: '/frontend-app/header/header.template.html',
		link: function(scope, element) {

			scope.scroll_state = null;
			let NOT_SCROLLED = 0;
			let SCROLLED = 1;

			// Define a function that checks the scroll position and updates the
			// class of the header accordingly.
			function check_scroll() {

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
