angular.module('choicegroup').directive('choicegroup', function(){
	return {
		templateUrl: '/frontend-app/choicegroup/choicegroup.template.html',
		link: function(scope, element) {
			let options_elm = element.find('.options');
			let expand_elm = element.find('.expand');
			let expand_icon = expand_elm.find('span');

			let CLOSED = 0;
			let OPEN = 1;
			let expand_state = CLOSED;
			expand_elm.on('click', function(){
				if (expand_state === OPEN) {
					options_elm.removeClass('active');
					expand_icon.addClass('glyphicon-pluss')
					expand_icon.removeClass('glyphicon-minus')
					expand_state = CLOSED
				} else {
					options_elm.addClass('active');
					expand_icon.removeClass('glyphicon-plus')
					expand_icon.addClass('glyphicon-minus')
					expand_state = OPEN
				}
			});

		}
	}
})
