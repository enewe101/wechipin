angular.module('findcause').directive('findcause',
['opportunitysearchservice', function(opportunitysearchservice){
	return {
		templateUrl: '/frontend-app/findcause/findcause.template.html',
		controller: 'findcausecontroller',
		link: function (scope, element) {

			// Turns an option "on"
			function activate_option(option) {
				let input_elm = option.find('input');
				input_elm.prop('checked', true);
				option.addClass('active');
			}

			// Turns an option "off"
			function deactivate_option(option) {
				let input_elm = option.find('input');
				input_elm.prop('checked', false);
				option.removeClass('active');
			}

			// Toggles an option on or off
			function toggle_option(option) {
				let input_elm = option.find('input');
				if (input_elm.prop('checked')) {
					deactivate_option(option);
				} else {
					activate_option(option);
				}
			}

			// Creates a clickable option that highlights when clicked and retains
			// a "value" that can be retrieved
			function make_option_elm(option_spec){
				option_elm = $('<div class="option">');
				option_elm.text(option_spec['label']);
				option_elm.prepend('<input type="checkbox"> ');
				option_elm.data('value', option_spec['value']);
				option_elm.on('click', function(){
					let that = $(this);
					toggle_option(that);
				})
				return option_elm;
			}

			// Create the option buttons for each question
			let panes = element.find('pane');
			let option_divs = panes.find('.options');
			option_divs.each(function(i){
				let option_div = $(this);
				$.each(findcause_preferences[i], function(j, option){
					option_elm = make_option_elm(option);
					option_div.append(option_elm);
				})
				option_div.append($('<div class="clearfix"></div>'));
			})

			// Arm the question pane navigation buttons to take the user's choices and
			// communicate it to the opportunitysearchservice (so that the users choices
			// can influence the ranking of opportunities)

			// First, arm the button to submit interaction preferences
			let submit_interactions = element.find('.submit-interactions');
			let interaction_options = element.find('.interaction-options').find('.option');
			submit_interactions.on('click', function(){
				interaction_options.each(function(){
					let option = $(this);
					let key = option.data('value');
					let val = option.find('input').prop('checked')? 1 : -1;
					opportunitysearchservice['preferences']['interactions'][key] = val;
				});
				console.log(opportunitysearchservice);
			})

			// Next arm the button to skip specifying interaction preferences
			let skip_interactions = element.find('.skip-interactions');
			skip_interactions.on('click', function(){
				interaction_options.each(function(){
					let option = $(this);
					let key = option.data('value');
					// Uncheck all the options
					option.find('input').prop('checked', false);
					option.
					opportunitysearchservice['preferences']['interactions'][key] = 0;
				})
				console.log(opportunitysearchservice);
			})

			// Next, arm the button to submit interaction preferences
			let submit_job_types = element.find('.submit-job-types');
			let job_type_options = element.find('.job-type-options').find('.option');
			submit_job_types.on('click', function(){
				job_type_options.each(function(){
					let option = $(this);
					let key = option.data('value');
					let val = option.find('input').prop('checked')? 1 : -1;
					opportunitysearchservice['preferences']['job_types'][key] = val;
				});
				console.log(opportunitysearchservice);
			})

			// Next arm the button to skip specifying interaction preferences
			let skip_job_types = element.find('.skip-job-types');
			skip_job_types.on('click', function(){
				job_type_options.each(function(){
					let option = $(this);
					let key = option.data('value');
					// Uncheck all the options
					option.find('input').prop('checked', false);
					opportunitysearchservice['preferences']['job_types'][key] = 0;
				})
				console.log(opportunitysearchservice);
			})

			// Next, arm the button to submit interaction preferences
			let submit_driver_options = element.find('.submit-driver-options');
			let driver_options = element.find('.driver-options').find('.option');
			submit_driver_options.on('click', function(){
				driver_options.each(function(){
					let option = $(this);
					let key = option.data('value');
					let val = option.find('input').prop('checked')? 1 : -1;
					opportunitysearchservice['preferences']['qualifications'][key] = val;
				});
				console.log(opportunitysearchservice);
			})

			// Next, arm the button to submit interaction preferences
			let submit_qualifications_options = element.find('.submit-qualifications-options');
			let qualifications_options = element.find('.qualifications-options').find('.option');
			submit_qualifications_options.on('click', function(){
				qualifications_options.each(function(){
					let option = $(this);
					let key = option.data('value');
					let val = option.find('input').prop('checked')? 1 : -1;
					opportunitysearchservice['preferences']['qualifications'][key] = val;
				});
				console.log(opportunitysearchservice);
			})


		}
	}
}]);

let findcause_preferences = [
	[
		{'label':'working on tasks independently', 'value':'solo'},
		{'label':'public speaking', 'value':'public-speaking'},
		{'label':'working with clients one-on-one', 'value':'one-on-one'},
		{'label':'interacting with groups of clients', 'value':'group'},
		{'label':'working in a team of volunteers', 'value':'team'},
		{'label':'staffing a counter or greating people', 'value':'greeting'},
	],[
		{'label':'staffing a counter or greating people', 'value':'greeting'},
		{'label': 'interacting directly with the clients (active listening, mentoring, tutoring).', 'value': 'social'},
		{'label': 'doing outreach or advocacy work (canvassing, calling, demonstrating).', 'value': 'advocacy'},
		{'label': 'making concrete things happen (like sorting, cooking, or delivering).', 'value': 'material'},
		{'label': 'creating content (writing, editing, graphic design).', 'value':'creative'},
		{'label': 'doing admin work (sending mail, phone calls, data entry).', 'value': 'admin'},
		{'label': 'running activities (sports, games, book clubs, discussion groups).', 'value': 'activity'},
		{'label': 'entertaining groups (music, storytelling, or some kind of performance).', 'value': 'performance'},
		{'label': 'staffing a service counter or booth, greeting clients, or helping at events.', 'value': 'greeting'}
	],[
		{'label': 'I have a drivers license (and am willing to drive)', 'value': 'drive'},
		{'label': "I have a car or van that I'm willing to use (mileage generally compensated)", 'value': 'vehicle'},
	],[
		{'label': 'I play a musical instrument.', 'value': 'music'},
		{'label': 'I can translate French to English.', 'value': 'fr2en'},
		{'label': 'I can translate English to French.', 'value': 'en2fr'},
		{'label': 'I can cook for groups.', 'value': 'cook'},
		{'label': 'I have experience organizing events.', 'value': 'org-event'},
		{'label': 'I have experience with graphic design.', 'value': 'graphics'},
		{'label': 'I have experience with web design.', 'value': 'web-design'},
		{'label': 'I have experience with web development (coding).', 'value': 'web-dev'},
		{'label': 'I know how to write business plans.', 'value': 'biz-plan'}
	]
];





angular.module('findcause').controller('findcausecontroller', ['$scope', function($scope){
	$scope.activity_classes = {

		'Helping people 1-on-1': [
			'Accompaniment',
			'Active listening',
			'Beauty care',
			'Caregiving',
			'Feeding',
			'Friendly visiting',
			'Intervention/Counselling',
			'Lifesaving',
			'Mentoring',
			'Palliative care',
			'Reading',
			'Teaching/tutoring',
		],

		'Sports and recreation': [
			'Sports and recreation',
		],

		'Getting things done': [
			'Driving/transportation',
			'Meals-on-Wheels',
			'Manual work',
			'Sorting',
			'Hospital work',
		],

		'Office work' : [
			'Computer work/Data entry',
			'Computer work/Internet',
			'Office work',
			'Phone calls',
		],

		'Special activities' : [
			'Zootherapy',
		],

		'Leading others' : [
			'Animating activities',
			'Guide/Museums',
			'Organization/Coordination',
		],

		'Writing' : [
			'Editing',
			'Library/Newsletter',
			'Mailings',
			'Translation/Interpretation',
			'Writing',
		],

		'Special skills' : [
			'Artistic activities',
			'Graphics',
			'Accounting/bookkeeping',
			'Board of directors',
			'Cooking, kitchen assistance',
			'Legal aid',
			'Public relations/Promotion',
			'Research',
			'Sewing',
		],

		'Supporting the cause' : [
			'Advocacy/Social integration',
			'Door-to-door',
			'Fundraising',
		],

		'Managing a station' : [
			'Reception, hospitality',
			'Security',
			'Special events',
			'Sales/Snackbar/Boutique',
			'Cloakroom/Checkroom',
			'Information',
		]
	}

}])
