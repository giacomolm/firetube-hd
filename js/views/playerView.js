define(["jquery", "underscore", "backbone", "ractive", "collections/Videos","utils","views/searchView","views/searchDLview","text!templates/playerView.html"],
    function ($, _, Backbone, Ractive, Videos, Utils, searchView, searchDLView,template) {

    var playerView = Backbone.View.extend({
	    
        events : {
            "change #formats" : "changeFormat",
        },
	
        initialize: function () {
		if(this.model) this.setModel(this.model);
        },
	
	setModel: function(model){
		//i'm creating an empty collection in order to fill the right model, throught the display method
		this.collection = new Videos();
		if(!Utils.isALink(model)){
			this.collection.on("completed", this.setVideos, this);
			Utils.display(model, this.collection);
			var relatedView = new searchView({collection : (new Videos("related", model, 5)), model : "related"});
			this.relatedView = relatedView;
			//propagate the scroll event on subview
			this.on("scrollBottom", function(){				
				relatedView.trigger("scrollBottom");
			});
			Utils.setHistory(model);
		}
		else {
			this.collection.on("completed", this.setDLVideos, this);
			this.relatedView = new searchDLView({collection : this.collection, model : "url"});
			Utils.displayOnly(localStorage.getItem("url"), this.collection);
		}
		
		//propagate the change event when the current view is different from the video player
		this.on('change', function(ev){ this.changeFormat(ev);},  this);
	},
	
	setVideos: function(){
		this.data = this.collection.get(0);	
		this.render();
	},
	
	setDLVideos: function(){
		this.data = this.collection.get(0);
		this.render();
	},
       
	changeFormat: function(ev,a,b){
		var id = (ev.target).value;
		//return to top once changed
		window.scrollTo(0,0);
		Utils.getVideoPlayer().src = this.data.urls[id].url;
	},

        render: function (eventName) {
	    
	    //IMPORTANT: i'm not appending the video info to the current div, but under the video	
            this.template = new Ractive({el : $('#player'), template: template, data: this.data});
	    
	    if(this.relatedView) $("#container").html(this.relatedView.el);
            return this;
        }
       
      });

    return playerView;

  });
