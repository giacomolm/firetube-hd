define(["jquery", "underscore", "backbone", "ractive","utils", "text!templates/videoItemView.html"],
    function ($, _, Backbone, Ractive,Utils,template) {

    var videoItemView = Backbone.View.extend({
       
        //template: new Ractive({template: template}),
       
        events: {
		"tap" : "openVideo",
		"mousedown" : "openVideo",
	},

        initialize: function () {

        },

	openVideo : function(){
		 var id = Utils.fetch_data(this.model.link);
		 Backbone.history.navigate("watch/"+id, {trigger: true});
	},
	
        render: function (eventName) {	    
	    this.template = new Ractive({el : $(this.el), template: template, data : this.model});
            return this;
        }
       
      });

    return videoItemView;

  });
