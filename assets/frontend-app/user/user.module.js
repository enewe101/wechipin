angular.module('user', []);
angular.module('user').factory('userService', function(){
	let service = {
		user: {id:20}
	};

	service.register = function(email, password, success_callback, error_callback) {
		let url = '/api/auth/register'
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'POST',
			data: {email:email, password:password},
			success: arm_register_success_callback(success_callback),
			error: arm_register_error_callback(error_callback)
		})
	};

	service.login = function(email, password, success_callback, error_callback) {
		let url = '/api/auth/login'
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'GET',
			data: {email:email, password:password},
			success: arm_login_success_callback(success_callback),
			error: arm_login_error_callback(error_callback)
		})
	};

	function arm_login_success_callback(callback) {
		return function(data, status, xhr) {
			service.user = data;
			if (typeof callback == 'function') {
				callback(data);
			}
		}
	}

	function arm_login_error_callback(callback) {
		return function(xhr, status, error) {
			if (typeof callback == 'function') {
				callback(status);
			}
			console.log(error);
		}
	}

	function arm_register_success_callback(callback) {
		return function(data, status, xhr) {
			service.user = data;
			if (typeof callback == 'function') {
				callback(data);
			}
		}
	}

	function arm_register_error_callback(callback) {
		return function(xhr, status, error) {
			if (typeof callback == 'function') {
				callback(status);
			}
			console.log(error);
		}
	}


	return service;
})
