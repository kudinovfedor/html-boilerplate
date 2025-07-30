/**
 * Pie Chart
 *
 * @desc HTML <span class="pie-chart js-pie-chart" data-pie="25"></span>
 *
 * @example
 * pieChart('.js-pie-chart', {size: 98, strokeWidth: 14});
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} elements - Elements in which the markup will be inserted
 * @param {Object} [options] - Object with settings
 */
const pieChart = (elements, options) => {

    const items = $(elements);

    if (items.length) {

        const defaults = {
            fill: 'transparent',
            size: 98,
            stroke: '#d7d7d7',
            strokeActive: '#23c0f1',
            strokeWidth: 15,
        };

        if ($.type(options) === 'object') {
            options = $.extend({}, defaults, options);
        } else {
            options = defaults;
        }

        const pie = {
            width: options.size,
            height: options.size,
            fill: options.fill,
            stroke: options.stroke,
            strokeActive: options.strokeActive,
            strokeWidth: options.strokeWidth,
            cx: -(options.size / 2),
            cy: options.size / 2,
            r: Math.floor((options.size - options.strokeWidth) / 2),
        };

        pie.totalLength = Math.ceil(2 * Math.PI * pie.r);

        let svg, item, itemValue, pieDasharray;

        items.each(function () {

            item = $(this);

            itemValue = parseFloat(item.data('pie')) || 25;
            pieDasharray = Math.ceil(itemValue * pie.totalLength / 100);

            svg = `
                <svg viewBox="0 0 ${pie.width} ${pie.height}" width="${pie.width}" height="${pie.height}">
                    <circle r="${pie.r}" cx="${pie.cx}" cy="${pie.cy}" fill="${pie.fill}" stroke="${pie.stroke}" stroke-width="${pie.strokeWidth}" transform="rotate(-90)"/>
                    <circle r="${pie.r}" cx="${pie.cx}" cy="${pie.cy}" fill="${pie.fill}" stroke="${pie.strokeActive}" stroke-width="${pie.strokeWidth}" transform="rotate(-90)" stroke-dasharray="${pieDasharray} ${pie.totalLength}"/>
                </svg>
            `;

            item.html(svg);

        });

    }
};

export default pieChart;
