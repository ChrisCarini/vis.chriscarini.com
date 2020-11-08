/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */
var NanobarV = function (options) {
	'use strict';
	var addCss, style, n, animation;
	n = this;
	var opts = options || {};
	opts.bg = opts.bg || '#000';
	opts.align = opts.align || 'left';
	opts.width = opts.width || '4';
	opts.offset = opts.offset || '0';
	opts.docHeight = opts.docHeight || window.innerHeight;

	// Generate css style element
	style = '.NanobarVbar{width:100%;height:0;top:0px;margin-left:0px;}' +
			'.NanobarVbar.active{transition: all 0.3s;}' +
			'.goOut{margin-top:-'+opts.height+'px;opacity:0}' +
			'.NanobarV{/*top:0px;*/width:'+opts.width+'px;/*height:100%;*/z-index:9999;}';


	// Create style element in document
	addCss = function (css) {
		var s = document.getElementById( 'NanobarV-style' );

		if (s === null) {
			s = document.createElement( 'style' );
			s.setAttribute( 'type', 'text/css' );
			s.setAttribute( 'id', 'NanobarV-style');
			document.getElementsByTagName( 'head' )[0].appendChild( s );
			if (s.styleSheet) {   // IE
				s.styleSheet.cssText = css;
			} else {              // the world
				s.appendChild( document.createTextNode( css ));
			}
		}
	};

	// crossbrowser transition animation
	animation = function (){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		};

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	};

	// append style
	addCss( style );


	// create progress container
	this.container = document.createElement( 'div' );
	this.container.setAttribute( 'class', 'NanobarV' );
	if (opts.id) {
		this.container.setAttribute( 'id', opts.id );
	}
	if (!opts.target) {
		this.container.style.position = 'fixed';
		this.container.style.top = '0';
	} else {
		this.container.style.position = 'absolute';
		this.container.style.bottom = '0px';
	}
    if(opts.align != 'bottom'){
        this.container.style.top = '0px';
    }

	// create progress element
	this.bar = document.createElement( 'div' );
	this.bar.setAttribute( 'class', 'NanobarVbar' );
	this.bar.style.background = opts.bg;
    if(opts.align == 'bottom'){
        this.bar.style.bottom = 0;
    } else {
        this.bar.style.top = 0;
    }
    this.bar.style.marginLeft = opts.offset+'px';
    this.bar.docHeight = opts.docHeight;
	this.container.appendChild( this.bar );

	if (!opts.target) {
		document.getElementsByTagName( 'body' )[0].appendChild( this.container );
	} else {
		opts.target.insertBefore( this.container, opts.target.firstChild);
	}

	// detect transitions end
	var transitionEvent = animation();
	transitionEvent && this.bar.addEventListener(transitionEvent, function() {
		if (n.bar.style.height === '100%' && n.bar.style.width === '100%') {
			n.finish();
		}
	});
	return this.init();
};

NanobarV.prototype.init = function () {
	this.bar.className = 'NanobarVbar';
	this.bar.style.height = 0;      //'100%';
	this.bar.style.width = '100%';  //0;
	var n = this;
	setTimeout( function (){
		n.bar.className = 'NanobarVbar active';
	}, 1);
};

NanobarV.prototype.finish = function () {
	var n = this;
	this.bar.style.width = 0 ;
	setTimeout( function (){
		n.init();
	}, 300);
};

NanobarV.prototype.go = function (p) {
	this.bar.style.height = Math.round(((p/100)*this.bar.docHeight)) + 'px';
};
// My Additions...
NanobarV.prototype.get = function () {
	return parseInt(this.bar.style.height);
};
NanobarV.prototype.setBg = function (bgC) {
	this.bar.style.background = bgC;
};
NanobarV.prototype.setZIndex = function (zI) {
	this.bar.style.zIndex = zI;
};