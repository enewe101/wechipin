
// Calculates the harmonic mean of an array of values
function harmonic(values) {
	// Compute harmonic mean by accumulating the numerator and denominator
	let numerator = 0;
	let denominator = 0;
	for (let i = 0; i < values.length; i++) {
		// If any value is 0, the harmonic mean is 0, so we can return immediately
		if (values[i] === 0) {
			return 0;
		}
		// Accumulate the value of the numerator and denominator
		numerator += 1;
		denominator += 1 / (values[i]);
	}
	// Return the harmonic mean as numerator over denominator
	return numerator / denominator
}



angular.module('opportunitysearch', ['constants']);

angular.module('opportunitysearch').factory('opportunitysearchservice', [
'constantsService',
	function(constantsService) {

	// Initialize the service object
	let service = {

		// Store the preferences of the user.  These are used for sorting
		preferences: {
			interactions: [],
			job_types: [],
			qualifications: [],
		},

		// State of the filters.  Used to filter opportunities
		filters: {
			causes: [],
			organizations: [],
			languages: [],
			skills: []
		},

		// State of the text search.  Used to filter / rank opportunities
		textquery: '',

		// Whether or not the opportunities have been loaded from the server,
		// And callbacks to be triggered once they have been loaded
		loaded: false,
		_onloads: [],

		// Ranked opportunities
		opportunities: [],
		opportunities_index: {}

	}

	// Populate the filters of the opportunitySearchService with the
	// supported filters (designated in the `constants` module)
	for(let i = 0; i < constantsService.choices.length; i++ ) {
		let choice = constantsService.choices[i];
		let key = choice.key;
		service['filters'][key] = $.extend([], choice.choices);
	}

	function tokenize_remove_stop_words(text) {
		if (!text.trim()){
			return [];
		}
		let query_tokens = text.trim().split(/\s+/);
		let keep_tokens = query_tokens.filter(
			function(x){return !~constantsService.stopwords.indexOf(x);}
		);
		return keep_tokens;
	}

	function get_opportunity_text(opportunity) {
		let all_text = [];
		let text_fields = constantsService.opportunity_text_fields;

		// Get out all the text fields
		for (let i=0; i < text_fields.length; i++) {
			let field_names = text_fields[i].split('.');
			let primary_field_name = field_names[0];
			let texts_to_add;

			// If their is only the primary field, just push its value directly
			if (field_names.length == 1) {
				texts_to_add = [opportunity[primary_field_name]];

			// If we have a subfield, pull out the embedded values, and push them all
			}	else {
				let secondary_field_name = field_names[1];
				texts_to_add = opportunity[primary_field_name].map(
					function(x){return x[secondary_field_name];}
				);
			}

			// Push the new text onto the runing list of texts
			all_text.push.apply(all_text, texts_to_add);
		}

		// return all the text fields, concatenated (space-separated)
		return all_text.join(' ');
	}

	// This private service method calculates the number of times a given term
	// from a text search query matches a term in an opportunity
	function get_num_matches(opportunity, query_tokens) {

		// Concatenate all the text fields in this opportunity
		let all_text = get_opportunity_text(opportunity);

		// Convert the search string into a series of regexes (one for each word)
		// typed in
		let regexps = query_tokens.map(function(x){return new RegExp(x,'gi')});

		// Count the number of times each search term matches this opportunity
		// Add one to each element (this is because we're going to be computing
		// the harmonic mean, and we don't want to penalize infinitly harshly for
		// missing one of the terms.
		let matches = regexps.map(
			function(r){ return 1 + (all_text.match(r) || []).length; }
		)

		let match_score = harmonic(matches) - 1;
		return match_score;
	}

	// Calculates the harmonic mean of an array of values
	function harmonic(values) {
		// Compute harmonic mean by accumulating the numerator and denominator
		let numerator = 0;
		let denominator = 0;
		for (let i = 0; i < values.length; i++) {
			// If any value is 0, the harmonic mean is 0, so we can return immediately
			if (values[i] === 0) {
				return 0;
			}
			// Accumulate the value of the numerator and denominator
			numerator += 1;
			denominator += 1 / (values[i]);
		}
		// Return the harmonic mean as numerator over denominator
		return numerator / denominator
	}

	service.filter = function(callback) {
		let filtered_opportunities = [];

		// Iterate over all opportunities
		for (let i = 0; i < service.opportunities.length; i++) {

			// Assume an opportunity matches until we find that it doesn't
			var matched = true;
			let opportunity = service.opportunities[i];

			// Initialize the score for this opportunity
			opportunity['relevance-score'] = 0;

			// Test for matches against the text search (if any)
			let query_tokens = tokenize_remove_stop_words(service.textquery);
			if (query_tokens.length) {
				// Get the number of matches of search terms in the opportunity
				let num_matches = get_num_matches(opportunity, query_tokens);
				// If there were no matches, filter the opportunity out of the results
				if (num_matches === 0) {
					continue;
				}
				// Matches increase the relevance score for this opportunity
				opportunity['relevance-score'] += num_matches;
			}

			// Check to see if each of the filters match.
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

		// Sort the opportunities by decreasing releveance score
		filtered_opportunities.sort(
			function(x,y){return y['relevance-score'] - x['relevance-score'];}
		);

		//filtered_opportunities = [filtered_opportunities[0]];
		callback(filtered_opportunities);
	};

	// This function calls the api to request all opportunity listings with no
	// filters applied.  It needs to be called at least once before any
	// opportunitites can be found in the service['opportutnities'] array.
	// Currently this is called by the opportunities controller, but it should
	// be called by the service itself because it's really the services
	// initialization concern.
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

	service.onload = function(callback) {
		if(service.loaded) {
			callback(service);
		} else {
			service._onloads.push(callback);
		}
	};

	// Process all of the functions registered to fire on load
	function do_onload() {
		for (let i = 0; i < service['_onloads'].length; i++) {
			let callback = service['_onloads'][i];
			callback(service);
		}
	}

	function arm_success_callback(callback) {
		return function(data, status, xhr) {

			// Keep a local list of all opportunities
			service.opportunities = data;

			// Create an index of opporunities using their id
			for (let i = 0; i < data.length; i++) {
				let opportunity = data[i];
				service.opportunities_index[opportunity['id']] = opportunity;
			}

			// Trigger all callbacks registered to fire on load
			service.loaded = true;
			do_onload();
		}
	}

	function arm_error_callback(callback) {
		return function (xhr, status, error) {
			if (typeof callback === 'function') {
				callback(xhr, status, error);
			}
		}
	}

	// Initialize the service
	service.load();

	return service;
}]);
