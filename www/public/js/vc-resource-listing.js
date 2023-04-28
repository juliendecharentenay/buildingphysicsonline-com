var Bpo = Bpo || {};
Bpo.Constants = Bpo.Constants || {};
Bpo.Constants.VcResourceListing = Bpo.Constants.VcResourceListing || {
	DISPLAY: 1,
	EDIT: 2,
	NEW: 3
};



Vue.component('vc-resource-listing',
	{
		props: {
			mode: {
				type: Number,
				required: true
			},
			data: {
				type: Object,
				required: true
			}
		},
		methods: {
			update: function() {
				console.log("Update me");
			}
		},
		template: `
		    <span>
		      <md-card md-with-hover flex="25" v-if="mode == 1">
		        <!-- Display resource data -->
		        <md-card-media v-if="data.logoUrl != ''">
		          <img v-bind:src="data.logoUrl" v-bind:alt="data.name">
  		        </md-card-media>
		      
		        <md-card-header>
		          <div class="md-title">{{ data.name }}</div>
		          <div class="md-subhead"><a v-bind:href="data.url">{{ data.url }}</a></div>
		        </md-card-header>
		      
		        <md-card-expand>
  		          <md-card-actions md-alignment="space-between">
  		            <div>
		              <a v-bind:href="data.url">Visit</a>
		            </div>
		          
		            <md-card-expand-trigger>
		              <md-button class="md-icon-button">
		                <md-icon>keyboard_arrow_down</md-icon>
		              </md-button>
		            </md-card-expand-trigger>
		          </md-card-actions>
		      
		          <md-card-expand-content>
		            <md-card-content>
  		              <p>{{ data.description }}</p>
			          <md-divider></md-divider>
		              <p v-if="data.author != ''">by: {{ data.author }} <br/></div>
		              <p v-if="data.authorEmail != ''"><a v-bind:href="'mailto:'+data.authorEmail">{{ data.authorEmail }}</a></p>
		              <p v-if="data.version != ''">Version: {{ data.version }}</p>
		              <p v-if="data.type != ''">{{ data.type }}</p>
		              <p v-if="data.license != ''">{{ data.license }}</p>
		              <p v-if="data.hashtags!= ''">{{ data.hashtags }}</p>
		            </md-card-content>
		          </md-card-expand-content>
		        </md-card-expand>
		      </md-card>
		      
		      <md-card md-with-hover v-if="mode == 2 || mode == 3">
		        <!-- Edit resource data -->
		        <md-card-media v-if="data.logoUrl != ''">
		          <img v-bind:src="data.logoUrl" v-bind:alt="data.name">
  		        </md-card-media>
		      
		        <md-card-header>
		          <div class="md-title">{{ data.name }}</div>
		          <div class="md-subhead"><a v-bind:href="data.url">{{ data.url }}</a></div>
		        </md-card-header>
		      
		        <md-card-expand>
  		          <md-card-actions md-alignment="space-between">
  		            <div>
		              <md-button v-on:click="update">Update</md-button>
		            </div>
		          
		            <md-card-expand-trigger>
		              <md-button class="md-icon-button">
		                <md-icon>keyboard_arrow_down</md-icon>
		              </md-button>
		            </md-card-expand-trigger>
		          </md-card-actions>
		      
		          <md-card-expand-content>
		            <md-card-content>
		              <md-field>
    	                <label>Name</label>
        	            <md-input type="text" v-model="data.name"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>URL</label>
        	            <md-input type="text" v-model="data.url"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>Logo URL</label>
        	            <md-input type="text" v-model="data.logoUrl"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>Description</label>
        	            <md-input type="text" v-model="data.description"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>Author</label>
        	            <md-input type="text" v-model="data.author"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>Author email</label>
        	            <md-input type="text" v-model="data.authorEmail"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>version</label>
        	            <md-input type="text" v-model="data.version"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>Type</label>
        	            <md-input type="text" v-model="data.type"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>License</label>
        	            <md-input type="text" v-model="data.license"></md-input>
            	      </md-field>

		              <md-field>
    	                <label>Hashtags</label>
        	            <md-input type="text" v-model="data.hashtags"></md-input>
            	      </md-field>
		            </md-card-content>
		          </md-card-expand-content>
		        </md-card-expand>
		      </md-card>
		      
		    </span>
		    `
	});
