class Preloader {
  /**
   * Preloader
   *
   * @example
   * const preloader = new Preloader();
   * @this {Preloader}
   * @author Fedor Kudinov <brothersrabbits@mail.ru>
   * @param {(number|string)} [delay=350] - delay before function fade(In|Out) is start
   * @param {(string|number)} [duration='slow'] - determining how long the fadeOut will run
   * @returns {Preloader} - return constructor with new
   * @constructor
   */
  constructor(delay, duration) {

    if (!(this instanceof Preloader)) {

      return new Preloader(delay, duration);

    }

    /**
     * @type {string}
     */
    this.element = '.preloader';
    /**
     * @type {(number|string)}
     */
    this.delay = delay || 350;
    /**
     * @type {(string|number)}
     */
    this.duration = duration || 'slow';

    if (!$(this.element).length) {

      $('body').append('<span class="preloader"></span>');

    }

  }

  /**
   * Method hide
   *
   * @example
   * preloader.hide();
   * @this {Preloader}
   * @returns {Preloader} - return this of constructor Preloader
   */
  hide() {

    $(this.element).delay(this.delay).fadeOut(this.duration);

    return this;

  }

  /**
   * Method show
   *
   * @example
   * preloader.show();
   * @this {Preloader}
   * @returns {Preloader} - return this of constructor Preloader
   */
  show() {

    $(this.element).delay(this.delay).fadeIn(this.duration);

    return this;

  }

}

export default Preloader;