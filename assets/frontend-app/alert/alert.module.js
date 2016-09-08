angular.module('alert', []);
angular.module('alert').factory('alertService', function(){

	let service = {
		ready: false,
		display_functions: null,
		queue: []
	};

	service.send = function(alert_type, message, timeout) {
		// If the service is ready, show the alert message by calling the
		// appropriate display function
		if (service.ready) {
			service.display_functions[alert_type](message, timeout);
		// Otherwise, enqueue this request, and display it once the alertService
		// is ready
		} else {
			service.queue.push([alert_type, message, timeout]);
		}
	}

	service.link = function(display_functions) {
		// Bind the alert display functions
		service.display_functions = display_functions;
		// Mark the service as ready
		service.ready = true;
		// Process any requests that were enqueued before the service was ready
		for (var i=0; i < service.queue.length; i++) {
			service.send.apply(service.queue[i]);
		}
	}

	return service;

});
