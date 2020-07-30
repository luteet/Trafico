$(function () {

    let image_srcNotWebp,
        image_src_bg = '.webp-bg';

    function ThisIsWebP() {
        let def = $.Deferred(), crimg = new Image();
        crimg.onload = function () { def.resolve(); };
        crimg.onerror = function () { def.reject(); };
        crimg.src = "https://simpl.info/webp/cherry.webp";
        return def.promise();
    }

    $('.reviews__slider--body').slick({
        slidesToShow: 3,
        infinite: true,
        prevArrow: '<button type="button" class="slick-prev reviews__slider--btn" style="background-image: url(img/slider/arrow.svg)"></button>',
        nextArrow: '<button type="button" class="slick-next reviews__slider--btn" style="background-image: url(img/slider/arrow.svg)"></button>',
        adaptiveHeight: true,
        appendArrows: '.reviews__slider--buttons',
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    infinite: false,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


    ThisIsWebP().then(function () {
        $.each($(image_src_bg), function () {
            return false;
        });
    }, function () {
        $.each($(image_src_bg), function () {
            image_srcNotWebp = $(this).data('notwebp');
            if ($(this).is('a') == true) {
                $(this).attr('href', image_srcNotWebp);
            }
            else {
                $(this).css('background-image', 'url("' + image_srcNotWebp + '")');
            }
        });
    });

    let hMenu = $('.header__menu'),
        logo = $('.header-logo'),
        burger = $('.menu__burger'),
        about_elem__pants = $('.man-pants'),
        faq_hidenElem = $('.faq__list--li-hiden'),
        faq_hidenElemLength = $('.faq__list--li-hiden').length,
        faq_question = $('.faq__list--question'),
        faq_answear = $('.faq__list--answear'),
        faq_li,
        faq_column = $('.faq__list--column'),
        faq_loadMore = $('.faq__list--load-more'),
        mList = $('.header__menu--list');

    function screenSize() {
        if ($(window).width() <= 951) {

        }
        else if ($(window).width() > 951) {
            if ($(burger).hasClass('active')) {
                $(burger).click();
            }
        }
    }
    screenSize();

    $(window).resize(function () {
        screenSize()
    });

    headerHider({
        elemName: $('.header__top'),
        classCheck: 'hide',
        distanceHide: 500,
        distanceShow: 300
    })


    $(burger).on('click', function () {
        $(this).toggleClass('active');
        $(mList).toggleClass('active');
        $('.body').toggleClass('scroll_none');
    });

    function faqListAppendToColumn() {
        for (let i = 0, j = 0; i < faq_question.length; i++, j++) {
            if (j == 2) {
                j = 0;
            }

            faq_li = $(faq_question[i]).parent();
            if (!$(faq_li).hasClass('.faq__list--learn-more')) {
                $(faq_li).appendTo($(faq_column[j]));
            }
        }
        $('.faq__list-li--learn-more').appendTo($(faq_column[1]));
    }

    faqListAppendToColumn();

    /* function faqElemLoadMore(e) {
        e.preventDefault();
    }

    faqElemLoadMore($(faq_loadMore)); */

    let faqElemSlideCheck = false;
    function faqElemSlideUp(e) {
        if (faqElemSlideCheck == false) {
            faqElemSlideCheck = true;
            if ($(e).hasClass('active')) {
                $(e).removeClass('active');
                $(faq_answear).slideUp(500).removeClass('active');
            }
            else {
                $(faq_question).removeClass('active');
                $(e).addClass('active');
                $(faq_answear).slideUp(500).removeClass('active');
                faq_answear = $(e).next();
                $(faq_answear).slideDown(500).addClass('active');
            }
            setTimeout(function () {
                faqElemSlideCheck = false;
            }, 500);
        }
    }

    $('.input-placeholder').on('click', function () {
        if (!$(this).hasClass('.focus')) {
            $(this).next().focus();
        }
    });

    $(faq_question).on('click', function () {
        faqElemSlideUp($(this));
    });
    $(faq_loadMore).on('click', function () {
        $.each($(faq_hidenElem), function () {
            $(this).removeClass('faq__list--li-hiden');
        });
        $(this).removeClass('active');
    });

    function formKeySwitch(settings) {
        if (settings.formElem == undefined) {
            return false;
        }
        
        let form_input = settings.formElem,
            inputChek = true,
            focusClass = settings.focusClass,
            inputLength = form_input.length - 1,
            inputLast = $(form_input[inputLength]).data('input-id'),
            inputId;


            if (settings.focusClass == undefined) {
                focusClass = 'focus';
            }

        function nextInput(e) {
            if (e.data('input-id') != inputLast && inputChek == true) {
                inputChek = false;
                inputId = e.data('input-id');
                inputId = inputId + 1;
                $('.form_input[data-input-id|="' + inputId + '"]').focus();
                inputChek = true;
                setTimeout(function () {
                    inputChek = true;
                }, 250);
            }
        }
        function prevInput(e) {
            if (e.data('input-id') != 1 && inputChek == true) {
                inputChek = false;
                inputId = e.data('input-id');
                inputId = inputId - 1
                $('.form_input[data-input-id|="' + inputId + '"]').focus();
                setTimeout(function () {
                    inputChek = true;
                }, 250);
            }
        }

        $(form_input).focus(function () {
            
            $(this).parent().addClass(focusClass);
            $(this).prev().addClass(focusClass);
            $(this).on('keydown', function (e) {
                if (e.which == 40) {
                    nextInput($(this));
                }
                if (e.which == 38) {
                    prevInput($(this));
                }
            });
        })
        .blur(function () {
            if ($(this).val() == '') {
                $(this).prev().removeClass(focusClass);
            }
            $(this).parent().removeClass(focusClass);
        });
    }

    formKeySwitch({
        formElem: $('.form_input'),
    });





    AOS.init();

});