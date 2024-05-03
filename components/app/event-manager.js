/* global AFRAME */
AFRAME.registerComponent("event-manager", {
    init: function () {
      this.bindMethods();      
      this.el.sceneEl.addEventListener('loaded', this.onSceneLoaded.bind(this));
      this.el.addEventListener("onLoadTemplate", this.setTemplate.bind(this));

      //add listener for fade in/out animation completing using animation__fadeToBlack and animation__fadeToClear
      const fadeEl = document.querySelector("#cameraFade");
      fadeEl.addEventListener("animationcomplete", (event) => 
      {
        const animationName = event.detail.name;
        console.log("animation complete: " + event.detail.name);
        if(animationName === "animation__fadetoblack")
        {
          this.loadTemplate();
        }
        else if (animationName === "animation__fadetoclear")
        {
          fadeEl.setAttribute("position", "0 0 -100");
        }
      });

      //add listener to template component for template load complete
      const templateContainer = document.querySelector("#templateContainer");
      templateContainer.addEventListener("templaterendered", () => 
      {
        console.log("Template Loaded: " + APP_DATA.selectedApp.templatePath);
        //fade to clear
        setTimeout(() => {
          //fade to clear
          fadeEl.emit("fadeToClear");}, 500);
          this.el.emit("onUpdateUI");
      });

    },
  
    bindMethods: function () {
    },
    
    onSceneLoaded: function () {
      this.bindMethods();
      console.log("event-manager: onSceneLoaded");    
    },
    
    setTemplate: function (event) {      
      //fade to black
      const fadeEl = document.querySelector("#cameraFade");
      fadeEl.setAttribute("position", "0 0 0");
      fadeEl.emit("fadeToBlack");

      const destination = event.detail;
      console.log("event-manager: setTemplate: " + destination);
      //check if destination is in APP_DATA
      if (Object.keys(APP_DATA).includes(destination)) {
        //set select app to destination
        const target = APP_DATA[destination];
        APP_DATA.selectedApp = target;
        console.log("target destination: " + APP_DATA.selectedApp.templatePath);        
      }
    },    

    loadTemplate: function ()
    {
      const templateContainer = document.querySelector("#templateContainer");
      setTimeout(() => {
        //load template
        templateContainer.setAttribute("template", "src: " + APP_DATA.selectedApp.templatePath);       
      }, 10);
    },

  });
  