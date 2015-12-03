'use strict';
$(document).ready(function () {

    $("html").removeClass("no-js").addClass("js");

    $('.accordion-switch').on('click', function () {

        var accordion = $('.accordion');
        var this_accordion = $(this).closest(accordion);

        if (this_accordion.hasClass('js-opened')) {
            this_accordion.removeClass('js-opened');
        } else {
            accordion.removeClass('js-opened');
            this_accordion.addClass('js-opened');
        }

    });

});

;(function () {

})();

/*
jQuery(document).ready(function () {});

$(document).ready(function () {});

$(function () {});

;(function () {})();
*/