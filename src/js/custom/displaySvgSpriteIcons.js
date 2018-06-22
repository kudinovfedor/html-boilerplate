const displaySvgSpriteIcons = (containerId, storageName) => {
    document.getElementById(containerId).innerHTML = JSON.parse(localStorage.getItem(storageName));
};

if (localStorage.getItem('svgIcons')) {
    displaySvgSpriteIcons('test', 'svgIcons');
} else {
    document.addEventListener('DOMContentLoaded', () => {
        let svgIcons = '';
        Array.from(document.querySelector('.is-hidden svg').children).map(elem => {
            svgIcons += `<svg class="svg-icon" width="30" height="30" fill="#333"><use xlink:href="#${elem.id}"></use></svg>`;
        });
        localStorage.setItem('svgIcons', JSON.stringify(svgIcons));
        displaySvgSpriteIcons('test', 'svgIcons');
    });
}
