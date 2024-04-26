/* global AFRAME */
AFRAME.registerComponent('controller-connected', {
  init: function () {
    var el = this.el;
    el.addEventListener('controllerconnected', function (evt) {
      console.log(evt.detail.component.data.hand);
      // Or... console.log(el.getAttribute(evt.detail.name).hand)
    });
  } 
});