;(function ($, Modernizr) {

  // Mode of the modern standard
  'use strict';

  // Preloader
  $(window).on('load', function () {

    var preloader = $('.preloader');

    if (preloader.length) {
      preloader.delay(350).fadeOut('slow');
    }

  });

  // Function to execute when the DOM is fully loaded.
  $(function () {

    // Variables
    var w = $(window).width(),
      html_body = $('html, body'),
      scroll_top = $('.scroll-top'),
      nav_menu = $('.nav-menu'),
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

    // Modernizr support
    if (Modernizr) {
      console.log('Library Modernizr connected');
    } else {
      console.log('Library Modernizr is not connected');
    }

    // Scroll To Top
    if (scroll_top.length) {
      scroll_top.on('click', function () {
        html_body.animate({scrollTop: 0}, 'slow');
        return false;
      });
    }

    // Smooth scrolling to anchor links
    nav_menu.on('click', 'a', function () {
      var id = $(this).attr('href'),
        top = $(id).offset().top;
      html_body.animate({scrollTop: top}, 1000);
      return false;
    });

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

    // Make something with an element when clicked beyond its borders (uncomment for use)
    //$(document).on('click', function (e) {
    //  if (!$(e.target).closest('').length) {}
    //});

    // The resize event occurs when the browser window changes size.
    $(window).on('resize', function () {
      w = $(window).width();
    });

  });

}(jQuery, window.Modernizr));
