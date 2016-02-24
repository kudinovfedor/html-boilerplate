;(function ($) {

  // Mode of the modern standard
  'use strict';

  // Preloader
  $(window).on('load', function () {
    $('.preloader').delay(350).fadeOut('slow');
  });

  // Function to execute when the DOM is fully loaded.
  $(function () {

    // Variables
    var w = $(window).width(),
      dppx = '';

    // dppx value of retina display
    if (window.devicePixelRatio !== undefined) {
      dppx = window.devicePixelRatio + 'dppx';
    }

    // If JavaScript enabled
    $('html').removeClass('no-js').addClass('js ' + dppx);

    // Remove class .error when receives focus
    $('.error').on('focus', function () {
      $(this).removeClass('error');
    });

    // Verification of support autofocus
    if (!('autofocus' in document.createElement('input'))) {
      $('.autofocus').focus();
    }

    // JS for working with accordion
    $('.fk-accordion-switch').on('click', function () {

      var accordion = $('.fk-accordion'),
        this_accordion = $(this).closest(accordion);

      if (this_accordion.hasClass('js-opened')) {
        this_accordion.removeClass('js-opened');
      } else {
        accordion.removeClass('js-opened');
        this_accordion.addClass('js-opened');
      }

    });

    // Universal JavaScript for blocks with tabs
    var tabs_ul = $('.fk-tabs-list'), tabs_parent = $('.fk-tabs'), tabs_child = $('.fk-tab-item');

    tabs(tabs_ul, tabs_parent, tabs_child);

    function tabs(ul, parent, child) {
      ul.on('click', 'li:not(.active)', function () {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest(parent).find(child).removeClass('active').eq($(this).index()).addClass('active');
      });
    }

    // Make something with an element when clicked beyond its borders
    $(document).on('click', function (e) {
      //if (!$(e.target).closest('').length) {}
    });

    // The resize event occurs when the browser window changes size.
    $(window).on('resize',function() {
      w =  $(window).width();
    });

  });

}(jQuery));