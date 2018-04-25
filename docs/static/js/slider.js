$(function ($) {
    var options = {

        $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
            $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
            $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
            $AutoCenter: 1,                                  //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
            $SpacingX: 25                                   //[Optional] Horizontal space between each item in pixel, default value is 0
        },
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
            $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
            $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
        },
        $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
        $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
        $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
        $PauseOnHover: 1,
         $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
                    $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $AutoCenter: 0,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                    $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                    $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                    $SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                    $SpacingY: 10,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                    $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                },

    };

    var jssor_slider1 = new $JssorSlider$("slider1_featured", options);

    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizes
    function ScaleSlider2() {
        var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
        if (parentWidth) {
            var sliderWidth = parentWidth;

            //keep the slider width no more than 800
            sliderWidth = Math.min(sliderWidth, 1000);

            jssor_slider1.$SetScaleWidth(sliderWidth);
        }
        else
            window.setTimeout(ScaleSlider2, 30);
    }

    ScaleSlider2();

    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
        $(window).bind('resize', ScaleSlider2);
    }




});

    $(function(){

        $('.expand_skills').click(function(){

            el = $(this);
            ul = el.next();
            
            if(ul.is(":visible")) {
                el.removeClass('arrow_down');
                ul.slideUp();
            } else {
                el.addClass('arrow_down');
                ul.slideDown();
            }
            return false;
        });

        if ($('html').hasClass('csstransforms3d')) {    
        
            $('.thumb').removeClass('scroll').addClass('flip');
            $('.thumb.flip').hover(
                function () {
                    $(this).find('.thumb-wrapper').addClass('flipIt');
                },
                function () {
                    $(this).find('.thumb-wrapper').removeClass('flipIt');           
                }
            );
            $('.thumb.flip').click(function(){
                $(this).find('.thumb-wrapper').addClass('flipIt');
            });
            
        } else {
            
            $('.thumb').hover(
                function () {
                    $(this).find('.thumb-detail').stop().animate({bottom:0}, 500);
                },
                function () {
                    $(this).find('.thumb-detail').stop().animate({bottom: ($(this).height() * -1) }, 500);          
                }
            );

            $('.thumb').click(function(){
                $(this).find('.thumb-detail').stop().animate({bottom:0}, 500);
            });

        }


        $(".group1").colorbox({rel:'group1'});
        $(".group2").colorbox({rel:'group2',returnFocus:false});

        $(".group3").colorbox({rel:'group3',returnFocus:false});
        $(".group4").colorbox({rel:'group4'});
        $(".group6").colorbox({rel:'group6'});


        $('.bm').click(function(){
            $('.group2').first().click();
            $('.thumb-detail').trigger('mouseout');
            return false;
        });

        $('.cv').click(function(){
            $('.group3').first().click();
            $('.thumb-detail').trigger('mouseout');
            return false;
        });

        $('.fnb').click(function(){
            $('.group1').first().click();
            $('.thumb-detail').trigger('mouseout');
            return false;
        });



        $(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});



    });