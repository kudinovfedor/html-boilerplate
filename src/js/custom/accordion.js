/**
 * Accordion
 *
 * @example
 * accordion('.fk-accordion', '.fk-accordion-switch', 'js-opened');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} accordion_container - container for each accordion item
 * @param {(string|Object)} accordion_switch - element for open and close accordion
 * @param {string} [accordion_class_open='js-opened'] - class when accordion is opened
 */
const accordion = (accordion_container, accordion_switch, accordion_class_open) => {

    const _accordion = $(accordion_container), _switch = $(accordion_switch),
        _opened = accordion_class_open || 'js-opened';

    _switch.on('click', function () {

        const el_parent = $(this).closest(_accordion);

        if (el_parent.hasClass(_opened)) {

            el_parent.removeClass(_opened);

        } else {

            el_parent.addClass(_opened).siblings().removeClass(_opened);

        }

    });
};

export default accordion;
