/**
 * Moving Line
 *
 * @example
 * movingLine();
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 */
const movingLine = () => {
    const nav = document.querySelector('.nav');

    /**
     * Line CSS style
     *
     * @example
     * lineStyle(line, element);
     * @author Fedir Kudinov <brothersrabbits@mail.ru>
     * @param {Object} line - The line for which styles will be given
     * @param {Object} element - The element from which the style values for the line are taken
     */
    const lineStyle = (line, element) => {
        if (element) {
            line.style.width = element.clientWidth + 'px';
            line.style.left = element.offsetLeft + 'px';
        } else {
            line.style.width = 0;
        }
    };

    if (nav) {
        let i = 0;
        const line = nav.querySelector('.nav__line'),
            item = nav.querySelectorAll('.nav__item'),
            current = nav.querySelector('.is-current'),
            itemLength = item.length;

        lineStyle(line, current);

        nav.addEventListener('mouseleave', () => {
            lineStyle(line, current);
        });

        for (i; i < itemLength; i++) {
            item[i].addEventListener('mouseover', function () {
                lineStyle(line, this);
            });
        }
    }

};

export default movingLine;
