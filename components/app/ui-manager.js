/* global AFRAME */
AFRAME.registerComponent("ui-manager", {

    init: function (){
        this.bindMethods();
        const templateContainer = document.querySelector("#templateContainer");
        templateContainer.addEventListener("templaterendered", () => 
       {
            this.updateDescriptionBoxValues();
            this.updateImagePanel();
       });
    },

    bindMethods: function () {
        this.updateDescriptionBoxValues = this.updateDescriptionBoxValues.bind(this);
        this.updateImagePanel = this.updateImagePanel.bind(this);
      },

    updateDescriptionBoxValues: function () {
        console.log("Updating Description Box Values for selected app: ", APP_DATA.selectedApp.name);
        if(APP_DATA.selectedApp.name == '') 
            return;
        const challenge = document.querySelector('#TheChallenge');
        const approach = document.querySelector('#TheApproach');
        const results = document.querySelector('#TheResults');
        const appTitle = document.querySelector('#AppTitle');
        const appSubtitle = document.querySelector('#AppSubtitle');
      
        challenge.setAttribute('text', `value: ${APP_DATA.selectedApp.challenge}`);
        approach.setAttribute('text', `value: ${APP_DATA.selectedApp.approach}`);
        results.setAttribute('text', `value: ${APP_DATA.selectedApp.results}`);
        appTitle.setAttribute('text', `value: ${APP_DATA.selectedApp.name}`);
        appSubtitle.setAttribute(
          'text',
          `value: ${APP_DATA.selectedApp.description}`
        );
      },

      updateImagePanel: function () {
        console.log("Updating Image Panel for selected app: ", APP_DATA.selectedApp.name);
        const imageContainer = document.querySelector('#ImageContainer');
        APP_DATA.selectedApp.images.forEach((imagePath) => {
            const thisImage = document.createElement('a-image');
            console.log(APP_DATA.selectedApp.imageScale);
            thisImage.setAttribute('src', imagePath);
            thisImage.setAttribute('scale', APP_DATA.selectedApp.imageScale);
          
            imageContainer.appendChild(thisImage);
          });
      },
    
});