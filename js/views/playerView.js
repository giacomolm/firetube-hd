define(["jquery", "underscore", "backbone", "ractive", "collections/Videos","utils","views/searchView","text!templates/playerView.html"],
    function ($, _, Backbone, Ractive, Videos, Utils, searchView, template) {

    var playerView = Backbone.View.extend({
       
        events : {
            "change #formats" : "changeFormat",
        },
	
        initialize: function () {
		//i'm creating an empty collection in order to fill the right model, throught the display method
		this.collection = new Videos();
		this.collection.on("completed", this.setVideos, this);
		
		if(!Utils.isALink(this.model)){
			Utils.display(this.model, this.collection);
			var relatedView = new searchView({collection : (new Videos("related", this.model, 5)), model : "related"});
			this.relatedView = relatedView;
			this.on("scrollBottom", function(){				
				relatedView.trigger("scrollBottom");
			});
			Utils.setHistory(this.model);
		}
		else Utils.displayOnly(localStorage.getItem("url"), this.collection);
		//this.on("scrollBottom", this.relatedView.trigger("scrollBottom"));
        },
	
	setVideos: function(){
		this.data = this.collection.get(0);	
		this.render();
	},
       
	changeFormat: function(ev){
		var id = (ev.target).value;
		//switch the first element of the collection
		var temp = this.data.urls[0];
		this.data.urls[0] = this.data.urls[id];
		this.data.urls[id] = temp;
		//return to top once changed
		window.scrollTo(0,0);
		this.render();
	},

        render: function (eventName) {
	    Utils.getVideoPlayer().src = this.data.urls[0].url;
	    Utils.getVideoPlayer().poster = this.data.thumbnail;	
            this.template = new Ractive({el : $(this.el), template: template, data: this.data});	    	    
	    if(this.relatedView) $(this.el).append(this.relatedView.el);
            return this;
        }
       
      });

    return playerView;

  });
