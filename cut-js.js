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
    .prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
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
    .children('.inner')
        //.css('overflow', 'hidden')
        .css('overflow-y', browser.mobile ? 'visible' : 'hidden')
        .css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
        .scrollLeft(0);