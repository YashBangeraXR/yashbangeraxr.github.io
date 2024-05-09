/* global AFRAME */
AFRAME.registerComponent("ui-button", {
    schema: {
      label: { default: "" },
      icon: { default: "#FSNG_Icon-360" },
      scale: { default: "0.25 0.25 0.25" },
      color: { default: "white" },
      toggable: { default: false },
      labelPosition: { default: "0 -.4 0" },
      labelScale: { default: "2 2 2" },
    },
    init: function () {
      console.log("icon: ", this.data.icon);

      //Set mesh properties
      const el = this.el;

      el.setAttribute("geometry", "primitive: plane; width: 1; height: 1; depth: .01");
      el.setAttribute("material", "shader: flat; color:"+ this.data.color + "; backgroundColor: white; src: " + this.data.icon);
      el.setAttribute("pressable", "");
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
        labelEl.setAttribute("scale", this.data.labelScale);
        labelEl.setAttribute("position", this.data.labelPosition);
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
        "property: scale; to: 0 0 0; dur: 300; startEvents: pressedended"
      );
  
      el.setAttribute(
        "animation__click",
        "property: scale; to: " + this.data.scale + ";  dur: 300; startEvents: cursor-click"
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
      el.emit("onUiButtonClicked");
      console.log("onPressedStarted " + this.el.id);

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
  
  