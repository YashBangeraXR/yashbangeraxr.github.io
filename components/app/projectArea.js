/* global AFRAME */
/* this is a component that shows a portal when the user gets close to it, 
    has images and descriptions of the project on the sides and a button to enter the portal */
AFRAME.registerComponent("project-area", {
    schema: {
      label: { default: "label" },
      icon: { default: "" },
      target: { default: "baseTemplate" },
      portalScale: { default: "0.25 0.25 0.25" },
    },

    tick: function() {
      // Calculate distance between trigger and the camera
      let worldTeleportPosition = new THREE.Vector3();
      worldTeleportPosition.setFromMatrixPosition(this.teleportAreaEl.object3D.matrixWorld);
      let cameraPos = this.el.sceneEl.camera.el.object3D.position;
      let distance = worldTeleportPosition.distanceTo(cameraPos);

       // Check if within distance and if we should animate
      if (distance <= 3 && !this.animated) {
        this.portalEl.emit("showPortal");
        this.animated = true;
        console.log("showing portal");
      } 
      else if (distance > 3 && this.animated) {
        this.animated = false;
        this.portalEl.emit("hidePortal");
      }
    },

    init: function()
    {
        this.animated = false;
        //create the template button
        const el = this.el;
        const portalEl = (this.portalEl = document.createElement("a-entity"));
        portalEl.id = "portal" + this.data.label;
        portalEl.setAttribute("template-button", 
        {
            target: this.data.target,
            portalScale: this.data.portalScale,
            icon: this.data.icon,
            label: this.data.label,
        });
        portalEl.setAttribute("position", "0 -10 0");
        el.appendChild(portalEl);

          //set label properties
        const labelEl = (this.labelEl = document.createElement("a-entity"));
        labelEl.setAttribute("text", {
          value: this.data.label,
          color: "#89b7d7",
          align: "center",
        });
        labelEl.id = "label" + this.data.label;
        labelEl.setAttribute("scale", "10 10 10");
        labelEl.setAttribute("position", "0 2 0");
        labelEl.setAttribute("shadow", "receive: true; cast: true");
        this.el.appendChild(labelEl);
        
        //create teleport area on the floor in front of the portal
        const teleportAreaEl = (this.teleportAreaEl = document.createElement("a-entity"));
        teleportAreaEl.id = "teleportArea" + this.data.label;
        teleportAreaEl.setAttribute("teleport-area", { color: "#89b7d7" });        
        teleportAreaEl.setAttribute("position", "0 -1.4 2.5");       
        el.appendChild(teleportAreaEl);

        //Create images panel on the left
        const imagesPanelEl = (this.imagesPanelEl = document.createElement("a-image"));
        imagesPanelEl.id = "imagesPanel" + this.data.label;
        imagesPanelEl.setAttribute("geometry", "width: 1.65; height: 1.25");
        imagesPanelEl.setAttribute("material", "color: #000; opacity: 0.5; transparent: true; side: double; metalness: 1");
        imagesPanelEl.setAttribute("position", "-2 0 .75");
        imagesPanelEl.setAttribute("rotation", "0 30 0");
        imagesPanelEl.setAttribute("scale", "1.5 1.5 1");
        imagesPanelEl.setAttribute("shadow", "receive: true; cast: true");
        el.appendChild(imagesPanelEl);
        //create project images for the images panel
        const imageGrid = (this.imageGrid = document.createElement("a-entity"));
        imageGrid.setAttribute("layout", "align: center; type:box; columns: 3; marginRow: .4; marginColumn: .55");
        imageGrid.setAttribute("position", "0 0 0.01");
        const appTarget = APP_DATA[this.data.target];
        console.log("Updating Image Panel for selected app: ", appTarget.name);
        //delete existing images that are children of the grid
        while (imageGrid.firstChild) {
            imagesPanelEl.removeChild(imageGrid.firstChild);
          }
        //Add new images to grid as children based on selected app
        appTarget.images.forEach((imagePath) => {
            const thisImage = document.createElement('a-image');
            thisImage.setAttribute('src', imagePath);
            thisImage.setAttribute('scale', appTarget.imageScale);          
            imageGrid.appendChild(thisImage);
          });
        imagesPanelEl.appendChild(imageGrid);

        //Create description panel on the right
        const descriptionPanelEl = (this.descriptionPanelEl = document.createElement("a-image"));
        descriptionPanelEl.id = "descriptionPanel" + this.data.label;
        descriptionPanelEl.setAttribute("geometry", "width: 1.65; height: 1.25");
        descriptionPanelEl.setAttribute("material", "color: #000; opacity: 0.5; transparent: true; side: double; metalness: 1");
        descriptionPanelEl.setAttribute("position", "2 0 .75");
        descriptionPanelEl.setAttribute("rotation", "0 -30 0");
        descriptionPanelEl.setAttribute("scale", "1.5 1.5 1");
        descriptionPanelEl.setAttribute("shadow", "receive: true; cast: true");
        
        el.appendChild(descriptionPanelEl);

        // Header Parent
        var headerParent = document.createElement('a-entity');
        headerParent.setAttribute('id', 'Header Parent');

        // AppTitle
        var appTitle = document.createElement('a-text');
        appTitle.setAttribute('id', 'AppTitle');
        appTitle.setAttribute('color', '#fff');
        appTitle.setAttribute('position', '-.7 .45 0');
        appTitle.setAttribute('width', '.9');
        appTitle.setAttribute('text', 'value:' + appTarget.name );
        headerParent.appendChild(appTitle);

        // AppSubtitle
        var appSubtitle = document.createElement('a-text');
        appSubtitle.setAttribute('id', 'AppSubtitle');
        appSubtitle.setAttribute('color', '#fff');
        appSubtitle.setAttribute('position', '-.7 .4 0');
        appSubtitle.setAttribute('width', '.55');
        appSubtitle.setAttribute('text', 'value:' + appTarget.description);
        headerParent.appendChild(appSubtitle);

        // Append Header Parent to 'el' or any desired parent element
        descriptionPanelEl.appendChild(headerParent);

        // Challenge Parent
        var challengeParent = document.createElement('a-entity');
        challengeParent.setAttribute('id', 'Challenge Parent');
        challengeParent.setAttribute('position', '0 .3 0');

        // ChallengeLabel
        var challengeLabel = document.createElement('a-text');
        challengeLabel.setAttribute('id', 'ChallengeLabel');
        challengeLabel.setAttribute('color', '#fff');
        challengeLabel.setAttribute('width', '.8');
        challengeLabel.setAttribute('position', '-.7 0 0');
        challengeLabel.setAttribute('text', 'value: The Challenge;');
        challengeParent.appendChild(challengeLabel);

        // TheChallenge
        var theChallenge = document.createElement('a-text');
        theChallenge.setAttribute('id', 'TheChallenge');
        theChallenge.setAttribute('color', '#fff');
        theChallenge.setAttribute('position', '-.45 0 0');
        theChallenge.setAttribute('width', '1.24');
        theChallenge.setAttribute('wrap-count', '70');
        theChallenge.setAttribute('text', 'align: left; anchor: left; baseline: top; value:' + appTarget.challenge);
        challengeParent.appendChild(theChallenge);

        // Append Challenge Parent to 'el' or any desired parent element
        descriptionPanelEl.appendChild(challengeParent);

        // Approach Parent
        var approachParent = document.createElement('a-entity');
        approachParent.setAttribute('id', 'Approach Parent');
        approachParent.setAttribute('position', '0 0.05 0');

        // ApproachLabel
        var approachLabel = document.createElement('a-text');
        approachLabel.setAttribute('id', 'ApproachLabel');
        approachLabel.setAttribute('color', '#fff');
        approachLabel.setAttribute('width', '.7');
        approachLabel.setAttribute('position', '-.7 0 0');
        approachLabel.setAttribute('text', 'value: The Approach');
        approachParent.appendChild(approachLabel);

        // TheApproach
        var theApproach = document.createElement('a-text');
        theApproach.setAttribute('id', 'TheApproach');
        theApproach.setAttribute('color', '#fff');
        theApproach.setAttribute('position', '-.45 0 0');
        theApproach.setAttribute('width', '1.24');
        theApproach.setAttribute('wrap-count', '70');
        theApproach.setAttribute('text', 'align: left; anchor: left; baseline: top; value:' + appTarget.approach);
        approachParent.appendChild(theApproach);

        // Append Approach Parent to 'el' or any desired parent element
        descriptionPanelEl.appendChild(approachParent);

        // Results Parent
        var resultsParent = document.createElement('a-entity');
        resultsParent.setAttribute('id', 'Results Parent');
        resultsParent.setAttribute('position', '0 -.27 0');

        // ResultsLabel
        var resultsLabel = document.createElement('a-text');
        resultsLabel.setAttribute('id', 'ResultsLabel');
        resultsLabel.setAttribute('color', '#fff');
        resultsLabel.setAttribute('width', '.7');
        resultsLabel.setAttribute('position', '-.7 0 0');
        resultsLabel.setAttribute('text', 'value: The Results');
        resultsParent.appendChild(resultsLabel);

        // TheResults
        var theResults = document.createElement('a-text');
        theResults.setAttribute('id', 'TheResults');
        theResults.setAttribute('color', '#fff');
        theResults.setAttribute('position', '-.45 0 0');
        theResults.setAttribute('width', '1.24');
        theResults.setAttribute('wrap-count', '70');
        theResults.setAttribute('text', 'align: left; anchor: left; baseline: top; value:' + appTarget.results);
        resultsParent.appendChild(theResults);

        // Append Results Parent to 'el' or any desired parent element
        descriptionPanelEl.appendChild(resultsParent);

        //rotate entire project to face the parent element
        const parent = document.querySelector("#projectMenu");
        this.el.setAttribute("look-at", "#projectMenu");

    },
});