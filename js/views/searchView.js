define(["jquery", "underscore", "backbone", "ractive","views/videoItemView","collections/Videos","text!templates/searchView.html"],
    function ($, _, Backbone, Ractive, videoItemView,Videos,template) {

    var searchView = Backbone.View.extend({

        template: new Ractive({template: template}),
       
        events : {
            "tap #search_button" : "searchVideos",
	    "click #search_button" : "searchVideos"
        },
	
	searchVideos: function(callback){
		Backbone.history.navigate("search/"+document.getElementById('query_field').value, {trigger: true});
	},
	
        initialize: function () {				
		this.startIndex = 5;
		if(this.collection!=undefined){
			//this.collection = new Videos("related", this.model, this.startIndex);
			this.type = "related";
			this.collection.on("completed", this.render, this);
			this.on("scrollBottom", this.scrollBottom);
		}
		else if(this.model !=undefined){
			this.type = "search";
			this.collection = new Videos(this.type, this.model, this.startIndex);
			this.collection.on("completed", this.render, this);
			this.on("scrollBottom", this.scrollBottom);
		}
		else{
			this.collection = new Videos();
			this.collection.on("completed", this.render, this);
			this.collection.getPopular();
		}
        },
	
	scrollBottom: function(){		
		this.startIndex = this.startIndex + 5;
		this.collection = new Videos(this.type, this.model, this.startIndex);
		this.collection.on("completed", this.renderSub, this);
	},
       
        render: function (eventName) {
           $(this.el).html(template);
	   //remember the query typed
	   if(this.model && document.getElementById('query_field')) document.getElementById('query_field').value = this.model;
           for(i=0;i<this.collection.length-1;i++){		   
                $(this.el).append(new videoItemView({
                    model : this.collection.get(i)                    
                  }).render().el);
            }
	    
            return this;
        },
	
	renderSub: function(eventName){

	    for(i=0;i<this.collection.length-1;i++){		   
                $(this.el).append(new videoItemView({
                    model : this.collection.get(i)                    
                  }).render().el);
            }
	    
            return this;
	}
       
      });

    return searchView;

  });
