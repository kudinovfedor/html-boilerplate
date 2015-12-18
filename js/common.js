;
(function ($) {

  'use strict';

  $(function () {

    $("html").removeClass("no-js").addClass("js");

    $('.error').on('focus', function () {
      $(this).removeClass('error');
    });

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

    $('.fk-tabs-list').on('click', 'li:not(.active)', function () {
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('.fk-tabs').find('.fk-tab-item').removeClass('active').eq($(this).index()).addClass('active');
    });

  });

}(jQuery));