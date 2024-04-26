/* global AFRAME */
AFRAME.registerComponent("event-manager", {
    init: function () {
      this.bindMethods();
      this.fsngButtonEl = document.querySelector("#fsngButton");
      this.fsngButtonEl.addEventListener("click", this.loadTemplate);
    },
  
    bindMethods: function () {
      this.onClick = this.onClick.bind(this);
    },
  
    onClick: function (evt) {
      const targetEl = evt.target;
      if (targetEl === this.homeButtonEl || targetEl === this.fsngButtonEl) {
        this.fsngButtonEl.removeState("pressed");
      }
  
      targetEl.addState("pressed");
    },
  
    
  });
  