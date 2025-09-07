/*
 * Renamed to prevent conflict with Elementor
 * Sticky Plugin v1.0.4 for jQuery
 * Author: Anthony Garand
 */
// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.
!function(t){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery"],t):"object"==typeof module&&module.exports?
// Node/CommonJS
module.exports=t(require("jquery")):
// Browser globals
t(jQuery)}(function(h){var e=Array.prototype.slice,s=Array.prototype.splice,a={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:"",widthFromWrapper:!0,// works only when .getWidthFrom is empty
responsiveWidth:!1,zIndex:"1000"},g=h(window),m=h(document),y=[],f=g.height(),t=function(){for(var t=g.scrollTop(),e,i=m.height()-f,n=i<t?i-t:0,r=0,s=y.length;r<s;r++){var o=y[r],a,c=parseInt(Math.max(0,o.stickyWrapper.offset().top),10)-o.topSpacing-n;
//update height in case of dynamic content
//s.stickyWrapper.css('height', s.stickyElement.outerHeight());
if(c<=0&&(c=0),t<=c)null!==o.currentTop&&(o.stickyElement.css({width:"",position:"",top:"","z-index":""}),o.stickyElement.parent().removeClass(o.className),o.stickyElement.trigger("sticky-end",[o]),o.currentTop=null);else{var p=m.height()-o.stickyElement.outerHeight()-o.topSpacing-o.bottomSpacing-t-n,d;if(p<0?p+=o.topSpacing:p=o.topSpacing,o.currentTop!==p)o.getWidthFrom?d=h(o.getWidthFrom).width()||null:o.widthFromWrapper&&(d=o.stickyWrapper.width()),null==d&&(d=o.stickyElement.width()),o.stickyElement.css("width",d).css("position","fixed").css("top",p).css("z-index",o.zIndex),o.stickyElement.parent().addClass(o.className),null===o.currentTop?o.stickyElement.trigger("sticky-start",[o]):
// sticky is started but it have to be repositioned
o.stickyElement.trigger("sticky-update",[o]),o.currentTop===o.topSpacing&&o.currentTop>p||null===o.currentTop&&p<o.topSpacing?
// just reached bottom || just started to stick but bottom is already reached
o.stickyElement.trigger("sticky-bottom-reached",[o]):null!==o.currentTop&&p===o.topSpacing&&o.currentTop<p&&
// sticky is started && sticked at topSpacing && overflowing from top just finished
o.stickyElement.trigger("sticky-bottom-unreached",[o]),o.currentTop=p;
// Check if sticky has reached end of container and stop sticking
var l=o.stickyWrapper.parent(),u;o.stickyElement.offset().top+o.stickyElement.outerHeight()>=l.offset().top+l.outerHeight()&&o.stickyElement.offset().top<=o.topSpacing?o.stickyElement.css("position","absolute").css("top","").css("bottom",0).css("z-index",""):o.stickyElement.css("position","fixed").css("top",p).css("bottom","").css("z-index",o.zIndex)}}},i=function(){f=g.height();for(var t=0,e=y.length;t<e;t++){var i=y[t],n=null;i.getWidthFrom?i.responsiveWidth&&(n=h(i.getWidthFrom).width()):i.widthFromWrapper&&(n=i.stickyWrapper.width()),null!=n&&i.stickyElement.css("width",n)}},c={init:function(o){return this.each(function(){var t=h.extend({},a,o),e=h(this),i=e.attr("id"),n=i?i+"-"+a.wrapperClassName:a.wrapperClassName,r=h("<div></div>").attr("id",n).addClass(t.wrapperClassName);e.wrapAll(function(){if(0==h(this).parent("#"+n).length)return r});var s=e.parent();t.center&&s.css({width:e.outerWidth(),marginLeft:"auto",marginRight:"auto"}),"right"===e.css("float")&&e.css({float:"none"}).parent().css({float:"right"}),t.stickyElement=e,t.stickyWrapper=s,t.currentTop=null,y.push(t),c.setWrapperHeight(this),c.setupChangeListeners(this)})},setWrapperHeight:function(t){var e=h(t),i=e.parent();i&&i.css("height",e.outerHeight())},setupChangeListeners:function(e){if(window.MutationObserver){var t=new window.MutationObserver(function(t){(t[0].addedNodes.length||t[0].removedNodes.length)&&c.setWrapperHeight(e)});t.observe(e,{subtree:!0,childList:!0}),h(e).data("sticky.mutationObserver",t)}else window.addEventListener?(e.addEventListener("DOMNodeInserted",function(){c.setWrapperHeight(e)},!1),e.addEventListener("DOMNodeRemoved",function(){c.setWrapperHeight(e)},!1)):window.attachEvent&&(e.attachEvent("onDOMNodeInserted",function(){c.setWrapperHeight(e)}),e.attachEvent("onDOMNodeRemoved",function(){c.setWrapperHeight(e)}))},update:t,unstick:function(t){return this.each(function(){for(var t=this,e=h(t),i=-1,n=y.length,r;0<n--;)y[n].stickyElement.get(0)===t&&(s.call(y,n,1),i=n);-1!==i&&(h(e).data("sticky.mutationObserver").disconnect(),e.unwrap(),e.css({width:"",position:"",top:"",float:"","z-index":""}))})}};// save ref to original slice()
// should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
window.addEventListener?(window.addEventListener("scroll",t,!1),window.addEventListener("resize",i,!1)):window.attachEvent&&(window.attachEvent("onscroll",t),window.attachEvent("onresize",i)),h.fn.ktsticky=function(t){return c[t]?c[t].apply(this,e.call(arguments,1)):"object"!=typeof t&&t?void h.error("Method "+t+" does not exist on jQuery.sticky"):c.init.apply(this,arguments)},h.fn.unstick=function(t){return c[t]?c[t].apply(this,e.call(arguments,1)):"object"!=typeof t&&t?void h.error("Method "+t+" does not exist on jQuery.sticky"):c.unstick.apply(this,arguments)},h(function(){setTimeout(t,0)})});