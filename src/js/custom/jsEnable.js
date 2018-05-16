/**
 * Javascript enable
 *
 * @example
 * jsEnable('html');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} [element='html'] - selected element (the default html tag)
 */
const jsEnable = element => {

    const el = element || 'html';

    $(el).removeClass('no-js').addClass('js');

};

export default jsEnable;
