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
      backgroundEl.setAttribute("material", "shader: flat; color: white; metalness: 1");
      backgroundEl.setAttribute("position", "0 0 -.01");

      
      // create enter space ui button
      const enterButton = (this.enterButton = document.createElement("a-entity"));
      enterButton.id = "enterButton";
      enterButton.setAttribute("ui-button", {
        label: "Enter Space",
        icon: "#panel-background",
        scale: ".2 .0375 0.025",
        color: "#89b7d7",
        toggable: false,
        labelPosition: "0 0 0",
        labelScale: "3.5 7 7",
      });

      
      //set position and scale of buttonbg
      enterButton.setAttribute('position', '0 0.025 1.3');
      enterButton.setAttribute('rotation', '0 0 0');   

      this.el.appendChild(enterButton);
      
      //animate moving up from underground to the surface maintaining the x and z position
      //let currentPosition = el.getAttribute("position");
      //let endPosition = currentPosition.x + " " + 0 + " " + currentPosition.z;

      //animation for show portal
      // el.setAttribute(
      //   "animation__moveup",
      //   "property: position; to: " + endPosition + "; dur: 2000; startEvents: showPortal"
      // );
      // //animation for hide portal
      // el.setAttribute(
      //   "animation__movedown",
      //   "property: position; to: " + currentPosition.x + " " + -10 + " " + currentPosition.z + "; dur: 1000; startEvents: hidePortal"
      // );     

      //animation for clicks
      el.setAttribute(
        "animation__click",
        "property: scale; to: 0 0 0; dur: 300; startEvents: cursor-click"
      );
      el.setAttribute(
        "animation__click",
        "property: scale; to: 0 0 0; dur: 300; startEvents: pressedended"
      );

      //animate button color change on press started and ended
      enterButton.setAttribute(
        "animation__pressstarted",
        "property: color; to: #0f0ww; dur: 300; startEvents: pressedstarted"
      );
      enterButton.setAttribute(
        "animation__pressstarted",
        "property: color; to: #0f0; dur: 300; startEvents: mouseenter"
      );
      enterButton.setAttribute(
        "animation__pressended",
        "property: color; to: #89b7d7; dur: 300; startEvents: pressedended"
      );
      enterButton.setAttribute(
        "animation__pressended",
        "property: color; to: #89b7d7; dur: 300; startEvents: mouseleave"
      );
      enterButton.setAttribute(
        "animation__click",
        "property: color; to: #0f0; dur: 300; startEvents: click"
      );

  
      this.bindMethods();
      this.el.addEventListener("stateadded", this.stateChanged);
      this.el.addEventListener("stateremoved", this.stateChanged);
      this.el.addEventListener("pressedstarted", this.onPressedStarted);
      this.el.addEventListener("pressedended", this.onPressedEnded);
      this.el.addEventListener("click", this.onPressedStarted);
      //add event listener for enter button
      this.enterButton.addEventListener("stateadded", this.stateChanged);
      this.enterButton.addEventListener("stateremoved", this.stateChanged);
      this.enterButton.addEventListener("pressedstarted", this.onPressedStarted);
      this.enterButton.addEventListener("pressedended", this.onPressedEnded);
      this.enterButton.addEventListener("click", this.onPressedStarted);
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
  
  