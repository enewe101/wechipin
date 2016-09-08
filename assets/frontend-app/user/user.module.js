angular.module('user', []);
angular.module('user').factory('userService', function(){
	let service = {
		user: {
			id:20,
			email: 'edward.newell@gmail.com'
		}
	};

	// Service's public function for registering a user.
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

	// Service's public function for loggin in a user
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

	// Service's public function for getting an arbitrary user by id
	service.get_by_id = function(userid, success_callback, error_callback) {
		let url = '/api/user';
		url += '?where={"id":' + userid + '}';
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'GET',
			success: arm_get_by_id_success_callback(success_callback),
			error: arm_get_by_id_error_callback(error_callback)
		})
	}
	function arm_get_by_id_success_callback(callback) {
		return function(data, status, xhr) {
			let user = data[0];
			if (typeof callback == 'function') {
				callback(user);
			}
		}
	}
	function arm_get_by_id_error_callback(callback) {
		return function(xhr, status, error) {
			let user = data[0];
			if (typeof callback == 'function') {
				callback(user);
			}
			console.log(error);
		}
	}



	return service;
})
