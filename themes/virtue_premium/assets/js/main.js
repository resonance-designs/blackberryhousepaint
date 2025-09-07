/* Initialize
*/
var kt_isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (kt_isMobile.Android() || kt_isMobile.BlackBerry() || kt_isMobile.iOS() || kt_isMobile.Opera() || kt_isMobile.Windows());
    }
};
if( !kt_isMobile.any() ) {
/*! Stellar.js v0.6.2 | Copyright 2014, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
!function($,t,e,i){function o(t,e){this.element=t,this.options=$.extend({},s,e),this._defaults=s,this._name=n,this.init()}var n="ktstellar",s={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(t){t.hide()},showElement:function(t){t.show()}},r={scroll:{getLeft:function(t){return t.scrollLeft()},setLeft:function(t,e){t.scrollLeft(e)},getTop:function(t){return t.scrollTop()},setTop:function(t,e){t.scrollTop(e)}},position:{getLeft:function(t){return-1*parseInt(t.css("left"),10)},getTop:function(t){return-1*parseInt(t.css("top"),10)}},margin:{getLeft:function(t){return-1*parseInt(t.css("margin-left"),10)},getTop:function(t){return-1*parseInt(t.css("margin-top"),10)}},transform:{getLeft:function(t){var e=getComputedStyle(t[0])[f];return"none"!==e?-1*parseInt(e.match(/(-?[0-9]+)/g)[4],10):0},getTop:function(t){var e=getComputedStyle(t[0])[f];return"none"!==e?-1*parseInt(e.match(/(-?[0-9]+)/g)[5],10):0}}},a={position:{setLeft:function(t,e){t.css("left",e)},setTop:function(t,e){t.css("top",e)}},transform:{setPosition:function(t,e,i,o,n){t[0].style[f]="translate3d("+(e-i)+"px, "+(o-n)+"px, 0)"}}},l=function(){var t=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,e=$("script")[0].style,i="",o;for(o in e)if(t.test(o)){i=o.match(t)[0];break}return"WebkitOpacity"in e&&(i="Webkit"),"KhtmlOpacity"in e&&(i="Khtml"),function(t){return i+(i.length>0?t.charAt(0).toUpperCase()+t.slice(1):t)}}(),f=l("transform"),c=$("<div />",{style:"background:#fff"}).css("background-position-x")!==i,h=c?function(t,e,i){t.css({"background-position-x":e,"background-position-y":i})}:function(t,e,i){t.css("background-position",e+" "+i)},p=c?function(t){return[t.css("background-position-x"),t.css("background-position-y")]}:function(t){return t.css("background-position").split(" ")},u=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(t){setTimeout(t,1e3/60)};o.prototype={init:function(){this.options.name=n+"_"+Math.floor(1e9*Math.random()),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),"scroll"===this.options.scrollProperty?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===e.body&&(this.element=t),this.$scrollElement=$(this.element),this.$element=this.element===t?$("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==i?$(this.options.viewportElement):this.$scrollElement[0]===t||"scroll"===this.options.scrollProperty?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var t=this,e=r[t.options.scrollProperty];this._getScrollLeft=function(){return e.getLeft(t.$scrollElement)},this._getScrollTop=function(){return e.getTop(t.$scrollElement)}},_defineSetters:function(){var t=this,e=r[t.options.scrollProperty],i=a[t.options.positionProperty],o=e.setLeft,n=e.setTop;this._setScrollLeft="function"==typeof o?function(e){o(t.$scrollElement,e)}:$.noop,this._setScrollTop="function"==typeof n?function(e){n(t.$scrollElement,e)}:$.noop,this._setPosition=i.setPosition||function(e,o,n,s,r){t.options.horizontalScrolling&&i.setLeft(e,o,n),t.options.verticalScrolling&&i.setTop(e,s,r)}},_handleWindowLoadAndResize:function(){var e=this,i=$(t);e.options.responsive&&i.bind("load."+this.name,function(){e.refresh()}),i.bind("resize."+this.name,function(){e._detectViewport(),e.options.responsive&&e.refresh()})},refresh:function(e){var i=this,o=i._getScrollLeft(),n=i._getScrollTop();e&&e.firstLoad||this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findBackgrounds(),e&&e.firstLoad&&/WebKit/.test(navigator.userAgent)&&$(t).on('load',function(){var t=i._getScrollLeft(),e=i._getScrollTop();i._setScrollLeft(t+1),i._setScrollTop(e+1),i._setScrollLeft(t),i._setScrollTop(e)}),this._setScrollLeft(o),this._setScrollTop(n)},_detectViewport:function(){var t=this.$viewportElement.offset(),e=null!==t&&t!==i;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=e?t.top:0,this.viewportOffsetLeft=e?t.left:0},_findBackgrounds:function(){var t=this,e=this._getScrollLeft(),o=this._getScrollTop(),n;this.backgrounds=[],this.options.parallaxBackgrounds&&(n=this.$element.find("[data-ktstellar-background-ratio]"),this.$element.data("ktstellar-background-ratio")&&(n=n.add(this.$element)),n.each(function(){var n=$(this),s=p(n),r,a,l,f,c,u,d,g,m,k=0,v=0,_=0,b=0;if(n.data("ktstellar-backgroundIsActive")){if(n.data("ktstellar-backgroundIsActive")!==this)return}else n.data("ktstellar-backgroundIsActive",this);n.data("ktstellar-backgroundStartingLeft")?h(n,n.data("ktstellar-backgroundStartingLeft"),n.data("ktstellar-backgroundStartingTop")):(n.data("ktstellar-backgroundStartingLeft",s[0]),n.data("ktstellar-backgroundStartingTop",s[1])),c="auto"===n.css("margin-left")?0:parseInt(n.css("margin-left"),10),u="auto"===n.css("margin-top")?0:parseInt(n.css("margin-top"),10),d=n.offset().left-c-e,g=n.offset().top-u-o,n.parents().each(function(){var t=$(this);return t.data("ktstellar-offset-parent")===!0?(k=_,v=b,m=t,!1):(_+=t.position().left,void(b+=t.position().top))}),r=n.data("ktstellar-horizontal-offset")!==i?n.data("ktstellar-horizontal-offset"):m!==i&&m.data("ktstellar-horizontal-offset")!==i?m.data("ktstellar-horizontal-offset"):t.horizontalOffset,a=n.data("ktstellar-vertical-offset")!==i?n.data("ktstellar-vertical-offset"):m!==i&&m.data("ktstellar-vertical-offset")!==i?m.data("ktstellar-vertical-offset"):t.verticalOffset,t.backgrounds.push({$element:n,$offsetParent:m,isFixed:"fixed"===n.css("background-attachment"),horizontalOffset:r,verticalOffset:a,startingValueLeft:s[0],startingValueTop:s[1],startingBackgroundPositionLeft:isNaN(parseInt(s[0],10))?0:parseInt(s[0],10),startingBackgroundPositionTop:isNaN(parseInt(s[1],10))?0:parseInt(s[1],10),startingPositionLeft:n.position().left,startingPositionTop:n.position().top,startingOffsetLeft:d,startingOffsetTop:g,parentOffsetLeft:k,parentOffsetTop:v,ktstellarRatio:n.data("ktstellar-background-ratio")===i?1:n.data("ktstellar-background-ratio")})}))},_reset:function(){var t,e,i,o;for(o=this.backgrounds.length-1;o>=0;o--)i=this.backgrounds[o],i.$element.data("ktstellar-backgroundStartingLeft",null).data("ktstellar-backgroundStartingTop",null),h(i.$element,i.startingValueLeft,i.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=$.noop,$(t).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var e=this,i=$(t);i.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),"function"==typeof this.options.horizontalOffset?(this.horizontalOffset=this.options.horizontalOffset(),i.bind("resize.horizontal-"+this.name,function(){e.horizontalOffset=e.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,"function"==typeof this.options.verticalOffset?(this.verticalOffset=this.options.verticalOffset(),i.bind("resize.vertical-"+this.name,function(){e.verticalOffset=e.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var t=this._getScrollLeft(),e=this._getScrollTop(),i,o,n,s,r,a,l,f=!0,c=!0,p,u,d,g,m;if(this.currentScrollLeft!==t||this.currentScrollTop!==e||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight)for(this.currentScrollLeft=t,this.currentScrollTop=e,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,m=this.backgrounds.length-1;m>=0;m--)r=this.backgrounds[m],s=r.isFixed?0:1,a=this.options.horizontalScrolling?(t+r.horizontalOffset-this.viewportOffsetLeft-r.startingOffsetLeft+r.parentOffsetLeft-r.startingBackgroundPositionLeft)*(s-r.ktstellarRatio)+"px":r.startingValueLeft,l=this.options.verticalScrolling?(e+r.verticalOffset-this.viewportOffsetTop-r.startingOffsetTop+r.parentOffsetTop-r.startingBackgroundPositionTop)*(s-r.ktstellarRatio)+"px":r.startingValueTop,h(r.$element,a,l)},_handleScrollEvent:function(){var t=this,e=!1,i=function(){t._repositionElements(),e=!1},o=function(){e||(u(i),e=!0)};this.$scrollElement.bind("scroll."+this.name,o),o()},_startAnimationLoop:function(){var t=this;this._animationLoop=function(){u(t._animationLoop),t._repositionElements()},this._animationLoop()}},$.fn[n]=function(t){var e=arguments;return t===i||"object"==typeof t?this.each(function(){$.data(this,"plugin_"+n)||$.data(this,"plugin_"+n,new o(this,t))}):"string"==typeof t&&"_"!==t[0]&&"init"!==t?this.each(function(){var i=$.data(this,"plugin_"+n);i instanceof o&&"function"==typeof i[t]&&i[t].apply(i,Array.prototype.slice.call(e,1)),"destroy"===t&&$.data(this,"plugin_"+n,null)}):void 0},$[n]=function(e){var i=$(t);return i.ktstellar.apply(i,Array.prototype.slice.call(arguments,0))},$[n].scrollProperty=r,$[n].positionProperty=a,t.Ktstellar=o}(jQuery,this,document);

}
(function($){
	'use strict';
	$.fn.kt_imagesLoaded = (function(){
		var kt_imageLoaded = function (img, cb, delay){
			var timer;
			var isReponsive = false;
			var $parent = $(img).parent();
			var $img = $('<img />');
			var lazy_src = $(img).attr('data-lazy-src');
			var lazy_srcset = $(img).attr('data-lazy-srcset');
			if( lazy_src ) {
				if( lazy_srcset ) {
					$(img).attr("srcset", lazy_srcset);
				}
				$(img).attr("src", lazy_src);
			}

			var srcset = $(img).attr('srcset');
			var sizes = $(img).attr('sizes') || '100vw';
			var src = $(img).attr('src');
			var onload = function(){
				$img.off('load error', onload);
				clearTimeout(timer);
				cb();
			};
			if(delay){
				timer = setTimeout(onload, delay);
			}
			$img.on('load error', onload);

			if($parent.is('picture')){
				$parent = $parent.clone();
				$parent.find('img').remove().end();
				$parent.append($img);
				isReponsive = true;
			}

			if(srcset){
				$img.attr('sizes', sizes);
				$img.attr('srcset', srcset);
				if(!isReponsive){
					$img.appendTo(document.createElement('div'));
				}
				isReponsive = true;
			} else if(src){
				$img.attr('src', src);
			}

			if(isReponsive && !window.HTMLPictureElement){
				if(window.respimage){
					window.respimage({elements: [$img[0]]});
				} else if(window.picturefill){
					window.picturefill({elements: [$img[0]]});
				} else if(src){
					$img.attr('src', src);
				}
			}
		};

		return function(cb){
			var i = 0;
			var $imgs = $('img', this).add(this.filter('img'));
			var ready = function(){
				i++;
				if(i >= $imgs.length){
					cb();
				}
			};
			if(!$imgs.length) {
				return cb();
			}
			$imgs.each(function(){
				kt_imageLoaded(this, ready);
			});
			return this;
		};
	})();
})(jQuery);
jQuery( function($) {
	var sticky_enabled = (typeof $().sticky == 'function');
	if ( sticky_enabled == false ) {
		$.fn.sticky = function( method ) {
			$( this ).ktsticky( method );
		};
	};
	// Bootstrap Init
		if( !kt_isMobile.any() ) {
			$("[rel=tooltip]").tooltip();
			$('[data-toggle=tooltip]').tooltip();
		}
		$("[data-toggle=popover]").popover();
		$('#authorTab a').click(function (e) {e.preventDefault(); $(this).tab('show'); });
		$('.sc_tabs a').click(function (e) {e.preventDefault(); $(this).tab('show'); });
		
			$(document).mouseup(function (e) {
			    var container = $("#kad-menu-search-popup");
				if (!container.is(e.target) && container.has(e.target).length === 0) {
			        $('#kad-menu-search-popup.in').collapse('hide');
			    }
			});
			$('#kad-menu-search-popup').on('shown.bs.collapse', function () {
			   $('.kt-search-container .search-query').focus();
			});
			$('#mh-kad-menu-search-popup').on('shown.bs.collapse', function () {
			   $('.mh-kt-search-container .search-query').focus();
			});
		$('.kt_typed_element').each(function() {
				var first = $(this).data('first-sentence'),
					second = $(this).data('second-sentence'),
					third = $(this).data('third-sentence'),
					fourth = $(this).data('fourth-sentence'),
					loopeffect = $(this).data('loop'),
					speed = $(this).data('speed'),
					startdelay = $(this).data('start-delay'),
					linecount = $(this).data('sentence-count');
					if(startdelay == null) {startdelay = 500;}
					if(linecount == '1'){
						var options = {
					      strings: [first],
					      typeSpeed: speed,
					      startDelay: startdelay,
					      loop: loopeffect,
					  }
			    	}else if(linecount == '3'){
						var options = {
					      strings: [first, second, third],
					      typeSpeed: speed,
					      startDelay: startdelay,
					      loop: loopeffect,
					  }
			    	} else if(linecount == '4'){
			    		var options = {
					      strings: [first, second, third, fourth],
					      typeSpeed: speed,
					      startDelay: startdelay,
					      loop: loopeffect,
					  }
			    	} else {
			    		var options = {
					      strings: [first, second],
					      typeSpeed: speed,
					      startDelay: startdelay,
					      loop: loopeffect,
					  }
			    	}
				$(this).appear(function() {
					$(this).typed(options);
				},{accX: 0, accY: -25});
      	});
		$(".videofit").fitVids();
		$(".embed-youtube").fitVids();
		$('.kt-m-hover').bind('touchend', function(e) {
	        $(this).toggleClass('kt-mobile-hover');
	        $(this).toggleClass('kt-mhover-inactive');
	    });

		$('.collapse-next').click(function (e) {
			//e.preventDefault();
		    var $target = $(this).siblings('.sf-dropdown-menu');
		     if($target.hasClass('in') ) {
		    	$target.collapse('toggle');
		    	$(this).removeClass('toggle-active');
		    } else {
		    	$target.collapse('toggle');
		    	$(this).addClass('toggle-active');
		    }
		});
		
		var select2select = $('body').attr('data-jsselect');
		// if( $(window).width() > 790 && !kt_isMobile.any() && 1 == select2select ) {
		// 	$('select:not(#rating):not(.kt-no-select2)').select2( { minimumResultsForSearch: -1 } );
		// 	$('select.country_select').select2();
		// 	$('select.state_select').select2();
		// 	$( 'body' ).on( 'quick-view-displayed', function() {
		// 		$('select:not(#rating):not(.kt-no-select2)').select2( { minimumResultsForSearch: -1 } );
		// 	});
		// }
		if( jQuery(window).width() > 790 && !kt_isMobile.any() && ( select2select == 1 ) && typeof $.fn.selectWoo === "function" ) {
			$('select:not(#rating):not(.kt-no-select2)').each(function(){
				jQuery(this).selectWoo({minimumResultsForSearch: -1 });
			} );
			jQuery('select.country_select').selectWoo();
			jQuery('select.state_select').selectWoo();
		} else if ( typeof $.fn.selectWoo === "function" ) {
			if ( jQuery('select:not(#rating):not(.kt-no-select2):not(.country_select):not(.state_select)').hasClass("select2-hidden-accessible") ) {
				jQuery('select:not(#rating):not(.kt-no-select2)').selectWoo('destroy'); 
			}
		}

	if ($('.tab-pane .kad_product_wrapper').length) {
		var $container = $('.kad_product_wrapper');
		$('.sc_tabs').on('shown.bs.tab', function  (e) {
			$container.isotopeb({masonry: {columnWidth: '.kad_product'}, transitionDuration: '0.8s'});
		});
	}
	if ($('.panel-body .kad_product_wrapper').length) {
		var $container = $('.kad_product_wrapper');
		$('.panel-group').on('shown.bs.collapse', function  (e) {
		$container.isotopeb({masonry: {columnWidth: '.kad_product'}, transitionDuration: '0.8s'});
		});
		$('.panel-group').on('hidden.bs.collapse', function  (e) {
			$container.isotopeb({masonry: {columnWidth: '.kad_product'}, transitionDuration: '0.8s'});
		});
	}
	// anchor scroll
	
		$('.kad_fullslider_arrow').localScroll();
		var stickyheader = $('body').attr('data-sticky'),
		header = $('#kad-banner'),
		productscroll = $('body').attr('data-product-tab-scroll');
		if(productscroll == 1 && $(window).width() > 992){
			if(stickyheader == 1) {var offset_h = $(header).height() + 100; } else { var offset_h = 100;}
			$('.woocommerce-tabs').localScroll({offset: -offset_h});
		}

	// Sticky Header Varibles
	var stickyheader = $('body').attr('data-sticky'),
		shrinkheader = $('#kad-banner').attr('data-header-shrink'),
		mobilestickyheader = $('#kad-banner').attr('data-mobile-sticky'),
		win = $(window),
		header = $('.stickyheader #kad-banner'),
		headershrink = $('.stickyheader #kad-banner #kad-shrinkheader'),
		logo = $('.stickyheader #kad-banner #logo a, .stickyheader #kad-banner #logo a #thelogo'),
		logobox = $('.stickyheader #kad-banner #logo a img'),
		menu = $('.stickyheader #kad-banner .nav-main ul.sf-menu > li > a'),
		content = $('.stickyheader .wrap'),
		mobilebox = $('.stickyheader .mobile-stickyheader .mobile_menu_collapse'),
		headerouter = $('.stickyheader .sticky-wrapper'),
		shrinkheader_height = $('#kad-banner').attr('data-header-base-height'),
		topOffest = $('body').hasClass('admin-bar') ? 32 : 0;

	function kad_sticky_header() {
		var header_height = $(header).height(),
		topbar_height = $('.stickyheader #kad-banner #topbar').height();
		set_height = function() {
				var scrollt = win.scrollTop(),
                newH = 0;
                if(scrollt < 0) {
                	scrollt = 0;
                }
                if(scrollt < shrinkheader_height/1) {
                    newH = shrinkheader_height - scrollt/2;
                    header.removeClass('header-scrolled');
                }else{
                    newH = shrinkheader_height/2;
                    header.addClass('header-scrolled');
                }
                menu.css({'height': newH + 'px', 'lineHeight': newH + 'px'});
                headershrink.css({'height': newH + 'px', 'lineHeight': newH + 'px'});
                header.css({'height': newH + topbar_height + 'px'});
                logo.css({'height': newH + 'px', 'lineHeight': newH + 'px'});
                logobox.css({'maxHeight': newH + 'px'});
            };
		if (shrinkheader == 1 && stickyheader == 1 && $(window).width() > 992 ) {
	        header.css({'top': topOffest + 'px'});
			header.ktsticky({topSpacing:topOffest});
			win.scroll(set_height);
		} else if( stickyheader == 1 && $(window).width() > 992) {
			header.css({'height': header_height + 'px'});
			header.css({'top': topOffest + 'px'});
			header.ktsticky({topSpacing:topOffest});
		} else if (shrinkheader == 1 && stickyheader == 1 && mobilestickyheader == 1 && $(window).width() < 992 ) {
			header.css({'height': 'auto'});
			header.ktsticky({topSpacing:topOffest});
			var win_height = $(window).height();
			var mobileh_height = shrinkheader_height/2;
			mobilebox.css({'maxHeight': win_height - mobileh_height + 'px'});
		} else {
			header.css({'position':'static'});
			content.css({'padding-top': '15px'});
			header.css({'height': 'auto'});
		}

	}
	header.imagesLoadedn( function() {
		kad_sticky_header();
	});
	var menustick = $('#kad-banner').attr('data-menu-stick');
	if ( menustick == 1 ) {
		$('#nav-main').ktsticky({topSpacing:topOffest});
	}
	function kad_mobile_sticky_header() {
		var mobile_header_height = $('#kad-mobile-banner').height(),
			topOffest = $('body').hasClass('admin-bar') ? 32 : 0,
			mobilestickyheader = $('#kad-mobile-banner').attr('data-mobile-header-sticky');
			if($(window).width() < 600 && $('body').hasClass('admin-bar')) {
				topOffest = 0;
			} else if ($(window).width() < 782 && $('body').hasClass('admin-bar')) {
				topOffest = 46;
			}
		if (mobilestickyheader == 1) {
			$('#kad-mobile-banner').ktsticky({topSpacing:topOffest});
			var window_height = $(window).height();
			$('#mg-kad-mobile-nav #mh-mobile_menu_collapse').css({'maxHeight': window_height - mobile_header_height + 'px'});
		}
	}
	if( $('#kad-mobile-banner').length) {
		kad_mobile_sticky_header();
	}
	//Superfish Menu
		$('ul.sf-menu').superfish({
			delay:       200,
			animation:   {opacity:'show',height:'show'},
			speed:       'fast'
		});
	function kad_fullwidth_panel() {
		$('.kt-panel-row-stretch').each(function(){
			$(this).css({'visibility': 'visible'});
		});
		$('.kt-panel-row-full-stretch').each(function(){
			$(this).css({'visibility': 'visible'});
		});
		$('.panel-row-style-wide-grey').each(function(){
			var margins = $(window).width() - $(this).parent('.panel-grid').width();
			$(this).css({'padding-left': margins/2 + 'px'});
			$(this).css({'padding-right': margins/2 + 'px'});
			$(this).css({'margin-left': '-' + margins/2 + 'px'});
			$(this).css({'margin-right': '-' + margins/2 + 'px'});
			$(this).css({'visibility': 'visible'});
		});
		$('.panel-row-style-wide-feature').each(function(){
			var margins = $(window).width() - $(this).parent('.panel-grid').width();
			$(this).css({'padding-left': margins/2 + 'px'});
			$(this).css({'padding-right': margins/2 + 'px'});
			$(this).css({'margin-left': '-' + margins/2 + 'px'});
			$(this).css({'margin-right': '-' + margins/2 + 'px'});
			$(this).css({'visibility': 'visible'});
		});
		$('.panel-row-style-wide-parallax').each(function(){
			var margins = $(window).width() - $(this).parent('.panel-grid').width();
			$(this).css({'padding-left': margins/2 + 'px'});
			$(this).css({'padding-right': margins/2 + 'px'});
			$(this).css({'margin-left': '-' + margins/2 + 'px'});
			$(this).css({'margin-right': '-' + margins/2 + 'px'});
			$(this).css({'visibility': 'visible'});
		});
		$('.kt-custom-row-full-stretch').each(function(){
			var margins = $(window).width() - $(this).parents('#content').width();
			$(this).css({'margin-left': '-' + margins/2 + 'px'});
			$(this).css({'margin-right': '-' + margins/2 + 'px'});
			$(this).css({'width': + $(window).width() + 'px'});
			$(this).css({'visibility': 'visible'});
		});
		$('.kt-custom-row-full').each(function(){
			var margins = $(window).width() - $(this).parents('#content').width();
			$(this).css({'padding-left': margins/2 + 'px'});
			$(this).css({'padding-right': margins/2 + 'px'});
			$(this).css({'margin-left': '-' + margins/2 + 'px'});
			$(this).css({'margin-right': '-' + margins/2 + 'px'});
			$(this).css({'visibility': 'visible'});
		});
	}
	kad_fullwidth_panel();
	$(window).on("debouncedresize", function( event ) {kad_fullwidth_panel();});
	
	function kt_is_appeared( $element ) {
		if ( ! $element.is(':visible') ) {
			return false;
		}

		var window_left = $(window).scrollLeft();
		var window_top = $(window).scrollTop();
		var offset = $element.offset();
		var left = offset.left;
		var top = offset.top;

		if (top + $element.height() >= window_top &&
			top - ( 50 ) <= window_top + $(window).height() &&
			left + $element.width() >= window_left &&
			left - ( 0 ) <= window_left + $(window).width()) {
			return true;
		} else {
			return false;
		}
	}
	//animate in
    var $animate = $('body').attr('data-animate');
    if( $animate == 1 && $(window).width() > 790) {
            //fadein
        $('.kad-animation').each(function() {
            $(this).appear(function() {
            	$(this).delay($(this).attr('data-delay')).animate({'opacity' : 1, 'top' : 0},800,'swing');},{accX: 0, accY: -25},'easeInCubic');
        });
        $('.kt-animate-fade-in-up').each(function() {
            $(this).appear(function() {
            	$(this).animate({'opacity' : 1, 'top' : 0},900,'swing');},{accX: 0, accY: -25},'easeInCubic');
        });
        $('.kt-animate-fade-in-down').each(function() {
            $(this).appear(function() {
            	$(this).animate({'opacity' : 1, 'top' : 0},900,'swing');},{accX: 0, accY: -25},'easeInCubic');
        });
        $('.kt-animate-fade-in-left').each(function() {
            $(this).appear(function() {
            	$(this).animate({'opacity' : 1, 'left' : 0},900,'swing');},{accX: -25, accY: 0},'easeInCubic');
        });
        $('.kt-animate-fade-in-right').each(function() {
            $(this).appear(function() {
            	$(this).animate({'opacity' : 1, 'right' : 0},900,'swing');
            },{accX: -25, accY: 0},'easeInCubic');
        });
        $('.kt-animate-fade-in').each(function() {
            $(this).appear(function() {
            	$(this).animate({'opacity' : 1 },900,'swing');});
        });
        // Make visible normally if off screen
        $('.kad-animation').each(function() {
        	if( ! kt_is_appeared( $(this) ) ) {
        		$(this).css({'opacity' : 1, 'top' : 0 });
        	}
        });
        var scrolled = false;
		$(window).on('scroll', function() {
			if ( ! scrolled ) {
				scrolled = true;
				$('.kad-animation').each(function() {
					if( ! kt_is_appeared( $(this) ) ) {
						$(this).css({'opacity' : '', 'top' : '' });
					}
				});
			}
		});
        
    } else {
    	$('.kad-animation').each(function() {
    		$(this).animate({'opacity' : 1, 'top' : 0});
    	});
    	$('.kt-animate-fade-in-up').each(function() {
    		$(this).animate({'opacity' : 1, 'top' : 0});
    	});
    	$('.kt-animate-fade-in-down').each(function() {
    		$(this).animate({'opacity' : 1, 'top' : 0});
    	});
    	$('.kt-animate-fade-in-left').each(function() {
    		$(this).animate({'opacity' : 1, 'left' : 0});
    	});
    	$('.kt-animate-fade-in-right').each(function() {
    		$(this).animate({'opacity' : 1, 'right' : 0});
    	});
    	$('.kt-animate-fade-in').each(function() {
    		$(this).animate({'opacity' : 1});
    	});
	}
	$('.kt-pb-animation').each(function() {
    	 $(this).appear(function() {
    	 	$(this).addClass('kt-pb-animate');
    	 },{accX: -25, accY: 0},'easeInCubic');
    });
    // Responsive Text for call To action
	if($('.kt-ctaw .kt-call-to-action-title').length) {
		$('.kt-ctaw .kt-call-to-action-title').each(function(){
			var maxsize = $(this).data('max-size'),
				minsize = $(this).data('min-size');
			$(this).kt_fitText(1.3, { minFontSize: minsize, maxFontSize: maxsize, maxWidth: 1140, minWidth: 400 });
		});
	}
	if($('.kt-ctaw .kt-call-to-action-subtitle').length) {
		$('.kt-ctaw .kt-call-to-action-subtitle').each(function(){
			var sub_maxsize = $(this).data('max-size'),
			sub_minsize = $(this).data('min-size');
			$(this).kt_fitText(1.5, { minFontSize: sub_minsize, maxFontSize: sub_maxsize, maxWidth: 1140, minWidth: 400  });
		});
	}
	if($('.kt-ctaw .kt-call-to-action-abovetitle').length) {
		$('.kt-ctaw .kt-call-to-action-abovetitle').each(function(){
			var sub_maxsize = $(this).data('max-size'),
			sub_minsize = $(this).data('min-size');
			$(this).kt_fitText(1.5, { minFontSize: sub_minsize, maxFontSize: sub_maxsize, maxWidth: 1140, minWidth: 400  });
		});
	}
    if ($('.blog_carousel').length) {
		var bmatchheight = $('.blog_carousel').data('iso-match-height');
		if(bmatchheight == '1') {
	 		$('.blog_carousel .blog_item').matchHeight();
	 	}
	}
	if ($('.kt-home-iconmenu-container').length) {
		var equalheight = $('.kt-home-iconmenu-container').data('equal-height');
		if(equalheight == '1') {
	 		$('.kt-home-iconmenu-container .home-icon-item').matchHeight();
	 	}
	}
     //init isotope
    $('.init-isotope').each(function(){
    	var isocontainer = $(this),
    	iso_selector = $(this).data('iso-selector'),
    	iso_style = $(this).data('iso-style'),
    	iso_filter = $(this).data('iso-filter'),
    	matchheight = $(this).data('iso-match-height');
    	if(iso_style == null) {iso_style = 'masonry';}
    	if(iso_filter == null) {iso_filter = 'false';}
    	if(matchheight == null) {matchheight = 'false';}
    	if($('body.rtl').length >= 1){
			var iso_rtl = false;
		} else {
			var iso_rtl = true;
		}
		if(matchheight == '1') {
 			isocontainer.find('.blog_item').matchHeight();
 		} else {
			var masGrid = isocontainer.isotopeb({masonry: {columnWidth: iso_selector}, layoutMode:iso_style, itemSelector: iso_selector, transitionDuration: '0.8s', isOriginLeft: iso_rtl});
		}
		if(isocontainer.attr('data-fade-in') == 1) {
			var isochild = isocontainer.find('.kt_item_fade_in');
			isochild.css('opacity',0);
				isochild.each(function(i){
								$(this).delay(i*150).animate({'opacity':1},350);
				});
		}
		if(iso_filter == true) {
			var thisparent = isocontainer.parents('.main');
			var thisfilters = thisparent.find('#filters');
			if(thisfilters.length) {
			thisfilters.on( 'click', 'a', function( event ) {
					var filtr = $(this).attr('data-filter');
					isocontainer.isotopeb({ filter: filtr });
					  return false; 
				});
				var $optionSets = $('#options .option-set'),
          		$optionLinks = $optionSets.find('a');	
				$optionLinks.click(function(){ 
					var $this = $(this); if ( $this.hasClass('selected') ) {return false;}
					var $optionSet = $this.parents('.option-set'); $optionSet.find('.selected').removeClass('selected'); $this.addClass('selected');
				});
			}
		}
		if ( masGrid ) {
			masGrid.imagesLoaded().progress( function() {
				masGrid.isotopeb( 'layout' );
			} );
		}
				
	});
	//init init-isotope-intrinsic
    $('.init-isotope-intrinsic').each(function(){
    	var isocontainer = $(this),
    	iso_selector = $(this).data('iso-selector'),
    	iso_style = $(this).data('iso-style'),
    	iso_filter = $(this).data('iso-filter');
    	if($('body.rtl').length >= 1){
			var iso_rtl = false;
		} else {
			var iso_rtl = true;
		}
		isocontainer.isotopeb({masonry: {columnWidth: iso_selector}, layoutMode:iso_style, itemSelector: iso_selector, transitionDuration: '0.8s', isOriginLeft: iso_rtl});
		if(isocontainer.attr('data-fade-in') == 1) {
			var isochild = isocontainer.find('.kt_item_fade_in');
			isochild.css('opacity',0);
				isochild.each(function(i){
								$(this).delay(i*150).animate({'opacity':1},350);
				});
		}
		if ( iso_filter == true ) {
			var thisparent = isocontainer.parents('.main');
			var thisfilters = thisparent.find('#filters');
			if ( thisfilters.length ) {
				thisfilters.on( 'click', 'a', function( event ) {
					var filtr = $(this).attr('data-filter');
					isocontainer.isotopeb({ filter: filtr });
					isocontainer.find( '.kt-slickslider' ).each( function() {
						$( this ).slick( 'setPosition' );
					});
					return false; 
				});
				var $optionSets = $('#options .option-set'),
				$optionLinks = $optionSets.find('a');	
				$optionLinks.click(function(){ 
					var $this = $(this); if ( $this.hasClass('selected') ) {return false;}
					var $optionSet = $this.parents('.option-set'); $optionSet.find('.selected').removeClass('selected'); $this.addClass('selected');
				});
			}
		}
				
	});
 $('.init-mosaic-isotope').each(function(){
    	var isocontainer = $(this),
    	iso_selector = $(this).data('iso-selector'),
    	iso_style = $(this).data('iso-style'),
    	iso_filter = $(this).data('iso-filter');
    	if($('body.rtl').length){
			var iso_rtl = false;
		} else {
			var iso_rtl = true;
		}
		//init
		isocontainer.isotopeb({layoutMode:iso_style, itemSelector: iso_selector, transitionDuration: '.8s',  isOriginLeft: iso_rtl});
		// fade
		if(isocontainer.attr('data-fade-in') == 1) {
			var isochild = isocontainer.find('.kt_item_fade_in');
			isochild.css('opacity',0);
				isochild.each(function(i){
								$(this).delay(i*150).animate({'opacity':1},350);
				});
		}

		if(iso_filter == true) {
			var thisparent = isocontainer.parents('.main');
			var thisfilters = thisparent.find('#filters');
			if(thisfilters.length) {
				thisfilters.on( 'click', 'a', function( event ) {
					var filtr = $(this).attr('data-filter');
					isocontainer.isotopeb({ filter: filtr });
					isocontainer.find('.kt-slickslider').each(function(){
						$(this).slick('setPosition');
					});
					  return false; 
				});
				var $optionSets = $('#options .option-set'),
          		$optionLinks = $optionSets.find('a');	
				$optionLinks.click(function(){ 
					var $this = $(this); if ( $this.hasClass('selected') ) {return false;}
					var $optionSet = $this.parents('.option-set'); $optionSet.find('.selected').removeClass('selected'); $this.addClass('selected');
				});
			}
		}
				
	});
// Toggle 
if ($('.kt_product_toggle_container').length) {
			var thistoggleon = $('.kt_product_toggle_container .toggle_list'),
			thistoggleoff = $('.kt_product_toggle_container .toggle_grid');
			thistoggleon.click(function(){
					if ( $(this).hasClass('toggle_active') ) {return false;}
					$(this).parents('.kt_product_toggle_container').find('.toggle_active').removeClass('toggle_active');
					$(this).addClass('toggle_active');
					if ($('.kad_product_wrapper').length) { 
						$('.kad_product_wrapper').addClass('shopcolumn1');
						$('.kad_product_wrapper').addClass('tfsinglecolumn');
						var $container = $('.kad_product_wrapper'),
						iso_selector = $('.kad_product_wrapper').data('iso-selector');
						$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '.4s'});
					}
					  return false; 
				});
			thistoggleoff.click(function(){
					if ( $(this).hasClass('toggle_active') ) {return false;}
					$(this).parents('.kt_product_toggle_container').find('.toggle_active').removeClass('toggle_active');
					$(this).addClass('toggle_active');
					if ($('.kad_product_wrapper').length) { 
						$('.kad_product_wrapper').removeClass('shopcolumn1');
						$('.kad_product_wrapper').removeClass('tfsinglecolumn');
						var $container = $('.kad_product_wrapper'),
						iso_selector = $('.kad_product_wrapper').data('iso-selector');
						$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '.4s'});
					}
					  return false; 
				});
			}
	if ($('.kt_product_toggle_container_list').length) {
			var thistoggleon = $('.kt_product_toggle_container_list .toggle_list'),
			thistoggleoff = $('.kt_product_toggle_container_list .toggle_grid');
			thistoggleon.click(function(){
					if ( $(this).hasClass('toggle_active') ) {return false;}
					$(this).parents('.kt_product_toggle_container_list').find('.toggle_active').removeClass('toggle_active');
					$(this).addClass('toggle_active');
					if ($('.kad_product_wrapper').length) { 
						$('.kad_product_wrapper').addClass('shopcolumn1');
						$('.kad_product_wrapper').addClass('tfsinglecolumn');
						$('.kad_product_wrapper').removeClass('kt_force_grid_three');
						var $container = $('.kad_product_wrapper'),
						iso_selector = $('.kad_product_wrapper').data('iso-selector');
						$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '.4s'});
					}
					  return false; 
				});
			thistoggleoff.click(function(){
					if ( $(this).hasClass('toggle_active') ) {return false;}
					$(this).parents('.kt_product_toggle_container_list').find('.toggle_active').removeClass('toggle_active');
					$(this).addClass('toggle_active');
					if ($('.kad_product_wrapper').length) { 
						$('.kad_product_wrapper').removeClass('shopcolumn1');
						$('.kad_product_wrapper').removeClass('tfsinglecolumn');
						$('.kad_product_wrapper').addClass('kt_force_grid_three');
						var $container = $('.kad_product_wrapper'),
						iso_selector = $('.kad_product_wrapper').data('iso-selector');
						$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '.4s'});
					}
					  return false; 
				});
	}
if ($('.woocommerce-tabs .panel .reinit-isotope').length) {
		var $container = $('.reinit-isotope'),
		iso_selector = $('.reinit-isotope').data('iso-selector');
		function woo_refreash_iso(){
			$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '0s'});
		}
	$('.woocommerce-tabs ul.tabs li a' ).click( function() {
		setTimeout(woo_refreash_iso, 50);
	});
}
// Re init iso for streached rows.
if ( $('.siteorigin-panels-stretch .reinit-isotope').length) {
	$(window).on('panelsStretchRows', function( event ) {
		var $container = $('.reinit-isotope'),
		iso_selector = $('.reinit-isotope').data('iso-selector');
		$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '0s'});
	});
}
if ( $( '.panel-body .reinit-isotope' ).length ) {
	var $container = $('.reinit-isotope'),
	iso_selector = $('.reinit-isotope').data('iso-selector');
	$('.panel-group').on('shown.bs.collapse', function  (e) {
	$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '0s'});
	});
}
if ( $( '.tab-pane .reinit-isotope' ).length ) {
	$('.tab-pane .reinit-isotope').each(function(){
		var $container = $(this),
		iso_selector = $(this).data('iso-selector');
		$('.sc_tabs').on('shown.bs.tab', function  (e) {
			$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '0s'});
		});
	});
}
function kad_re_init_iso_elementor() {
	if ($('.elementor-section-stretched .reinit-isotope').length) {
		$('.elementor-section-stretched .reinit-isotope').each(function(){
			var $container = $(this),
			iso_selector = $(this).data('iso-selector');
			$container.isotopeb({masonry: {columnWidth: iso_selector}, transitionDuration: '0s'});
		});
	}
}

$( window ).on( 'load', kad_re_init_iso_elementor );
jQuery('.init-infinit').each( function() {
	var $container = $(this);
  	nextSelector = $(this).data('nextselector'), 
	navSelector = $(this).data('navselector'), 
	itemSelector = $(this).data('itemselector'),
	itemloadselector = $(this).data('itemloadselector'),
	matchheight = $(this).data('iso-match-height');
	if ( $( nextSelector ).length ) {
	  	$container.infiniteScroll( {
			path: nextSelector,
			append: itemSelector,
			checkLastPage: true,
			status: '.scroller-status',
			scrollThreshold: 400,
			loadOnScroll: true,
			history: false,
			hideNav: navSelector,
		} );
  	$container.on( 'append.infiniteScroll', function( event, response, path, items ) {
  		var $newElems = jQuery( items );
  		$newElems.find('img').each( function() {
			$(this).attr('data-srcset', $(this).attr('srcset'));
			$(this).removeAttr('srcset');
		});
		$newElems.find('img').each( function() {
			$(this).attr('srcset', $(this).attr('data-srcset'));
			$(this).removeAttr('data-srcset');
		});
  		$newElems.imagesLoadedn( function() {
    		if(matchheight == '1') {
	 			$container.find('.blog_item').matchHeight('remove')
		       	$container.find('.blog_item').matchHeight();
	 		} else {
		    	$container.isotopeb( 'appended', $newElems );
		    }
		    if($container.attr('data-fade-in') == 1) {
				//fadeIn items one by one
				$newElems.each(function(i){
					$(this).find(itemloadselector).delay(i*150).animate({'opacity':1},350);
				});
			}
    	});
	});
  }
});
     	
	jQuery('.init-infinit-norm').each(function(){
     	var $container = $(this);
     	nextSelector = $(this).data('nextselector'), 
        navSelector = $(this).data('navselector'), 
        itemSelector = $(this).data('itemselector'),
        itemloadselector = $(this).data('itemloadselector');
        if( $(nextSelector).length ) {
        	$container.infiniteScroll({
				  path: nextSelector,
				  append: itemSelector,
				  checkLastPage: true,
				  status: '.scroller-status',
				  scrollThreshold: 400,
				  loadOnScroll: true,
				  history: false,
				  hideNav: navSelector,
			});
			$container.on( 'append.infiniteScroll', function( event, response, path, items ) {
				jQuery(window).trigger( "infintescrollnewelements" );
          		var $newElems = jQuery( items );
          		// Stupid Hack for Safari
          		$newElems.find('img').each( function() {
					$(this).attr('data-srcset', $(this).attr('srcset'));
					$(this).removeAttr('srcset');
				});
				$newElems.find('img').each( function() {
					$(this).attr('srcset', $(this).attr('data-srcset'));
					$(this).removeAttr('data-srcset');
				});
			    	if($newElems.attr('data-animation') == 'fade-in') {
						$newElems.each(function() {
							$(this).appear(function() {
								$(this).delay($(this).attr('data-delay')).animate({'opacity' : 1, 'top' : 0},800,'swing');
							},{accX: 0, accY: -85},'easeInCubic');
						});
					}
				});
		}
	}); 
    $('html').removeClass('no-js');
    $('html').addClass('js-running');

});

if( !kt_isMobile.any() ) {
	jQuery(document).ready(function ($) {		
			jQuery(window).ktstellar({
					   	responsive: false,
					   	horizontalScrolling: false,
						verticalOffset: 150,
				});
		jQuery(window).on("debouncedresize", function( event ) {
				jQuery(window).ktstellar('refresh');
		});
		
	});
}
jQuery(window).on( 'load', function(){
	jQuery('body').animate({'opacity' : 1});
	jQuery(document).on( "yith-wcan-ajax-filtered", function () {
		var $container = jQuery('.kad_product_wrapper');
			$container.imagesLoadedn( function(){
				$container.isotopeb({masonry: {columnWidth: '.kad_product'}, layoutMode:'fitRows', transitionDuration: '0.8s'});
				if($container.attr('data-fade-in') == 1) {
					jQuery('.kad_product_wrapper .kad_product_fade_in').css('opacity',0);
					jQuery('.kad_product_wrapper .kad_product_fade_in').each(function(i){
					jQuery(this).delay(i*150).animate({'opacity':1},350);});
				}
				});

			jQuery('#filters').on( 'click', 'a', function( event ) {
			  var filtr = $(this).attr('data-filter');
			  $container.isotopeb({ filter: filtr });
			  return false; 
			});				
			var $optionSets = jQuery('#options .option-set'),$optionLinks = $optionSets.find('a');$optionLinks.click(function(){var $this = jQuery(this);if ( $this.hasClass('selected') ) {return false;}
			var $optionSet = $this.parents('.option-set');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');});
	});
	jQuery(document).on( 'wpf_ajax_success', function () {
		var $container = jQuery('.kad_product_wrapper');
			$container.imagesLoadedn( function(){
				$container.isotopeb({masonry: {columnWidth: '.kad_product'}, layoutMode:'fitRows', transitionDuration: '0.8s'});
				if($container.attr('data-fade-in') == 1) {
					jQuery('.kad_product_wrapper .kad_product_fade_in').css('opacity',0);
					jQuery('.kad_product_wrapper .kad_product_fade_in').each(function(i){
					jQuery(this).delay(i*150).animate({'opacity':1},350);});
				}
				});

			jQuery('#filters').on( 'click', 'a', function( event ) {
			  var filtr = $(this).attr('data-filter');
			  $container.isotopeb({ filter: filtr });
			  return false; 
			});				
			var $optionSets = jQuery('#options .option-set'),$optionLinks = $optionSets.find('a');$optionLinks.click(function(){var $this = jQuery(this);if ( $this.hasClass('selected') ) {return false;}
			var $optionSet = $this.parents('.option-set');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');});
	});
	jQuery(document).on( "post-load", function () {
		var $container = jQuery('.kad_product_wrapper');
			$container.isotopeb('destroy');
			$container.imagesLoadedn( function(){
				jQuery('.kad_product_wrapper').isotopeb({masonry: {columnWidth: '.kad_product'}, layoutMode:'fitRows', transitionDuration: '0.8s'});
				if($container.attr('data-fade-in') == 1) {
					jQuery('.kad_product_wrapper .kad_product_fade_in').css('opacity',0);
					jQuery('.kad_product_wrapper .kad_product_fade_in').each(function(i){
					jQuery(this).delay(i*150).animate({'opacity':1},350);});
				}
			});
	});
});
var scrolltotop={
	//startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
	//scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
	setting: {startline:200, scrollto: 0, scrollduration:1200, fadeduration:[500, 100]},
	controlHTML: '<div class="to_the_top"><a title="' + virtue_js.totop + '" class="icon-arrow-up"></a></div>', //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
	controlattrs: {offsetx:0, offsety:52}, //offset of control relative to right/ bottom of window corner
	anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

	state: {isvisible:false, shouldvisible:false},

	scrollup:function(){
		if (!this.cssfixedsupport) //if control is positioned using JavaScript
			this.$control.css({opacity:0}) //hide control immediately after clicking it
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
		if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists
			dest=jQuery('#'+dest).offset().top
		else
			dest=0
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		var $window=jQuery(window)
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
		this.$control.css({left:controlx+'px', top:controly+'px'})
	},

	togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop()
		if (!this.cssfixedsupport)
			this.keepfixed()
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
			this.state.isvisible=true
		}
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
			this.state.isvisible=false
		}
	},
	
	init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop
			var iebrws=document.all
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.click(function(){mainobj.scrollup(); return false})
				.appendTo('body')
			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text
			mainobj.togglecontrol()
			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup()
				return false
			})
			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol()
			})
		})
	}
}

scrolltotop.init()
