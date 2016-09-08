angular.module('app').directive('profileView', [function(){
	return {
		link: function (element, scope) {
			console.log('profile view');
		}
	}
}]);
