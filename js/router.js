define(["jquery", "underscore", "backbone", "utils","collections/Videos","views/searchView", "views/playerView",  "views/topStructureView"],
    function ($, _,Backbone,Utils,Videos,searchView,playerView, topStructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "index",
	"index": "index",
        "watch/:link": "watch",
        "search/:query": "search",
	"channel/:author": "channel"
      },

      initialize: function () {
	this.currentView = undefined;
	this.addCustomEvents();
	Utils.setAppRouter(this);
	      
	$('#header').append((new topStructureView()).el);
      },
     
      index: function(){
	var index = new searchView({collection: (new Videos("popular", '', 1)), model:"popular"});
	this.changePage(index);
      },
      
      watch: function(link){
	var player = new playerView({model : link});
	this.changePage(player);
      },
      
      search: function(query){
	 var search = new searchView({collection: (new Videos("search", query, 5)), model:"search"});
	 this.changePage(search);
      },
      
      channel: function(author){
	var channel = new searchView({collection: (new Videos("channel", author, 5)), model : "channel"});
	this.changePage(channel);
      },
      
      getCurrentView: function(){
	return this.currentView;
      },
      
      addCustomEvents: function(){
	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() >= $(document).height()) {		   
		   if(Utils.appRouter){
			Utils.appRouter.getCurrentView().trigger("scrollBottom");
		   }
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
