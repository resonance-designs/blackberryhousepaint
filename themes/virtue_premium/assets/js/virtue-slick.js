/**
 * Init Slick Slider on jquery.
 */
jQuery( document ).ready( function( $ ) {

	/**
	 * init Slick Slider
	 */
	function virtueSlickSliderInit( container ) {
		var sliderSpeed = parseInt( container.data( 'slider-speed' ) ),
		sliderAnimation = container.data( 'slider-fade' ),
		sliderAnimationSpeed = parseInt( container.attr( 'data-slider-anim-speed' ) ),
		sliderArrows = container.data( 'slider-arrows' ),
		sliderAuto = container.data( 'slider-auto' ),
		sliderType = container.attr( 'data-slider-type' ),
		carouselCenterMode = container.attr( 'data-slider-center-mode' );
		var xxl = parseInt( container.attr( 'data-slider-xxl' ) ),
		xl = parseInt( container.attr( 'data-slider-xl' ) ),
		md = parseInt( container.attr( 'data-slider-md' ) ),
		sm = parseInt( container.attr( 'data-slider-sm' ) ),
		xs = parseInt( container.attr( 'data-slider-xs' ) ),
		ss = parseInt( container.attr( 'data-slider-ss' ) ),
		scroll = parseInt( container.attr( 'data-slider-scroll' ) );
		var thumbid = container.attr( 'data-slider-thumbid' ),
		thumbsshowing = container.attr( 'data-slider-thumbs-showing' ),
		sliderid = container.attr( 'id' ),
		sliderDots = container.attr( 'data-slider-dots' );
		var slidersShow = parseInt( container.attr( 'data-slides-to-show' ) );
		var slickRtl = false;
		var scrollSxxl = xxl,
		scrollSxl  = xl,
		scrollSmd  = md,
		scrollSsm  = sm,
		scrollSxs  = xs,
		scrollSss  = ss;
		if ( '' !== sliderDots && 'true' === sliderDots ) {
			sliderDots = true;
		} else {
			sliderDots = false;
		}
		if (carouselCenterMode == 'true' ) {
			carouselCenterMode = true;
		}
		if ( 1 <= $( 'body.rtl' ).length ) {
			slickRtl = true;
		}
		if ( 1 === scroll ) {
			scrollSxxl = 1;
			scrollSxl  = 1;
			scrollSmd  = 1;
			scrollSsm  = 1;
			scrollSxs  = 1;
			scrollSss  = 1;
		}
		container.on( 'init', function( event, slick ) {
			container.removeClass( 'loading' );
			container.parent('.loading').removeClass( 'loading' );
		});
		if ( 'carousel' === sliderType ) {
			if ( null === slidersShow ) {
				slidersShow = 1;
			}
			container.slick({
				slidesToScroll: 1,
				slidesToShow: slidersShow,
				centerMode: carouselCenterMode,
				variableWidth: true,
				arrows: sliderArrows,
				speed: sliderAnimationSpeed,
				autoplay: sliderAuto,
				autoplaySpeed: sliderSpeed,
				fade: sliderAnimation,
				pauseOnHover: false,
				rtl: slickRtl,
				dots: true
			});
		} else if ( 'content-carousel' === sliderType ) {
			container.slick({
				slidesToScroll: scrollSxxl,
				slidesToShow: xxl,
				arrows: sliderArrows,
				speed: sliderAnimationSpeed,
				autoplay: sliderAuto,
				autoplaySpeed: sliderSpeed,
				fade: sliderAnimation,
				pauseOnHover: false,
				dots: sliderDots,
				rtl: slickRtl,
				responsive: [
						{
							breakpoint: 1499,
							settings: {
							slidesToShow: xl,
							slidesToScroll: scrollSxl
							}
						},
						{
							breakpoint: 1199,
							settings: {
							slidesToShow: md,
							slidesToScroll: scrollSmd
							}
						},
						{
							breakpoint: 991,
							settings: {
							slidesToShow: sm,
							slidesToScroll: scrollSsm
							}
						},
						{
							breakpoint: 767,
							settings: {
							slidesToShow: xs,
							slidesToScroll: scrollSxs
							}
						},
						{
							breakpoint: 543,
							settings: {
							slidesToShow: ss,
							slidesToScroll: scrollSss
							}
						}
						]
			});
			container.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ) {
				container.find( '.kt-slickslider:not(.slick-initialized)' ).each( function() {
					virtueSlickSliderInit( $( this ) );
				});
			});
		} else if ( 'thumb' === sliderType ) {
			container.slick({
				slidesToScroll: 1,
				slidesToShow: 1,
				arrows: sliderArrows,
				speed: sliderAnimationSpeed,
				autoplay: sliderAuto,
				autoplaySpeed: sliderSpeed,
				fade: sliderAnimation,
				pauseOnHover: false,
				adaptiveHeight: true,
				dots: false,
				rtl: slickRtl,
				asNavFor: thumbid
			});
			$( thumbid ).slick({
				slidesToShow: thumbsshowing,
				slidesToScroll: 1,
				asNavFor: '#' + sliderid,
				dots: false,
				rtl: slickRtl,
				centerMode: false,
				focusOnSelect: true
			});
		} else {
			container.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: sliderArrows,
				speed: sliderAnimationSpeed,
				autoplay: sliderAuto,
				autoplaySpeed: sliderSpeed,
				fade: sliderAnimation,
				pauseOnHover: false,
				rtl: slickRtl,
				adaptiveHeight: true,
				dots: true
			});
		}
	}
	$( '.kt-slickslider' ).each( function() {
		var container = $( this );
		var sliderInitdelay = parseInt( container.attr( 'data-slider-initdelay' ) );
		if ( null === sliderInitdelay || 0 === sliderInitdelay ) {
			virtueSlickSliderInit( container );
		} else {
			setTimeout( function() {
				virtueSlickSliderInit( container );
			}, sliderInitdelay );
		}
	});
	$( '.init-infinit' ).each( function() {
		$( this ).on( 'append.infiniteScroll', function( event, response, path, items ) {
			var $newElems = jQuery( items );
			$newElems.find( '.kt-slickslider' ).each( function() {
				var container = $( this );
				var sliderInitdelay = parseInt( container.attr( 'data-slider-initdelay' ) );
				if ( null === sliderInitdelay || 0 === sliderInitdelay ) {
					virtueSlickSliderInit( container );
				} else {
					setTimeout( function() {
						virtueSlickSliderInit( container );
					}, sliderInitdelay );
				}
			});
		});
	});
});
