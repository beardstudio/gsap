const defaultValues = {
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
}




/*$('[data-scrollmagic]').each(function (index, elem) {
    // Init ScrollMagic Controller
    const scrollMagicController = new ScrollMagic();

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
const slideUp = document.querySelector(".slideUp"),
    slideRight = document.querySelector(".slideRight"),
    slideDown = document.querySelector(".slideDown"),
    slideLeft = document.querySelector(".slideLeft"),
    fadeOut = document.querySelector(".fadeOutBounce");

// Create delay
//const delay = d => Number($(this).attr(`data-delay-${d}`)) || defaultValues[d].duration;

const controller = new ScrollMagic.Controller();

const tl = new TimelineMax({pause: true});


/*tl.from(slideRight, delay('slideRight'), {duration: 2, opacity: 0, x: 100});
tl.from(slideLeft, delay('slideLeft'), {duration: 2, opacity: 0, x: -100});
tl.from(slideUp, delay('slideUp'), {duration: 2, opacity: 0, y: 100});
tl.from(slideDown, delay('slideDown'), {duration: 2, opacity: 0, y: -100});
tl.from(fadeOut, 2, {duration: 2, opacity: 0, x: 100});*/

// function slideEffectLeft (orderAnimation){
//     from(slideLeft, 1, {opacity: 0, x: -100}, orderAnimation);
// }

// var slideLeftEffect = function () {
//     var tl = new TimelineMax();
    
//     return tl;
// };

var slideLeftEffect = function (selector, delay) {
    var tl = new TimelineMax();
    tl.from(selector, 2, {
        opacity: 0,
        x: -100
    }, delay);
    return tl;
};

var slideRightEffect = function (selector, delay) {
    var tl = new TimelineMax();
    tl.from(selector, 2, {
        opacity: 0,
        x: 100
    }, delay);
    return tl;
};

var slideUpEffect = function (selector, delay) {
    var tl = new TimelineMax();
    tl.from(selector, 2, {
        opacity: 0,
        y: 100
    }, delay);
    return tl;
};

var slideDownEffect = function (selector, delay) {
    var tl = new TimelineMax();
    tl.from(selector, 2, {
        opacity: 0,
        y: -100
    }, delay);
    return tl;
};

var fadeOutEffect = function (selector, delay) {
    var tl = new TimelineMax();
    tl.from(selector, 2, {
        ease: Elastic.easeOut.config(.8, .8),
        duration: 2,
        opacity: 0,
        scale: 0
    }, delay);
    return tl;
};

// var slideLeftEffect = new TimelineMax()
// .from(slideLeft, 2, {opacity: 0, x: -100}, 1);

// var slideRightEffect = new TimelineMax()
// .from(slideRight, 2, {opacity: 0, x: 100}, 2);

// var slideUpEffect = new TimelineMax()
// .from(slideUp, 2, {opacity: 0, y: 100}, 3);

// var slideDownEffect = new TimelineMax()
// .from(slideDown, 2, {opacity: 0, y: -100}, 4);

// var fadeOutEffect = new TimelineMax()
// .from(fadeOut, 2, {ease: Elastic.easeOut.config(.8, .8), duration: 2, opacity: 0, scale: 0}, 5);

//tl.from(slideRight, 1, {opacity: 0, x: 100});
//tl.from(slideLeft, 1, {opacity: 0, x: -100});
//tl.from(slideUp, 1, {opacity: 0, y: 100});
//tl.from(slideDown, 1, {opacity: 0, y: -100});
//tl.from(fadeOut, 1, {ease: Elastic.easeOut.config(.8, .8), duration: 2, opacity: 0, scale: 0});

const scene = new ScrollMagic.Scene({
    triggerElement: ".header",
    reverse: "false"
})
    .setClassToggle('.header', 'effect')
    .addIndicators({
        name: 'effect',
        colorStart: 'pink',
        colorTrigger: '#fff'
    })
    .setTween(slideLeftEffect('.slideLeft', 1))
    .setTween(slideRightEffect('.slideRight', 1))
    .setTween(slideUpEffect('.slideUp', 2))
    .setTween(slideDownEffect('.slideDown', 1))
    .setTween(fadeOutEffect('.fadeOutBounce', 3))
    .addTo(controller);


const scene1 = new ScrollMagic.Scene({
    triggerElement: ".animation",
    reverse: "false"
})
    .setClassToggle('.section-1', 'effect')
    .addIndicators({
        name: 'effect',
        colorStart: 'pink',
        colorTrigger: '#fff'
    })
    .addTo(controller);


const scene2 = new ScrollMagic.Scene({
    triggerElement: ".animation-1"
})
    .addIndicators()
    .setTween(tl).addTo(controller);