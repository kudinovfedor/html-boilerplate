/**
 * Scroll To Top
 *
 * @example
 * scrollToTop('.scroll-top');
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 * @param {string} scrollId - selected item to perform the a clicked
 * @param {(number|string)} [scrollDuration='slow'] - determining how long the animation will run
 */
const scrollToTop = (scrollId, scrollDuration) => {

    const el = $(scrollId), duration = scrollDuration || 'slow';

    $(document).on('click touchend', scrollId, () => {

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
