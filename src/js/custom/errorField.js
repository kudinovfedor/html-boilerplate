/**
 * Delete class .error with focus
 *
 * @example
 * errorField('.error');
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} [element='.error'] - selected element
 * @param {string} [classError='error'] - class which will be removed after receiving focus
 */
const errorField = (element, classError) => {

    const el = element || '.error', error = classError || 'error';

    $('body').on('focus', el, function () {

        $(this).removeClass(error);

    });

};

export default errorField;
