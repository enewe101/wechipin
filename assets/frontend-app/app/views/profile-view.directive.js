angular.module('app').directive('profileView', ['userService', '$compile',
function(userService, $compile){
	return {
		scope: {
			userid: '='
		},
		link: function (scope, element) {

			console.log('userid: ' + scope.userid);
			userService.get_by_id(scope.userid, render_profile);

			function render_profile(user) {

				console.log(user);
				let new_scope = scope.$new(false);
				new_scope.user = user;
				let template = '<profile user="user"></profile>';
				let new_profile = $compile(template)(new_scope);
				element.append(new_profile);
			}

		}
	}
}]);
