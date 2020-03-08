"use strict";

var defaultValues = {
  slideUp: {
    duration: 0.8
  },
  slideRight: {
    duration: 0.8
  },
  slideBottom: {
    duration: 0.8
  },
  slideLeft: {
    duration: 0.8
  }
  /*$('[data-scrollmagic]').each(function (index, elem) {
      // Init ScrollMagic Controller
      const scrollMagicController = new ScrollMagic();
  
      // Create Animations
      let slideUp = $(".slideUp"),
          slideRight = $(".slideRight"),
          slideBottom = $(".slideBottom"),
          slideLeft = $(".slideLeft");
  
      // Create delay
      const delay = m => Number($(this).attr(`data-delay-${m}`)) || defaultValues[m].duration;
  
  
  
      var tl = new TimelineMax({pause: true});
      tl
          .fromTo(slideUp, delay('slideUp'), { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.EaseOut })
          .fromTo(slideRight, delay('slideRight'), { x: 100, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.EaseOut })
          .fromTo(slideBottom, delay('slideBottom'), { y: -100, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.EaseOut })
          .fromTo(slideLeft, delay('slideLeft'), { x: -100, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.EaseOut })
  
  
      // Create the Scene and trigger when visible
      var scene = new ScrollScene({
          triggerElement: elem,
          offset: 0 /!* offset the trigger Npx below scene's top *!/
      })
          .setTween(tl)
          .addTo(scrollMagicController);
  
  });*/
  // Create Animations

};
var slideUp = document.querySelector(".slideUp"),
    slideRight = document.querySelector(".slideRight"),
    slideDown = document.querySelector(".slideDown"),
    slideLeft = document.querySelector(".slideLeft"),
    fadeOut = document.querySelector(".fadeOutBounce"); // Create delay
//const delay = d => Number($(this).attr(`data-delay-${d}`)) || defaultValues[d].duration;

var tl = new TimelineMax({
  pause: true
});
/*tl.from(slideRight, delay('slideRight'), {duration: 2, opacity: 0, x: 100});
tl.from(slideLeft, delay('slideLeft'), {duration: 2, opacity: 0, x: -100});
tl.from(slideUp, delay('slideUp'), {duration: 2, opacity: 0, y: 100});
tl.from(slideDown, delay('slideDown'), {duration: 2, opacity: 0, y: -100});
tl.from(fadeOut, 2, {duration: 2, opacity: 0, x: 100});*/

function slideEffectLeft(orderAnimation) {
  from(slideLeft, 1, {
    opacity: 0,
    x: -100
  }, orderAnimation);
}

tl.from(slideRight, 1, {
  opacity: 0,
  x: 100
});
tl.from(slideLeft, 1, {
  opacity: 0,
  x: -100
});
tl.from(slideUp, 1, {
  opacity: 0,
  y: 100
});
tl.from(slideDown, 1, {
  opacity: 0,
  y: -100
});
tl.from(fadeOut, 1, {
  ease: Elastic.easeOut.config(.8, .8),
  duration: 2,
  opacity: 0,
  scale: 0
});
var controller = new ScrollMagic.Controller();
var scene = new ScrollMagic.Scene({
  triggerElement: ".animation",
  triggerHook: 0,
  duration: 1000
}).addIndicators().addTo(controller);