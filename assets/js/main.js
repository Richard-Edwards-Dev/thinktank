
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			normal:    [ '1081px',  '1280px'  ],
			narrow:    [ '821px',   '1080px'  ],
			narrower:  [ '737px',   '820px'   ],
			mobile:    [ '481px',   '736px'   ],
			mobilep:   [ null,      '480px'   ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 300,
			alignment: 'center',
			noOpenerFade: true
		});

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						'<a href="index.html" class="link depth-0">Home</a>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					resetScroll: true,
					resetForms: true,
					side: 'top',
					target: $body,
					visibleClass: 'navPanel-visible'
				});
		// Gallery
		// Smooth scroll.
		$('.smooth-scroll').scrolly();
		$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

	// Wrapper.
		$wrapper.children()
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			});

	// Items.
		$('.items')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children()
				.wrapInner('<div class="inner"></div>');

	// Gallery.
		$('.gallery')
			.wrapInner('<div class="inner"></div>')

			.children('.inner')
				//.css('overflow', 'hidden')
				.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
				.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
				.scrollLeft(0);

		// Style #1.
		let currentSlide = 0;
		const slides = $('.gallery .inner').children(); // Get the slides
		const totalSlides = slides.length;
		slides.removeClass('active'); // Hide all slides

		function updateSlide(index) {
			
			$(slides[index % totalSlides]).addClass('active'); // Show the current slide
			const randomAngle = Math.random() * 25 * (index % 2 ? -1 : 1); 
        	slides[index % totalSlides].style.transform = `rotate(${randomAngle}deg)` 
			slides[index % totalSlides].style.zIndex = index;
		}

		let autoSlideInterval = setInterval(function () {
			currentSlide = (currentSlide + 1) ;
			updateSlide(currentSlide);
		}, 5000); // Change every 5 seconds
		
		// Pause on hover
		$('.gallery').on('mouseenter', function () {
			clearInterval(autoSlideInterval);
		}).on('mouseleave', function () {
			autoSlideInterval = setInterval(function () {
				currentSlide = (currentSlide + 1) % totalSlides;
				updateSlide(currentSlide);
			}, 5000);
		});

		updateSlide(currentSlide);

		// quote gallery.
		let currentQuote = 0;
		const quotes = $('.quotegallery').children(); // Get the slides
		const totalQuotes = quotes.length;

		function updateQuote(index) {
			quotes.removeClass('active'); // Hide all slides
			$(quotes[index]).addClass('active'); // Show the current slide
		}

		let autoQuotesInterval = setInterval(function () {
			currentQuote = (currentQuote + 1) % totalQuotes;
			updateQuote(currentQuote);
		}, 5000); // Change every 5 seconds
		
		// Pause on hover
		$('.quotesGallery').on('mouseenter', function () {
			clearInterval(autoQuotesInterval);
		}).on('mouseleave', function () {
			autoQuotesInterval = setInterval(function () {
				currentQuote = (currentQuote + 1) % totalSlides;
				updateSlide(currentQuote);
			}, 5000);
		});

		updateQuote(currentQuote);


		// Style #2.
			// $('.gallery')
			// 	.on('wheel', '.inner', function(event) {

			// 		var	$this = $(this),
			// 			delta = (event.originalEvent.deltaX * 10);

			// 		// Cap delta.
			// 			if (delta > 0)
			// 				delta = Math.min(25, delta);
			// 			else if (delta < 0)
			// 				delta = Math.max(-25, delta);

			// 		// Scroll.
			// 			$this.scrollLeft( $this.scrollLeft() + delta );

			// 	})
			// 	.on('mouseenter', '.forward, .backward', function(event) {

			// 		var $this = $(this),
			// 			$inner = $this.siblings('.inner'),
			// 			direction = ($this.hasClass('forward') ? 1 : -1);

			// 		// Clear move interval.
			// 			clearInterval(this._gallery_moveIntervalId);

			// 		// Start interval.
			// 			this._gallery_moveIntervalId = setInterval(function() {
			// 				$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
			// 			}, 10);

			// 	})
			// 	.on('mouseleave', '.forward, .backward', function(event) {

			// 		// Clear move interval.
			// 			clearInterval(this._gallery_moveIntervalId);

			// 	});

		// Lightbox.
			$('.gallery.lightbox')
				.on('click', 'a', function(event) {

					var $a = $(this),
						$gallery = $a.parents('.gallery'),
						$modal = $gallery.children('.modal'),
						$modalImg = $modal.find('img'),
						href = $a.attr('href');

					// Not an image? Bail.
						if (!href.match(/\.(jpg|gif|png|mp4)$/))
							return;

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Lock.
						$modal[0]._locked = true;

					// Set src.
						$modalImg.attr('src', href);

					// Set visible.
						$modal.addClass('visible');

					// Focus.
						$modal.focus();
						console.log('Clicked href:', href); // Log the href value
						console.log('Modal visible:', $modal.hasClass('active')); // Check if modal visibility is triggered

					// Delay.
						setTimeout(function() {

							// Unlock.
								$modal[0]._locked = false;

						}, 600);

				})
				.on('click', '.modal', function(event) {

					var $modal = $(this),
						$modalImg = $modal.find('img');

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Already hidden? Bail.
						if (!$modal.hasClass('visible'))
							return;

					// Lock.
						$modal[0]._locked = true;

					// Clear visible, loaded.
						$modal
							.removeClass('loaded')

					// Delay.
						setTimeout(function() {

							$modal
								.removeClass('visible')

							setTimeout(function() {

								// Clear src.
									$modalImg.attr('src', '');

								// Unlock.
									$modal[0]._locked = false;

								// Focus.
									$body.focus();

							}, 475);

						}, 125);

				})
				.on('keypress', '.modal', function(event) {

					var $modal = $(this);

					// Escape? Hide modal.
						if (event.keyCode == 27)
							$modal.trigger('click');

				})
				.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
					.find('img')
						.on('load', function(event) {

							var $modalImg = $(this),
								$modal = $modalImg.parents('.modal');

							setTimeout(function() {

								// No longer visible? Bail.
									if (!$modal.hasClass('visible'))
										return;

								// Set loaded.
									$modal.addClass('loaded');

							}, 275);

						});

})(jQuery);

console.log('Gallery found:', $('.gallery').length); // Check if gallery is found
