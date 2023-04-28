var Bpo = Bpo || {};
Bpo.Constants = Bpo.Constants || {};

Bpo.model = new Vue({
     el: '#benchmarking-app',
     data: {
    	 category_id: null,
    	 metric_id: null,
    	 metric_value_primary: 0,
    	 location: 'Reference',
    	 occupancy_hours: 0    	 
     },

     computed: {
    	 hours: {
    		 get: function() {
    			 return this.occupancy_hours;
    		 },
    		 set: function(val) { this.occupancy_hours = val; }
    	 },
    	 category: {
    		 get: function() {return (this.category_id == null ? null : BenchmarkingJS.CibseTM46.Benchmarks.Category[this.category_id]); },
    		 set: function(val) {this.category_name = val;}
    	 },

    	 metric: {
    		 get: function() {
    			 if (this.metric_id == null) {
    				 return (this.getMetrics().length == 0 ? null : this.getMetrics()[0].id);
    			 } else if (this.getMetrics().findIndex(function(m) {return m.id == this.metric_id}.bind(this)) == -1) {
    				 return (this.getMetrics().length == 0 ? null : this.getMetrics()[0].id);
    			 } else {
    				 return this.metric_id;
    			 }
    		 },
    		 set: function(val) {this.metric_id = val;}
    	 },
    	 metricvalue: {
    		 get: function() {return this.getMetricFull().fromPrimary(this.metric_value_primary);},
    		 set: function(val) {this.metric_value_primary = this.getMetricFull().toPrimary(val);}
    	 }
     },
     
     methods: {
    	 getLocations: function() {
    		 var locations = [];
    		 Object.keys(BenchmarkingJS.CibseTM46.HeatingDegreeDays).forEach(function(l) {
    			 locations.push({'key': locations.length,
    				 'id': l,
    				 'name': l});
    		 });
    		 return locations;
    	 },
    	 
    	 getCategories: function() {
    		 var c = [];
    		 Object.keys(BenchmarkingJS.CibseTM46.Benchmarks.Category).sort(function(x, y) {
    			if (BenchmarkingJS.CibseTM46.Benchmarks.Category[x].name < BenchmarkingJS.CibseTM46.Benchmarks.Category[y].name) {
    				return -1;
    			} else if (BenchmarkingJS.CibseTM46.Benchmarks.Category[x].name > BenchmarkingJS.CibseTM46.Benchmarks.Category[y].name) {
    				return 1;
    			} else {
    				return 0;
    			}
    		 }).forEach(function(id) {
    			 var e = BenchmarkingJS.CibseTM46.Benchmarks.Category[id];
    			 c.push({'key': e.key,
    				 'id': id,
    				 'name': e.name});
    		 });
    		 return c;
    	 },
    	 getHours: function() {
    		 var h = this.occupancy_hours;
    		 var occ = BenchmarkingJS.CibseTM46.Benchmarks.Occupancy[this.category_id];
    		 if (occ != null) {
 			   if (h < occ.reference) { h = occ.reference; }
			   if (h > occ.maximum) { h = occ.maximum; }
    		 }
			 return h;
    	 },
    	 
    	 getMetrics: function() {
    		 if ((this.category_id == null) || (BenchmarkingJS.CibseTM46.Benchmarks.Metrics[this.category_id] == null)) {return [];}
    		 var r = [];
    		 Object.keys(BenchmarkingJS.CibseTM46.Benchmarks.Metrics[this.category_id]).sort(function(x, y) {
    			 var xn = BenchmarkingJS.CibseTM46.Benchmarks.Metrics[this.category_id][x].shortname;
    			 var yn = BenchmarkingJS.CibseTM46.Benchmarks.Metrics[this.category_id][y].shortname;
    			 if (xn < yn) {
    				 return -1;
    			 } else if (xn > yn) {
    				 return 1;
    			 } else {
    				 return 0;
    			 }
    		 }.bind(this)).forEach(function(id) {
    			 var v = BenchmarkingJS.CibseTM46.Benchmarks.Metrics[this.category_id][id];
    			 r.push({'key': v.id,
    				 'id': v.id,
    				 'shortname': v.shortname});
    		 }.bind(this));
    		 return r;
    	 },
    	 isMetric: function(id) {
    	     return this.metric == id;
    	 },
    	 setMetric: function(id) {
    		 this.metric = id;
    	 },
    	 getMetricFull: function() {
    		 if (this.metric == null) { return null; }
    		 return BenchmarkingJS.CibseTM46.Benchmarks.Metrics[this.category_id][this.metric];
    	 },
    	 
    	 getOccupancy: function() {
    		 if (this.category_id == null) { return null; }
    		 return BenchmarkingJS.CibseTM46.Benchmarks.Occupancy[this.category_id];
    	 },
    	 getEnergy: function() {
    		 if (this.category_id == null) {return [];}
    		 return BenchmarkingJS.CibseTM46.Benchmarks.Energy[this.category_id];
    	 },
    	 
    	 getValue: function(e) {
    		 var r = e.value(this.metric_value_primary);
    		 var f = BenchmarkingJS.CibseTM46.HeatingDegreeDays[this.location]/BenchmarkingJS.CibseTM46.HeatingDegreeDays['Reference'];
    		 r *= (1.0-e.adjustment.degreedays*(1.0-f));
    		 var h = this.getHours(); var occ = this.getOccupancy();
    		 f = ((h == null) || (occ == null) ? 0.0 : (h - occ.reference)/(occ.maximum - occ.reference));
    		 f = (f < 0.0 ? 0.0 : (f > 1.0 ? 1.0 : f));    				 
    		 r *= (1.0+e.adjustment.occupancy*f);
    		 return r;
    	 },
    	 toLocalString: function(x) {
    		 return x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	 }
     }
     
});
