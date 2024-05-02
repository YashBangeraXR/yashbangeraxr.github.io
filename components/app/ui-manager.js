/* global AFRAME */
AFRAME.registerComponent("ui-manager", {

    init: function (){
        this.bindMethods();
        const eventmanager = document.querySelector("#event-manager");
        const templateContainer = document.querySelector("#templateContainer");
        templateContainer.addEventListener("templaterendered", () => 
        {
            console.log("UI-manager-Template Loaded: " + templateContainer.getAttribute("template").src);
            console.log("Selected App: ", APP_DATA.selectedApp.name);
            const imageContainer = document.querySelector("#Images-Container");
            const descriptionContainer = document.querySelector("#Description-Container");
            const buttonContainer = document.querySelector("#Buttons-Container");
            const descriptionButton = document.querySelector("#description-button");
            const imageButton = document.querySelector("#images-button");

            this.updateDescriptionBoxValues();
            this.updateImagePanel();

            //if containers are not loaded, return
            if(!imageContainer || !descriptionContainer || !buttonContainer)
                return;

            if(APP_DATA.selectedApp.name == '' || APP_DATA.selectedApp.name == 'baseTemplate') 
            {                                
                console.log("No App Selected/Home Screen");
                imageContainer.setAttribute('visible', false);
                descriptionContainer.setAttribute('visible', false);
                buttonContainer.setAttribute('visible', false);
                return;
            }
            else
            {                
                buttonContainer.setAttribute('visible', true);
            }

            console.log("imageContainer: ", imageContainer);

            //add ui-buton events
            const backButton = document.querySelector("#back-button");
            backButton.addEventListener("onUiButtonClicked", () => {
                
                console.log("Home Button Pressed");
                //turn off app UI panels
                imageContainer.setAttribute('visible', false);
                descriptionContainer.setAttribute('visible', false);
                buttonContainer.setAttribute('visible', false);
                //load base template
                APP_DATA.selectedApp = 'baseTemplate';
                eventmanager.emit("onLoadTemplate", APP_DATA.selectedApp);
            });

            descriptionButton.addEventListener("onUiButtonClicked", () => {
                
                console.log("Description Button Pressed");
                //toggle description panel
                if(descriptionContainer.getAttribute('visible'))
                {
                    descriptionContainer.setAttribute('visible', false);
                }
                else
                {
                    descriptionContainer.setAttribute('visible', true);
                }
                //turn off image panel
                imageContainer.setAttribute('visible', false);
            });

            console.log("imageButton: ", imageButton);
            imageButton.addEventListener("onUiButtonClicked", () => {
                
                console.log("Image Button Pressed");
                //toggle image panel
                if(imageContainer.getAttribute('visible'))
                {
                    imageContainer.setAttribute('visible', false);
                }
                else
                {
                    imageContainer.setAttribute('visible', true);
                }
                //turn off description panel
                descriptionContainer.setAttribute('visible', false);
            });

        });
    },

    bindMethods: function () {
        this.updateDescriptionBoxValues = this.updateDescriptionBoxValues.bind(this);
        this.updateImagePanel = this.updateImagePanel.bind(this);
      },

    updateDescriptionBoxValues: function () {
        
        if(APP_DATA.selectedApp.name == '' || APP_DATA.selectedApp.name == 'baseTemplate') 
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
        
       
        if(APP_DATA.selectedApp.name == '' || APP_DATA.selectedApp.name == 'baseTemplate') 
        return;
        console.log("Updating Image Panel for selected app: ", APP_DATA.selectedApp.name);
        const imageGrid = document.querySelector('#ImageGrid');
        APP_DATA.selectedApp.images.forEach((imagePath) => {
            const thisImage = document.createElement('a-image');
            thisImage.setAttribute('src', imagePath);
            thisImage.setAttribute('scale', APP_DATA.selectedApp.imageScale);          
            imageGrid.appendChild(thisImage);
          });
      },
    
});