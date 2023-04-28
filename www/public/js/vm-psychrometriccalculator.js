var Bpo = Bpo || {};
Bpo.Constants = Bpo.Constants || {};
Bpo.Constants.PsychrometricCalculator = Bpo.Constants.PsychrometricCalculator || {
	ALTITUDE: "altitude",
	PRESSURE: "Pressure"
};

Bpo.model = new Vue({
     el: '#psychrometric-calculator-app',
     data: {
    	 pressureOption: [Bpo.Constants.PsychrometricCalculator.ALTITUDE],
    	 stateOptions: [PsychrometricsJS.Variables.DBT,
    		    		PsychrometricsJS.Variables.WBT],
    	 store: {
    		 referencePressure: new PsychrometricsJS.Pressure(101325.0, PsychrometricsJS.Units.PASCAL),
    		 'alt': 0.0,
    		 'refP': 101325.0,
    		 'state': new PsychrometricsJS.State({'dry-bulb temperature': new PsychrometricsJS.Temperature(20.0, PsychrometricsJS.Units.CELSIUS), 
    			 								'wet-bulb temperature': new PsychrometricsJS.Temperature(10.0, PsychrometricsJS.Units.CELSIUS),
    			 								'Pressure': new PsychrometricsJS.Pressure(101325.0, PsychrometricsJS.Units.PASCAL)}),
    		 'dry-bulb temperature': 20.0, // new PsychrometricsJS.Temperature(20.0, PsychrometricsJS.Units.CELSIUS),
    		 'wet-bulb temperature': 10.0, // new PsychrometricsJS.Temperature(10.0, PsychrometricsJS.Units.CELSIUS),
    		 'dew-point temperature': 10.0, // new PsychrometricsJS.Temperature(10.0, PsychrometricsJS.Units.CELSIUS),
    		 'Humidity ratio': 0.001, // new PsychrometricsJS.HumidityRatio(0.001, PsychrometricsJS.Units.KGKGDA),
    		 'relative humidity': 40.0, // new PsychrometricsJS.RelativeHumidity(40.0, PsychrometricsJS.Units.PERCENTAGE),
    		 'Enthalpy': 10.0 // new PsychrometricsJS.Enthalpy(10.0, PsychrometricsJS.Units.KJKGDA)
    	 }
     },

     computed: {
    	 altitude: {
    		 get: function() {
    			 if (this.useAltitude()) {
    				 return this.store['alt'];
    			 } else if (this.store.referencePressure != null) {
    				 return this.store.referencePressure.to_length().to_meter();
    			 } else {
    				 return "";
    			 }
    	     },
    		 set: function(val) {
    			this.store['alt'] = val;
    		 	if (this.useAltitude()) {
    		 		this.store.referencePressure = new PsychrometricsJS.Pressure(parseFloat(val), PsychrometricsJS.Units.METER);
    		 		this.updateState();
    		 	}
    		 }
    	 },
    	 referencePressure: {
    		 get: function() {
    			 if (this.usePressure()) {
    				 return this.store['refP'];
    			 } else if (this.store.referencePressure != null) {
    				 return this.store.referencePressure.to_pascal();
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) {
    			 this.store['refP'] = val;
    			 if (this.usePressure()) {
    				 this.store.referencePressure = new PsychrometricsJS.Pressure(parseFloat(val), PsychrometricsJS.Units.PASCAL);
    				 this.updateState();
    		     }
    		 }
    	 },
    	 dryBulbTemperature: {
    		 get: function() { 
    			 if (this.useDryBulbTemperature()) {
    				 return this.store[PsychrometricsJS.Variables.DBT];
    			 } else if (this.store.state != null) {
    				 return this.store.state.getDryBulbTemperature().to_celsius().toFixed(2);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) { 
    			 if (val != "") {
    				 this.store[PsychrometricsJS.Variables.DBT] = val;
    				 if (this.useDryBulbTemperature()) {this.updateState();}
    			 }
    		 }
    	 },
    	 wetBulbTemperature: {
    		 get: function() { 
    			 if (this.useWetBulbTemperature()) {
    				 return this.store[PsychrometricsJS.Variables.WBT];
    			 } else if (this.store.state != null) {
    				 return this.store.state.getWetBulbTemperature().to_celsius().toFixed(2);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) { 
    			 if (val != "") {
    				 this.store[PsychrometricsJS.Variables.WBT] = val; // new PsychrometricsJS.Temperature(parseFloat(val), PsychrometricsJS.Units.CELSIUS);
    				 if (this.useWetBulbTemperature()) {this.updateState();}
    			 }
    		 }
    	 },
    	 dewPointTemperature: {
    		 get: function() { 
    			 if (this.useDewPointTemperature()) {
    				 return this.store[PsychrometricsJS.Variables.DPT];
    			 } else if (this.store.state != null) {
    				 return this.store.state.getDewPointTemperature().to_celsius().toFixed(2);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) { 
    			 if (val != "") {
    				 this.store[PsychrometricsJS.Variables.DPT] = val; // new PsychrometricsJS.Temperature(parseFloat(val), PsychrometricsJS.Units.CELSIUS);
    				 if (this.useDewPointTemperature()) {this.updateState();}
    			 }
    		 }
    	 },
    	 relativeHumidity: {
    		 get: function() { 
    			 if (this.useRelativeHumidity()) {
    				 return this.store[PsychrometricsJS.Variables.RH];
    			 } else if (this.store.state != null) {
    				 return this.store.state.getRelativeHumidity().to_percentage().toFixed(1);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) { 
    			 if (val != "") {
    				 this.store[PsychrometricsJS.Variables.RH] = val; // new PsychrometricsJS.RelativeHumidity(parseFloat(val), PsychrometricsJS.Units.PERCENTAGE);
    				 if (this.useRelativeHumidity()) {this.updateState();}
    			 }
    		 }
    	 },
    	 humidityRatio: {
    		 get: function() { 
    			 if (this.useHumidityRatio()) {
    				 return this.store[PsychrometricsJS.Variables.W];
    			 } else if (this.store.state != null) {
    				 return this.store.state.getHumidityRatio().to_kgkgda().toFixed(5);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) { 
    			 if (val != "") {
    				 this.store[PsychrometricsJS.Variables.W] = val; // new PsychrometricsJS.HumidityRatio(parseFloat(val), PsychrometricsJS.Units.KGKGDA);
    				 if (this.useHumidityRatio()) {this.updateState();}
    			 }
    		 }
    	 },
    	 enthalpy: {
    		 get: function() { 
    			 if (this.useEnthalpy()) {
    				 return this.store[PsychrometricsJS.Variables.H];
    			 } else if (this.store.state != null) {
    				 return this.store.state.getEnthalpy().to_kjkgda().toFixed(2);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) { 
    			 if (val != "") {
    				 this.store[PsychrometricsJS.Variables.H] = val; // new PsychrometricsJS.Enthalpy(parseFloat(val), PsychrometricsJS.Units.KJKGDA);
    				 if (this.useEnthalpy()) {this.updateState();}
    			 }
    		 }
    	 },
    	 dryAirDensity: {
    		 get: function() {
    			 if (this.store.state != null) {
    				 return this.store.state.getDryAirDensity().to_kgm3().toFixed(3);
    			 } else {
    				 return "";
    			 }
    		 },
    		 set: function(val) {}
    	 },
    	 density: {
    		 get: function() {
    			 if (this.store.state != null) {
    				 return this.store.state.getDensity().to_kgm3().toFixed(3);
    			 } else {
    				 return "";
    			 }
        	 },
        	 set: function(val) {}
    	 } 
     },
     
     methods: {
    	 useAltitude: function() {return (this.pressureOption.indexOf(Bpo.Constants.PsychrometricCalculator.ALTITUDE) != -1);},
    	 setAltitudeOption: function() { this.pressureOption = [Bpo.Constants.PsychrometricCalculator.ALTITUDE]; },
    	 
    	 usePressure: function() {return (this.pressureOption.indexOf(Bpo.Constants.PsychrometricCalculator.PRESSURE) != -1);},
    	 setPressureOption: function() { this.pressureOption = [Bpo.Constants.PsychrometricCalculator.PRESSURE]; },
    	 
    	 useDryBulbTemperature: function() { return (this.stateOptions.indexOf(PsychrometricsJS.Variables.DBT) != -1);},
    	 toggleDryBulbTemperature: function() { this.toggleStateOptions(PsychrometricsJS.Variables.DBT); },
    	 
    	 useWetBulbTemperature: function() { return (this.stateOptions.indexOf(PsychrometricsJS.Variables.WBT) != -1);},
    	 toggleWetBulbTemperature: function() { this.toggleStateOptions(PsychrometricsJS.Variables.WBT); },
    	 
    	 useDewPointTemperature: function() { return (this.stateOptions.indexOf(PsychrometricsJS.Variables.DPT) != -1);},
    	 toggleDewPointTemperature: function() { this.toggleStateOptions(PsychrometricsJS.Variables.DPT); },
    	 
    	 useRelativeHumidity: function() { return (this.stateOptions.indexOf(PsychrometricsJS.Variables.RH) != -1);},
    	 toggleRelativeHumidity: function() { this.toggleStateOptions(PsychrometricsJS.Variables.RH); },
    	 
    	 useHumidityRatio: function() { return (this.stateOptions.indexOf(PsychrometricsJS.Variables.W) != -1);},
    	 toggleHumidityRatio: function() { this.toggleStateOptions(PsychrometricsJS.Variables.W); },
    	 
    	 useEnthalpy: function() { return (this.stateOptions.indexOf(PsychrometricsJS.Variables.H) != -1);},
    	 toggleEnthalpy: function() { this.toggleStateOptions(PsychrometricsJS.Variables.H); },
    	 
    	 toggleStateOptions: function(option) {
    		 var i = this.stateOptions.indexOf(option);
    		 if (i != -1) {
    			 this.stateOptions.splice(i, 1);
    		 } else {
    			 this.stateOptions.push(option);
    			 while (this.stateOptions.length > 2) {this.stateOptions.shift();}
    		 }
    		 this.updateState();
    	 },
    	 
    	 updateState: function() {
    		 console.log("In update state");
    		 if (this.stateOptions.length == 2) {
        		 console.log("Updating state");
    			 try {
    				 hash = {}
    				 hash[PsychrometricsJS.Variables.P] = this.store.referencePressure;
    				 for (var k in this.stateOptions) { 
    					 kk = this.stateOptions[k];
    					 if (kk == PsychrometricsJS.Variables.DBT) {
        					 hash[kk] = new PsychrometricsJS.Temperature(parseFloat(this.store[kk]), PsychrometricsJS.Units.CELSIUS);
    					 } else if (kk == PsychrometricsJS.Variables.WBT) {
        					 hash[kk] = new PsychrometricsJS.Temperature(parseFloat(this.store[kk]), PsychrometricsJS.Units.CELSIUS);    						 
    					 } else if (kk == PsychrometricsJS.Variables.DPT) {
        					 hash[kk] = new PsychrometricsJS.Temperature(parseFloat(this.store[kk]), PsychrometricsJS.Units.CELSIUS);
    					 } else if (kk == PsychrometricsJS.Variables.W) {
        					 hash[kk] = new PsychrometricsJS.HumidityRatio(parseFloat(this.store[kk]), PsychrometricsJS.Units.KGKGDA);
    					 } else if (kk == PsychrometricsJS.Variables.RH) {
        					 hash[kk] = new PsychrometricsJS.RelativeHumidity(parseFloat(this.store[kk]), PsychrometricsJS.Units.PERCENTAGE);    						 
    					 } else if (kk == PsychrometricsJS.Variables.H) {
        					 hash[kk] = new PsychrometricsJS.Enthalpy(parseFloat(this.store[kk]), PsychrometricsJS.Units.KJKGDA);    						     						 
    					 } else {
    						 throw "Option " + kk + " is not recognised"
    					 }
    			     }
    				 this.store.state = new PsychrometricsJS.State(hash);
    			 } catch (e) {
    				 console.log("error occured. Set state to null");
    				 console.log(e);
    				 console.log(e.stack);
    				 this.store.state = null;
    			 }
    			 
    		 } else {
    			 this.store.state = null;
    		 }
    	 }
     }
     
});
    	 
    	 
    	 
    	 
    	 