/* global AFRAME */
AFRAME.registerComponent("template-button", {
    schema: {
      label: { default: "label" },
      icon: { default: "#FSNG_Icon-360" },
      target: { default: "baseTemplate" },
      scale: { default: "0.25 0.25 0.25" },
      toggable: { default: false },
      type : {default: "circle"},
    },
    init: function () {
      console.log("icon: ", this.data.icon);
      console.log("type: ", this.data.type);

      //Set mesh properties
      const el = this.el;

      if(this.data.type === "circle")
      {
        el.setAttribute("geometry", "primitive: plane; width: 1; height: 1; depth: .01");
        el.setAttribute("material", "shader: portal; color: white; backgroundColor: white; pano: " + this.data.icon);
      }
      else if(this.data.type === "sphere")
      {
        el.setAttribute("geometry", "primitive: sphere; width: 1; height: 1; depth: 1");
        el.setAttribute("material", "shader: flat; color: white; src: " + this.data.icon);
      }

      el.setAttribute("pressable");
      el.setAttribute("scale", this.data.scale);
      el.setAttribute("shadow", "receive: true; cast: true" );

      //Add background
      const backgroundEl = (this.backgroundEl = document.createElement("a-entity"));
      this.el.appendChild(backgroundEl);
      backgroundEl.setAttribute("geometry", "primitive: plane; width: 1.1; height: 1.05; depth: .01");
      backgroundEl.setAttribute("material", "shader: flat; color: white");
      backgroundEl.setAttribute("position", "0 0 -.01");
  
      //set label properties
      const labelEl = (this.labelEl = document.createElement("a-entity"));
      this.el.appendChild(labelEl);
      labelEl.setAttribute("text", {
        value: this.data.label,
        color: "white",
        align: "center",
      });
      labelEl.setAttribute("scale", "2 2 2");
      labelEl.setAttribute("position", "0 -.4 0");
      labelEl.setAttribute("shadow", "receive: true; cast: true");


      let initialScaleX = this.data.scale.split(" ")[0];
      let initialScaleY = this.data.scale.split(" ")[1];
      let initialScaleZ = this.data.scale.split(" ")[2];

      let scaleMultiplier = 1.3;
      let enlargedScaleX = initialScaleX * scaleMultiplier;
      let enlargedScaleY = initialScaleY * scaleMultiplier;
      let enlargedScaleZ = initialScaleZ * scaleMultiplier;
      
      let enlargedScale = enlargedScaleX + " " + enlargedScaleY + " " + enlargedScaleZ;
  
      //Add animations
      el.setAttribute(
        "animation__mouseenter",
        "property: scale; to: " + enlargedScale + "; dur: 300; startEvents: mouseenter"
      );
      el.setAttribute(
        "animation__mouseenter",
        "property: scale; to: " + enlargedScale + "; dur: 300; startEvents: pressedstarted"
      );
  
      el.setAttribute(
        "animation__mouseleave",
        "property: scale; to: " + this.data.scale + "; dur: 300; startEvents: mouseleave"
      );
  
      el.setAttribute(
        "animation__click",
        "property: scale; to: 0 0 0; dur: 300; startEvents: cursor-click"
      );
      el.setAttribute(
        "animation__click",
        "property: scale; to: 0 0 0; dur: 300; startEvents: pressedended"
      );
  
      this.bindMethods();
      this.el.addEventListener("stateadded", this.stateChanged);
      this.el.addEventListener("stateremoved", this.stateChanged);
      this.el.addEventListener("pressedstarted", this.onPressedStarted);
      this.el.addEventListener("pressedended", this.onPressedEnded);
      this.el.addEventListener("click", this.onPressedStarted);

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
       });
 
       //add listener to template component for template load complete
       const templateContainer = document.querySelector("#templateContainer");
       templateContainer.addEventListener("templaterendered", () => 
       {
         console.log("Template Loaded: " + APP_DATA.selectedApp.templatePath);
         //fade to clear
         const fadeEl = document.querySelector("#cameraFade");
         setTimeout(() => {
           //move cameraFade far away and fade to clear
           fadeEl.setAttribute("position", "0 200 0");
           fadeEl.emit("fadeToClear");}, 500);
       });
 
       //load all template buttons
       const buttons = document.querySelectorAll('.template-button');
       //add event listener to each template button
       buttons.forEach(button => {
         console.log("adding event listener for button: " + button.id);
         button.addEventListener("onLoadTemplate", (event) => {
           this.setTemplate(event);
         });
       });
    },
  
    bindMethods: function () {
      this.stateChanged = this.stateChanged.bind(this);
      this.onPressedStarted = this.onPressedStarted.bind(this);
      this.onPressedEnded = this.onPressedEnded.bind(this);
    },

    update: function (oldData) {
      if (oldData.label !== this.data.label) {
        this.labelEl.setAttribute("text", "value", this.data.label);
      }
    },
  
    stateChanged: function () {},
  
    onPressedStarted: function () {
      var el = this.el;
      console.log("onPressedStarted " + this.data.target);
      el.emit("onLoadTemplate", this.data.target);

      if (this.data.togabble) {
        if (el.is("pressed")) {
          el.removeState("pressed");
        } else {
          el.addState("pressed");
        }
      }
    },
  
    onPressedEnded: function () {
      if (this.el.is("pressed")) {
        return;
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

    setTemplate: function (event) {
      
      //fade to black
      const fadeEl = document.querySelector("#cameraFade");
      fadeEl.setAttribute("position", "0 0 0");
      fadeEl.emit("fadeToBlack");

      const destination = event.detail;
      console.log("destination: " + destination);
      //check if destination is in APP_DATA
      if (Object.keys(APP_DATA).includes(destination)) {
        //set select app to destination
        const target = APP_DATA[destination];
        APP_DATA.selectedApp = target;
        console.log("target destination: " + APP_DATA.selectedApp.templatePath);        
      }
    },
  });
  
  