/* global AFRAME */
AFRAME.registerComponent("ui-manager", {

    init: function (){
        this.bindMethods();
        this.el.addEventListener("templaterendered", this.setUpUI);
        this.el.addEventListener("onUpdateUI", this.updateUI);
    },

    bindMethods: function () {
        this.updateDescriptionBoxValues = this.updateDescriptionBoxValues.bind(this);
        this.updateImagePanel = this.updateImagePanel.bind(this);
        this.setUpUI = this.setUpUI.bind(this);
        this.updateUI = this.updateUI.bind(this);
      },

    setUpUI: function () {

        console.log("UI-manager Loaded: " +  this.el.id);
        this.projectsContainer = document.querySelector("#Projects-UI");
        this.imageContainer = document.querySelector("#Images-Container");
        this.descriptionContainer = document.querySelector("#Description-Container");
        this.buttonContainer = document.querySelector("#Buttons-Container");
        this.descriptionButton = document.querySelector("#description-button");
        this.imageButton = document.querySelector("#images-button");
        this.lobbyUI = document.querySelector("#Lobby-UI");
        this.leftArrowButton = document.querySelector("#left-arrow-button");
        this.rightArrowButton = document.querySelector("#right-arrow-button");
        this.projectMenu = document.querySelector("#projectMenu");

        //add ui-buton events
        this.backButton = document.querySelector("#back-button");
        this.backButton.addEventListener("onUiButtonClicked", () => {
            
            console.log("Home Button Pressed");
            //turn off app UI panels
            this.imageContainer.setAttribute('visible', false);
            this.descriptionContainer.setAttribute('visible', false);
            this.buttonContainer.setAttribute('visible', false);

            //load base template            
            APP_DATA.selectedApp = 'baseTemplate';
            this.el.emit("onLoadTemplate", APP_DATA.selectedApp);
        });

        this.descriptionButton.addEventListener("onUiButtonClicked", () => {
            
            console.log("Description Button Pressed");
            //toggle description panel
            if(this.descriptionContainer.getAttribute('visible'))
            {
                this.descriptionContainer.setAttribute('visible', false);
            }
            else
            {
                this.descriptionContainer.setAttribute('visible', true);
            }
            //turn off image panel
            this.imageContainer.setAttribute('visible', false);
        });

        this.imageButton.addEventListener("onUiButtonClicked", () => {
            
            console.log("Image Button Pressed");
            //toggle image panel
            if(this.imageContainer.getAttribute('visible'))
            {
                this.imageContainer.setAttribute('visible', false);
            }
            else
            {
                this.imageContainer.setAttribute('visible', true);
            }
            //turn off description panel
            this.descriptionContainer.setAttribute('visible', false);
        });

        this.rightArrowButton.addEventListener("onUiButtonClicked", () => {this.onClickArrow('right'); });   
        this.leftArrowButton.addEventListener("onUiButtonClicked", () => {this.onClickArrow('left'); });

    },

    updateUI: function () {
        console.log("UI-manager: updateUI");
        console.log("Selected App: ", APP_DATA.selectedApp.name);

        //return if not initialized
        if(!this.imageContainer || !this.descriptionContainer || !this.buttonContainer)
            return;

        this.updateDescriptionBoxValues();
        this.updateImagePanel();
         
        if(APP_DATA.selectedApp.name == '' || APP_DATA.selectedApp.name == 'baseTemplate') 
        {                                
            console.log("No App Selected/Home Screen");
            this.imageContainer.setAttribute('visible', false);
            this.descriptionContainer.setAttribute('visible', false);
            this.buttonContainer.setAttribute('visible', false);
            this.lobbyUI.setAttribute('visible', true);

            // this is not the correct way to make things not interactable, use classes instead. This is just a quick fix.
            this.lobbyUI.setAttribute('position', '0 0 0');
            this.projectsContainer.setAttribute('position', '0 -10 0');
        }
        else
        {    
            console.log("App Selected: ", APP_DATA.selectedApp.name);
            this.lobbyUI.setAttribute('visible', false);
            this.buttonContainer.setAttribute('visible', true);
            this.imageContainer.setAttribute('visible', false);
            this.descriptionContainer.setAttribute('visible', false);
            this.buttonContainer.setAttribute('visible', true);

            // this is not the correct way to make things not interactable, use classes instead. This is just a quick fix.
            this.lobbyUI.setAttribute('position', '0 -10 0');
            this.projectsContainer.setAttribute('position', '0 0 0');
        }
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
        //delete existing images that are children of the grid
        while (imageGrid.firstChild) {
            imageGrid.removeChild(imageGrid.firstChild);
          }
        //Add new images to grid as children based on selected app
        APP_DATA.selectedApp.images.forEach((imagePath) => {
            const thisImage = document.createElement('a-image');
            thisImage.setAttribute('src', imagePath);
            thisImage.setAttribute('scale', APP_DATA.selectedApp.imageScale);          
            imageGrid.appendChild(thisImage);
          });
      },

      onClickArrow: function(direction)
      {
          console.log('onClickArrow: ', direction);
          if(direction === 'left')
          {
              console.log('left arrow clicked');
              this.el.emit('onLeftArrowClicked');
          }
          else if(direction === 'right')
          {
              console.log('right arrow clicked');
              this.el.emit('onRightArrowClicked');
          }
      }
    
});