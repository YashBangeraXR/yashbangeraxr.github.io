/* global AFRAME */
AFRAME.registerComponent("template-button", {
    schema: {
      label: { default: "label" },
      icon: { default: "#FSNG_Icon" },
      targetTemplate: { default: "FSNG_Template.html" },
      scale: { default: "0.25 0.25 0.25" },
      toggable: { default: false },
    },
    init: function () {
      console.log("icon: ", this.data.icon);
      //Set mesh properties
      const el = this.el;
      el.setAttribute("gltf-model", this.data.icon);
      el.setAttribute("pressable", "");
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
      labelEl.setAttribute("position", "0, -.55, 0");
  
      //Add animations
      el.setAttribute(
        "animation__mouseenter",
        "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseenter"
      );
      el.setAttribute(
        "animation__mouseenter",
        "property: scale; to: .3 .3 .3; dur: 300; startEvents: pressedstarted"
      );
  
      el.setAttribute(
        "animation__mouseleave",
        "property: scale; to: .25 .25 .25; dur: 300; startEvents: mouseleave"
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
  