/* global AFRAME */
AFRAME.registerComponent("template-button", {
    schema: {
      label: { default: "label" },
      icon: { default: "#FSNG_Icon-360" },
      targetTemplate: { default: "templates/FSNG.html" },
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
        el.setAttribute("geometry", "primitive: circle; width: 1; height: 1d; depth: 1");
        el.setAttribute("material", "shader: portal; color: white; pano: " + this.data.icon);
      }
      else if(this.data.type === "sphere")
      {
        el.setAttribute("geometry", "primitive: sphere; width: 1; height: 1; depth: 1");
        el.setAttribute("material", "shader: flat; color: white; src: " + this.data.icon);
      }

      el.setAttribute("pressable");
      el.setAttribute("scale", this.data.scale);
  
      //set label properties
      const labelEl = (this.labelEl = document.createElement("a-entity"));
      this.el.appendChild(labelEl);
      labelEl.setAttribute("text", {
        value: this.data.label,
        color: "white",
        align: "center",
      });
      labelEl.setAttribute("scale", "5 5 5");
      labelEl.setAttribute("position", "0, -1.5, 0");


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
      //el.emit("click");
      this.loadTemplate();
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
  
    loadTemplate: function () {
      const templateContainer = document.querySelector("#templateContainer");
      console.log(templateContainer);
      console.log(templateContainer.getAttribute("template"));
      setTimeout(() => {
        templateContainer.setAttribute("template", "src: " + this.data.targetTemplate);
      }, 10);
    },
  });
  