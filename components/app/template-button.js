/* global AFRAME */
AFRAME.registerComponent("template-button", {
    schema: {
      label: { default: "label" },
      icon: { default: "#FSNG_Icon-360" },
      target: { default: "baseTemplate" },
      portalScale: { default: "0.25 0.25 0.25" },
      toggable: { default: false },
    },
    init: function () {
      //Set mesh properties
      const el = this.el;

      el.setAttribute("geometry", "primitive: plane; width: 1; height: 1; depth: .01");
      el.setAttribute("material", "shader: portal; color: white; backgroundColor: white; pano: " + this.data.icon);

      el.setAttribute("pressable");
      el.setAttribute("scale", this.data.portalScale);
      el.setAttribute("shadow", "receive: true; cast: true" );

      //Add background
      const backgroundEl = (this.backgroundEl = document.createElement("a-entity"));
      this.el.appendChild(backgroundEl);
      backgroundEl.setAttribute("geometry", "primitive: plane; width: 1.1; height: 1.05; depth: .01");
      backgroundEl.setAttribute("material", "shader: flat; color: white");
      backgroundEl.setAttribute("position", "0 0 -.01");

      let initialScaleX = this.data.portalScale.split(" ")[0];
      let initialScaleY = this.data.portalScale.split(" ")[1];
      let initialScaleZ = this.data.portalScale.split(" ")[2];

      let scaleMultiplier = 1.3;
      let enlargedScaleX = initialScaleX * scaleMultiplier;
      let enlargedScaleY = initialScaleY * scaleMultiplier;
      let enlargedScaleZ = initialScaleZ * scaleMultiplier;
      
      let enlargedScale = enlargedScaleX + " " + enlargedScaleY + " " + enlargedScaleZ;
  

      //Add animations
      //el.setAttribute(
      //  "animation__mouseenter",
      //  "property: scale; to: " + enlargedScale + "; dur: 300; startEvents: mouseenter"
      //);
      //el.setAttribute(
      //  "animation__mouseenter",
      //  "property: scale; to: " + enlargedScale + "; dur: 300; startEvents: pressedstarted"
      //);  
      //el.setAttribute(
      //  "animation__mouseleave",
      //  "property: scale; to: " + this.data.scale + "; dur: 300; startEvents: mouseleave"
      //);
      
      //animate moving up from underground to the surface maintaining the x and z position
      let currentPosition = el.getAttribute("position");
      let endPosition = currentPosition.x + " " + 0 + " " + currentPosition.z;

      //animation for show portal
      el.setAttribute(
        "animation__moveup",
        "property: position; to: " + endPosition + "; dur: 2000; startEvents: showPortal"
      );
      //animation for hide portal
      el.setAttribute(
        "animation__movedown",
        "property: position; to: " + currentPosition.x + " " + -10 + " " + currentPosition.z + "; dur: 1000; startEvents: hidePortal"
      );     

      //animation for clicks
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

    update: function (oldData) 
    {
     
    },
  
    stateChanged: function () {},
  
    onPressedStarted: function () {
      const el = this.el;
      console.log("onPressedStarted " + this.data.target);
      const eventmanager = document.querySelector("#event-manager");
      console.log(" template button eventmanager: ", eventmanager);
      eventmanager.emit("onLoadTemplate", this.data.target);
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
   
  });
  
  