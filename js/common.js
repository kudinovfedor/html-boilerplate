;(function ($) {

  'use strict';

  $(function () {

    $("html").removeClass("no-js").addClass("js");

    $('.error').on('focus', function() {
      $(this).removeClass('error');
    });

    $('.accordion-switch').on('click', function () {

      var accordion = $('.accordion'),
        this_accordion = $(this).closest(accordion);

      if (this_accordion.hasClass('js-opened')) {
        this_accordion.removeClass('js-opened');
      } else {
        accordion.removeClass('js-opened');
        this_accordion.addClass('js-opened');
      }

    });

  });

}(jQuery));