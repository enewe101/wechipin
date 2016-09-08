angular.module('application').directive('visibleApplication',
['userService', 'messageService', 'alertService', '$compile',
function(userService, messageService, alertService, $compile){
	return {
		templateUrl: 'frontend-app/application/visible-application.template.html',
		scope: {
			job: '='
		},
		link: function(scope, element) {

			let login = element.find('#login');
			let register = element.find('#register');
			let state = 'register';
			let send = element.find('#send-button');

			// In the modal, show the registration form (hide login form)
			function show_register() {
					login.removeClass('active');
					register.addClass('active');
					state = 'register';
			}

			// In the modal, show the login form (hide registration form)
			function show_login() {
					register.removeClass('active');
					login.addClass('active');
					state = 'login';
			}

			// Arm the show_login and show_register links in the modal
			element.find('#show-login').on('click', show_login);
			element.find('#show-register').on('click', show_register);

			// Shows applications that the user has already sent
			function place_message(message) {
				let message_template = '<message spec="spec"></message>';
				let new_scope = scope.$new(false);
				new_scope.spec = message;
				let new_message = $compile(message_template)(new_scope);
				element.find('.message-target').prepend(new_message);
			}
			function place_messages(messages) {
				for (let i=0; i < messages.length; i++) {
					place_message(messages[i]);
				}
			}

			if(userService.user) {
				messageService.get({fromUser:userService.user.id}, place_messages)
			}

			// Shows user recognition that message has been sent properly
			function show_message_success(message) {
				console.log(message);
				alertService.send('success', 'Your message has been sent!', 12);
				element.find('#myModal').modal('hide');
				place_message(message);
				hide_application_form();
			}

			// Hides the application form
			function hide_application_form() {
				element.find('.application-form').css('display', 'none');
			}

			// Sends the application
			function send_application(user) {
				let from_user = userService.user['id'];
				let to_organization = scope.job.organizations[0].id;
				let title = 'Application for volunteer position';
				let body = element.find('#message-body').val().trim();
				messageService.add(from_user, to_organization, title, body, show_message_success);
			}

			// Arm the send button in the modal
			function login_or_register_and_send() {
				if(state == 'register') {
					let email = $('#register-email').val().trim();
					let password = $('#register-password').val();
					userService.register(email, password, send_application);
				} else {
					let email = $('#login-email').val().trim();
					let password = $('#login-password').val();
					user = userService.login(email, password, send_application);
				}
			}
			element.find('#send-button').on('click', login_or_register_and_send);

			// Arm the apply button
			element.find('#apply-button').on('click', function(){
				if (userService.user === null) {
					element.find('#myModal').modal('show');
					show_register();
				} else {
					send_application();
				}
			});
		}
	}
}]);
