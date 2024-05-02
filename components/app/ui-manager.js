/* global AFRAME */
AFRAME.registerComponent("ui-manager", {

    init: function (){
        this.bindMethods();
        const templateContainer = document.querySelector("#templateContainer");
        templateContainer.addEventListener("templaterendered", () => 
        {
            console.log("Template Loaded: " + templateContainer.getAttribute("template").src);
            const imageContainer = document.querySelector("#Images-Container");
            const descriptionContainer = document.querySelector("#Description-Container");
            const buttonContainer = document.querySelector("#Buttons-Container");
            this.updateDescriptionBoxValues();
            this.updateImagePanel();

            //if the containers aren't loaded, skip this
            if(!imageContainer || !descriptionContainer || !buttonContainer)
                return;

            if(APP_DATA.selectedApp.name == '') 
            {                                
                imageContainer.setAttribute('visible', false);
                descriptionContainer.setAttribute('visible', false);
                buttonContainer.setAttribute('visible', false);
            }
            else
            {                
                buttonContainer.setAttribute('visible', true);
            }

        });
    },

    bindMethods: function () {
        this.updateDescriptionBoxValues = this.updateDescriptionBoxValues.bind(this);
        this.updateImagePanel = this.updateImagePanel.bind(this);
      },

    updateDescriptionBoxValues: function () {
        
        if(APP_DATA.selectedApp.name == '') 
            return;

        console.log("Updating Description Box Values for selected app: ", APP_DATA.selectedApp.name);
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
        
       
        if(APP_DATA.selectedApp.name == '') 
        return;
        console.log("Updating Image Panel for selected app: ", APP_DATA.selectedApp.name);
        const imageGrid = document.querySelector('#ImageGrid');
        APP_DATA.selectedApp.images.forEach((imagePath) => {
            const thisImage = document.createElement('a-image');
            console.log(APP_DATA.selectedApp.imageScale);
            thisImage.setAttribute('src', imagePath);
            thisImage.setAttribute('scale', APP_DATA.selectedApp.imageScale);
          
            imageGrid.appendChild(thisImage);
          });
      },
    
});