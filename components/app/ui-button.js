/* global AFRAME */
AFRAME.registerComponent("ui-button", {
    schema: {
      label: { default: "" },
      icon: { default: "#FSNG_Icon-360" },
      scale: { default: "0.25 0.25 0.25" },
      toggable: { default: false },
    },
    init: function () {
      console.log("icon: ", this.data.icon);

      //Set mesh properties
      const el = this.el;

      el.setAttribute("geometry", "primitive: plane; width: 1; height: 1; depth: .01");
      el.setAttribute("material", "shader: flat; color: white; backgroundColor: white; src: " + this.data.icon);
      el.setAttribute("pressable");
      el.setAttribute("scale", this.data.scale);
      el.setAttribute("shadow", "receive: true; cast: true" );
  
      //set label properties
      if(this.data.label !== "")
      {
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
      }

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
  
    stateChanged: function () {},
  
    onPressedStarted: function () {
      var el = this.el;
      console.log("onPressedStarted " + this);
      el.emit("onUiButtonClicked", this);

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

  });
  
  