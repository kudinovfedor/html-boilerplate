/**
 * Delete class .error with focus
 *
 * @example
 * errorField('.error');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} [element='.error'] - selected element
 * @param {string} [class_error='error'] - class which will be removed after receiving focus
 */
const errorField = (element, class_error) => {

  const el = element || '.error', error = class_error || 'error';

  $('body').on('focus', el, function () {

    $(this).removeClass(error);

  });

};

export default errorField;
