/**
 * Accordion
 *
 * @example
 * accordion('.accordion', '.accordion-switch');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} container - container for each accordion item
 * @param {(string|Object)} trigger - element for open and close accordion
 */
const accordion = (container, trigger) => {

    const _container = $(container), _trigger = $(trigger);

    _trigger.on('click', function () {

        const parent = $(this).closest(_container);

        if (parent.hasClass('is-opened')) {

            parent.removeClass('is-opened');

        } else {

            parent.addClass('is-opened').siblings().removeClass('is-opened');

        }

    });
};

export default accordion;
