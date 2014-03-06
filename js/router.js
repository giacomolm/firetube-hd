define(["jquery", "underscore", "backbone", "utils","views/searchView", "views/playerView"],
    function ($, _,Backbone,Utils,searchView,playerView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "index",
	"index": "index",
        "watch/:link": "watch",
        "search/:query": "search",
      },

      initialize: function () {
        this.currentView = undefined;
	this.addCustomEvents();
	Utils.setAppRouter(this);
      },
     
      index: function(){
          var index = new searchView();
          this.changePage(index);
      },
      
      watch: function(link){
	var player = new playerView({model : link});
	this.changePage(player);
      },
      
      search: function(query){
	 var search = new searchView({model : query});
	 this.changePage(search);
      },
      
      getCurrentView: function(){
		return this.currentView;
	},
      
      addCustomEvents: function(){
	      
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {		   
		   if(Utils.appRouter)
			Utils.appRouter.getCurrentView().trigger("scrollBottom");
	   }
	});
       },
	
      changePage: function (page) {
        $('#container').empty();
        this.currentView = page;
        $('#container').append($(this.currentView.el));
      }

    });

    return AppRouter;

  });
