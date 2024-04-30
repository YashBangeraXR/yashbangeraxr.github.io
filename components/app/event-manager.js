/* global AFRAME */
AFRAME.registerComponent("event-manager", {
    init: function () {
      this.bindMethods();      
      console.log("event-manager init");
      this.el.sceneEl.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },
  
    bindMethods: function () {
      this.loadTemplate = this.loadTemplate.bind(this);
    },
    
    onSceneLoaded: function () {
      this.bindMethods();
      console.log("event-manager onSceneLoaded");
      this.fsngButtonEl = document.querySelector("#fsngButton");
      if (this.fsngButtonEl) 
      {
        this.fsngButtonEl.addEventListener("onLoadTemplate", (event) => {
          this.loadTemplate(event);
      });
      } 
      else 
      {
          console.log("fsngButton element not found!");
      }
    },   
  
    loadTemplate: function (event) {
      
      const templateContainer = document.querySelector("#templateContainer");
      const destination = event.detail;
      console.log("destination: " + destination);
      console.log(templateContainer);
      setTimeout(() => {
        templateContainer.setAttribute("template", "src: " + destination);       
        console.log("Template Loaded: " + destination);
      }, 10);
    },
    
  });
  