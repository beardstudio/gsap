
var deviceSettings = {
    isAndroid: null,
    isEarlyIE: null,
    isIE: null,
    isiPod: null,
    isiPhone: null,
    isiPad: null,
    isiOS: null,
    isMobile: null,
    isTablet: null,
    isWinSafari: null,
    isMacSafari: null
	},
	startPos,
	endPos,
	inTransition = false;

function setupDeviceSettings() {
    var ua = navigator.userAgent.toLowerCase();
    deviceSettings.isAndroid = ua.indexOf("android") > -1;
    deviceSettings.isEarlyIE = (jQuery.browser.msie == true && Number(jQuery.browser.version) <= 8) ? true : false;
    deviceSettings.isIE = jQuery.browser.msie == true;
    deviceSettings.isiPod = navigator.userAgent.match(/iPod/i) != null;
    deviceSettings.isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    deviceSettings.isiPad = navigator.userAgent.match(/iPad/i) != null;
    deviceSettings.isiOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false);
    //determine if this is a mobile browser:
    var p = navigator.platform.toLowerCase();
    if (deviceSettings.isAndroid || deviceSettings.isiPad || p === 'ipad' || p === 'iphone' || p === 'ipod' || p === 'android' || p === 'palm' || p === 'windows phone' || p === 'blackberry' || p === 'linux armv7l') {
        deviceSettings.isMobile = true;
		$('video').remove();
    }
	var safari = ($.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));
	var windows = (ua.indexOf("windows") !== -1);
	var mac = (ua.indexOf("mac") !== -1);
	if (safari && windows) {
		deviceSettings.isWinSafari = true;
	}
	if (safari && mac) {
		deviceSettings.isMacSafari = true;
		//$('video').remove();
	}
}

function initBeast(){
	initButtons();
	changeTagline();
	if ($('#instagram').length) initInstagram();
	// || deviceSettings.isMacSafari
	if ($('.no-csstransforms').length || $('.no-csstransforms3d').length || deviceSettings.isMobile) {
		$( ".side" ).remove();
	} else {
		initHovers();
	}
	
	if (deviceSettings.isMacSafari || deviceSettings.isWinSafari) {
		$(".tool ul").css({
			  '-webkit-transform-origin' : '50% 50% 19px'
		});
		$(".project-thumb-xl ul").css({
			  '-webkit-transform-origin' : '50% 50% 115px'
		});
		$(".project-thumb ul ").css({
			  '-webkit-transform-origin' : '50% 50% 65px'
		});
		$(".project-feature ul").css({
			  '-webkit-transform-origin' : '50% 50% 115px'
		});
		$(".fwa ul").css({
			  '-webkit-transform-origin' : '50% 50% 77px'
		});
	}
	
}

// PAGE TRANSITIONS
var tempSkew = 25;
if (generateRandomNumber(0,1) == 1) tempSkew = -25;
var tempAxis = "X";
if (generateRandomNumber(0,1) == 1) tempAxis = "Y";

function openPage() {
	inTransition = true;
	$('html,body').scrollTop( 0 );
	
	$('body').css({overflow: 'auto'});
	
	TweenMax.set($('#door-left'), { transform: "skew" + tempAxis + "(" + tempSkew + "deg) translate" + tempAxis + "(-49%)" });
	TweenMax.set($('#door-right'), { transform: "skew" + tempAxis + "(" + tempSkew + "deg) translate" + tempAxis + "(49%)" });
	TweenMax.to( "#background", 0, { autoAlpha: 1 });

	TweenMax.to("#background", 0, {css:{ autoAlpha: 1 }});
	//TweenMax.to($('#cloud1'), 0, {css:{ display: 'none' }});
	//TweenMax.to($('#cloud2'), 0, {css:{ display: 'none' }});
	TweenMax.set( "#wrapper", { autoAlpha: 1 });
	TweenMax.fromTo( "#header", 1, { y: -200, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Expo.easeOut, onComplete: function() {
		$('#header').addClass('tweenAll_75');
	}});
	TweenMax.set( "#door-cover", { autoAlpha: 0, display: 'none' });
	TweenMax.to( "#door-left", 1, { transform: "skew" + tempAxis + "(0deg) translate" + tempAxis + "(-100%)", ease: Expo.easeOut});
	TweenMax.to( "#door-right", 1, { transform: "skew" + tempAxis + "(0deg) translate" + tempAxis + "(100%)", ease: Expo.easeOut, onComplete: function() {
		$('#door-wrapper').hide();
		if ($('#home-feature').length) {
			changeTitle();
		}
	}});
	
	var pageAnimations =  new TimelineMax({ paused: true, force3D: true });
    pageAnimations.staggerFromTo( ".content", 1, { y: 2200 , ease: Expo.easeOut }, { y: 0, ease: Expo.easeOut }, .1, .25);
    pageAnimations.fromTo( ".title", 1, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Expo.easeOut }, 1.5);
	if ($('.subnav').length) {
    	pageAnimations.fromTo( ".subnav", 1, { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Expo.easeOut }, 2);
	}
    pageAnimations.fromTo( ".metatitle", 1, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 0.5, ease: Expo.easeOut }, 2);
	pageAnimations.timeScale(1);
	pageAnimations.play(0);""
	
	
	var winHeight = -($('#background img').height());
	TweenMax.set( "#background img", { y: -winHeight });
	TweenMax.to($('#background img'), 1, { y: 0, ease: Expo.easeOut, delay: .5, onComplete: function() {
		inTransition = false;
	}});
}



function openMobile() {
	$('body').css({overflow: 'auto'});
	tempAxis = "X";
	
	TweenMax.to( "#door-left", 0, { transform:"skew" + tempAxis + "(" + tempSkew + "deg) translate" + tempAxis + "(-49%)" });
	TweenMax.to( "#door-right", 0, { transform:"skew" + tempAxis + "(" + tempSkew + "deg) translate" + tempAxis + "(49%)" });
	TweenMax.to( "#background", 0, { autoAlpha: 1 });
	TweenMax.to( "#wrapper", 0, { autoAlpha: 1 });
	TweenMax.to( "#header", 0, { autoAlpha: 1 , onComplete: function() {
		$('#header').addClass('tweenAll_75');
	}});
	TweenMax.to( "#door-cover", 0, { autoAlpha: 0, display: 'none' });
	
	// GENERIC PAGE ANIMATIONS
	//TweenMax.set( ".metatitle", { autoAlpha: 1 });
	//TweenMax.set( ".title", { autoAlpha: 1 });
	//TweenMax.set( ".subnav", { autoAlpha: 1 });
	
	TweenMax.to( "#door-left", 1, { transform:"skew" + tempAxis + "(0deg) translate" + tempAxis + "(-100%)", ease: Expo.easeOut});
	TweenMax.to( "#door-right", 1, { transform:"skew" + tempAxis + "(0deg) translate" + tempAxis + "(100%)", ease: Expo.easeOut, onComplete: function() {
		$('#door-wrapper').hide();
		if ($('#home-feature').length) {
			changeTitle();
		}
	}});
}

function scrollbarWidth() {
    var $inner = jQuery('<div style="width: 100%; height:200px; opacity: 0;">test</div>'),
        $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
        inner = $inner[0],
        outer = $outer[0];
     
    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();
 
    return (width1 - width2);
}

function closePage(href) {
	$('#door-wrapper').show();
	$('#tools').hide();

	// SCROLLBAR FIX
	if ($(document).height() > $(window).height()) {
		var tempWidth = $(document).width();
		var tempBgWidth = $('#background').width(); 
		//$('body').css({overflow: 'hidden'});
		var tempWidthScroll = scrollbarWidth();
		$('#wrapper').css({width: tempWidth, marginRight: tempWidthScroll});
		$('#header').removeClass('tweenAll_1');
		$('#header').css({width: tempWidth, marginRight: tempWidthScroll});
		//$('#background').css({width: tempBgWidth});
	}

	TweenMax.to($('#door-left'), 1, {css:{transform:"skew" + tempAxis + "(" + tempSkew + "deg) translate" + tempAxis + "(-49%)"}, ease: Expo.easeOut});
	TweenMax.to($('#door-right'), 1, {css:{transform:"skew" + tempAxis + "(" + tempSkew + "deg) translate" + tempAxis + "(49%)"}, ease: Expo.easeOut, onComplete: function() {
		$('#wrapper').hide();
		$('#header').hide();
		$('#footer').hide();
		//$('#background').hide();
		$('body').hide();
		setTimeout(function() {
			gotoPage(href);
		}, 50);
	}});

}


function gotoPage(href){
	location.href = href;
}

// PROJECT INFO TOGGLE
var isInfoOpen = false;
function toggleTextOptions() {
	var tempHeight = $('#info-holder').outerHeight() + 20;
	if (isInfoOpen == false) {
		isInfoOpen = true;
		TweenMax.to($('#info'), .5, {css:{ height: tempHeight, autoAlpha: 1}, ease: Expo.easeOut});
	} else {
		isInfoOpen = false;
		TweenMax.to($('#info'), .5, {css:{ height: 0, autoAlpha: 0}, ease: Expo.easeOut});
	}
}

function contentReveal() {
	$(".showcase .project-feature, .project-images .project-panel").each( function() {
		var elementOffset = $(this).viewportOffset().top;
		var elementNegativeOffset = -($(this).height() + 20);
		if ( elementOffset < elementNegativeOffset ) {
			TweenMax.to($(this), 0, {css:{ y: -150, force3D: true }});
		} else if ( elementOffset > $(window).height() ){
			TweenMax.to($(this), 0, {css:{ y: 125, force3D: true }});
		} else {
			TweenMax.to($(this), 1, {css:{ y: 0, force3D: true }, ease: Expo.easeOut});
		}
	});
	$(".content").each( function() {
		var elementOffset = $(this).viewportOffset().top;
		var elementNegativeOffset = -($(this).height() + 50);
		if ( elementOffset < elementNegativeOffset ) {
			TweenMax.to($(this), 0, {css:{ y: -150, force3D: true }});
		} else if ( elementOffset > $(window).height() ){
			TweenMax.to($(this), 0, {css:{ y: 125, force3D: true }});
		} else {
			TweenMax.to($(this), 1, {css:{ y: 0, force3D: true }, ease: Expo.easeOut});
		}
	});	
	/*
	$("video").each( function() {
		var elementOffset = $(this).viewportOffset().top;
		if ( elementOffset > $(window).height() ){
			TweenMax.to($(this), 0, {css:{ display: 'none' }});
		} else {
			TweenMax.to($(this), 0, {css:{ display: 'block' }});
		}
	});
	*/	
}

// BUTTONS
function initButtons() {
	$('a').click(function(){
		var href = this.href;
        if ($(this).attr('target') == '_blank') {
			gotoPage(tempUrl);
        } else if ($(this).attr("id") == "info-toggle"){
			toggleTextOptions();
        } else if ($(this).parent().hasClass("tool-up")){
			moveUp();
        } else if ($(this).parent().hasClass("tool-down")){
			moveDown();
        } else if ($(this).parent().hasClass("tool-wall")){
			transform( targets.table, 2000 );
        } else if ($(this).parent().hasClass("tool-grid")){
			transform( targets.grid, 2000 );
        } else if ($(this).parent().hasClass("tool-helix")){
			transform( targets.helix, 2000 );
        } else if ($(this).parent().hasClass("tool-sphere")){
			transform( targets.sphere, 2000 );
        } else {
			closePage(href);
		}
		
       // } else if ($(this).attr("href").indexOf('mailto') !== -1){
			//console.log("I AM AN EMAIL LINK");
		return false;
	});
	
	$(window).scroll(function () {
		if (window.pageYOffset > 75) {
			$('#header').addClass("scrolled");
		} else  {
			$('#header').removeClass("scrolled");
		}
		if(!inTransition) {
			contentReveal();
		}
		
		// CLOSE INFO AREA IF IT IS OPEN
		if (isInfoOpen == true) {
			toggleTextOptions();
		}
		/*
		// SCROLL POSITION CHECKER
		$(".metatitle, .title").each( function() {
			var scrollTop     = $(window).scrollTop(),
				elementOffset = $(this).offset().top,
				distance      = (elementOffset - scrollTop);
			if (distance < ($(window).height() - 250)) {
				$(this).removeClass('blueText');
			} else {
				$(this).addClass('blueText');
			}
		});
		*/
	});
	
	$(window).resize(function() {
		if(!inTransition) {
			contentReveal();
		}
		// CLOSE INFO AREA IF IT IS OPEN
		if (isInfoOpen == true) {
			toggleTextOptions();
		}
	});
	
	$(document).keydown(function (e) {
		var keyCode = e.keyCode || e.which, arrow = {left: 37, up: 38, right: 39, down: 40 };
		switch (keyCode) {
			case arrow.left:
				moveTop();
				break;
			case arrow.right:
				moveBottom();
				break;
			case arrow.up:
				moveUp();
				break;
			case arrow.down:
				moveDown();
				break;
		}
	});
}

// HOVERS AND INTERACTIONS
function initHovers() {
	// FOOTER SOCIAL HOVER 
	$('#social').hover(
		function(){
				$('.icon-rollover').css({
					opacity: '0'
				});
				$('.icon-rollover').html('STALK ME');
				$('.icon-rollover').stop().animate({
					opacity: 1
					}, 500, 'easeOutExpo');
			},
		function(){
			$('.icon-rollover').stop().animate({
				opacity: 0
				}, 500, 'easeOutExpo');
		});
		$('#social a').hover(
			function(){
				$(this).find('.icon').addClass('icon-flip');
				$('.icon-rollover').css({
					opacity: '0'
				});
				if ($(this).find('.icon').hasClass('icon-email')) {$('.icon-rollover').html('Hit me up!!!');}
				if ($(this).find('.icon').hasClass('icon-tweeter')) {$('.icon-rollover').html('Follow Me On Tweeter!');}
				if ($(this).find('.icon').hasClass('icon-behance')) {$('.icon-rollover').html('Favorite Me On Behance!');}
				if ($(this).find('.icon').hasClass('icon-instagram')) {$('.icon-rollover').html('Like Me On Instagram!');}
				$('.icon-rollover').stop().animate({
					opacity: 1
					}, 500, 'easeOutExpo');
				},
			function(){
				$(this).find('.icon').removeClass('icon-flip');
			});
	
	/*
	$.each( $(".skill"), function(i,e) {
		var target = $(this).find('.skilltext div');
  		var t = TweenMax.to(target, 1, { y: -50, ease: Expo.easeOut, paused: true }, 0.1);
		e.hoverAnimation = t;
		$(e).hover(
			function() {
				this.hoverAnimation.play();
			},
			function() {
				this.hoverAnimation.reverse();
			}
		);
	});
	*/
	// HOMEPAGE SKILL SECTIOn
	$('.skill').hover(
		function(){
			var that = $(this).find('.skilltext .anim');
			TweenLite.killTweensOf(that);
			TweenMax.staggerTo( that, 1, { y: -50, ease: Expo.easeOut }, 0.1 );
			TweenMax.fromTo( $(this).find('.skill-divider'), 1, { scaleX: 1, scaleY: 1, autoAlpha: 1 }, { scaleX: 2, scaleY: 1, autoAlpha: 0.5, transformOrigin: 'center', ease: Expo.easeOut } );
			
			TweenMax.to( $(this).find('.skill-cover'), 0.5, { autoAlpha: 0.25 } );
		},
		function(){
			var that = $(this).find('.skilltext .anim');
			TweenLite.killTweensOf(that);
			TweenMax.to( that, 0.5, { y: 0, ease: Expo.easeOut } );
			TweenMax.to( $(this).find('.skill-divider'), 0.5, { scaleX: 1, scaleY: 1, autoAlpha: 0.25, transformOrigin: 'center', ease: Expo.easeOut } );
			TweenMax.to( $(this).find('.skill-cover'), 0.5, { autoAlpha: 0.6 } );
	 });

	
	// ABOUT SOCIAL HOVER 
	$('.socialicon').hover(
		function(){
			$(this).find('.icon-large').addClass('icon-flip');
			},
		function(){
			$(this).find('.icon-large').removeClass('icon-flip');
		});
	// FEATURE PAGE RANDOMIZE BACKGROUNDS
	if ($('.project-feature').length) {
		var backtitle = $('.back-title');
		var numFeatures = $('.project-feature').length
		for (var i=0;i<numFeatures;i++) {
			$(backtitle[i]).css('background-image', 'url(../img/featured/bg_featured' + generateRandomNumber(0,4) + '.jpg)');
		}
	}
	
	// FEATURE HOVER 
	$('.project-feature').hover(
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(0)').addClass('side2');
			$(this).find('.reflection').stop().animate({ 
				backgroundPosition: '0px 0px',
				opacity: 1
				}, 500, 'easeOutExpo');
			$(this).find('img:first').stop().animate({ 
				opacity: 0
				}, 500);
			$(this).find('ul li:eq(1) .back-title').stop().delay(200).animate({ 
				opacity: 1,
				}, 500);
			$(this).find('ul li:eq(2) .back-title').stop().delay(200).animate({ 
				opacity: 1,
				}, 500);
			$(this).find('.back-title span').shuffleLetters();
		},
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(1)').addClass('side');
			$(this).find('.reflection').stop().delay(100).animate({ 
				backgroundPosition: '-420px 0px',
				opacity: 0
				}, 100, 'easeOutExpo');
			$(this).find('img:first').stop().animate({ 
				opacity: 1
				}, 500);
			$(this).find('ul li:eq(1) .back-title').stop().animate({ 
				opacity: 0
				}, 200);
			$(this).find('ul li:eq(2) .back-title').stop().animate({ 
				opacity: 0
				}, 200);
		});
	
	
	// PORTFOLIO GRID HOVER 
	$('.project-thumb').hover(
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(0)').addClass('side2');
			
			$(this).find('img:first').stop().animate({ 
				opacity: 0
				}, 500);
			$(this).find('.back-title').stop().delay(100).animate({ 
				opacity: 1,
				}, 500);
			$(this).find('.back-title span').shuffleLetters();
		},
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(1)').addClass('side');
			
			$(this).find('img:first').stop().animate({ 
				opacity: 1
				}, 500);
			$(this).find('.back-title').stop().animate({ 
				opacity: 0
				}, 200);
		});
		
	$('.project-thumb-xl').hover(
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(0)').addClass('side2');
			
			$(this).find('img:first').stop().animate({ 
				opacity: 0
				}, 500);
			$(this).find('.back-title').stop().delay(100).animate({ 
				opacity: 1,
				}, 500);
			$(this).find('.back-title span').shuffleLetters();
		},
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(1)').addClass('side');
			
			$(this).find('img:first').stop().animate({ 
				opacity: 1
				}, 500);
			$(this).find('.back-title').stop().animate({ 
				opacity: 0
				}, 200);
	});
		
		
	 // FWA HOVER
	$('.fwa').hover(
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(0)').addClass('side2');
			$(this).find('img:first').stop().animate({ 
				opacity: 0
				}, 500);
			$(this).find('img:last').stop().animate({ 
				opacity: 1
				}, 500);
			TweenMax.fromTo( $(this).find('.fwa-title'), 0.5, { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Expo.easeOut });
		},
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(1)').addClass('side');
			$(this).find('img:first').stop().animate({ 
				opacity: 1
				}, 500);
			$(this).find('img:last').stop().animate({ 
				opacity: 0
				}, 500);
			TweenMax.to( $(this).find('.fwa-title'), 0.5, { y: 0, autoAlpha: 0, ease: Expo.easeOut });
	 });
	 
	 
	// MAGAZINE HOVER
	if ($('.mag').length) {
		$('.mag').each(function(index) {
			$(this).find('ul li:eq(0)').addClass('cover').append('<div class="overlay overlay-cover"></div>');
			for (var i=0;i<3;i++) {
				//var tempClass = ('page' + (3-i));
				var tempClass = ('page' + (i+1));
				//$(this).find('ul').prepend('<li class="page ' + tempClass + '"></li>');
				$(this).find('ul').prepend('<li class="page ' + tempClass + '"><img src="/img/magazines/page.jpg" /></li>');
				
			}
		});
	}
	
	$('.mag').hover(
		function(){
			$(this).find('ul li:eq(0)').addClass('open3');
			$(this).find('ul li:eq(1)').addClass('open2');
			$(this).find('ul li:eq(2)').addClass('open1');
			$(this).find('ul li:eq(3)').addClass('opencover');
			
			$(this).find('.overlay').stop().animate({ 
				opacity: 1
				}, 500);
			TweenMax.fromTo( $(this).find('.mag-title'), 0.5, { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Expo.easeOut });
				
				if ($(this).hasClass('mag-square')) {
					$(this).find('a').stop().animate({ 
						backgroundPosition: '17px 150px'
						}, 500, 'easeOutExpo');
				} else {
					$(this).find('a').stop().animate({ 
						backgroundPosition: '17px 195px'
						}, 500, 'easeOutExpo');
				}
			},
		function(){
			$(this).find('ul li').removeClass('open1').removeClass('open2').removeClass('open3').removeClass('opencover');
			$(this).find('.overlay').stop().animate({ 
				opacity: 0
				}, 500);
			TweenMax.to( $(this).find('.mag-title'), 0.5, { y: 0, autoAlpha: 0, ease: Expo.easeOut });
			$(this).find('a').stop().animate({ 
				backgroundPosition: '17px 75px'
				}, 500, 'easeOutExpo');
	 });
	 
	  
	 // BOOK HOVER
	if ($('.book').length) {
		$('.book').each(function(index) {
			$(this).find('ul li:eq(1)').append('<div class="overlay overlay-cover"></div>');
		});
	}
	$('.book').hover(
		function(){
			$(this).find('ul li:eq(1)').addClass('opencover');
			//TweenMax.fromTo( $(this), 0.5, { backgroundPosition: '17px 175px' }, { backgroundPosition: '17px 235px', ease: Expo.easeOut });
			TweenMax.fromTo( $(this).find('.overlay'), 0.25, { autoAlpha: 0 }, { autoAlpha: 1 });
			TweenMax.fromTo( $(this).find('.book-title'), 0.25, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Expo.easeOut });
			},
		function(){
			$(this).find('ul li').removeClass('opencover');
			//TweenMax.to( $(this), 0.5, { backgroundPosition: '17px 175px', ease: Expo.easeOut });
			TweenMax.to( $(this).find('.overlay'), 0.5, { autoAlpha: 0 });
			TweenMax.to( $(this).find('.book-title'), 0.25, { autoAlpha: 0 });
	});


	// TOOLS HOVER
	if ($('.tool').length) {
		$('.tool').each(function(index) {
			$(this).find('ul li:eq(0)').append('<div class="overlay overlay-solid"></div>');
			$('.flip-up').find('ul li:eq(1)').append('<div class="overlay overlay-gradient-bottom"></div>');
			$('.flip-down').find('ul li:eq(1)').append('<div class="overlay overlay-gradient-top"></div>');
			$('.flip-right').find('ul li:eq(1)').append('<div class="overlay overlay-gradient-left"></div>');
			$('.flip-left').find('ul li:eq(1)').append('<div class="overlay overlay-gradient-right"></div>');
		});
	}
	$('.tool').hover(
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(0)').addClass('side2');
			
			$(this).find('.overlay').stop().animate({ 
				opacity: 0
				}, 500, 'easeOutExpo');
			$(this).find('.overlay-solid').stop().animate({ 
				opacity: 1
				}, 500, 'easeOutExpo');
			},
		function(){
			$(this).find('ul li').removeClass('side').removeClass('side2');
			$(this).find('ul li:eq(1)').addClass('side');
			
			$(this).find('.overlay').stop().animate({ 
				opacity: 1
				}, 750);
			$(this).find('.overlay-solid').stop().animate({ 
				opacity: 0
				}, 500, 'easeOutExpo');
	});
	
	// HEADER NAME ROLLOVER
	$('#header-name').hover(
		function(){
			changeTagline("random");
			},
		function(){
	});
	
	
	// PROJECT IMAGE HOVER
	var mouseX, mouseY, tempTarget, centerX, centerY, tempX, tempY, hoverloop, targetX, targetY
	$(document).mousemove(function(e){
		mouseX = e.pageX;
		mouseY = e.pageY; 
	});

	$('body.project .project-images img').wrap('<div class="project-panel" />');
	$('body.accolade .project-images img').wrap('<div class="project-panel" />');
	//$('body.about .project-images img').wrap('<div class="project-panel" />');
	
	$('body.project .project-panel, body.accolade .project-panel, body.about .project-panel').hover(
		function(){
			tempTarget = $(this).find('img');
			tempTarget.addClass('easelinear');
			tempTarget.removeClass('easecubic');
			centerX = tempTarget.offset().left + (tempTarget.width() / 2);
			centerY = tempTarget.offset().top + (tempTarget.height() / 2);
			var currentX = 0, currentY = 0, maxRot = 10, minRot = -10;
			if (tempTarget.height() > 1000) {
				maxRot = 5; 
				minRot = -5;
			};
			var rotateMe=function(){
				if (tempTarget.height() > 1200) return;  // DONT DO A THING THE IMG IS TOO TALL
				targetX = Math.min(Math.max(parseInt(-(mouseX - centerX) / 25), minRot), maxRot)
				targetY = Math.min(Math.max(parseInt((mouseY - centerY) / 25), minRot), maxRot)
				currentX = currentX + ((targetX - currentX) / 12);
				currentY = currentY + ((targetY - currentY) / 12);
				tempX = currentX;
				tempY = currentY;
				$(tempTarget).css({
					  '-webkit-transform' : 'rotateX('+ tempY +'deg) rotateY('+ tempX +'deg)',
						 '-moz-transform' : 'rotateX('+ tempY +'deg) rotateY('+ tempX +'deg)',  
						  '-ms-transform' : 'rotateX('+ tempY +'deg) rotateY('+ tempX +'deg)',  
						   '-o-transform' : 'rotateX('+ tempY +'deg) rotateY('+ tempX +'deg)',  
							  'transform' : 'rotateX('+ tempY +'deg) rotateY('+ tempX +'deg)'
				});
			}
			hoverloop = setInterval(function(){
				rotateMe();
			}, 30);
		},
		function(){
			tempTarget.removeClass('easelinear');
			tempTarget.addClass('easecubic');
			$(tempTarget).css({
				  '-webkit-transform' : 'rotateX(0deg) rotateY(0deg)',
					 '-moz-transform' : 'rotateX(0deg) rotateY(0deg)',  
					  '-ms-transform' : 'rotateX(0deg) rotateY(0deg)',  
					   '-o-transform' : 'rotateX(0deg) rotateY(0deg)',  
						  'transform' : 'rotateX(0deg) rotateY(0deg)'
			});
			stopPanel();
	});
	
	function stopPanel(){
		clearInterval(hoverloop)
	}
}


	
// PAGE MOVEMENT MAGIC
var moveOffset = $(document).height();
function moveUp() {
	moveOffset = window.pageYOffset - $(window).height()/2;
	if (moveOffset < 0) {
		moveOffset = 0;
	}
	moveAround();
}
function moveDown() {
	moveOffset = window.pageYOffset + $(window).height()/2;
	var moveMax = ($(document).height() - $(window).height());
	if (moveOffset > moveMax) {
		moveOffset = moveMax;
	}
	moveAround();
}
function moveTop() {
	moveOffset = 0;
	moveAround();
}
function moveBottom() {
	moveOffset = ($(document).height() - $(window).height());
	moveAround();
}
function moveAround() {
	$('body,html').stop().animate({
		scrollTop: moveOffset
	}, 1000, 'easeOutExpo');
	return false;
}


	
// GENERATE RANDOM NUMBER
function generateRandomNumber(min, max) {
	var random = Math.floor(Math.random() * (max - min + 1)) + min;   
	return random;
}	

// INSTAGRAM FEED
function initInstagram() {
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		cache: false,
		url: 'https://api.instagram.com/v1/users/2362319/media/recent/?access_token=2362319.53c5273.ac29244ab9ec43278545b5e30b508e64',
		success: function(data) {
			$('#instagram ul').html('');
			for (var i = 0; i < 4; i++) {
				$('#instagram ul').append('<li><a href="http://www.instagram.com/shanemielke" target="_blank"><div class="loudmouth-instagram"><div class="outer-content"><img src="' + data.data[i].images.low_resolution.url + '" /></div><div class="inner-content"></div></div></a></li>');
			}
			
			if (!deviceSettings.isMobile) {
				$('.loudmouth-instagram').loudMouth({
					'perspective'   : 450, 
					'ease-in'       : 'cubic-bezier(0.165, 0.840, 0.440, 1.00)',
					'ease-out'      : 'cubic-bezier(0.165, 0.840, 0.440, 1.00)',
					'duration-in'   : '550ms', 
					'duration-out'  : '550ms', 
					'inner-content' : '.inner-content',
					'outer-content' : '.outer-content',
					'supported'     : (Modernizr.csstransforms && Modernizr.csstransforms3d && Modernizr.csstransitions),
				})
			}			
		}
	});	
}	


// HEADER TAGLINE GENERATION
function changeTagline(random) {
	var taglineArray = [
		//"Design.Develop.Motion.Photo",
		"Design.Dev.WebGL.Motion",
		"Husband.Father.Son.Friend",
		"Think.Believe.Dream.Dare",
		"California Dreamin",
		"My Life Be Like Oooooh Ahhh",
		"Mind In Motion",
		"Be Water My Friend",
		"Look Into The Light",
		"Beast Mode",
		"The Sleeper Has Awakened",
		"The Spice Must Flow",
		"What's in the box?",
		"Fear Is The Mind-Killer",
		"Cyberdyne Systems Model 101",
		"Come With Me If You Want To Live",
		"Livin Life In The Fast Lane",
		"Movin At The Speed Of Life",
		"Drive It Like You Stole It",
		"Every Day Is A Saturday",
		"The Legs Feed The Wolf",
		"It's A Dead Man's Party",
		"It's not about the 6 minutes...",
		"You're gonna lose that arm!",
		"The Great White Buffalo",
		"Tiger Got Out Of The Cage Bro",
		"Follow Me On The Tweeter",
		"Boop. Boop.",
		"There Is No Sleep For The Wicked",
		"Bingo bango ready to go go?",
		"Drifting somewhere in the vast",
		"Come at me bro !",
		"I Didn't Invent Odd Numbers",
		"2 Waffles And A Pancake",
		"Nitrotriminium",
		"Lock It Down",
		"It's Pronounced 'Milky'",
		"They be like THERE HE GO!",
		"AKA Pixelranger",
		"AKA MilkBeast",
		"First try no warmup"
		];
	var tempTaglineLength = taglineArray.length - 1;
	var tempTagline = 0;
	if (random == "random") {
		tempTagline = generateRandomNumber(0,tempTaglineLength);
	}
	$('.tagline').html(''); 
	$('.tagline').css({opacity: '0'});
	$('.tagline').html(taglineArray[tempTagline]); 
	$('.tagline').stop().delay(50).animate({
		opacity: 1
		}, 500);
}

var textTimer;
function titleTimer() {
	clearTimeout(textTimer);
	textTimer = setTimeout(changeTitle, 3000);
}

// HEADER TAGLINE GENERATION
var titleNumber = 0;
function changeTitle() {
	var titleArray = [
		"Freelance",
		"Designer",
		"Developer",
		"WebGL",
		"Motion",
		//"Animator",
		//"Photographer",
		//"Author",
		//"Mentor",
		"Also Known As",
		"Pixelranger",
		"MilkBeast",
		"Leche",
		"Shane",
		"I Am A"
		];
	var tempTitleLength = titleArray.length - 1;
	
	TweenMax.set( "#home-feature-title", { transformPerspective: 800 });
	
	var titleAnimation =  new TimelineMax({ paused: true, force3D: true, repeat: -1, delay: 1, repeatDelay: 0 });
	titleAnimation.to( "#home-feature-title", 1.5, { scaleX: 0.7, scaleY: 0.7, autoAlpha: 0, rotationX: -90, ease: Expo.easeIn, immediateRender: false }, 0 );
    titleAnimation.fromTo( "#home-feature-title", 3, 
		{ scaleX: 0, scaleY: 0, autoAlpha: 0, rotationX: 180 }, 
		{ scaleX: 1, scaleY: 1, autoAlpha: 1, rotationX: 0, ease: Expo.easeOut, immediateRender: false , onStart: function() {
			titleNumber++;
			if (titleNumber > tempTitleLength){
				titleNumber = 0
			}
			$('#home-feature-title').html('');
			$('#home-feature-title').html(titleArray[titleNumber]);
		}, onComplete: function() {
			$('#feature-title').removeAttr("style")
		}}, 1.5 );
	titleAnimation.timeScale(1);
	titleAnimation.play();
}


var preloaderLoop;
function initPreloader() {
	inTransition = true;
	if (deviceSettings.isMobile) {
		TweenMax.set( "#preloader", { autoAlpha: 1 });
	} else {
		TweenMax.fromTo( "#preloader", 1, { autoAlpha: 0 }, { autoAlpha: 1 });
	}
	loaderSpriteAnimate();
}
function closePreloader() {
	$('#preloader').hide();
	if (deviceSettings.isMobile) {
		openMobile();
	} else {
		openPage();
	}
	if (deviceSettings.isMacSafari) {
		$('#tools').hide();
	}
}
var spriteWidth = 70,
	spriteHeight = 70,
	spriteFrames = 65,
	spriteWidthMax = 6,
	spriteCurrentFrame = 0,
	spriteCurrentPosX = 0,
	spriteCurrentPosY = 0

function loaderSpriteAnimate() {
	requestAnimationFrameID = requestAnimationFrame(loaderSpriteAnimate);
	if (spriteCurrentFrame > spriteFrames) {
		spriteCurrentFrame = 0;
		spriteCurrentPosX = 0;
		spriteCurrentPosY = 0;
		if (beastIsReady == true) {
			loaderSpriteStop();
			closePreloader();
		}
	} else {
		spriteCurrentPosX = spriteCurrentPosX + spriteWidth;
		if (spriteCurrentPosX > (spriteWidthMax * spriteWidth)) {
			spriteCurrentPosX = 0
			spriteCurrentPosY = spriteCurrentPosY + spriteHeight;
		}
	}
	TweenMax.set( "#preloader", { backgroundPosition: -spriteCurrentPosX + 'px ' + -spriteCurrentPosY + 'px' });
	spriteCurrentFrame++
}

function loaderSpriteStop() {
	cancelAnimationFrame(requestAnimationFrameID);
}

var requestAnimationFrameID;
var requestAnimationFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame || 
		  	window.mozRequestAnimationFrame    || 
		  	//window.oRequestAnimationFrame      ||
			//window.msRequestAnimationFrame     ||
			function(callback, element){
			  return window.setTimeout(callback, 1000 / 60);
			};
})();

var cancelAnimationFrame = (function(){
	return  window.cancelAnimationFrame       ||
			window.webkitCancelAnimationFrame || 
			window.mozCancelAnimationFrame    || 
			//window.oCancelAnimationFrame      ||
			//window.msCancelAnimationFrame     || 
			window.clearTimeout
})();

// BACKGROUND ANIMTATION FIX
/*
 * @author Alexander Farkas
 * v. 1.02
 * Edited by Nelson Wells for jQuery 1.8 compatibility
 */
(function($) {
    $.extend($.fx.step,{
        backgroundPosition: function(fx) {
            if (fx.pos === 0 && typeof fx.end == 'string') {
                var start = $.css(fx.elem,'backgroundPosition');
                start = toArray(start);
                fx.start = [start[0],start[2]];
                var end = toArray(fx.end);
                fx.end = [end[0],end[2]];
                fx.unit = [end[1],end[3]];
            }
            var nowPosX = [];
            nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
            nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
            fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
 
           function toArray(strg){
               strg = strg.replace(/left|top/g,'0px');
               strg = strg.replace(/right|bottom/g,'100%');
               strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
               var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
               return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
           }
        }
    });
})(jQuery);

/*!
 * jQuery viewportOffset - v0.3 - 2/3/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){
  var win = $(window);
  $.fn.viewportOffset = function() {
    var offset = $(this).offset();
    
    return {
      left: offset.left - win.scrollLeft(),
      top: offset.top - win.scrollTop()
    };
  };
})(jQuery);

$(document).ready(initBeast);

var beastIsReady = false;
$(window).load(function (){
	beastIsReady = true;
	if (!deviceSettings.isMobile) {
		TweenMax.to( "#preloader", .5, { autoAlpha: 0 , delay: .5 });
	}
});

setupDeviceSettings();
initPreloader();
