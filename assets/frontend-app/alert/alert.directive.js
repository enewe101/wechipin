angular.module('alert').directive('alert', ['alertService', function(alertService){
	return {
		templateUrl: '/frontend-app/alert/alert.template.html',
		link: function(scope, element) {

			element.find('.dismiss').on('click', function(){
				dismiss();
			})

			function dismiss(){
				element.removeClass('active');
				element.removeClass('info');
				element.removeClass('warn');
				element.removeClass('danger');
				element.removeClass('success');
				element.removeClass('default');
			}

			function show(message, timeout) {
				element.addClass('active');
				element.find('.content').text(message);
				setTimeout(dismiss, timeout * 1000);
			}

			function info(message, timeout) {
				element.addClass('info');
				show(message, timeout);
			}

			function warn(message, timeout) {
				element.addClass('warn');
				show(message, timeout);
			}

			function danger(message, timeout) {
				element.addClass('danger');
				show(message, timeout);
			}

			function success(message, timeout) {
				element.addClass('success');
				show(message, timeout);
			}

			function plain(message, timeout) {
				element.addClass('default');
				show(message, timeout);
			}

			alertService.link({
				show:show, dismiss:dismiss,
				info:info, warn:warn, danger:danger, success:success, plain:plain
			})

		}
	}
}]);
