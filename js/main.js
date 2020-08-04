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
                    slidesToShow: 1,
                    infinite: false
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

    let scrollName, scrollElem, scrollTop,
        start_scroll = false,
        widthScrollBar,
        burger = $('.menu__burger'),
        mBtn = $('.menu__btn-scroll'),
        faq_hidenElem = $('.faq__list--li-hiden'),
        faq_question = $('.faq__list--question'),
        faq_answear = $('.faq__list--answear'),
        faq_li,
        faq_column = $('.faq__list--column'),
        faq_loadMore = $('.faq__list--load-more'),
        mList = $('.header__menu--list');

    function widthScrollBarFunc() {
        widthScrollBar = $('.body').width();
        $('.body').css('overflow', 'hidden');
        widthScrollBar = $('.body').width() - widthScrollBar;
        $('.body').css('overflow', 'visible');
    }

    widthScrollBarFunc();

    headerHider({
        elemName: $('.header__top'),
        classCheck: 'hide',
        distanceHide: 400,
        distanceShow: 100
    })


    $(burger).on('click', function () {
        $('.menu__burger, .header__menu--list').toggleClass('active');
        $('body').toggleClass('scroll_none');
    });

    let inputScreenMediaCheck = true,
        headerMenuCheck = true;
    function screenSize() {
        if ($(window).width() <= 951) {
            if(inputScreenMediaCheck == true) {
                inputScreenMediaCheck = false;
            }
            if(headerMenuCheck == true) {
                $('.header__top').appendTo('.wrapper');
                headerMenuCheck = false;
            }
        }
        else if ($(window).width() > 951) {
            if(inputScreenMediaCheck == false) {
                inputScreenMediaCheck = true;
            }
            if ($(burger).hasClass('active')) {
                $(burger).click();
            }
            if(headerMenuCheck == false) {
                $('.header__top').appendTo('.body');
                headerMenuCheck = true;
            }
        }
    }
    screenSize();

    $(window).resize(function () {
        screenSize()
    });

    // scroll to section ===============================
    $(mBtn).on('click', function (e) {
        e.preventDefault();
        if (start_scroll == false) {
            start_scroll = true;

            scrollName = $(this).attr('href'),
                scrollElem = $(scrollName),
                scrollTop = scrollElem.offset().top;

            if ($(window).width() <= 950) {
                scrollTop = scrollTop - 70;
            }

            if ($(burger).hasClass('active')) {
                $('body').removeClass('scroll_none');
                $(burger).removeClass('active');
                $(mList).removeClass('active');
            }



            $('html, body').animate({
                scrollTop: scrollTop
            }, 1500);

            setTimeout(function () {
                start_scroll = false;
            }, 1500);
        }
    });
    // scroll to section ===============================

    // <append questions in column> ===============================
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
    // </append questions in column> ===============================

    // <questions slide function> ===============================
    let faqElemSlideCheck = false;
    function faqElemSlideUp(e) {
        if (faqElemSlideCheck == false) {
            faqElemSlideCheck = true;
            if ($(e).hasClass('active')) {
                $(e).removeClass('active');
                $(faq_answear).slideUp(700).removeClass('active');
            }
            else {
                $(faq_question).removeClass('active');
                $(e).addClass('active');
                $(faq_answear).slideUp(700).removeClass('active');
                faq_answear = $(e).next();
                $(faq_answear).slideDown(700).addClass('active');
            }
            setTimeout(function () {
                faqElemSlideCheck = false;
            }, 500);
        }
    }
    // </questions slide function> ===============================

    $('.input-placeholder').on('click', function () {
        if (!$(this).next().hasClass('.focus') && $(this).next().val() == '') {
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
            if (inputScreenMediaCheck == true) {
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
            }
            else {
                $(this).prev().removeClass(focusClass);
                $(this).parent().addClass(focusClass);
                $(this).prev().fadeOut(0);
            }
        })
            .blur(function () {
                if ($(this).val() == '') {
                    if (inputScreenMediaCheck == true) {
                        $(this).prev().removeClass(focusClass);
                    }
                    else {
                        $(this).prev().fadeIn(0);
                    }
                }
                $(this).parent().removeClass(focusClass);

            });

    }

    formKeySwitch({
        formElem: $('.form_input'),
    });

    $('.header__menu--contact').magnificPopup({
        type: 'inline',
        preloader: false,
    });
    

    AOS.init({
        disable: "mobile"
    });

});