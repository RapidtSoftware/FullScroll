(function ( window ) {
	
	// Define the FullScroll function
	window.FullScroll = function () {
		
		/**
		 * Extends an object with another object
		 * @param {Object} extension
		 * @param {Object} original
		 * @return {Object} extended
		 */
		
		var extend = function ( extension, original ) {
			
			// Loop through the properties of the extension object
			for ( var i in extension ) {
				
				// Make sure the current property isn't a prototype of the 'Object' object
				if ( extension.hasOwnProperty( i ) ) {
					
					// Set the property in the original object to the value of the property in the extension object
					original[ i ] = extension[ i ];
					
				}
				
			}
			
			// Set the extended variable to the original object
			var extended = original;
			
			
			// Return the extended object
			return extended;
			
		};
		
		// Define the default options object
		var options = {
				
			// The selector to use to select all pages
			selector: ".fullscroll",
			
			
			// The onChange event to be fired on each page change
			onChange: function () {
				
			}
				
		};
		
		// If the first argument is an object, extend the default options with it
		if ( arguments.length == 1 && typeof arguments[ 0 ] == "object" ) {
			
			options = extend( arguments[ 0 ], options );
			
		}
		
		
		// Select all pages by the 'selector' options property
		var pages = document.querySelectorAll( options[ "selector" ] );
		
		// Set the length variable to the amount of found fullscroll pages
		var length = pages.length;
		
		// Set the current page index to 0
		var current = 0;
		
		// Define the methods object to be returned at the end of the FullScroll function
		var methods = {
			
			goto: function ( index ) {
				
				show( index );
				
				return this;
				
			},
			
			next: function () {
				
				show( "next" );
				
				return this;
				
			},
			
			previous: function () {
				
				show( "previous" );
				
				return this;
				
			},
			
			prev: function () {
				
				show( "previous" );
				
				return this;
				
			},
			
			current: current
			
		};
		
		/**
		 * Loops through the pages object and fires a callback for every element
		 * @param {Function} callback
		 * @return {Object} pages
		 */
		
		function eachPage ( callback ) {
			
			// Loop through the list of pages
			for ( var i = 0; i < length; i++) {
				
				// Define the arguments to be passed to the callback
				var arguments = [ i, pages[ i ] ];
				
				// Call the callback function
				var success = callback.apply( pages[ i ], arguments );
				
				// If the callback returns false, break the loop
				if ( success === false ) {
					
					break;
					
				}
				
			}
			
			// Return the pages object for chaining
			return pages;
			
		};
		
		/**
		 * Returns the next page number
		 * @return {Number} next
		 */
		
		function nextPage () {
			
			// Set the 'next' variable to the next page index
			var next = current + 1;
			
			// If the current page is the last page, set the 'next' variable to 0
			if ( next == length ) {
				
				next = 0;
				
			}
			
			// Return the next page index
			return next;
			
		};
		
		/**
		 * Returns the previous page number
		 * @return {Number} previous
		 */
		
		function previousPage () {
			
			// Set the 'previous' variable to the previous page index
			var previous = current - 1;
			
			// If the current page is the first page, set the 'previous' variable to the last page index
			if ( previous == -1 ) {
				
				previous = length - 1;
				
			}
			
			// Return the previous page index
			return previous;
			
		};
		
		/**
		 * Resets the class list of a specific page or all pages
		 * @param {Number} index
		 * @param {Boolean} all
		 * @return {Object} pages
		 */
		
		function reset ( index, all ) {
			
			// Set the 'all' variable's default value to true
			if ( typeof all === "undefined" ) {
				
				var all = true;
				
			}
			
			// If the 'index' variable is a number remove the classes only from that index
			if ( typeof index === "number" ) {
				
				// Define the shortcut to remove the class from the classList
				var remove = function ( className ) { 
					
					that.classList.remove( className );
					
				}
				
				// Remove the classes
				remove( "fullscroll-reveal-next" );
				
				remove( "fullscroll-reveal-previous" );
				
				remove( "fullscroll-hide" );
				
				// If the 'all' variable is set, remove all classes
				if ( all ) {
					
					remove( "fullscroll-show" );
					
					remove( "fullscroll-show-next" );
					
					remove( "fullscroll-show-previous" );
				
				}
				
				// Return the pages object for chaining
				return pages;
			
			}
			
			// If a specific index is not specified, remove the classes of each page
			eachPage( function () {
				
				var that = this;
				
				// Define the shortcut to remove the class from the classList
				var remove = function ( className ) { 
				
					that.classList.remove( className );
					
				}
				
				// Remove the classes
				remove( "fullscroll-reveal-next" );
				
				remove( "fullscroll-reveal-previous" );
				
				remove( "fullscroll-hide" );
				
				// If the 'all' variable is set, remove all classes
				if ( all ) {
					
					remove( "fullscroll-show" );
					
					remove( "fullscroll-show-next" );
					
					remove( "fullscroll-show-previous" );
				
				}
				
			} );
			
			// Return the pages object for chaining
			return pages;
			
		};
		
		// Define the 'queue' variable to queue the list of next pages to show
		var queue = [];
		
		// Define the `allowNext` variable to determine if the next page in the queue is allowed to show
		var allowNext = true;
		
		/**
		 * Reveals the specified page
		 * @param {Number} index
		 * @param {Boolean} force
		 * @return {Object} pages
		 */
		
		function reveal ( index, force ) {
			
			// If the next page is not allowed and the reveal is not forced disallow the function to continue
			if ( !allowNext && !force  && queue.length > 1 ) {
			
				return false;
			
			}
			
			// Reset the class list of all pages
			reset( false, false );
			
			if ( index === "next" || index === 1 ) {
				
				// Set the 'next' variable to the next page index
				var next = pages[ nextPage() ];
				
				// Add the reveal-next class to the next page
				next.classList.add( "fullscroll-reveal-next" );
				
			}
			
			if ( index === "previous" || index === -1 || index === "prev" ) {
				
				// Set the 'previous' variable to the previous page index
				var previous = pages[ previousPage() ];
				
				// Add the reveal-previous class to the previous page
				previous.classList.add( "fullscroll-reveal-previous" );
				
			}
			
			// Return the pages object for chaining
			return pages;
			
		};
		
		// Set the 'originalTitle' variable to the original document title
		var originalTitle = document.title;
		
		/**
		 * Shows the specified page
		 * @param {Number} index
		 * @return {Object} pages
		 */
		
		function show ( index ) {
			
			// If the next page is not allowed yet, add the page to the queue and disallow the function to continue
			if ( !allowNext ) {
				
				queue.push( index );
				
				return false;
				
			}
			
			// Disallow the next page from showing
			allowNext = false;
					
			// Allow the next page to show after 1 second and show the next element in the queue
			window.setTimeout( function () {
				
				allowNext = true;
				
				if ( queue.length ) {
					
					// Show and remove the first queue index
					show( queue.shift() );
					
					// Reveal the next index in the queue if it exists
					if ( queue.length ) {
						
						if ( queue[ 0 ] == "next" ) {
						
							reveal ( "next", "force" );
							
						} else {
							
							reveal ( "previous", "force" );
							
						}
						
					}
					
				}
				
			}, 1000 );
			
			var element;
			
			// Reset the class list of each element
			reset();
			
			if ( index === "next" ) {
				
				// Hide the current page
				pages[ current ].classList.add( "fullscroll-hide" );
				
				element = pages[ nextPage() ];
				
				// Update the current page index to the new one
				methods.current = nextPage();
				
				current = nextPage();
				
				// Add the show-next class to the next element
				element.classList.add( "fullscroll-show-next" );
				
				// Set the document title to the element's data-fullscroll-title attribute value, or reset the title to normal if the element doesn't have a data-fullscroll-title attribute
				if ( element.dataset.fullscrollTitle ) {
					
					document.title = element.dataset.fullscrollTitle;
					
				} else {
					
					document.title = originalTitle;
					
				}
				
				// Fire the onChange event
				options.onChange.call( methods, element, index );
				
			}
			
			if ( index === "previous" || index === "prev" ) {
				
				// Hide the current page
				pages[ current ].classList.add( "fullscroll-hide" );
				
				element = pages[ previousPage() ];
				
				// Update the current page index to the new one
				methods.current = previousPage();
				
				current = previousPage();
				
				// Add the show-previous class to the previous element
				element.classList.add( "fullscroll-show-previous" );
				
				// Set the document title to the element's data-fullscroll-title attribute value, or reset the title to normal if the element doesn't have a data-fullscroll-title attribute
				if ( element.dataset.fullscrollTitle ) {
					
					document.title = element.dataset.fullscrollTitle;
					
				} else {
					
					document.title = originalTitle;
					
				}
				
				// Fire the onChange event
				options.onChange.call( methods, element, index );
				
			}
			
			if ( typeof index === "number" ) {
				
				// Hide the current page
				pages[ current ].classList.add( "fullscroll-hide" );
				
				element = pages[ index ];
				
				// Update the current page index to the new one
				methods.current = index;
				
				current = index;
				
				// Add the show-previous class to the previous element
				element.classList.add( "fullscroll-show" );
				
				// Set the document title to the element's data-fullscroll-title attribute value, or reset the title to normal if the element doesn't have a data-fullscroll-title attribute
				if ( element.dataset.fullscrollTitle ) {
					
					document.title = element.dataset.fullscrollTitle;
					
				} else {
					
					document.title = originalTitle;
					
				}
				
				// Fire the onChange event
				options.onChange.call( methods, element, index );
				
			}
			
			// Return the pages object to allow chaining
			// Return the pages object for chaining
			return pages;
			
		};
		
		// Show the first page automatically on invocation
		show( current );
		
		// Add the correct index to each FullScroll element's "data-fullscroll" attribute
		eachPage( function ( index ) {
			
			this.dataset.fullscroll = index;
			
		} );
		
		// Add the keydown event listener to the document
		document.addEventListener( "keydown", function ( event ) {
			
			// See which key is pressed
			var code = event.which;
			
			
			// Reveal the next page if the up arrow key is pressed
			if ( code == 38 ) {
				
				reveal( "next" );
				
			}
			
			// Reveal the previous page if the down arrow key is pressed
			if ( code == 40 ) {
				
				reveal( "previous" );
				
			}
			
		}, false );
		
		// Add the keyup event listener to the document
		document.addEventListener( "keyup", function ( event ) {
			
			// See which key is released
			var code = event.which;
			
			// Show the next page if the up arrow key is released
			if ( code == 38 ) {
				
					show( "next" );
					
			}
			
			// Show the previous page if the down arrow key is released
			if ( code == 40 ) {
				
				show( "previous" );
				
			}
			
		}, false );
		
		return methods;
		
	};
	
})( window );
