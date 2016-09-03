angular.module('opportunities').directive('opportunities', function(){
	return {
		templateUrl: '/frontend-app/opportunities/opportunities.template.html',
		controller: 'opportunitiescontroller'
	}
})


angular.module('opportunities').controller('opportunitiescontroller',
['$scope', '$element', '$compile', 'opportunitysearchservice',
function($scope, $element, $compile, opportunitysearchservice){


	// This specification is used to create the filters at the left of the
	// display when viewing opportunity listings.
	let choices = [
		{
			'label': 'Causes',
			'key': 'causes',
			'choices': [
				'seniors', 'sick', 'differently-abled', 'children', 'adolescents',
				'women', 'immigrants', 'parents', 'family', 'poor-homeless'
			],
			'select-all': true
		}, {
			'label': 'Organizations',
			'key': 'organizations',
			'choices': ["Almage Senior Community Centre", "Petits freres", "Welcome Hall Mission", "Chinese Family Service of Greater Montreal", "Centre d'hebergement Real-Morel", "Maisons de l'Ancre", "La Place Commune", "Salvation Army's Booth Centre", "Fondation Senegal Sante Mobile", "Grace Dart Extended Care Centre", "Groupe Harmonie", "Ten Thousand Villages NDG", "Jewish Eldercare Centre", "Women on the Rise", "South Asian Women's Community Centre (SAWCC)", "Benedict Labre House", "Societe de Saint-Vincent de Paul de Montreal / Conseil central", "Kensington Place Seniors' Residence", "YMCAs of Quebec / Residence", "Face a Face Listening and Intervention Centre", "Cummings Centre", "Canadian Liver Foundation", "MADD Montreal", "Centre d'ecoute et de reference UQAM", "Maison du partage d'Youville", "Passages", "Fondation Impact de Montreal", "ACCM / Aids Community Care Montreal", "Contactivity Centre", "Association des benevoles du CHSLD Vigi Mont-Royal", "Echange de services de LaSalle / Division de C.A.D.R.E.", "Cavendish Seniors Day Centre", "Yellow Door", "Accueil Bonneau", "WIAIH / West Island Association for the Intellectually Handicapped", "Loyola Association for Youth Development", "Communicaid for Hearing Impaired Persons", "Association d'entraide le Chainon", "Benjamin & Vanda Treiser Shalom House", "Teapot 50+ Community Centre", "Volunteer Food Services Central Office", "Saint Columba House", "Women's Centre of Montreal", "O3 - On Our Own", "Association du troisieme age <<FILIA>> / Meals-on-Wheels #102", "Ile du savoir / Programme Eclairs de sciences", "SAESEM / Eco-quartier Peter McGill", "Donald Berman Yaldei Developmental Centre", "Project Genesis", "Association des grands-parents du Quebec", "Lachine Hospital of the MUHC", "Mile End Community Mission", "House of Friendship", "Centre de benevolat Sarpad", "Heart and Stroke Foundation", "CSSS Cavendish / CLSC Rene-Cassin / CLSC de Benny Farm", "Cote-des-Neiges Volunteer Centre", "Centre communautaire de loisirs Sainte-Catherine d'Alexandrie", "Station Familles", "Association quebecoise de voile adaptee", "MAB-Mackay Rehabilitation Centre", "Extra Miles Senior Visiting Program", "Baobab familial", "Compeer Montreal", "P'tite Maison de Saint-Pierre", "Centre Educatif pour le Theatre a Montreal ( CETM)", "Projet Changement / Centre communautaire pour aines", "Alzheimer Society of Montreal", "IBIS / International Benevolence Initiatives", "Concordia University / Centre for the Arts in Human Development", "Centre de benevolat Notre-Dame-de-Grace (NDG)", "Happy Village International", "CNIB / Canadian National Institute for the Blind / Quebec Division", "Food Secure Canada", "Carrefour Saint-Eusebe de Montreal", "Douglas Mental Health University Institute", "Women's Y", "Pro-Vert Sud-Ouest", "Auberge Transition", "The Friendship Circle", "Tyndale St-Georges Community Centre", "New Hope Senior Citizens Centre", "Entraide Benevole Metro", "Comite Jeunesse N.D.G.", "YMCAs of Quebec", "Habitat for Humanity / Province of Quebec", "Premiers Pas Quebec", "Option consommateurs", "CHUM - Centre hospitalier universitaire de Montreal", "Desta Black Youth Network", "Community Perspective in Mental Health", "NOVA Montreal", "Montreal Sexual Assault Centre", "Montreal Ronald McDonald House / Fondation des Amis de l'Enfance", "Ateliers l'Aquarium et le Globe", "Make-A-Wish Quebec", "Eco-quartier NDG", "Boys & Girls Club of LaSalle", "Societe Parkinson du Grand Montreal", "Chez Doris Foundation", "Native Women's Shelter of Montreal", "McCord Museum of Canadian History", "Saint Antoine 50+ Community Center", "Centre d'hebergement des Seigneurs", "Miriam Home Services", "Association des benevoles CHSLD Vigi Reine-Elizabeth", "Association quebecoise des personnes aphasiques", "Donald Berman Maimonides Geriatric Centre", "Santropol Roulant", "Justice Human Rights Organization", "NDG Senior Citizens' Council", "Canadian Association for Rights and Truth", "Chateau Ramezay / Musee et site historique de Montreal"
			],
			'select-all': true
		}, {
			'label': 'Languages',
			'key': 'languages',
			'choices': ["English", "French", "Bilingual (F / E)"],
			'select-all': true
		}, {
			'label': 'Activities',
			'key': 'skills',
			'choices': ["Information", "Feeding", "Door-to-door", "Artistic activities", "Translation/Interpretation", "Computer work/Data entry", "Research", "Beauty care", "Sales/Snackbar/Boutique", "Sorting", "Health", "Intervention/Counselling", "Reading", "Driving/transportation", "Computer work/Internet", "Zootherapy", "Caregiving", "Mentoring", "Cloakroom/Checkroom", "Graphics", "Accompaniment", "kitchen assistance", "Phone calls", "Active listening", "Meals-on-Wheels", "Cooking", "Group activities", "Summer volunteering", "Guide/Museums", "Friendly visiting", "Animating activities", "Hospital work", "Teaching/tutoring", "Reception", "Animating activities |", "Organization/Coordination", "Public relations/Promotion", "Security", "Writing", "Advocacy/Social integration", "Manual work", "Technical work", "Office work", "Fundraising", "Artistic activities |", "Sports & recreation", "Special events", "Legal aid", "hospitality", "Virtual volunteering", "Board of directors"],
			'select-all': true
		}
	]

	// The name of the


	// Fill up the opportunitysearchservice here.
	for(let i = 0; i < choices.length; i++ ) {
		let choice = choices[i];
		let key = choice.key;
		opportunitysearchservice['filters'][key] = $.extend([], choice.choices);
	}
	console.log(opportunitysearchservice['filters']);

	$scope.choices = choices;
	$scope.onchange = function(key, choice, value){

		console.log('opportunities change');
		if(value) {
			opportunitysearchservice['filters'][key].push(choice);
		} else {
			let index = opportunitysearchservice['filters'][key].indexOf(choice);
			if(index > -1) {
				opportunitysearchservice['filters'][key].splice(index, 1);
			}
		}

		console.log(opportunitysearchservice['filters']);
		opportunitysearchservice.filter(render_opportunities);
	}

	$scope.onsearch = function(query){
		console.log('Performing text search: ' + query);
		opportunitysearchservice.textquery = query;
		opportunitysearchservice.filter(render_opportunities);
	}

	let opportunities_container = $element.find('#opportunities-container');
	let opportunity_template = '<opportunity job="job"></opportunity>';

	// Stores a reference to the opportunities (each is a tuple, first is the
	// scope object, second is the html object)
	job_handles = [];
	function render_opportunities(data, status, xhr) {
		// First destroy any existing opporutnitites
		for (let i = 0; i < job_handles.length; i++) {
			job_handles[i][0].$destroy();
		}
		job_handlesl = []
		opportunities_container.empty();

		for (let i = 0; i < data.length; i++) {
			let job = data[i];
			let new_scope = $scope.$new(false);
			new_scope.job = job;
			let new_opportunity = $compile(opportunity_template)(new_scope);
			opportunities_container.append(new_opportunity);
			job_handles.push([new_scope, new_opportunity]);
		}
	}

	opportunitysearchservice.load(render_opportunities);

	// Iterate over all of the jobs (opportunities): for each, build a scope, then
	// compile an html element from the scope.

}]);
