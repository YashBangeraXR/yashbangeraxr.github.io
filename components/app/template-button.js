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

      //Create enter space button      
      // Create the button entity
      const enterButton = (this.enterButton = document.createElement('a-box'));
      enterButton.setAttribute('depth', '0.1'); // Thickness of the button
      enterButton.setAttribute('height', '0.5'); // Height of the button
      enterButton.setAttribute('width', '2'); // Width of the button
      enterButton.setAttribute("material", "color: #89b7d7; opacity: 0.9; transparent: true; metalness: 1");

      // Add a text label to the button
      const enterButtonText = (this.enterButtonText = document.createElement('a-text'));
      enterButtonText.setAttribute('value', 'Enter Space');
      enterButtonText.setAttribute('color', '#FFFFFF');
      enterButtonText.setAttribute('align', 'center');
      enterButtonText.setAttribute('position', '0 0 0.05'); // Position text slightly above the button to be visible

      // Append the text and button to the plane, then the plane to the scene
      enterButton.appendChild(enterButtonText);
      el.appendChild(enterButton);

      
      //set position and scale of buttonbg
      enterButton.setAttribute('position', '0 -.2 1.5');
      enterButton.setAttribute('rotation', '-45 0 0');
      enterButton.setAttribute('scale', '0.2 0.2 0.2');

      
      
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
  
  