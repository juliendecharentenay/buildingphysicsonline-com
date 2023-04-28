var Bpo = Bpo || {};
Bpo.Constants = Bpo.Constants || {};
var requestAnimFrame = window.requestAnimationFrame || 
                 window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame || 
                  window.msRequestionAnimationFrame ||
               function(c) { window.setTimeout(c, 1);};

Vue.use(VueMaterial.default);

class Vec2 {
	  constructor(x, y) {
	    this.x = x; this.y = y;
	  }
	  norm() {
	    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
	  }
	  add(v) {
	    return new Vec2(this.x+v.x, this.y+v.y);
	  }
	  minus(v) {
	    return new Vec2(this.x-v.x, this.y-v.y);
	  }
	  getOrthogonal() {
	    return new Vec2(-this.y, this.x);
	  }
	  x() { return this.x; }
	  y() { return this.y; }
	  to_s() { return "[" + this.x + ", " + this.y + "]"; }
	};

class Sim {
  constructor() {
//    this.it = 0;
    this.glInitialised = false;
//    this.mouse = this.getMouseInit();
//    this.animating = false;
  }
  instanceExists() {
    return Module._simInstanceExists();
  }
  create(simOption) {
    Module._simCreate(simOption);
  }
  setInitialConditions(simOption) {
	Module._simSetInitialConditions(simOption);
  }
  step() {
    Module._simStep();
  }
  setCanvasSize(w, h) {
	  Module._renderInit(w, h);
	  this.glInitialised = true;
  }
  /**
  initGL() {
    Module._renderInit(this.canvas.width, this.canvas.height);
    // this.setCamera();
    this.glInitialised = true;
  }*/
  render() {
	if (this.glInitialised) {
		Module._render();
	}
  }
  rotate(x, y) {
    Module._onMouseMove(0, x, y);
  }
  getFrameNumber() {
	  return Module._simGetFrameNumber()
  }
  getTime() {
	  return Module._simGetTime()
  }
  /**
  start() {
    if (this.glInitialised) {
      this.animating = true;
      requestAnimFrame(function() { this.animate(); }.bind(this));
	}
  }
  stop() {
	this.animating = false;
  }
  animate() {
    if (this.animating) { 
      this.step(); this.render();
      console.log(this.it);
      this.it += 1;
      requestAnimFrame(function() { this.animate(); }.bind(this)); 
    }
  }
  */
};

class TouchHelper {
	constructor(onRotate) {
		this.onRotate = onRotate;
		this.touch = this.getTouchInit();
	}
	
	getTouchInit() {
		return {down: false,
			moveEvtHandler: null,
			clientXY: {}};
	}
	oneFingerTouchEvtHandler(evt) {
		var touch = evt.changedTouches[0];
		var touchId = touch.identifier;
		var clientXY = this.touch.clientXY[touchId];
		if (clientXY != null) {
			var xy = new Vec2(touch.clientX, touch.clientY).minus(clientXY);
		    if (xy.norm() > 1e-4) {
		      this.onRotate(xy.x, xy.y);
		      this.touch.clientXY[touchId] = new Vec2(touch.clientX, touch.clientY);
		    }
		} else {
			throw "Moving a different finger???";
		}
	}
	onTouchStart(evt) {
		this.touch.down = true;
		for (var i = 0; i < evt.touches.length; ++i) {
			var touch = evt.touches[i];
			this.touch.clientXY[touch.identifier] = new Vec2(touch.clientX, touch.clientY);
		}
		
		if (evt.touches.length == 1) {
			// One finger touch
			this.touch.evtHandler = function(evt) { this.oneFingerTouchEvtHandler(evt); }.bind(this);
			
		} else if (evt.touches.length == 2) {
			// two finger touch
			if (this.touch.evtHandler != null) {delete this.touch.evtHandler;}
		} else if (evt.touches.length == 3) {
			// three finger touch
			if (this.touch.evtHandler != null) {delete this.touch.evtHandler;}
		} else {
			// more finger touch??
			if (this.touch.evtHandler != null) {delete this.touch.evtHandler;}
		}
	}
	
	onTouchMove(evt) {
	    if (this.touch.down) {
	        if (this.touch.evtHandler) {
	          this.touch.evtHandler(evt);
	        }
	    }
	}
	
	onTouchEnd(evt) {
		if (this.touch.down) {
			for (var i = 0; i < evt.changedTouches.length; ++i) {
				var touch = evt.changedTouches[i];
				delete this.touch.clientXY[touch.identifier];
			}
			var nTouch = Object.keys(this.touch.clientXY).length;
			this.touch.down = (nTouch === 0);
			if (this.touch.down === false) {
				if (this.touch.evtHandler != null) {delete this.touch.evtHandler;}
			} else {
				if (nTouch === 1) {
					this.touch.evtHandler = function(evt) { this.oneFingerTouchEvtHandler(evt); }.bind(this);
				}
			}
			
		}
	}
	
	onTouchCancel(evt) {
		if (this.touch.down) {
			for (var i = 0; i < evt.changedTouches.length; ++i) {
				var touch = evt.changedTouches[i];
				delete this.touch.clientXY[touch.identifier];
			}
			var nTouch = Object.keys(this.touch.clientXY).length;
			this.touch.down = (nTouch === 0);
			if (this.touch.down === false) {
				if (this.touch.evtHandler != null) {delete this.touch.evtHandler;}
			} else {
				if (nTouch === 1) {
					this.touch.evtHandler = function(evt) { this.oneFingerTouchEvtHandler(evt); }.bind(this);
				}
			}
			
		}
		
	}
};

class MouseHelper {
  constructor(onRotate) {
	  this.onRotate = onRotate;
      this.mouse = this.getMouseInit();
  }

  getMouseInit() {
    return {down: false,
             moveEvtHandler: null,
             clientXY: null};
  }
  onMouseDown(evt) {
    console.log("Mouse down"); // console.log(evt);
    this.mouse.down = true;
    this.mouse.clientXY = new Vec2(evt.clientX, evt.clientY);
    if ((evt.which == 1) && (evt.shiftKey)) {
      this.mouse.moveEvtHandler = function(evt) {
           var xy = new Vec2(evt.clientX, evt.clientY);
           console.log("Handle zoom from: " + this.mouse.clientXY.to_s() + " to " + xy.to_s());
      }.bind(this);
    } else if (((evt.which == 1) && (evt.ctrlKey)) ||
         (evt.which == 2)) {
      this.mouse.moveEvtHandler = function(evt) {
           var xy = new Vec2(evt.clientX, evt.clientY);
           console.log("Handle pan from: " + this.mouse.clientXY.to_s() + " to " + xy.to_s());
      }.bind(this);

    } else if (evt.which == 1) {
      // console.log("Left button");
      this.mouse.moveEvtHandler = function(evt) {
           var xy = new Vec2(evt.clientX, evt.clientY).minus(this.mouse.clientXY);
           if (xy.norm() > 1e-4) {
              this.onRotate(xy.x, xy.y);
              this.mouse.clientXY = new Vec2(evt.clientX, evt.clientY);
           }
	           
      }.bind(this);

    } else if (evt.which == 3) {
      // console.log("right button"); // no actions

    } else {
      console.log("which button???");
    }
  }
  onMouseUp(evt) {
    console.log("Mouse up"); // console.log(evt);
    this.mouse = this.getMouseInit();
  }
  onMouseMove(evt) {
    if (this.mouse.down) {
      if (this.mouse.moveEvtHandler) {
        this.mouse.moveEvtHandler(evt);
      } else {
        console.log("!!!! no mouse move event handler");
      }
    }
  }
  onMouseOut(evt) {
    if (this.mouse.down) {
      console.log("Mouse out"); // console.log(evt);
      this.mouse = this.getMouseInit();
    }
  }
};


Bpo.model = new Vue({
    el: '#index-app',
    data: {
    	INTRO: "INTRO",
    	PLAY: "PLAY",
    	section: "INTRO",
    	mSimOption: 1,
    	isSimRunning: false,
    	sim: null,
    	mSimTime: 0.0,
    	moduleRuntimeInitialized: false,
    	mouseHelper: null,
    	touchHelper: null
    },
    computed: {
    	simOption: {
    		get: function() {return this.mSimOption.toString();},
    		set: function(o) {this.mSimOption = parseInt(o); this.restartSim(); }
    	}
    },
    methods: {
    	restartSim: function() {
    		this.isSimRunning = false;
    		this.sim.setInitialConditions(this.mSimOption);
    		this.mSimTime = this.sim.getTime();
    		console.log("Restart sim - call render");
    		this.simRender();
    	},
    	toggleSim: function() {
    		console.log("Toggle sim");
    		if (this.isSimRunning) {
    			this.isSimRunning = false;
    		} else {
    			this.isSimRunning = true;    			
    			this.startSim();
    		}
    	},
    	startSim() {
    	  requestAnimFrame(function() { this.animate(); }.bind(this));
    	},
    	animate() {
    		if (this.isSimRunning) {
    			this.sim.step(); this.sim.render();
    			this.startSim();
        		this.mSimTime = this.sim.getTime();
    		}
    	},
    	simRender() {
    		if (! this.isSimRunning) {
    			requestAnimFrame(function() { this.sim.render();}.bind(this));
    		}
    	},
    	toIntro: function() {
    		this.section = this.INTRO;
      	    document.getElementById("app-toolbar").style.position = null;
      	    document.getElementById("app-toolbar").style.top = 0;
      	    document.getElementById("app-toolbar").style.bottom = null;
      	    document.getElementById("app-content").style.padding = null;
    	},
    	toPlay: function() {
    		console.log("Start play@");
      	    this.section = this.PLAY; // Change to play section
       	    // document.getElementById("app-toolbar").style.display = "none"; // hide toolbar
      	    document.getElementById("app-toolbar").style.position = "absolute"; // Move toolbar to bottom
      	    document.getElementById("app-toolbar").style.top = null;
      	    document.getElementById("app-toolbar").style.bottom = 0;
      	    document.getElementById("app-content").style.padding = "0px";  // Remove padding
      	    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
      	    this.resizeCanvas(); 
      	    if (this.moduleRuntimeInitialized) {
      	      this.initialiseSim();
      	    	
      	    } else {
      	      Module.onRuntimeInitialized = function() { this.moduleRuntimeInitialised = true; this.initialiseSim() }.bind(this);
      	    }
        },
        
        initialiseSim: function() {
        	var canvas = this.getCanvas();
        	Module.canvas = canvas;
        	this.sim = new Sim();
        	this.sim.create(this.mSimOption);
        	this.sim.setCanvasSize(canvas.width, canvas.height);
    		this.sim.setInitialConditions(this.mSimOption);
        	this.simRender();
    		this.mSimTime = this.sim.getTime();
        	this.mouseHelper = new MouseHelper(function(x, y) {
        		this.sim.rotate(x, y);
        		this.simRender();
        		}.bind(this));
      	    canvas.addEventListener('mousedown', function(evt) { this.mouseHelper.onMouseDown(evt); evt.preventDefault; return false; }.bind(this));
      	    canvas.addEventListener('mouseup', function(evt) { this.mouseHelper.onMouseUp(evt); evt.preventDefault; return false; }.bind(this));
    	    canvas.addEventListener('mousemove', function(evt) { this.mouseHelper.onMouseMove(evt); }.bind(this));
    	    canvas.addEventListener('mouseout', function(evt) { this.mouseHelper.onMouseOut(evt); }.bind(this));
    	    
        	this.touchHelper = new TouchHelper(function(x, y) {
        		this.sim.rotate(x, y);
        		this.simRender();
        		}.bind(this));
      	    canvas.addEventListener('touchstart', function(evt) { this.touchHelper.onTouchStart(evt); evt.preventDefault; return false; }.bind(this));
      	    canvas.addEventListener('touchend', function(evt) { this.touchHelper.onTouchEnd(evt); evt.preventDefault; return false; }.bind(this));
    	    canvas.addEventListener('touchmove', function(evt) { this.touchHelper.onTouchMove(evt); }.bind(this));
    	    canvas.addEventListener('touchcancel', function(evt) { this.touchHelper.onTouchCancel(evt); }.bind(this));
        },
        resizeCanvas: function() {
        	var canvas = this.getCanvas();
        	canvas.width = window.innerWidth;
        	canvas.height = window.innerHeight;
        	if (this.sim) {this.sim.setCanvasSize(canvas.width, canvas.height); this.simRender();}
        },
        getCanvas: function()  {
        	return document.getElementById("canvas");
        }
    }
 });

Module.onRuntimeInitialized = function() { Bpo.model.moduleRuntimeInitialized = true; };
