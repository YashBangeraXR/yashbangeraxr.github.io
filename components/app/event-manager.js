/* global AFRAME */
AFRAME.registerComponent("event-manager", {
    init: function () {
      this.bindMethods();      
      this.el.sceneEl.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },
  
    bindMethods: function () {
      this.loadTemplate = this.loadTemplate.bind(this);
    },
    
    onSceneLoaded: function () {
      this.bindMethods();
      console.log("event-manager: onSceneLoaded");
      //load all template buttons
      const buttons = document.querySelectorAll('.template-button');
      //add event listener to each template button
      buttons.forEach(button => {
        console.log("adding event listener for button: " + button.id);
        button.addEventListener("onLoadTemplate", (event) => {
          this.loadTemplate(event);
        });
      });
    },   
  
    loadTemplate: function (event) {
      
      const templateContainer = document.querySelector("#templateContainer");
      const destination = event.detail;
      console.log("destination: " + destination);
      //check if destination is in APP_DATA
      if (Object.keys(APP_DATA).includes(destination)) {
        //set select app to destination
        const target = APP_DATA[destination];
        APP_DATA.selectedApp = target;
        console.log("target destination: " + APP_DATA.selectedApp.templatePath);
        setTimeout(() => {
          //load template
          templateContainer.setAttribute("template", "src: " + APP_DATA.selectedApp.templatePath);       
          console.log("Template Loaded: " + APP_DATA.selectedApp.templatePath);
        }, 10);
      }
    },
  });
  