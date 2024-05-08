/* global AFRAME */
AFRAME.registerComponent("controls-helper", {
    init: function () {
      window.addEventListener("enter-vr", (e) => {
        if (AFRAME.utils.device.checkHeadsetConnected()) {
          console.log("addEventListener enter-vr");
           
        }
      });
    },
  });
  