(function ($, Modernizr) {

    // Mode of the modern standard
    'use strict';

    // Event is fired after whole content is loaded.
    $(window).on('load', function () {
    });

    // Function to execute when the DOM is fully loaded.
    $(function () {

        // Variables
        var html = $('html'), body = $('body'),
            jsWindow = $(window), jsDocument = $(document),
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        var nav = $('.js-nav'),
            blackout = $('.js-blackout'),
            hamburger = $('.js-hamburger');

        // If JavaScript enabled
        jsEnable('html');

        // dppx value of retina display
        dppx();

        // If support display: flow-root
        supportFlowRoot();

        // Remove class .error when receives focus
        errorField('.error');

        // Verification of support autofocus
        autoFocus('.autofocus');

        // Scroll To Top
        scrollToTop('.scroll-top');

        // Smooth scrolling to anchor links
        scrollToAnchorLinks('body');

        // Universal JavaScript for blocks with tabs
        tabs('.fk-tabs', '.fk-tabs-list', '.fk-tab-item');

        // JS for working with accordion
        accordion('.accordion', '.accordion-switch');

        // Counter to increase or decrease the value
        number('.number', '.number-field', '.number-spin-plus', '.number-spin-minus');

        // Modernizr support
        if (Modernizr) {

            html.addClass('modernizr');
            console.info('Library Modernizr connected.');

        } else {

            html.addClass('no-modernizr');
            console.info('Library Modernizr is not connected.');

        }

        // is Mobile Device
        if (isMobile) {

            console.info('You are using a mobile device.');

        }

        hamburger.on('click', function () {
            hamburger.add(nav).add(blackout).toggleClass('is-active');
        });

        // Make something with an element when clicked beyond its borders (uncomment for use)
        jsDocument.on('click', function (event) {
            if (!$(event.target).closest(hamburger.add(nav)).length) {
                hamburger.add(nav).add(blackout).removeClass('is-active');
            }
        });

        // The resize event occurs when the browser window changes size.
        jsWindow.on('resize', function () {
        });

    });

    // Variables
    var supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);

    /**
     * Javascript enable
     *
     * @example
     * jsEnable('html');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} [element='html'] - selected element (the default html tag)
     */
    function jsEnable(element) {

        var el = element || 'html';

        $(el).removeClass('no-js').addClass('js');

    }

    /**
     * dppx value of retina display
     *
     * @example
     * dppx();
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     */
    function dppx() {

        if (window.devicePixelRatio !== undefined) {

            $('html').addClass(window.devicePixelRatio + 'dppx');

        }

    }

    /**
     * Support display: flow-root
     *
     * @example
     * supportFlowRoot();
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     */
    function supportFlowRoot() {

        if (supportsCSS) {

            var html = $('html'), isSupport = CSS.supports('(display: flow-root)');

            if (isSupport) {

                html.addClass('flow-root');

            } else {

                html.addClass('no-flow-root');

            }

        }

    }

    /**
     * Delete class .error with focus
     *
     * @example
     * errorField('.error');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} [element='.error'] - selected element
     * @param {string} [classError='error'] - class which will be removed after receiving focus
     */
    function errorField(element, classError) {

        var el = element || '.error', error = classError || 'error';

        $('body').on('focus', el, function () {

            $(this).removeClass(error);

        });

    }

    /**
     * Autofocus
     *
     * @example
     * autoFocus('.autofocus');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} element - by selected element will be added focus
     */
    function autoFocus(element) {

        if (!('autofocus' in document.createElement('input'))) {

            $(element).focus();

        }

    }

    /**
     * Scroll To Top
     *
     * @example
     * scrollToTop('.scroll-top');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {string} scrollId - selected item to perform the a clicked
     * @param {(number|string)} [scrollDuration='slow'] - determining how long the animation will run
     */
    function scrollToTop(scrollId, scrollDuration) {

        var el = $(scrollId), duration = scrollDuration || 'slow';

        $(document).on('click touchend', scrollId, function () {

            $('html, body').animate({scrollTop: 0}, duration);

            return false;

        });

        $(window).on('scroll', function () {

            var scrollPosition = $(this).scrollTop();

            if (scrollPosition > 200) {

                if (!el.hasClass('is-visible')) {

                    el.addClass('is-visible');

                }

            } else {

                el.removeClass('is-visible');

            }

        });

    }

    /**
     * Smooth scrolling to anchor links
     *
     * @example
     * scrollToAnchorLinks('body');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} id - selected item to perform the a clicked
     * @param {(number|string)} [scrollDuration=1000] - determining how long the animation will run
     */
    function scrollToAnchorLinks(id, scrollDuration) {

        var el = $(id), duration = scrollDuration || 1000;

        el.on('click', 'a[href*="#"]:not([href="#"])', function () {

            var el = $(this).attr('href');

            $('html, body').animate({scrollTop: $(el).offset().top}, duration);

            return false;

        });

    }

    /**
     * Preloader
     *
     * @example
     * var preloader = new Preloader();
     * @this {Preloader}
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(number|string)} [delay=350] - delay before function fade(In|Out) is start
     * @param {(string|number)} [duration='slow'] - determining how long the fadeOut will run
     * @returns {Preloader} - return constructor with new
     * @constructor
     */
    function Preloader(delay, duration) {

        if (!(this instanceof Preloader)) {

            return new Preloader(delay, duration);

        }

        /**
         * @type {string}
         */
        this.element = '.preloader';
        /**
         * @type {(number|string)}
         */
        this.delay = delay || 350;
        /**
         * @type {(string|number)}
         */
        this.duration = duration || 'slow';

        if (!$(this.element).length) {

            $('body').append('<span class="preloader"></span>');

        }

    }

    /**
     * Method hide
     *
     * @example
     * preloader.hide();
     * @this {Preloader}
     * @returns {Preloader} - return this of constructor Preloader
     */
    Preloader.prototype.hide = function () {

        $(this.element).delay(this.delay).fadeOut(this.duration);

        return this;

    };

    /**
     * Method show
     *
     * @example
     * preloader.show();
     * @this {Preloader}
     * @returns {Preloader} - return this of constructor Preloader
     */
    Preloader.prototype.show = function () {

        $(this.element).delay(this.delay).fadeIn(this.duration);

        return this;

    };

    /**
     * Number
     *
     * @example
     * number('.number', '.number-field', '.number-spin-plus', '.number-spin-minus');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} id - container of element
     * @param {(string|Object)} field - field with number
     * @param {(string|Object)} plus - button plus
     * @param {(string|Object)} minus - button minus
     */
    function number(id, field, plus, minus) {

        $(id).each(function () {

            var el = $(this), field = el.find(field),
                plus = el.find(plus), minus = el.find(minus);

            plus.on('click', function () {

                var fieldValue = parseInt(field.text());

                if (fieldValue >= 1) {

                    fieldValue++;

                    field.text(fieldValue);

                }

            });

            minus.on('click', function () {

                var fieldValue = parseInt(field.text());

                if (fieldValue > 1) {

                    fieldValue--;

                    field.text(fieldValue);

                }

            });

        });

    }

    /**
     * Tabs
     *
     * @example
     * tabs('.tabs', '.tabs-list', '.tab-item');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} container - main container for tabs
     * @param {(string|Object)} list - ul list for each tab item
     * @param {(string|Object)} item - tab block for each li item
     */
    function tabs(container, list, item) {

        var parent = $(container), menu = $(list), child = $(item);

        menu.on('click', 'li:not(.active)', function () {

            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest(parent).find(child).removeClass('active').eq($(this).index()).addClass('active');
        });

    }

    /**
     * Accordion
     *
     * @example
     * accordion('.accordion', '.accordion-switch');
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {(string|Object)} container - container for each accordion item
     * @param {(string|Object)} trigger - element for open and close accordion
     */
    function accordion(container, trigger) {

        var _container = $(container), _trigger = $(_trigger);

        _trigger.on('click', function () {

            var parent = $(this).closest(_container);

            if (parent.hasClass('is-opened')) {

                parent.removeClass('is-opened');

            } else {

                parent.addClass('is-opened').siblings().removeClass('is-opened');

            }

        });
    }

})(jQuery, window.Modernizr);
