/**
 * dppx value of retina display
 *
 * @example
 * dppx();
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 */
const dppx = () => {

    if (window.devicePixelRatio !== undefined) {

        $('html').addClass(window.devicePixelRatio + 'dppx');

    }

};

export default dppx;
