angular.module('questionpane').directive('questionpane', function(){
	return {
		link: function(scope, element) {
			let panes = element.find('pane')

			function show(i) {
				console.log('showing pane ' + i);
				panes.each(function(j){
					let that = $(this);
					if (j===i) {
						that.addClass('active');
					} else {
						that.removeClass('active');
					}
				})
			}

			// Arm the next and prev buttons
			// One can add other call backs to these buttons (e.g. they may cause
			// data) to be sent somewhere -- this only arms the behavior of advancing
			// to the next question (or going to the previous one) visually.
			panes.each(function(i){
				let that = $(this);
				let next = that.find('.next-pane');
				next.on('click', function(){
					show(i+1);
				})
				let prev = that.find('.prev-pane');
				prev.on('click', function(){
					show(i-1);
				})
			});

			// Initially show the first pane
			show(0);


		}
	}
})
