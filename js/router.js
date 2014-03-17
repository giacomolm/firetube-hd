define(["jquery", "underscore", "backbone", "utils","collections/Videos","views/searchView", "views/playerView",  "views/topStructureView"],
    function ($, _,Backbone,Utils,Videos,searchView,playerView, topStructureView) {

    var AppRouter = Backbone.Router.extend({

      routes: {
        "": "index",
	"index": "index",
        "watch/:link": "watch",
        "search/:query": "search",
	"channel/:author": "channel",
	"latest": "latest"
      },

      initialize: function () {
	this.currentView = undefined;
	this.addCustomEvents();
	Utils.setAppRouter(this);
	
	//initially, append the top div (containing the menu)
	this.headerView = new topStructureView();
	$('#header').append(this.headerView.el);
      },
     
      index: function(){
	var index = new searchView({collection: (new Videos("popular", '', 1)), model:"popular"});
	this.headerView.setTitle('Firetube');
	this.changePage(index);
      },
      
      watch: function(link){
	var player = new playerView({model : link});
	this.headerView.setTitle('Video');
	this.changePage(player);
      },
      
      search: function(query){
	 var search = new searchView({collection: (new Videos("search", query, 5)), model:"search"});
	 this.headerView.setTitle('Search: '+query);
	 this.changePage(search);
      },
      
      channel: function(author){
	var channel = new searchView({collection: (new Videos("channel", author, 5)), model : "channel"});
	this.headerView.setTitle('Channel: '+author);
	this.changePage(channel);
      },
      
      latest: function(){
	var latest = new searchView({collection: (new Videos("latest",  '', 5)), model : "latest"});
	this.headerView.setTitle('Latest');
	this.changePage(latest);
      },
      
      getCurrentView: function(){
	return this.currentView;
      },
      
      addCustomEvents: function(){
	//propagate the scroll event to the current view
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
