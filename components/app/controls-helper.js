/* global AFRAME */
AFRAME.registerComponent("controls-helper", {
    init: function () {
      window.addEventListener("enter-vr", (e) => {
        if (AFRAME.utils.device.checkHeadsetConnected()) {
          console.log("addEventListener enter-vr");
           
        }
      });

      var hand = document.getElementById("hand-tracking-left");
      hand.addEventListener("hand-tracking-extras-ready", (evt) => {
        var jointsAPI = evt.detail.data.jointsAPI;
        console.log("hand-tracking-extras-ready");
      });


    },
  });
  