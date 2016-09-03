
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



angular.module('opportunitysearch', []);

angular.module('opportunitysearch').factory('opportunitysearchservice', function() {

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

		// Ranked opportunities
		opportunities: []

	}

	function tokenize_remove_stop_words(text) {
		if (!text.trim()){
			return [];
		}
		let query_tokens = text.trim().split(/\s+/);
		let keep_tokens = query_tokens.filter(
			function(x){return !~stopwords.indexOf(x);}
		);
		return keep_tokens;
	}

	// This private service method calculates the number of times a given term
	// from a text search query matches a term in an opportunity
	function get_num_matches(opportunity, query_tokens) {

		// First, concatenate all the opportunitites text
		all_text = [
			opportunity['title'],
			opportunity['description'],
			opportunity['organizations'].map(function(x){return x['name']}).join(' '),
			opportunity['languages'].map(function(x){return x['name']}).join(' '),
			opportunity['causes'].map(function(x){return x['name']}).join(' '),
			opportunity['skills'].map(function(x){return x['name']}).join(' '),
			opportunity['city'],
			opportunity['country'],
			opportunity['lengthOfCommitment'],
			opportunity['contactEmail'],
			opportunity['contactName'],
			opportunity['contactNumber'],
			opportunity['qualifications'].map(function(x){return x['name']}).join(' '),
			opportunity['interactions'].map(function(x){return x['name']}).join(' '),
			opportunity['job_types'].map(function(x){return x['name']}).join(' ')
		].join(' ');

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

let stopwords = ['a',
 'about',
 'above',
 'after',
 'again',
 'against',
 'all',
 'am',
 'an',
 'and',
 'any',
 'are',
 "aren't",
 'as',
 'at',
 'be',
 'because',
 'been',
 'before',
 'being',
 'below',
 'between',
 'both',
 'but',
 'by',
 "can't",
 'cannot',
 'could',
 "couldn't",
 'did',
 "didn't",
 'do',
 'does',
 "doesn't",
 'doing',
 "don't",
 'down',
 'during',
 'each',
 'few',
 'for',
 'from',
 'further',
 'had',
 "hadn't",
 'has',
 "hasn't",
 'have',
 "haven't",
 'having',
 'he',
 "he'd",
 "he'll",
 "he's",
 'her',
 'here',
 "here's",
 'hers',
 'herself',
 'him',
 'himself',
 'his',
 'how',
 "how's",
 'i',
 "i'd",
 "i'll",
 "i'm",
 "i've",
 'if',
 'in',
 'into',
 'is',
 "isn't",
 'it',
 "it's",
 'its',
 'itself',
 "let's",
 'me',
 'more',
 'most',
 "mustn't",
 'my',
 'myself',
 'no',
 'nor',
 'not',
 'of',
 'off',
 'on',
 'once',
 'only',
 'or',
 'other',
 'ought',
 'our',
 'oursourselves',
 'out',
 'over',
 'own',
 'same',
 "shan't",
 'she',
 "she'd",
 "she'll",
 "she's",
 'should',
 "shouldn't",
 'so',
 'some',
 'such',
 'than',
 'that',
 "that's",
 'the',
 'their',
 'theirs',
 'them',
 'themselves',
 'then',
 'there',
 "there's",
 'these',
 'they',
 "they'd",
 "they'll",
 "they're",
 "they've",
 'this',
 'those',
 'through',
 'to',
 'too',
 'under',
 'until',
 'up',
 'very',
 'was',
 "wasn't",
 'we',
 "we'd",
 "we'll",
 "we're",
 "we've",
 'were',
 "weren't",
 'what',
 "what's",
 'when',
 "when's",
 'where',
 "where's",
 'which',
 'while',
 'who',
 "who's",
 'whom',
 'why',
 "why's",
 'with',
 "won't",
 'would',
 "wouldn't",
 'you',
 "you'd",
 "you'll",
 "you're",
 "you've",
 'your',
 'yours',
 'yourself',
 'yourselves'];
