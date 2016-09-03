let textsearch_module = angular.module('textsearch', []);

textsearch_module.directive('textSearch', function(){
  return {
    scope: {
      doSearch: '&'
    },
    templateUrl: '/frontend-app/textsearch/textsearch.template.html',
    link: function(scope, element) {

      let do_search = scope.doSearch();

      let search_icon = element.find('.search-icon');
      let cancel_icon = element.find('.cancel-icon');
      let textinput = element.find('input');

			// Checks a keystroke, if it's the [Enter] key, triggers the search
			// function.
      let check_key = function(e){
        if (e.keyCode === 13) {
          search();
        }
      };

      let current_search = null;

      let search = function(){

        // Trim leading and trailing whitespace
        current_search = textinput.val().trim();
        textinput.val(current_search);

				// Trigger the search callback.
        do_search(current_search);

				// If the current search isn't blank, show the cancel icon (which)
				// enables clearing the search
        if(current_search) {
          show_cancel_icon();

				// Otherwise, the search must have been cleared.  Show the search icon.
        } else {
          show_search_icon();
          current_search = null;
        }
      };

			// Function to clear the current search
      let clear_search = function() {
        current_search = null;
        textinput.val('');
        do_search('');
        show_search_icon();
      }

			// Function to show the search icon
      let show_search_icon = function(){
        cancel_icon.addClass('hide');
        search_icon.removeClass('hide');
      }

			// Function to show the cancel icon
      let show_cancel_icon = function(){
        cancel_icon.removeClass('hide');
        search_icon.addClass('hide');
      }

			// Arm the search icon to trigger searching
      element.on('click', '.search-icon', search);

			// Arm the cancel icon to triger clearing the current search
      element.on('click', '.cancel-icon', clear_search);

			// Check keystrokes entered into the search bar, and trigger a search
			// when [Enter] is hit.
      element.on('keydown', 'input', check_key);

			// If the user clears the text in the search bar after making a search
			// then the UI is in a misleading state: the current search isn't null
			// but the search bar appears empty.  In this case, onblur, re-fill the
			// search bar with the current search
      textinput.on('blur', function(){
        if(!textinput.val().trim()){
          if(current_search) {
            textinput.val(current_search);
          }
        }
      });

    }
  };
});
