angular.module('user', []);
angular.module('user').factory('userService', function(){
	let service = {
		user: {
			'screen-name': 'jimmy',
		}
	};

	service.user = null;

	return service;
})
