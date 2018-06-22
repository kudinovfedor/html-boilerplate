/**
 * Tabs
 *
 * @example
 * tabs('.tabs', '.tabs-list', '.tab-item');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} container - main container for tabs
 * @param {(string|Object)} list - ul list for each tab item
 * @param {(string|Object)} item - tab block for each li item
 */
const tabs = (container, list, item) => {

    const parent = $(container), menu = $(list), child = $(item);

    menu.on('click', 'li:not(.active)', function () {

        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest(parent).find(child).removeClass('active').eq($(this).index()).addClass('active');

    });

};

export default tabs;
