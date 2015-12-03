'use strict';
// jQuery function to execute when the DOM is fully loaded.
/*
  jQuery(document).ready(function () {});
  || or
  $(document).ready(function () {});
  || or
  $(function () {});
*/

$(document).ready(function () {

  $("html").removeClass("no-js").addClass("js");

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

(function () {})();