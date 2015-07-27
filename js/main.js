/**
 * Created by Dan Lutescu on 09/05/15.
 */

(function($) {
    "use strict";

    var viewportHeight  = $(window).height();
    var navbarHeight    = $('.main-menu').height();

    var slideshowHeight = viewportHeight - navbarHeight;

    $(".screenHeight").css({"min-height": viewportHeight + "px"});
    $(".slideShowHeight").css({"min-height": slideshowHeight+ "px"});

    $(".screenHalfHeight").css({"min-height": (viewportHeight / 2) + "px"});


    $('.vert-center').flexVerticalCenter();
    $('.vert-center-padding').flexVerticalCenter({cssAttribute:'paddingTop'});

    //fix vertical centering on carousel
    $('#home-carousel').on('slide.bs.carousel', function () {
        setTimeout(function(){
            $('.vert-center').flexVerticalCenter();
        },10);
    });

    $('#home-carousel').on('slid.bs.carousel', function () {
        $('.vert-center').flexVerticalCenter();
    });

    //fix parent height
    if(!isMobileDevice())
    {
        $('.parentHeight').each(
            function () {
                var parent = $(this).parent();
                if (parent !== null)
                    $(this).css("height", parent.height() + "px");
            }
        );
    }

    $(".chapter-row .title").on('click', function()
    {
        $(this).find('.subtitle').toggle();
        $(this).find('.subtitle-full').toggle();
        $(this).parent().find('.description').toggle();
        var arrow = $(this).parent().find('.arrow i');
        if( arrow.hasClass('fa-caret-down'))
        {
            arrow.removeClass('fa-caret-down');
            arrow.addClass('fa-caret-up');
        }else{
            arrow.addClass('fa-caret-down');
            arrow.removeClass('fa-caret-up');
        }
    });
    //click the first chapter on the first tab
    $($(".chapter-row .title").get(0)).click();

    //smooth animations for anchors
    $('.main-menu a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // the scroll effect
    // $("html").niceScroll({'scrollspeed':150});

    //start the WOW animation library with disabled mobile animations
    new WOW({ mobile:false }).init();


    function isMobileDevice() {
        return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
    }

})(jQuery);
