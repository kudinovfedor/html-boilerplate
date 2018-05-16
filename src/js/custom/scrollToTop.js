/**
 * Scroll To Top
 *
 * @example
 * scrollToTop('.scroll-top');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {string} scroll_id - selected item to perform the a clicked
 * @param {(number|string)} [scroll_duration='slow'] - determining how long the animation will run
 */
const scrollToTop = (scroll_id, scroll_duration) => {

    const el = $(scroll_id), duration = scroll_duration || 'slow';

    $(document).on('click touchend', scroll_id, () => {

        $('html, body').animate({scrollTop: 0}, duration);

        return false;

    });

    $(window).on('scroll', function () {

        const scrollPosition = $(this).scrollTop();

        if (scrollPosition > 200) {

            if (!el.hasClass('is-visible')) {

                el.addClass('is-visible');

            }

        } else {

            el.removeClass('is-visible');

        }

    });

};

export default scrollToTop;
