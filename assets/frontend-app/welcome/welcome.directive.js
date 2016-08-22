angular.module('welcome').directive('welcome', function(){
	return {
		templateUrl: '/frontend-app/welcome/welcome.template.html',
		link: function(scope, element) {

			let width = window.innerWidth;
			let height = window.innerHeight;
			element.find('.section').css('height', height);

			// Adjust the size of the images to ensure they cover the full height
			// and width of the viewport.  First, determine if the viewport is too
			// tall, or too wide
			let aspect_ratio = width / height;
			let too_wide = false;
			if (aspect_ratio > 3 / 2) {
				too_wide = true
			}

			let first_section = element.find('#first-section');
			if (too_wide) {
				first_section.addClass('wide');
			} else {
				first_section.addClass('tall');
			}


		}
	}
});
