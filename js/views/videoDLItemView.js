define(["jquery", "underscore", "backbone", "ractive","utils", "text!templates/videoDLItemView.html"],
    function ($, _, Backbone, Ractive,Utils,template) {

    var videoDLItemView = Backbone.View.extend({
       
        //template: new Ractive({template: template}),
       
        events: {
		"tap" : "openVideo",
		"mousedown" : "openVideo",
	},

        initialize: function () {

        },

	openVideo : function(){
		Utils.getVideoPlayer().src = this.model.urls[0].url;
	},
	
        render: function (eventName) {	    
		this.template = new Ractive({el : $(this.el), template: template, data : this.model});
		return this;
        }
       
      });

    return videoDLItemView;

  });
