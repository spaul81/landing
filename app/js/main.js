// Loader
$(window).on('load', function () {
    var $preloader = $('.loader-box');
    $preloader.delay(300).fadeOut('slow');

    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        speed: 500,
        //spaceBetween: 5600,
        loop: true,
        autoplay: 4600,
        effect: 'fade',
        fade: {
            crossFade: true
        },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplayDisableOnInteraction: false

    })

    mySwiper.on('onSlidePrevStart', function () {
        $('.animatedSlider').toggleClass('animated fadeInUp visible');
    });
    mySwiper.on('onSlideNextStart', function () {
        $('.animatedSlider').toggleClass('animated fadeInUp visible');
    });

});

// Sickly Header | scrollTop
$(document).ready(function () {

    "use strict"; // Start of use strict


    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

//scrollTop
    $(window).scroll(
        function () {
            $(this).scrollTop() > 500 ? $(".scroll-top").fadeIn() : $(".scroll-top").fadeOut().blur()
            $(this).scrollTop() < 10 ? $(".nav a, .navbar-brand").blur() : '' //Leave focus if scroll top
        }),
        $(".scroll-top").click(function () {
            return $("html, body").animate({scrollTop: 0}, 700), !1
        }).blur();
});