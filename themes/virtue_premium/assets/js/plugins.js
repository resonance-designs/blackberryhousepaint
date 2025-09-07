/*
 * Superfish v1.6.8 - jQuery menu widget
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */
;(function($) {
	$.fn.superfish = function(op) {

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $('<span class="' + c.arrowClass + '"> &#187;</span>'),
			over = function() {
				var $this = $(this),
					o = getOptions($this);

				clearTimeout(o.sfTimer);
				$this.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(e) {
				var $this = $(this),
					o = getOptions($this);

				if (e.type === 'click' || sf.ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function(o) {
				o.retainPath = ( $.inArray(this[0], o.$path) > -1);
				this.hideSuperfishUl();

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function($el) {
				return getMenu($el).data('sf-options');
			},
			applyTouchAction = function($menu) {
				// needed by MS pointer events
				$menu.css('ms-touch-action', 'none');
			},
			applyHandlers = function($menu,o) {
				var targets = 'li:has(ul)';

				if (!o.useClick) {
					if ($.fn.hoverIntent && !o.disableHI) {
						$menu.hoverIntent(over, out, targets);
					}
					else {
						$menu
							.on('mouseenter', targets, over)
							.on('mouseleave', targets, out);
					}
				}
				var touchstart = 'MSPointerDown';

				if (!sf.ios) {
					touchstart += ' touchstart';
				}
				if (sf.wp7) {
					touchstart += ' mousedown';
				}
				$menu
					.on('focusin', 'li', over)
					.on('focusout', 'li', out)
					.on('click', 'a', o, clickHandler)
					.on(touchstart, 'a', touchHandler);
			},
			touchHandler = function(e) {
				var $this = $(this),
					$ul = $this.siblings('ul');

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.data('follow', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
						return false;
					}
				}
			},
			clickHandler = function(e) {
				var $a = $(this),
					o = e.data,
					$submenu = $a.siblings('ul'),
					follow = ($a.data('follow') === false) ? false : true;

				if ($submenu.length && (o.useClick || !follow)) {
					e.preventDefault();
					if ($submenu.is(':hidden')) {
						$.proxy(over, $a.parent('li'))();
					}
					else if (o.useClick && follow) {
						$.proxy(out, $a.parent('li'), e)();
					}
				}
			},
			setPathToCurrent = function($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function() {
							return ($(this).children('ul').hide().show().length);
						}).removeClass(o.pathClass);
			},
			addArrows = function($li, o) {
				if (o.autoArrows) {
					$li.children('a').each(function() {
						addArrow( $(this) );
					});
				}
			},
			addArrow = function($a) {
				$a.addClass(c.anchorClass).append($arrow.clone());
			};

		sf.getOptions = getOptions;

		return this.addClass(c.menuClass).each(function() {
			var $this = $(this),
				o = $.extend({}, sf.defaults, op),
				$liHasUl = $this.find('li:has(ul)');

			o.$path = setPathToCurrent($this, o);

			$this.data('sf-options', o);

			addArrows($liHasUl, o);
			applyTouchAction($this);
			applyHandlers($this, o);

			$liHasUl.not('.' + c.bcClass).hideSuperfishUl(true);

			o.onInit.call(this);
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};

	sf.c = {
		bcClass: 'sf-breadcrumb',
		menuClass: 'sf-js-enabled',
		anchorClass: 'sf-with-ul',
		arrowClass: 'sf-sub-indicator'
	};
	sf.defaults = {
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity:'show'},
		animationOut: {opacity:'hide'},
		speed: 'normal',
		speedOut: 'fast',
		autoArrows: true,
		disableHI: false,		// true disables hoverIntent detection
		useClick: false,
		onInit: $.noop, // callback functions
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop
	};
	sf.ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	sf.wp7 = (function() {
		var style = document.documentElement.style;
		return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
	})();
	$.fn.extend({
		hideSuperfishUl: function(instant) {
			if (this.length) {
				var $this = this,
					o = sf.getOptions($this),
					not = (o.retainPath === true) ? o.$path : '',
					$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children('ul'),
					speed = o.speedOut;

				if (instant) {
					$ul.show();
					speed = 0;
				}
				o.retainPath = false;
				o.onBeforeHide.call($ul);
				$ul.stop(true, true).animate(o.animationOut, speed, function() {
					o.onHide.call($(this));
					if (o.useClick) {
						$this.children('a').data('follow', false);
					}
				});
			}
			return this;
		},
		showSuperfishUl: function() {
			var o = sf.getOptions(this),
				$this = this.addClass(o.hoverClass),
				$ul = $this.children('ul');

			o.onBeforeShow.call($ul);
			$ul.stop(true, true).animate(o.animation, o.speed, function() {
				o.onShow.call($ul);
				$this.children('a').data('follow', true);
			});
			return this;
		}
	});

	if (sf.ios) {
		// iOS click won't bubble to body, attach to closest possible
		$(window).on( 'load', function(){
			$('body').children().on('click', $.noop);
		});
	}

})(jQuery);

/*global jQuery */
/*jshint browser:true */
/*
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(count){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + count;
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*!
 * Isotopeb PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotopeb Commercial License for commercial use
 *
 * http://isotopeb.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!function(t){function e(){}function i($){function t(t){t.prototype.option||(t.prototype.option=function(t){$.isPlainObject(t)&&(this.options=$.extend(!0,this.options,t))})}function i(t,e){$.fn[t]=function(i){if("string"==typeof i){for(var r=o.call(arguments,1),s=0,a=this.length;a>s;s++){var u=this[s],p=$.data(u,t);if(p)if($.isFunction(p[i])&&"_"!==i.charAt(0)){var h=p[i].apply(p,r);if(void 0!==h)return h}else n("no such method '"+i+"' for "+t+" instance");else n("cannot call methods on "+t+" prior to initialization; attempted to call '"+i+"'")}return this}return this.each(function(){var o=$.data(this,t);o?(o.option(i),o._init()):(o=new e(this,i),$.data(this,t,o))})}}if($){var n="undefined"==typeof console?e:function(t){console.error(t)};return $.bridget=function(e,o){t(o),i(e,o)},$.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i("object"==typeof exports?require("jquery"):t.jQuery)}(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(window),function(){"use strict";function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function e(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function s(t){var e=this._getEvents(),i,o;if(t instanceof RegExp){i={};for(o in e)e.hasOwnProperty(o)&&t.test(o)&&(i[o]=e[o])}else i=e[t]||(e[t]=[]);return i},o.flattenListeners=function a(t){var e=[],i;for(i=0;i<t.length;i+=1)e.push(t[i].listener);return e},o.getListenersAsObject=function u(t){var e=this.getListeners(t),i;return e instanceof Array&&(i={},i[t]=e),i||e},o.addListener=function p(t,i){var o=this.getListenersAsObject(t),n="object"==typeof i,r;for(r in o)o.hasOwnProperty(r)&&-1===e(o[r],i)&&o[r].push(n?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function h(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function f(t){return this.getListeners(t),this},o.defineEvents=function l(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function d(t,i){var o=this.getListenersAsObject(t),n,r;for(r in o)o.hasOwnProperty(r)&&(n=e(o[r],i),-1!==n&&o[r].splice(n,1));return this},o.off=i("removeListener"),o.addListeners=function c(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function m(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function y(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function g(t){var e=typeof t,i=this._getEvents(),o;if("string"===e)delete i[t];else if(t instanceof RegExp)for(o in i)i.hasOwnProperty(o)&&t.test(o)&&delete i[o];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function v(t,e){var i=this.getListenersAsObject(t),o,n,r,s;for(r in i)if(i.hasOwnProperty(r))for(n=i[r].length;n--;)o=i[r][n],o.once===!0&&this.removeListener(t,o.listener),s=o.listener.apply(this,e||[]),s===this._getOnceReturnValue()&&this.removeListener(t,o.listener);return this},o.trigger=i("emitEvent"),o.emit=function _(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function I(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function b(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function z(){return this._events||(this._events={})},t.noConflict=function L(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t,e){function i(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function o(){}function n(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=a.length;i>e;e++){var o=a[e];t[o]=0}return t}function r(e){function o(){if(!p){p=!0;var o=t.getComputedStyle;if(h=function(){var t=o?function(t){return o(t,null)}:function(t){return t.currentStyle};return function e(i){var o=t(i);return o||s("Style returned "+o+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),o}}(),f=e("boxSizing")){var n=document.createElement("div");n.style.width="200px",n.style.padding="1px 2px 3px 4px",n.style.borderStyle="solid",n.style.borderWidth="1px 2px 3px 4px",n.style[f]="border-box";var r=document.body||document.documentElement;r.appendChild(n);var a=h(n);l=200===i(a.width),r.removeChild(n)}}}function r(t){if(o(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var e=h(t);if("none"===e.display)return n();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var s=r.isBorderBox=!(!f||!e[f]||"border-box"!==e[f]),p=0,d=a.length;d>p;p++){var c=a[p],m=e[c];m=u(t,m);var y=parseFloat(m);r[c]=isNaN(y)?0:y}var g=r.paddingLeft+r.paddingRight,v=r.paddingTop+r.paddingBottom,_=r.marginLeft+r.marginRight,I=r.marginTop+r.marginBottom,b=r.borderLeftWidth+r.borderRightWidth,z=r.borderTopWidth+r.borderBottomWidth,L=s&&l,x=i(e.width);x!==!1&&(r.width=x+(L?0:g+b));var E=i(e.height);return E!==!1&&(r.height=E+(L?0:v+z)),r.innerWidth=r.width-(g+b),r.innerHeight=r.height-(v+z),r.outerWidth=r.width+_,r.outerHeight=r.height+I,r}}function u(e,i){if(t.getComputedStyle||-1===i.indexOf("%"))return i;var o=e.style,n=o.left,r=e.runtimeStyle,s=r&&r.left;return s&&(r.left=e.currentStyle.left),o.left=i,i=o.pixelLeft,o.left=n,s&&(r.left=s),i}var p=!1,h,f,l;return r}var s="undefined"==typeof console?o:function(t){console.error(t)},a=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],r):"object"==typeof exports?module.exports=r(require("desandro-get-style-property")):t.getSize=r(t.getStyleProperty)}(window),function(t){function e(t){"function"==typeof t&&(e.isReady?t():s.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==r.readyState;e.isReady||i||o()}function o(){e.isReady=!0;for(var t=0,i=s.length;i>t;t++){var o=s[t];o()}}function n(n){return"complete"===r.readyState?o():(n.bind(r,"DOMContentLoaded",i),n.bind(r,"readystatechange",i),n.bind(t,"load",i)),e}var r=t.document,s=[];e.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],n):"object"==typeof exports?module.exports=n(require("eventie")):t.docReady=n(t.eventie)}(window),function(t){"use strict";function e(t,e){return t[r](e)}function i(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function o(t,e){i(t);for(var o=t.parentNode.querySelectorAll(e),n=0,r=o.length;r>n;n++)if(o[n]===t)return!0;return!1}function n(t,o){return i(t),e(t,o)}var r=function(){if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0,o=e.length;o>i;i++){var n=e[i],r=n+"MatchesSelector";if(t[r])return r}}(),s;if(r){var a=document.createElement("div"),u=e(a,"div");s=u?e:n}else s=o;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):"object"==typeof exports?module.exports=s:window.matchesSelector=s}(Element.prototype),function(t,e){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(i,o){return e(t,i,o)}):"object"==typeof exports?module.exports=e(t,require("doc-ready"),require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.docReady,t.matchesSelector)}(window,function t(e,i,o){var n={};n.extend=function(t,e){for(var i in e)t[i]=e[i];return t},n.modulo=function(t,e){return(t%e+e)%e};var r=Object.prototype.toString;n.isArray=function(t){return"[object Array]"==r.call(t)},n.makeArray=function(t){var e=[];if(n.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0,o=t.length;o>i;i++)e.push(t[i]);else e.push(t);return e},n.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1},n.removeFrom=function(t,e){var i=n.indexOf(t,e);-1!=i&&t.splice(i,1)},n.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function a(t){return t instanceof HTMLElement}:function u(t){return t&&"object"==typeof t&&1==t.nodeType&&"string"==typeof t.nodeName},n.setText=function(){function t(t,i){e=e||(void 0!==document.documentElement.textContent?"textContent":"innerText"),t[e]=i}var e;return t}(),n.getParent=function(t,e){for(;t!=document.body;)if(t=t.parentNode,o(t,e))return t},n.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},n.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},n.filterFindElements=function(t,e){t=n.makeArray(t);for(var i=[],r=0,s=t.length;s>r;r++){var a=t[r];if(n.isElement(a))if(e){o(a,e)&&i.push(a);for(var u=a.querySelectorAll(e),p=0,h=u.length;h>p;p++)i.push(u[p])}else i.push(a)}return i},n.debounceMethod=function(t,e,i){var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];t&&clearTimeout(t);var e=arguments,r=this;this[n]=setTimeout(function(){o.apply(r,e),delete r[n]},i||100)}},n.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var s=e.console;return n.htmlInit=function(t,o){i(function(){for(var i=n.toDashed(o),r=document.querySelectorAll(".js-"+i),a="data-"+i+"-options",u=0,p=r.length;p>u;u++){var h=r[u],f=h.getAttribute(a),l;try{l=f&&JSON.parse(f)}catch(d){s&&s.error("Error parsing "+a+" on "+h.nodeName.toLowerCase()+(h.id?"#"+h.id:"")+": "+d);continue}var c=new t(h,l),m=e.jQuery;m&&m.data(h,o,c)}})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(i,o,n,r){return e(t,i,o,n,r)}):"object"==typeof exports?module.exports=e(t,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(t.Outlayer={},t.Outlayer.Item=e(t,t.EventEmitter,t.getSize,t.getStyleProperty,t.fizzyUIUtils))}(window,function e(t,i,o,n,r){"use strict";function s(t){for(var e in t)return!1;return e=null,!0}function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function u(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var p=t.getComputedStyle,h=p?function(t){return p(t,null)}:function(t){return t.currentStyle},f=n("transition"),l=n("transform"),d=f&&l,c=!!n("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[f],y=["transform","transition","transitionDuration","transitionProperty"],g=function(){for(var t={},e=0,i=y.length;i>e;e++){var o=y[e],r=n(o);r&&r!==o&&(t[o]=r)}return t}();r.extend(a.prototype,i.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=o(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=g[i]||i;e[o]=t[i]}},a.prototype.getPosition=function(){var t=h(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=t[i?"left":"right"],r=t[o?"top":"bottom"],s=this.layout.size,a=-1!=n.indexOf("%")?parseFloat(n)/100*s.width:parseInt(n,10),u=-1!=r.indexOf("%")?parseFloat(r)/100*s.height:parseInt(r,10);a=isNaN(a)?0:a,u=isNaN(u)?0:u,a-=i?s.paddingLeft:s.paddingRight,u-=o?s.paddingTop:s.paddingBottom,this.position.x=a,this.position.y=u},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={},o=e.isOriginLeft?"paddingLeft":"paddingRight",n=e.isOriginLeft?"left":"right",r=e.isOriginLeft?"right":"left",s=this.position.x+t[o];i[n]=this.getXValue(s),i[r]="";var a=e.isOriginTop?"paddingTop":"paddingBottom",u=e.isOriginTop?"top":"bottom",p=e.isOriginTop?"bottom":"top",h=this.position.y+t[a];i[u]=this.getYValue(h),i[p]="",this.css(i),this.emitEvent("layout",[this])},a.prototype.getXValue=function(t){var e=this.layout.options;return e.percentPosition&&!e.isHorizontal?t/this.layout.size.width*100+"%":t+"px"},a.prototype.getYValue=function(t){var e=this.layout.options;return e.percentPosition&&e.isHorizontal?t/this.layout.size.height*100+"%":t+"px"},a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-o,p={};p.transform=this.getTranslate(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.getTranslate=function(t,e){var i=this.layout.options;return t=i.isOriginLeft?t:-t,e=i.isOriginTop?e:-e,c?"translate3d("+t+"px, "+e+"px, 0)":"translate("+t+"px, "+e+"px)"},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=d?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var v="opacity,"+u(g.transform||"transform");a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:v,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},a.prototype.transition=a.prototype[f?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var _={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=_[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],s(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd){var o=e.onEnd[i];o.call(this),delete e.onEnd[i]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var I={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(I)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!f||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var t=this;this.once("transitionEnd",function(){t.removeElem()}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},a.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},a.prototype.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},a.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,r,s){return e(t,i,o,n,r,s)}):"object"==typeof exports?module.exports=e(t,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.eventie,t.EventEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function i(t,e,o,n,r,s){"use strict";function a(t,e){var i=r.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,p&&(this.$element=p(this.element)),this.options=r.extend({},this.constructor.defaults),this.option(e);var o=++f;this.element.outlayerGUID=o,l[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var u=t.console,p=t.jQuery,h=function(){},f=0,l={};return a.namespace="outlayer",a.Item=s,a.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},r.extend(a.prototype,o.prototype),a.prototype.option=function(t){r.extend(this.options,t)},a.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),r.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},a.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},a.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},a.prototype._filterFindItemElements=function(t){return r.filterFindElements(t,this.options.itemSelector)},a.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},a.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},a.prototype._init=a.prototype.layout,a.prototype._resetLayout=function(){this.getSize()},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype._getMeasurement=function(t,e){var i=this.options[t],o;i?("string"==typeof i?o=this.element.querySelector(i):r.isElement(i)&&(o=i),this[t]=o?n(o)[e]:i):this[t]=0},a.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},a.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},a.prototype._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){for(var i=[],o=0,n=t.length;n>o;o++){var r=t[o],s=this._getItemLayoutPosition(r);s.item=r,s.isInstant=e||r.isLayoutInstant,i.push(s)}this._processLayoutQueue(i)}},a.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},a.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},a.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},a.prototype._postLayout=function(){this.resizeContainer()},a.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},a.prototype._getContainerSize=h,a.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},a.prototype._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){s++,s===r&&i()}var n=this,r=e.length;if(!e||!r)return void i();for(var s=0,a=0,u=e.length;u>a;a++){var p=e[a];p.once(t,o)}},a.prototype.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),p)if(this.$element=this.$element||p(this.element),e){var n=p.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},a.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},a.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},a.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},a.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];r.removeFrom(this.stamps,o),this.unignore(o)}},a.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=r.makeArray(t)):void 0},a.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},a.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},a.prototype._manageStamp=h,a.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=n(t),r={left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom};return r},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.bindResize=function(){this.isResizeBound||(e.bind(t,"resize",this),this.isResizeBound=!0)},a.prototype.unbindResize=function(){this.isResizeBound&&e.unbind(t,"resize",this),this.isResizeBound=!1},a.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},a.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},a.prototype.needsResizeLayout=function(){var t=n(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},a.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},a.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},a.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},a.prototype.reveal=function(t){this._emitCompleteOnItems("reveal",t);for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.reveal()}},a.prototype.hide=function(t){this._emitCompleteOnItems("hide",t);for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.hide()}},a.prototype.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},a.prototype.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},a.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},a.prototype.getItems=function(t){t=r.makeArray(t);for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i],s=this.getItem(n);s&&e.push(s)}return e},a.prototype.remove=function(t){var e=this.getItems(t);if(this._emitCompleteOnItems("remove",e),e&&e.length)for(var i=0,o=e.length;o>i;i++){var n=e[i];n.remove(),r.removeFrom(this.items,n)}},a.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize();var n=this.element.outlayerGUID;delete l[n],delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},a.data=function(t){t=r.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&l[e]},a.create=function(t,e){function i(){a.apply(this,arguments)}return Object.create?i.prototype=Object.create(a.prototype):r.extend(i.prototype,a.prototype),i.prototype.constructor=i,i.defaults=r.extend({},a.defaults),r.extend(i.defaults,e),i.prototype.settings={},i.namespace=t,i.data=a.data,i.Item=function o(){s.apply(this,arguments)},i.Item.prototype=new s,r.htmlInit(i,t),p&&p.bridget&&p.bridget(t,i),i},a.Item=s,a}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("isotopeb/js/item",["outlayer/outlayer"],e):"object"==typeof exports?module.exports=e(require("outlayer")):(t.Isotopeb=t.Isotopeb||{},t.Isotopeb.Item=e(t.Outlayer))}(window,function o(t){"use strict";function e(){t.Item.apply(this,arguments)}e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var i=e.prototype.destroy;return e.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},e}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("isotopeb/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotopeb=t.Isotopeb||{},t.Isotopeb.LayoutMode=e(t.getSize,t.Outlayer))}(window,function n(t,e){"use strict";function i(t){this.isotopeb=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotopeb,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotopeb.element),i=this.isotopeb.size&&e;return i&&e.innerHeight!=this.isotopeb.size.innerHeight},i.prototype._getMeasurement=function(){this.isotopeb._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotopeb.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotopeb.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotopeb.layout.apply(this.isotopeb,arguments)},i.prototype.getSize=function(){this.isotopeb.getSize(),this.size=this.isotopeb.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],e):"object"==typeof exports?module.exports=e(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):t.Masonry=e(t.Outlayer,t.getSize,t.fizzyUIUtils)}(window,function r(t,e,i){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,r=n/o,s=o-n%o,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i.indexOf(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("isotopeb/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotopeb.LayoutMode,t.Masonry)}(window,function s(t,e){"use strict";function i(t,e){for(var i in e)t[i]=e[i];return t;
}var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;i(o.prototype,e.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotopeb.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotopeb.options.isOriginLeft,this.options.isOriginTop=this.isotopeb.options.isOriginTop,u.apply(this,arguments)},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("isotopeb/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotopeb.LayoutMode)}(window,function a(t){"use strict";var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotopeb.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("isotopeb/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotopeb.LayoutMode)}(window,function u(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotopeb.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","isotopeb/js/item","isotopeb/js/layout-mode","isotopeb/js/layout-modes/masonry","isotopeb/js/layout-modes/fit-rows","isotopeb/js/layout-modes/vertical"],function(i,o,n,r,s,a){return e(t,i,o,n,r,s,a)}):"object"==typeof exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("./item"),require("./layout-mode"),require("./layout-modes/masonry"),require("./layout-modes/fit-rows"),require("./layout-modes/vertical")):t.Isotopeb=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotopeb.Item,t.Isotopeb.LayoutMode)}(window,function p(t,e,i,o,n,r,s){function a(t,e){return function i(o,n){for(var r=0,s=t.length;s>r;r++){var a=t[r],u=o.sortData[a],p=n.sortData[a];if(u>p||p>u){var h=void 0!==e[a]?e[a]:e,f=h?1:-1;return(u>p?1:-1)*f}}return 0}}var u=t.jQuery,p=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},h=document.documentElement,f=h.textContent?function(t){return t.textContent}:function(t){return t.innerText},l=e.create("isotopeb",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});l.Item=r,l.LayoutMode=s,l.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in s.modes)this._initLayoutMode(t)},l.prototype.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l.prototype._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0,o=t.length;o>i;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l.prototype._initLayoutMode=function(t){var e=s.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?void this.arrange():void this._layout()},l.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.prototype.arrange=function(t){function e(){o.reveal(i.needReveal),o.hide(i.needHide)}this.option(t),this._getIsInstant();var i=this._filter(this.items);this.filteredItems=i.matches;var o=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(e):e(),this._sort(),this._layout()},l.prototype._init=l.prototype.arrange,l.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},l.prototype._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l.prototype._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],r=this._getFilterTest(e),s=0,a=t.length;a>s;s++){var u=t[s];if(!u.isIgnored){var p=r(u);p&&i.push(u),p&&u.isHidden?o.push(u):p||u.isHidden||n.push(u)}}return{matches:i,needReveal:o,needHide:n}},l.prototype._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.prototype.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=d(i)}},l.prototype._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.updateSortData()}};var d=function(){function t(t){if("string"!=typeof t)return t;var i=p(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),a=l.sortDataParsers[i[1]];return t=a?function(t){return t&&a(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&f(i)}}return t}();l.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},l.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l.prototype._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},l.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},l.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l.prototype._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e).matches;for(i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var c=l.prototype.remove;return l.prototype.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);var i=e&&e.length;if(i)for(var o=0;i>o;o++){var r=e[o];n.removeFrom(this.filteredItems,r)}},l.prototype.shuffle=function(){for(var t=0,e=this.items.length;e>t;t++){var i=this.items[t];i.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},l.prototype.getFilteredItemElements=function(){for(var t=[],e=0,i=this.filteredItems.length;i>e;e++)t.push(this.filteredItems[e].element);return t},l});

// Packery 
!function(t){function e(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function i(t,e){var i=o(t,e)?r:s;i(t,e)}var o,s,r;"classList"in document.documentElement?(o=function(t,e){return t.classList.contains(e)},s=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(o=function(t,i){return e(i).test(t.className)},s=function(t,e){o(t,e)||(t.className=t.className+" "+e)},r=function(t,i){t.className=t.className.replace(e(i)," ")});var n={hasClass:o,addClass:s,removeClass:r,toggleClass:i,has:o,add:s,remove:r,toggle:i};"function"==typeof define&&define.amd?define("classie/classie",n):"object"==typeof exports?module.exports=n:t.classie=n}(window),function(t,e){"function"==typeof define&&define.amd?define("packery/js/rect",e):"object"==typeof exports?module.exports=e():(t.Packery=t.Packery||{},t.Packery.Rect=e())}(window,function t(){function t(e){for(var i in t.defaults)this[i]=t.defaults[i];for(i in e)this[i]=e[i]}var e=window.Packery=function(){};return e.Rect=t,t.defaults={x:0,y:0,width:0,height:0},t.prototype.contains=function(t){var e=t.width||0,i=t.height||0;return this.x<=t.x&&this.y<=t.y&&this.x+this.width>=t.x+e&&this.y+this.height>=t.y+i},t.prototype.overlaps=function(t){var e=this.x+this.width,i=this.y+this.height,o=t.x+t.width,s=t.y+t.height;return this.x<o&&e>t.x&&this.y<s&&i>t.y},t.prototype.getMaximalFreeRects=function(e){if(!this.overlaps(e))return!1;var i=[],o,s=this.x+this.width,r=this.y+this.height,n=e.x+e.width,a=e.y+e.height;return this.y<e.y&&(o=new t({x:this.x,y:this.y,width:this.width,height:e.y-this.y}),i.push(o)),s>n&&(o=new t({x:n,y:this.y,width:s-n,height:this.height}),i.push(o)),r>a&&(o=new t({x:this.x,y:a,width:this.width,height:r-a}),i.push(o)),this.x<e.x&&(o=new t({x:this.x,y:this.y,width:e.x-this.x,height:this.height}),i.push(o)),i},t.prototype.canFit=function(t){return this.width>=t.width&&this.height>=t.height},t}),function(t,e){if("function"==typeof define&&define.amd)define("packery/js/packer",["./rect"],e);else if("object"==typeof exports)module.exports=e(require("./rect"));else{var i=t.Packery=t.Packery||{};i.Packer=e(i.Rect)}}(window,function e(t){function e(t,e,i){this.width=t||0,this.height=e||0,this.sortDirection=i||"downwardLeftToRight",this.reset()}e.prototype.reset=function(){this.spaces=[],this.newSpaces=[];var e=new t({x:0,y:0,width:this.width,height:this.height});this.spaces.push(e),this.sorter=i[this.sortDirection]||i.downwardLeftToRight},e.prototype.pack=function(t){for(var e=0,i=this.spaces.length;i>e;e++){var o=this.spaces[e];if(o.canFit(t)){this.placeInSpace(t,o);break}}},e.prototype.placeInSpace=function(t,e){t.x=e.x,t.y=e.y,this.placed(t)},e.prototype.placed=function(t){for(var e=[],i=0,o=this.spaces.length;o>i;i++){var s=this.spaces[i],r=s.getMaximalFreeRects(t);r?e.push.apply(e,r):e.push(s)}this.spaces=e,this.mergeSortSpaces()},e.prototype.mergeSortSpaces=function(){e.mergeRects(this.spaces),this.spaces.sort(this.sorter)},e.prototype.addSpace=function(t){this.spaces.push(t),this.mergeSortSpaces()},e.mergeRects=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];if(o){var s=t.slice(0);s.splice(e,1);for(var r=0,n=0,a=s.length;a>n;n++){var h=s[n],p=e>n?0:1;o.contains(h)&&(t.splice(n+p-r,1),r++)}}}return t};var i={downwardLeftToRight:function(t,e){return t.y-e.y||t.x-e.x},rightwardTopToBottom:function(t,e){return t.x-e.x||t.y-e.y}};return e}),function(t,e){"function"==typeof define&&define.amd?define("packery/js/item",["get-style-property/get-style-property","outlayer/outlayer","./rect"],e):"object"==typeof exports?module.exports=e(require("desandro-get-style-property"),require("outlayer"),require("./rect")):t.Packery.Item=e(t.getStyleProperty,t.Outlayer,t.Packery.Rect)}(window,function i(t,e,o){var s=t("transform"),r=function a(){e.Item.apply(this,arguments)};r.prototype=new e.Item;var n=r.prototype._create;return r.prototype._create=function(){n.call(this),this.rect=new o,this.placeRect=new o},r.prototype.dragStart=function(){this.getPosition(),this.removeTransitionStyles(),this.isTransitioning&&s&&(this.element.style[s]="none"),this.getSize(),this.isPlacing=!0,this.needsPositioning=!1,this.positionPlaceRect(this.position.x,this.position.y),this.isTransitioning=!1,this.didDrag=!1},r.prototype.dragMove=function(t,e){this.didDrag=!0;var i=this.layout.size;t-=i.paddingLeft,e-=i.paddingTop,this.positionPlaceRect(t,e)},r.prototype.dragStop=function(){this.getPosition();var t=this.position.x!=this.placeRect.x,e=this.position.y!=this.placeRect.y;this.needsPositioning=t||e,this.didDrag=!1},r.prototype.positionPlaceRect=function(t,e,i){this.placeRect.x=this.getPlaceRectCoord(t,!0),this.placeRect.y=this.getPlaceRectCoord(e,!1,i)},r.prototype.getPlaceRectCoord=function(t,e,i){var o=e?"Width":"Height",s=this.size["outer"+o],r=this.layout[e?"columnWidth":"rowHeight"],n=this.layout.size["inner"+o];e||(n=Math.max(n,this.layout.maxY),this.layout.rowHeight||(n-=this.layout.gutter));var a;if(r){r+=this.layout.gutter,n+=e?this.layout.gutter:0,t=Math.round(t/r);var h;h=this.layout.options.isHorizontal?e?"ceil":"floor":e?"floor":"ceil";var p=Math[h](n/r);p-=Math.ceil(s/r),a=p}else a=n-s;return t=i?t:Math.min(t,a),t*=r||1,Math.max(0,t)},r.prototype.copyPlaceRectPosition=function(){this.rect.x=this.placeRect.x,this.rect.y=this.placeRect.y},r.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},r}),function(t,e){"function"==typeof define&&define.amd?define("packery/js/packery",["classie/classie","get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],e):"object"==typeof exports?module.exports=e(require("desandro-classie"),require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):t.Packery=e(t.classie,t.getSize,t.Outlayer,t.Packery.Rect,t.Packery.Packer,t.Packery.Item)}(window,function o(t,e,i,s,r,n){function a(t,e){return t.position.y-e.position.y||t.position.x-e.position.x}function h(t,e){return t.position.x-e.position.x||t.position.y-e.position.y}s.prototype.canFit=function(t){return this.width>=t.width-1&&this.height>=t.height-1};var p=i.create("packery");return p.Item=n,p.prototype._create=function(){i.prototype._create.call(this),this.packer=new r,this.stamp(this.options.stamped);var t=this;this.handleDraggabilly={dragStart:function(){t.itemDragStart(this.element)},dragMove:function(){t.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){t.itemDragEnd(this.element)}},this.handleUIDraggable={start:function e(i){t.itemDragStart(i.currentTarget)},drag:function o(e,i){t.itemDragMove(e.currentTarget,i.position.left,i.position.top)},stop:function s(e){t.itemDragEnd(e.currentTarget)}}},p.prototype._resetLayout=function(){this.getSize(),this._getMeasurements();var t=this.packer;this.options.isHorizontal?(t.width=Number.POSITIVE_INFINITY,t.height=this.size.innerHeight+this.gutter,t.sortDirection="rightwardTopToBottom"):(t.width=this.size.innerWidth+this.gutter,t.height=Number.POSITIVE_INFINITY,t.sortDirection="downwardLeftToRight"),t.reset(),this.maxY=0,this.maxX=0},p.prototype._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},p.prototype._getItemLayoutPosition=function(t){return this._packItem(t),t.rect},p.prototype._packItem=function(t){this._setRectSize(t.element,t.rect),this.packer.pack(t.rect),this._setMaxXY(t.rect)},p.prototype._setMaxXY=function(t){this.maxX=Math.max(t.x+t.width,this.maxX),this.maxY=Math.max(t.y+t.height,this.maxY)},p.prototype._setRectSize=function(t,i){var o=e(t),s=o.outerWidth,r=o.outerHeight;(s||r)&&(s=this._applyGridGutter(s,this.columnWidth),r=this._applyGridGutter(r,this.rowHeight)),i.width=Math.min(s,this.packer.width),i.height=Math.min(r,this.packer.height)},p.prototype._applyGridGutter=function(t,e){if(!e)return t+this.gutter;e+=this.gutter;var i=t%e,o=i&&1>i?"round":"ceil";return t=Math[o](t/e)*e},p.prototype._getContainerSize=function(){return this.options.isHorizontal?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},p.prototype._manageStamp=function(t){var e=this.getItem(t),i;if(e&&e.isPlacing)i=e.placeRect;else{var o=this._getElementOffset(t);i=new s({x:this.options.isOriginLeft?o.left:o.right,y:this.options.isOriginTop?o.top:o.bottom})}this._setRectSize(t,i),this.packer.placed(i),this._setMaxXY(i)},p.prototype.sortItemsByPosition=function(){var t=this.options.isHorizontal?h:a;this.items.sort(t)},p.prototype.fit=function(t,e,i){var o=this.getItem(t);o&&(this._getMeasurements(),this.stamp(o.element),o.getSize(),o.isPlacing=!0,e=void 0===e?o.rect.x:e,i=void 0===i?o.rect.y:i,o.positionPlaceRect(e,i,!0),this._bindFitEvents(o),o.moveTo(o.placeRect.x,o.placeRect.y),this.layout(),this.unstamp(o.element),this.sortItemsByPosition(),o.isPlacing=!1,o.copyPlaceRectPosition())},p.prototype._bindFitEvents=function(t){function e(){o++,2==o&&i.emitEvent("fitComplete",[t])}var i=this,o=0;t.on("layout",function(){return e(),!0}),this.on("layoutComplete",function(){return e(),!0})},p.prototype.resize=function(){var t=e(this.element),i=this.size&&t,o=this.options.isHorizontal?"innerHeight":"innerWidth";i&&t[o]==this.size[o]||this.layout()},p.prototype.itemDragStart=function(t){this.stamp(t);var e=this.getItem(t);e&&e.dragStart()},p.prototype.itemDragMove=function(t,e,i){function o(){r.layout(),delete r.dragTimeout}var s=this.getItem(t);s&&s.dragMove(e,i);var r=this;this.clearDragTimeout(),this.dragTimeout=setTimeout(o,40)},p.prototype.clearDragTimeout=function(){this.dragTimeout&&clearTimeout(this.dragTimeout)},p.prototype.itemDragEnd=function(e){var i=this.getItem(e),o;if(i&&(o=i.didDrag,i.dragStop()),!i||!o&&!i.needsPositioning)return void this.unstamp(e);t.add(i.element,"is-positioning-post-drag");var s=this._getDragEndLayoutComplete(e,i);i.needsPositioning?(i.on("layout",s),i.moveTo(i.placeRect.x,i.placeRect.y)):i&&i.copyPlaceRectPosition(),this.clearDragTimeout(),this.on("layoutComplete",s),this.layout()},p.prototype._getDragEndLayoutComplete=function(e,i){var o=i&&i.needsPositioning,s=0,r=o?2:1,n=this;return function a(){return s++,s!=r?!0:(i&&(t.remove(i.element,"is-positioning-post-drag"),i.isPlacing=!1,i.copyPlaceRectPosition()),n.unstamp(e),n.sortItemsByPosition(),o&&n.emitEvent("dragItemPositioned",[i]),!0)}},p.prototype.bindDraggabillyEvents=function(t){t.on("dragStart",this.handleDraggabilly.dragStart),t.on("dragMove",this.handleDraggabilly.dragMove),t.on("dragEnd",this.handleDraggabilly.dragEnd)},p.prototype.bindUIDraggableEvents=function(t){t.on("dragstart",this.handleUIDraggable.start).on("drag",this.handleUIDraggable.drag).on("dragstop",this.handleUIDraggable.stop)},p.Rect=s,p.Packer=r,p}),function(t,e){"function"==typeof define&&define.amd?define(["isotopeb/js/layout-mode","packery/js/packery","get-size/get-size"],e):"object"==typeof exports?module.exports=e(require("isotopeb-layout/js/layout-mode"),require("packery"),require("get-size")):e(t.Isotopeb.LayoutMode,t.Packery,t.getSize)}(window,function s(t,e,i){function o(t,e){for(var i in e)t[i]=e[i];return t}var s=t.create("packery"),r=s.prototype._getElementOffset,n=s.prototype._getMeasurement;o(s.prototype,e.prototype),s.prototype._getElementOffset=r,s.prototype._getMeasurement=n;var a=s.prototype._resetLayout;s.prototype._resetLayout=function(){this.packer=this.packer||new e.Packer,a.apply(this,arguments)};var h=s.prototype._getItemLayoutPosition;s.prototype._getItemLayoutPosition=function(t){return t.rect=t.rect||new e.Rect,h.call(this,t)};var p=s.prototype._manageStamp;return s.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotopeb.options.isOriginLeft,this.options.isOriginTop=this.isotopeb.options.isOriginTop,p.apply(this,arguments)},s.prototype.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t,o=this.options.isHorizontal?"innerHeight":"innerWidth";return e&&t[o]!=this.size[o]},s});



/*!
 * imagesLoadedn PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return-1==n.indexOf(t)&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return-1!=n&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=0,o=i[n];t=t||[];for(var r=this._onceEvents&&this._onceEvents[e];o;){var s=r&&r[o];s&&(this.off(e,o),delete r[o]),o.apply(this,t),n+=s?0:1,o=i[n]}return this}},t.allOff=t.removeAllListeners=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoadedn=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){var t=[];if(Array.isArray(e))t=e;else if("number"==typeof e.length)for(var i=0;i<e.length;i++)t.push(e[i]);else t.push(e);return t}function o(e,t,r){return this instanceof o?("string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=n(e),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(e,t,r)}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&d[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoadedn=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/* query.matchHeight.js is licensed under The MIT License (MIT)  */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function($){var t=-1,e=-1,o=function(t){return parseFloat(t)||0},a=function(t){var e=1,a=$(t),i=null,n=[];return a.each(function(){var t=$(this),a=t.offset().top-o(t.css("margin-top")),r=n.length>0?n[n.length-1]:null;null===r?n.push(t):Math.floor(Math.abs(i-a))<=e?n[n.length-1]=r.add(t):n.push(t),i=a}),n},i=function(t){var e={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof t?$.extend(e,t):("boolean"==typeof t?e.byRow=t:"remove"===t&&(e.remove=!0),e)},n=$.fn.matchHeight=function(t){var e=i(t);if(e.remove){var o=this;return this.css(e.property,""),$.each(n._groups,function(t,e){e.elements=e.elements.not(o)}),this}return this.length<=1&&!e.target?this:(n._groups.push({elements:this,options:e}),n._apply(this,e),this)};n.version="master",n._groups=[],n._throttle=80,n._maintainScroll=!1,n._beforeUpdate=null,n._afterUpdate=null,n._rows=a,n._parse=o,n._parseOptions=i,n._apply=function(t,e){var r=i(e),s=$(t),h=[s],l=$(window).scrollTop(),c=$("html").outerHeight(!0),p=s.parents().filter(":hidden");return p.each(function(){var t=$(this);t.data("style-cache",t.attr("style"))}),p.css("display","block"),r.byRow&&!r.target&&(s.each(function(){var t=$(this),e=t.css("display");"inline-block"!==e&&"flex"!==e&&"inline-flex"!==e&&(e="block"),t.data("style-cache",t.attr("style")),t.css({display:e,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),h=a(s),s.each(function(){var t=$(this);t.attr("style",t.data("style-cache")||"")})),$.each(h,function(t,e){var a=$(e),i=0;if(r.target)i=r.target.outerHeight(!1);else{if(r.byRow&&a.length<=1)return void a.css(r.property,"");a.each(function(){var t=$(this),e=t.attr("style"),o=t.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block");var a={display:o};a[r.property]="",t.css(a),t.outerHeight(!1)>i&&(i=t.outerHeight(!1)),e?t.attr("style",e):t.css("display","")})}a.each(function(){var t=$(this),e=0;r.target&&t.is(r.target)||("border-box"!==t.css("box-sizing")&&(e+=o(t.css("border-top-width"))+o(t.css("border-bottom-width")),e+=o(t.css("padding-top"))+o(t.css("padding-bottom"))),t.css(r.property,i-e+"px"))})}),p.each(function(){var t=$(this);t.attr("style",t.data("style-cache")||null)}),n._maintainScroll&&$(window).scrollTop(l/c*$("html").outerHeight(!0)),this},n._applyDataApi=function(){var t={};$("[data-match-height], [data-mh]").each(function(){var e=$(this),o=e.attr("data-mh")||e.attr("data-match-height");o in t?t[o]=t[o].add(e):t[o]=e}),$.each(t,function(){this.matchHeight(!0)})};var r=function(t){n._beforeUpdate&&n._beforeUpdate(t,n._groups),$.each(n._groups,function(){n._apply(this.elements,this.options)}),n._afterUpdate&&n._afterUpdate(t,n._groups)};n._update=function(o,a){if(a&&"resize"===a.type){var i=$(window).width();if(i===t)return;t=i}o?-1===e&&(e=setTimeout(function(){r(a),e=-1},n._throttle)):r(a)},$(n._applyDataApi),$(window).on("load",function(t){n._update(!1,t)}),$(window).on("resize orientationchange",function(t){n._update(!0,t)})});


/*!
 * Typed
 */
 
!function($){"use strict";var t=function(t,s){this.el=$(t),this.options=$.extend({},$.fn.typed.defaults,s),this.isInput=this.el.is("input"),this.attr=this.options.attr,this.showCursor=this.isInput?!1:this.options.showCursor,this.elContent=this.attr?this.el.attr(this.attr):this.el.text(),this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,this.stringsElement=this.options.stringsElement,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.cursorChar=this.options.cursorChar,this.shuffle=this.options.shuffle,this.sequence=[],this.build()};t.prototype={constructor:t,init:function(){var t=this;t.timeout=setTimeout(function(){for(var s=0;s<t.strings.length;++s)t.sequence[s]=s;t.shuffle&&(t.sequence=t.shuffleArray(t.sequence)),t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},t.startDelay)},build:function(){var t=this;if(this.showCursor===!0&&(this.cursor=$('<span class="typed-cursor">'+this.cursorChar+"</span>"),this.el.after(this.cursor)),this.stringsElement){t.strings=[],this.stringsElement.hide();var s=this.stringsElement.find("p");$.each(s,function(s,e){t.strings.push($(e).html())})}this.init()},typewrite:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.typeSpeed,i=this;i.timeout=setTimeout(function(){var e=0,r=t.substr(s);if("^"===r.charAt(0)){var o=1;/^\^\d+/.test(r)&&(r=/\d+/.exec(r)[0],o+=r.length,e=parseInt(r)),t=t.substring(0,s)+t.substring(s+o)}if("html"===i.contentType){var n=t.substr(s).charAt(0);if("<"===n||"&"===n){var a="",h="";for(h="<"===n?">":";";t.substr(s).charAt(0)!==h;)a+=t.substr(s).charAt(0),s++;s++,a+=h}}i.timeout=setTimeout(function(){if(s===t.length){if(i.options.onStringTyped(i.arrayPos),i.arrayPos===i.strings.length-1&&(i.options.callback(),i.curLoop++,i.loop===!1||i.curLoop===i.loopCount))return;i.timeout=setTimeout(function(){i.backspace(t,s)},i.backDelay)}else{0===s&&i.options.preStringTyped(i.arrayPos);var e=t.substr(0,s+1);i.attr?i.el.attr(i.attr,e):i.isInput?i.el.val(e):"html"===i.contentType?i.el.html(e):i.el.text(e),s++,i.typewrite(t,s)}},e)},e)}},backspace:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.backSpeed,i=this;i.timeout=setTimeout(function(){if("html"===i.contentType&&">"===t.substr(s).charAt(0)){for(var e="";"<"!==t.substr(s).charAt(0);)e-=t.substr(s).charAt(0),s--;s--,e+="<"}var r=t.substr(0,s);i.attr?i.el.attr(i.attr,r):i.isInput?i.el.val(r):"html"===i.contentType?i.el.html(r):i.el.text(r),s>i.stopNum?(s--,i.backspace(t,s)):s<=i.stopNum&&(i.arrayPos++,i.arrayPos===i.strings.length?(i.arrayPos=0,i.shuffle&&(i.sequence=i.shuffleArray(i.sequence)),i.init()):i.typewrite(i.strings[i.sequence[i.arrayPos]],s))},e)}},shuffleArray:function(t){var s,e,i=t.length;if(i)for(;--i;)e=Math.floor(Math.random()*(i+1)),s=t[e],t[e]=t[i],t[i]=s;return t},reset:function(){var t=this;clearInterval(t.timeout);var s=this.el.attr("id");this.el.after('<span id="'+s+'"/>'),this.el.remove(),"undefined"!=typeof this.cursor&&this.cursor.remove(),t.options.resetCallback()}},$.fn.typed=function(s){return this.each(function(){var e=$(this),i=e.data("typed"),r="object"==typeof s&&s;i||e.data("typed",i=new t(this,r)),"string"==typeof s&&i[s]()})},$.fn.typed.defaults={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,shuffle:!1,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,contentType:"html",callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}}}(window.jQuery);

/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) {
    $.fn.appear = function(fn, options) {

        var settings = $.extend({

            //arbitrary data to pass to fn
            data: undefined,

            //call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            //whether the element is currently visible
            t.appeared = false;

            if (!fn) {

                //trigger the custom event
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            //fires the appear event when appropriate
            var check = function() {

                //is the element hidden?
                if (!t.is(':visible')) {

                    //it became hidden
                    t.appeared = false;
                    return;
                }

                //is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

                    //trigger the custom event
                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {

                    //it scrolled out of view
                    t.appeared = false;
                }
            };

            //create a modified fn with some additional logic
            var modifiedFn = function() {

                //mark the element as visible
                t.appeared = true;

                //is this supposed to happen only once?
                if (settings.one) {

                    //remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                //trigger the original fn
                fn.apply(this, arguments);
            };

            //bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.on('appear', settings.data, modifiedFn);

            //check whenever the window scrolls
            w.scroll(check);

            //check whenever the dom changes
            $.fn.appear.checks.push(check);

            //check now
            (check)();
        });
    };

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        //process the queue
        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) {
                while (length--) {
                    try {
                        ($.fn.appear.checks[length])();
                    } catch (e) {}
                }
            }
        },

        //check the queue asynchronously
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
    });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function() {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            }
        }
    });

})(jQuery);


/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 150
};

})(jQuery);

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.kt_fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY,
          'minWidth' : Number.NEGATIVE_INFINITY,
          'maxWidth' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);
      

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
      	var $width = $this.width();
      	if(settings.maxWidth > $width && settings.minWidth < $width) {
        	$this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        } else if(settings.minWidth > $width) {
        	$this.css('font-size', settings.minFontSize);
        } else {
        	$this.css('font-size', settings.maxFontSize);
        }
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

/**
 * jquery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
/**
 * jquery.localScroll
 * Copyright (c) 2007 Ariel Flesler - aflesler<a>gmail<d>com | https://github.com/flesler
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.0.0
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(t,o,n){var i=o.hash.slice(1),a=document.getElementById(i)||document.getElementsByName(i)[0];if(a){t&&t.preventDefault();var l=e(n.target);if(!(n.lock&&l.is(":animated")||n.onBefore&&!1===n.onBefore(t,a,l))){if(n.stop&&l.stop(!0),n.hash){var r=a.id===i?"id":"name",s=e("<a> </a>").attr(r,i).css({position:"absolute",top:e(window).scrollTop(),left:e(window).scrollLeft()});a[r]="",e("body").prepend(s),location.hash=o.hash,s.remove(),a[r]=i}l.scrollTo(a,n).trigger("notify.serialScroll",[a])}}}var o=location.href.replace(/#.*/,""),n=e.localScroll=function(t){e("body").localScroll(t)};return n.defaults={duration:1e3,axis:"y",event:"click",stop:!0,target:window,autoscroll:!0},e.fn.localScroll=function(i){function a(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,"")===o&&(!i.filter||e(this).is(i.filter))}return(i=e.extend({},n.defaults,i)).autoscroll&&i.hash&&location.hash&&(i.target&&window.scrollTo(0,0),t(0,location,i)),i.lazy?this.on(i.event,"a,area",function(e){a.call(this)&&t(e,this,i)}):this.find("a,area").filter(a).bind(i.event,function(e){t(e,this,i)}).end().end()},n.hash=function(){},n});

