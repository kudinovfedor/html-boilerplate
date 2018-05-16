/**
 * Tabs
 *
 * @example
 * tabs('.fk-tabs', '.fk-tabs-list', '.fk-tab-item');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} tabs_container - main container for tabs
 * @param {(string|Object)} tabs_list - ul list for each tab item
 * @param {(string|Object)} tabs_item - tab block for each li item
 */
const tabs = (tabs_container, tabs_list, tabs_item) => {

    const parent = $(tabs_container), list = $(tabs_list), child = $(tabs_item);

    list.on('click', 'li:not(.active)', function () {

        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest(parent).find(child).removeClass('active').eq($(this).index()).addClass('active');

    });

};

export default tabs;
