angular.module('message', []);
angular.module('message').factory('messageService', function(){

	let service = {}

	service.get = function(where, success_callback, error_callback) {
		let url = '/api/message';
		url = url + '?where=' + JSON.stringify(where),
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'get',
			success: arm_get_success_callback(success_callback),
			error: arm_get_error_callback(error_callback)
		});
	}

	function arm_get_success_callback(callback) {
		return function(data, status, xhr) {
			// Parse all the messages
			let messages = []
			for(var i=0; i < data.length; i++) {
				messages.push(parse_message(data[i]));
			}

			// Call the callback with the parsed messages
			if (typeof callback == 'function') {
				callback(data);
			}
		}
	}

	function arm_get_error_callback(callback) {
		return function(xhr, status, error) {
			if (typeof callback == 'function') {
				callback(data);
			}
			console.log('message error: ' + error);
		}
	}

	service.add = function(from_user, to_organization, title, body, success_callback, error_callback) {
		let url = '/api/message';
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'POST',
			data: {
				title: title,
				body: body,
				fromUser: from_user,
				toOrganization: to_organization,
			},
			success: arm_success_callback(success_callback),
			error: arm_error_callback(error_callback)
		});
	}

	function parse_message(message) {
		message.createdAt = new Date(message.createdAt);
		message.updatedAt = new Date(message.updatedAt);
		return message;
	}

	function arm_success_callback(callback) {
		return function(data, status, xhr) {
			let message = parse_message(data);
			if (typeof callback == 'function') {
				callback(message);
			}
		}
	}

	function arm_error_callback(callback) {
		return function(xhr, status, error) {
			if (typeof callback == 'function') {
				callback(error);
			}
			console.log('message error :' + error);
		}
	}

	return service;
})
