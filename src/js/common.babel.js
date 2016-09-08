(($, Modernizr) => {

  //Mode of the modern standard
  'use strict';

  // Event is fired after whole content is loaded.
  $(window).on('load', () => {});

  // Function to execute when the DOM is fully loaded.
  $(() => {

    // Variables
    let wW = $(window).width(),
      preloader = new Preloader('.preloader');

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
    //$(document).on('click', (e) => {
    //  if (!$(e.target).closest('').length) {}
    //});

    // The resize event occurs when the browser window changes size.
    $(window).on('resize', () => {

      wW = $(window).width();

    });

  });

  /**
   * fk javascript enable
   *
   * @example
   * jsEnable('html');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} [element] - selected element (the default html tag)
   */
  const jsEnable = (element) => {

    let el = element || 'html';

    $(el).removeClass('no-js').addClass('js');

  };

  /**
   * fk dppx value of retina display
   *
   * @example
   * dppx();
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   */
  const dppx = () => {

    if (window.devicePixelRatio !== undefined) {

      $('html').addClass(window.devicePixelRatio + 'dppx');

    }

  };

  /**
   * fk delete class .error with focus
   *
   * @example
   * errorField('.error');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} [element] - selected element
   * @param {string} [class_error] - class which will be removed after receiving focus
   */
  const errorField = (element, class_error) => {

    let el = element || '.error', error = class_error || 'error';

    $(el).on('focus', (e) => {

      $(e.target).removeClass(error);

    });

  };

  /**
   * fk autofocus
   *
   * @example
   * autoFocus('.autofocus');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} element - by selected element will be added focus
   */
  const autoFocus = (element) => {

    if (!('autofocus' in document.createElement('input'))) {

      $(element).focus();

    }

  };

  /**
   * fk Scroll To Top
   *
   * @example
   * scrollToTop('.scroll-top');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} scroll_id - selected item to perform the a clicked
   * @param {(number|string)} [scroll_duration] - determining how long the animation will run
   */
  const scrollToTop = (scroll_id, scroll_duration) => {

    let el = $(scroll_id), duration = scroll_duration || 'slow';

    el.on('click', () => {

      $('html, body').animate({scrollTop: 0}, duration);

      return false;

    });

  };

  /**
   * fk smooth scrolling to anchor links
   *
   * @example
   * scrollToAnchorLinks('.nav-menu');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} id - selected item to perform the a clicked
   * @param {(number|string)} [scroll_duration] - determining how long the animation will run
   */
  const scrollToAnchorLinks = (id, scroll_duration) => {

    let el = $(id), duration = scroll_duration || 1000;

    el.on('click', 'a[href*="#"]:not([href="#"])', (e) => {

      let el = $(e.target).attr('href');

      $('html, body').animate({scrollTop: $(el).offset().top}, duration);

      return false;

    });

  };

  class Preloader {
    /**
     * fk Preloader
     *
     * @example
     * var preloader = new fk_preloader('.preloader');
     * preloader.show();
     * preloader.hide();
     * @constructor
     * @author Fedor Kudinov <brothersrabbits@mail.ru>
     * @param {string} element - selected element
     * @param {number} [el_delay] - delay before function fadeOut is start
     * @param {(number|string)} [el_duration] - determining how long the fadeOut will run
     */
    constructor(element, el_delay, el_duration) {

      if (!$(element).length) {

        $('body').append('<span class="preloader"></span>');

      }

      let el = $(element), delay = el_delay || 350, duration = el_duration || 'slow';

      this.hide = () => {

        el.delay(delay).fadeOut(duration);

      };

      this.show = () => {

        el.delay(delay).fadeIn(duration);

      };

    }
  }

  /**
   * fk-number
   *
   * @example
   * fk_number('.fk-number', '.fk-number-field', '.fk-number-spin-plus', '.fk-number-spin-minus');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} id - container of element
   * @param {string} field - field with number
   * @param {string} plus - button plus
   * @param {string} minus - button minus
   */
  const fk_number = (id, field, plus, minus) => {

    $(id).each((i, val) => {

      let el = $(val),
        fk_field = el.find(field),
        fk_plus = el.find(plus),
        fk_minus = el.find(minus);

      fk_plus.on('click', () => {

        let field_value = parseInt(fk_field.text());

        if (field_value >= 1) {

          field_value++;

          fk_field.text(field_value);

        }

      });

      fk_minus.on('click', () => {

        let field_value = parseInt(fk_field.text());

        if (field_value > 1) {

          field_value--;

          fk_field.text(field_value);

        }
      });

    });

  };

  /**
   * fk Tabs
   *
   * @example
   * tabs('.fk-tabs', '.fk-tabs-list', '.fk-tab-item');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} tabs_container - main container for tabs
   * @param {string} tabs_list - ul list for each tab item
   * @param {string} tabs_item - tab block for each li item
   */
  const tabs = (tabs_container, tabs_list, tabs_item) => {

    let parent = $(tabs_container),
      ul = $(tabs_list),
      child = $(tabs_item);

    ul.on('click', 'li:not(.active)', (e) => {

      $(e.target)
        .addClass('active').siblings().removeClass('active')
        .closest(parent).find(child).removeClass('active').eq($(e.target).index()).addClass('active');

    });

  };

  /**
   * fk accordion
   *
   * @example
   * fk_accordion('.fk-accordion', '.fk-accordion-switch', 'js-opened');
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {string} accordion_container - container for each accordion item
   * @param {string} accordion_switch - element for open and close accordion
   * @param {string} [accordion_class_open] - class when accordion is opened
   */
  const fk_accordion = (accordion_container, accordion_switch, accordion_class_open) => {

    let fk_accordion = $(accordion_container),
      fk_switch = $(accordion_switch),
      fk_opened = accordion_class_open || 'js-opened';

    fk_switch.on('click', (e) => {

      let el_parent = $(e.target).closest(fk_accordion);

      if (el_parent.hasClass(fk_opened)) {

        el_parent.removeClass(fk_opened);

      } else {

        el_parent.addClass(fk_opened).siblings().removeClass(fk_opened);

      }

    });
  }

})(jQuery, window.Modernizr);
