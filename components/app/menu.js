/* global AFRAME */
AFRAME.registerComponent('menu', {
    init: function () {
        var el = this.el;      
        const uiManager = (this.uiManager = document.querySelector("#event-manager")); //ui managerand event manager components are on the same element
        //add event listener for arrow buttons
        uiManager.addEventListener("onLeftArrowClicked", () => this.onRotateMenu(-1));
        uiManager.addEventListener("onRightArrowClicked", () => this.onRotateMenu(1));

        this.currentRotation = 180;
        this.targetRotation = 180;
        this.rotate = false;
    },

    tick: function () {
        
        //if rotate is true, rotate this to the target rotation on y axis accounting for a small margin of error and converting to radians
        if(this.rotate)
        {
            let currentRotation = this.el.object3D.rotation.y * (180 / Math.PI);
            if(currentRotation < this.targetRotation - 1)
            {
                this.el.object3D.rotation.y += 1 * Math.PI / 180;
            }
            else if (currentRotation > this.targetRotation + 1)
            {
                this.el.object3D.rotation.y -= 1 * Math.PI / 180;
            }
            else
            {
                this.rotate = false;
                this.el.object3D.rotation.y = this.targetRotation * Math.PI / 180;
            }
        }
       

    },

    onRotateMenu: function (direction){
        console.log("Rotate Menu: " + direction);
        //animate this rotation based on direction every 90 degrees on y axis
        this.rotate = true;
        this.targetRotation += 90 * direction;
        console.log(this.el.object3D.rotation.y + " " + this.targetRotation);

    }

});
