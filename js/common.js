;(function ($) {

  // Mode of the modern standard
  'use strict';

  // Function to execute when the DOM is fully loaded.
  $(function () {

    // If JavaScript enabled
    $('html').removeClass('no-js').addClass('js');

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
    $('.fk-tabs-list').on('click', 'li:not(.active)', function () {
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('.fk-tabs').find('.fk-tab-item').removeClass('active').eq($(this).index()).addClass('active');
    });

  });

}(jQuery));