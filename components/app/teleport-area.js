/* global AFRAME */
AFRAME.registerComponent("teleport-area", 
{
    schema:{
        color : {default: "#000"},
    },

    bindMethods: function()
    {        
        this.onInteract = this.onInteract.bind(this);
    },

    init: function()
    {
        this.bindMethods();
        //create cylinder to show teleport area
        const el = this.el;
        this.el.setAttribute("geometry", "primitive: cylinder; radius: 1; height: 0.1");
        this.el.setAttribute("material", "color: #000; opacity: 0.5; transparent: true; side: both; metalness: 1");

        //animate scale on mouse enter and leave
        el.setAttribute("animation__scale_mouseenter", "property: scale; to: 1.1 1.1 1.1; dur: 300; startEvents: mouseenter");
        el.setAttribute("animation__scale_mouseleave", "property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave");

        //change color to green on mouse enter
        el.setAttribute("animation__color_mouseenter", "property: material.color; to: #0f0; dur: 300; startEvents: mouseenter");
        //change color back to data.color on mouse leave
        el.setAttribute("animation__color_mouseleave", "property: material.color; to: "+ this.data.color +"; dur: 300; startEvents: mouseleave");

        //add event listener for click
        el.addEventListener("click", this.onInteract);

    },

    onInteract: function()
    {
        //teleport the camera rig to the teleport area
        // Get the camera rig
        const cameraRig = document.querySelector("#mainCamera");
        // Get the local position of the teleport area
        let localTeleportPosition = this.el.getAttribute("position").clone();
        // Get the world position of the teleport area by converting the local position
        let worldTeleportPosition = new THREE.Vector3();
        worldTeleportPosition.setFromMatrixPosition(this.el.object3D.matrixWorld);
        // Adjust the y-coordinate to 1.5 (if needed)
        worldTeleportPosition.y = 1.5;
        // Log the world teleport position
        console.log("Teleporting to: ", worldTeleportPosition);
        // Set the camera rig's position to the world teleport position
        cameraRig.setAttribute("position", worldTeleportPosition);
        this.el.emit("teleportComplete");
    }
});