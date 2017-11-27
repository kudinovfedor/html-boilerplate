/**
 * dppx value of retina display
 *
 * @example
 * dppx();
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 */
const dppx = () => {

  if (window.devicePixelRatio !== undefined) {

    $('html').addClass(window.devicePixelRatio + 'dppx');

  }

};

export default dppx;
