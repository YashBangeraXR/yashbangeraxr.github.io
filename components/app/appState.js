const { AFRAME, APP_DATA } = window;


AFRAME.registerState({
    state: {
      selectedApp: {
        name: 'Properly Formatted App Name',
        description: 'Brief description of app.',
        challenge: ``,
        approach: ``,
        results: ``,
        images: ['path/to/images'],
      },
    },
  
    handlers: {
      selectApp: (state, action) => {
        state.selectedApp = action.selectedApp;
        console.log(`app selected. loading ${action.selectedApp.name}`);
      },
    },
  });