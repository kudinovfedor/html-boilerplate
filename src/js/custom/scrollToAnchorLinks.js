/**
 * Smooth scrolling to anchor links
 *
 * @example
 * scrollToAnchorLinks('.nav-menu');
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} id - selected item to perform the a clicked
 * @param {(number|string)} [scrollDuration=1000] - determining how long the animation will run
 */
const scrollToAnchorLinks = (id, scrollDuration) => {

    const el = $(id), duration = scrollDuration || 1000;

    el.on('click', 'a[href*="#"]:not([href="#"])', function () {

        const el = $(this).attr('href');

        $('html, body').animate({scrollTop: $(el).offset().top}, duration);

        return false;

    });

};

export default scrollToAnchorLinks;
