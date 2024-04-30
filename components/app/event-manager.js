/* global AFRAME */
AFRAME.registerComponent("event-manager", {
    init: function () {
      this.bindMethods();      
      this.el.sceneEl.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },
  
    bindMethods: function () {
    },
    
    onSceneLoaded: function () {
      this.bindMethods();
      console.log("event-manager: onSceneLoaded");

     
    },
    
   
  });
  