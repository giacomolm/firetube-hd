define(["jquery", "underscore", "backbone", "ractive", "collections/Videos","utils","views/searchView","text!templates/playerView.html"],
    function ($, _, Backbone, Ractive, Videos, Utils, searchView, template) {

    var playerView = Backbone.View.extend({
       
        events : {
            "touchend #formats li" : "changeFormat",
	    "mousedown #formats li" : "changeFormat",
        },
	
        initialize: function () {
		this.collection = new Videos();
		this.collection.on("completed", this.setVideos, this);
		Utils.display(this.model, this.collection);
		this.relatedView = new searchView({collection : (new Videos("related", this.model, 5)), model : this.model});
		//this.on("scrollBottom", this.relatedView.trigger("scrollBottom"));
        },
	
	setVideos: function(){
		this.data = this.collection.get(0);	
		this.render();
	},
       
	changeFormat: function(ev){
		var temp = this.data.urls[0];
		this.data.urls[0] = this.data.urls[$(ev.target).attr("id")];
		this.data.urls[$(ev.target).attr("id")] = temp;
		this.render();
	},

        render: function (eventName) {
            this.template = new Ractive({el : $(this.el), template: template, data: this.data});	    	    
	    $(this.el).append(this.relatedView.el);
            return this;
        }
       
      });

    return playerView;

  });
