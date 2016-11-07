(function ($, Modernizr) {

  // Mode of the modern standard
  'use strict';

  // Event is fired after whole content is loaded.
  $(window).on('load', function () {});

  // Function to execute when the DOM is fully loaded.
  $(function () {

    // Variables

    // If JavaScript enabled
    jsEnable('html');

    // dppx value of retina display
    dppx();

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
    fk_accordion('.fk-accordion', '.fk-accordion-switch', 'js-opened');

    // Counter to increase or decrease the value
    fk_number('.fk-number', '.fk-number-field', '.fk-number-spin-plus', '.fk-number-spin-minus');

    // Modernizr support
    if (Modernizr) {

      console.info('Library Modernizr connected');

    } else {

      console.info('Library Modernizr is not connected');

    }

    // Make something with an element when clicked beyond its borders (uncomment for use)
    // $(document).on('click', function (e) {
    //   if (!$(e.target).closest('').length) {}
    // });

    // The resize event occurs when the browser window changes size.
    $(window).on('resize', function () {});

  });

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
   * Delete class .error with focus
   *
   * @example
   * errorField('.error');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {(string|Object)} [element='.error'] - selected element
   * @param {string} [class_error='error'] - class which will be removed after receiving focus
   */
  function errorField(element, class_error) {

    var el = element || '.error', error = class_error || 'error';

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
   * @param {(string|Object)} scroll_id - selected item to perform the a clicked
   * @param {(number|string)} [scroll_duration='slow'] - determining how long the animation will run
   */
  function scrollToTop(scroll_id, scroll_duration) {

    var el = $(scroll_id), duration = scroll_duration || 'slow';

    el.on('click', function () {

      $('html, body').animate({scrollTop: 0}, duration);

      return false;

    });

  }

  /**
   * Smooth scrolling to anchor links
   *
   * @example
   * scrollToAnchorLinks('body');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {(string|Object)} id - selected item to perform the a clicked
   * @param {(number|string)} [scroll_duration=1000] - determining how long the animation will run
   */
  function scrollToAnchorLinks(id, scroll_duration) {

    var el = $(id), duration = scroll_duration || 1000;

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
   * fk_number('.fk-number', '.fk-number-field', '.fk-number-spin-plus', '.fk-number-spin-minus');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {(string|Object)} id - container of element
   * @param {(string|Object)} field - field with number
   * @param {(string|Object)} plus - button plus
   * @param {(string|Object)} minus - button minus
   */
  function fk_number(id, field, plus, minus) {

    $(id).each(function () {

      var el = $(this), fk_field = el.find(field),
        fk_plus = el.find(plus), fk_minus = el.find(minus);

      fk_plus.on('click', function () {

        var field_value = parseInt(fk_field.text());

        if (field_value >= 1) {

          field_value++;

          fk_field.text(field_value);

        }

      });

      fk_minus.on('click', function () {

        var field_value = parseInt(fk_field.text());

        if (field_value > 1) {

          field_value--;

          fk_field.text(field_value);

        }

      });

    });

  }

  /**
   * Tabs
   *
   * @example
   * tabs('.fk-tabs', '.fk-tabs-list', '.fk-tab-item');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {(string|Object)} tabs_container - main container for tabs
   * @param {(string|Object)} tabs_list - ul list for each tab item
   * @param {(string|Object)} tabs_item - tab block for each li item
   */
  function tabs(tabs_container, tabs_list, tabs_item) {

    var parent = $(tabs_container), list = $(tabs_list), child = $(tabs_item);

    list.on('click', 'li:not(.active)', function () {

      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest(parent).find(child).removeClass('active').eq($(this).index()).addClass('active');
    });

  }

  /**
   * Accordion
   *
   * @example
   * fk_accordion('.fk-accordion', '.fk-accordion-switch', 'js-opened');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {(string|Object)} accordion_container - container for each accordion item
   * @param {(string|Object)} accordion_switch - element for open and close accordion
   * @param {string} [accordion_class_open='js-opened'] - class when accordion is opened
   */
  function fk_accordion(accordion_container, accordion_switch, accordion_class_open) {

    var fk_accordion = $(accordion_container), fk_switch = $(accordion_switch),
      fk_opened = accordion_class_open || 'js-opened';

    fk_switch.on('click', function () {

      var el_parent = $(this).closest(fk_accordion);

      if (el_parent.hasClass(fk_opened)) {

        el_parent.removeClass(fk_opened);

      } else {

        el_parent.addClass(fk_opened).siblings().removeClass(fk_opened);

      }

    });
  }

})(jQuery, window.Modernizr);
