AFRAME.registerComponent('transient-input-handler', {
    init: function () {
        console.log("transient-input-handler init");
        this.xrSession = null;
    
        this.el.sceneEl.addEventListener('enter-vr', () => {
            console.log('Entering VR');
            this.xrSession = this.el.sceneEl.renderer.xr.getSession();
    
            this.xrSession.addEventListener('inputsourceschange', this.onInputSourcesChange.bind(this));
            this.xrSession.addEventListener('selectstart', this.onSelectStart.bind(this));
            this.xrSession.addEventListener('selectend', this.onSelectEnd.bind(this));
        });
    },
  
    onInputSourcesChange: function (event) {
      event.added.forEach((inputSource) => {
        if (inputSource.targetRayMode === 'transient') {
          console.log('Transient input source added:', inputSource);
          // This is where you might prepare to handle new inputs
        }
      });
  
      event.removed.forEach((inputSource) => {
        console.log('Transient input source removed:', inputSource);
        // Handle cleanup for removed inputs here
      });
    },
  
    onSelectStart: function (event) {
      const inputSource = event.inputSource;
      if (inputSource.targetRayMode === 'transient') {
        const rayPose = inputSource.getPose(inputSource.targetRaySpace);
        if (rayPose) {
          this.performRaycast(rayPose);
        }
      }
    },
  
    onSelectEnd: function (event) {
      console.log('Interaction ended with input source:', event.inputSource);
    },
  
    performRaycast: function (pose) {
      const origin = new THREE.Vector3(pose.transform.position.x, pose.transform.position.y, pose.transform.position.z);
      const direction = new THREE.Vector3(pose.transform.orientation.x, pose.transform.orientation.y, pose.transform.orientation.z, pose.transform.orientation.w).normalize();
      const raycaster = new THREE.Raycaster(origin, direction);
      const intersects = raycaster.intersectObjects(this.el.sceneEl.object3D.children, true);
  
      if (intersects.length > 0) {
        console.log('Object selected:', intersects[0]. object);
        // Further logic for interaction
      }
    }
  });
  