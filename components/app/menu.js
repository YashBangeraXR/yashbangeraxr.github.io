/* global AFRAME */
AFRAME.registerComponent('menu', {
    init: function () {
        var el = this.el;
        var menuBackGroundEl = document.createElement('a-entity');
        menuBackGroundEl.setAttribute('geometry', {
            primitive: 'box',
            width: 1.5,
            height: 1,
            depth: 0.01
        });
        menuBackGroundEl.setAttribute('material', {
            color: 'FFFFFF',
            roughness: .1,
            metalness: .6,
            transparent: true,
            alphaTest: 0.5,
            opacity: 0.6
        });
        menuBackGroundEl.setAttribute('position', '0 0 -0.1');
        el.appendChild(menuBackGroundEl);
    }
});
