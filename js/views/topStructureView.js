define(["jquery", "backbone", "ractive","utils","text!templates/topStructureView.html"],
    function ($, Backbone, Ractive, Utils, template) {

    var topStructure = Backbone.View.extend({

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
		this.render();		
        },
	
       
        render: function (eventName) {
           $(this.el).html(template);
	    
            return this;
        },

       
      });

    return topStructure;

  });
