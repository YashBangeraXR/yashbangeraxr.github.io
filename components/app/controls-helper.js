/* global AFRAME */
AFRAME.registerComponent("controls-helper", {
    init: function () {
      window.addEventListener("enter-vr", (e) => {
        if (AFRAME.utils.device.checkHeadsetConnected()) {
          console.log("addEventListener enter-vr");
  
          //turn off curor in VR
          const cursorEl = document.querySelector("#cursor");
          cursorEl.setAttribute("visible", false);
        }
      });
    },
  });
  