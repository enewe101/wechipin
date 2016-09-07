angular.module('constants', []);
angular.module('constants').factory('constantsService', function() {
	service = {};
	service.choices = [
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
	];

	service.opportunity_text_fields = [
		'title_en',
		'description_en',
		'organizations.name',
		'languages.name',
		'causes.name',
		'skills.name',
		'city',
		'country',
		'lengthOfCommitment_en',
		'contactEmail',
		'contactName',
		'contactNumber',
		'qualifications.name',
		'interactions.name',
		'jobTypes.name'
	];

	service.stopwords = [
		'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are',
		"aren't", 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between',
		'both', 'but', 'by', "can't", 'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during',
	  'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll", "he's",
	  'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm", "i've", 'if',
	  'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor',
	  'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'oursourselves', 'out', 'over', 'own', 'same', "shan't",
	  'she', "she'd", "she'll", "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them',
	  'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through',
	  'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's",
	  'when', "when's", 'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't",
	  'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves'
	];

	return service;
});
