define(["jquery", "underscore", "backbone", "ractive","views/videoDLItemView","collections/Videos","utils","text!templates/searchView.html"],
    function ($, _, Backbone, Ractive, videoDLItemView,Videos,Utils,template) {

    var searchDLView = Backbone.View.extend({

        template: new Ractive({template: template}),
       
        events : {
            "tap #search_button" : "searchVideos",
	    "click #search_button" : "searchVideos"
        },
	
	searchVideos: function(callback){
		var query = document.getElementById('query_field').value;
		if(query && Utils.isALink(query)){
			//in this case was inserted a link 
			localStorage.setItem("url", query); 
			Backbone.history.navigate("watch/https", {trigger: true});
		}
		else{
			Backbone.history.navigate("search/"+query, {trigger: true});
		}
	},
	
        initialize: function () {				
		this.startIndex = 5;
		if(this.collection!=undefined){
			this.type = this.model;
			this.query = this.collection.query;
			this.collection.on("completed", this.render, this);
		}
        },
       
        render: function (eventName) {
           $(this.el).html(template);
	   //if(this.model && document.getElementById('query_field')) document.getElementById('query_field').value = this.model;
           for(i=0;i<this.collection.length-1;i++){		   
                $(this.el).append(new videoDLItemView({
                    model : this.collection.get(i)                    
                  }).render().el);
            }
	    
            return this;
        },
	
	renderSub: function(eventName){

	    for(i=0;i<this.collection.length-1;i++){		   
                $(this.el).append(new videoDLItemView({
                    model : this.collection.get(i)                    
                  }).render().el);
            }
	    
            return this;
	}
       
      });

    return searchDLView;

  });
