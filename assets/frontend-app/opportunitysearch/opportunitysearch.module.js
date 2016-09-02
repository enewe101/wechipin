angular.module('opportunitysearch', []);

angular.module('opportunitysearch').factory('opportunitysearchservice', function() {
	let service = {

		// Store the preferences of the user
		preferences: {
			interactions: [],
			job_types: [],
			qualifications: [],
		},
		filters: {
			causes: [],
			organizations: [],
			languages: [],
			skills: []
		},

		// Ranked opportunities
		opportunities: []

	}

	service.filter = function(callback) {
		let filtered_opportunities = [];

		// Iterate over all opportunities
		for (let i = 0; i < service.opportunities.length; i++) {

			// Check to see if the causes match
			var matched = true;
			let opportunity = service.opportunities[i];

			// Iterate over all filters that existing
			for (let filter_name in service['filters']) {
				let this_filter_matched = false;
				// Iterate over all causes that this opportunity is tagged with and see
				// if any match any of the desired causes.
				for (let j = 0; j < opportunity[filter_name].length; j++) {
					let seen_cause = opportunity[filter_name][j]['name'];

					// Any value in a given filter can match
					if (service['filters'][filter_name].indexOf(seen_cause) > -1) {
							this_filter_matched = true;
							break;
					}
				}

				// All filters need to match
				matched = matched && this_filter_matched;
				if (!matched) {
					break;
				}
			}

			if (matched) {
				filtered_opportunities.push(opportunity);
			}
		}

		//filtered_opportunities = [filtered_opportunities[0]];
		callback(filtered_opportunities);
	};

	service.load = function(callback){
		let url = '/api/opportunity'
		$.ajax({
			dataType: 'json',
			method: 'GET',
			success: arm_success_callback(callback),
			error: arm_error_callback(callback),
			url: url
		})
	};

	function arm_success_callback(callback) {
		return function(data, status, xhr) {
			service.opportunities = data;
			if (typeof callback === 'function') {
				callback(data, status, xhr);
			}
		}
	}

	function arm_error_callback(callback) {
		return function (xhr, status, error) {
			if (typeof callback === 'function') {
				callback(xhr, status, error);
			}
		}
	}

	return service;
});
