/**
 * Autofocus
 *
 * @example
 * autoFocus('.autofocus');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} element - by selected element will be added focus
 */
const autoFocus = element => {

  if (!('autofocus' in document.createElement('input'))) {

    $(element).focus();

  }

};

export default autoFocus;
