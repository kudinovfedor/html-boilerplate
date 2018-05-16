const display_svg_sprite_icons = (container_id, storage_name) => {
    document.getElementById(container_id).innerHTML = JSON.parse(localStorage.getItem(storage_name));
};

if (localStorage.getItem('svg_icons')) {
    display_svg_sprite_icons('test', 'svg_icons');
} else {
    document.addEventListener('DOMContentLoaded', () => {
        let svg_icons = '';
        Array.from(document.querySelector('.is-hidden svg').children).map(elem => {
            svg_icons += `<svg class="svg-icon" width="30" height="30" fill="#333"><use xlink:href="#${elem.id}"></use></svg>`;
        });
        localStorage.setItem('svg_icons', JSON.stringify(svg_icons));
        display_svg_sprite_icons('test', 'svg_icons');
    });
}
