define(["jquery", "underscore", "ractive", "models/Video"],
    function ($,_,Ractive,Video) {

    var Videos = Backbone.Collection.extend({
        model: Video,
	    
	initialize: function(type, query,  startIndex){
		if(type == "search"){
			this.searchVideos(query, startIndex);
		}
		else if(type=="related"){
			this.relatedVideos(query, startIndex);
		}
	},    
	
	fillVideo: function(entries, collection){
		for(i=0; i<entries.length; i++){		
			this.video = new Video();
			this.video.id = i;
			this.video.thumbnail = entries[i].media$group.media$thumbnail[0].url
			this.video.title = entries[i].title.$t;
			this.video.link = entries[i].link[0].href;
			this.video.author = entries[i].author[0].name.$t;
			this.video.thumbnail = entries[i].media$group.media$thumbnail[0].url;
			this.video.duration = 0;
			if(entries[i].media$group.media$content) this.video.duration = entries[i].media$group.media$content[0].duration;
			this.video.seconds = (this.video.duration % 60<10)? '0'+this.video.duration % 60 : this.video.duration % 60;
			this.video.time = Math.floor(this.video.duration / 60) +":"+ this.video.seconds;
			//qualche volta possono esserci degli errori sul fatto che il viewcount non e definito
			this.video.published =  new Date(entries[i].published.$t);
			this.video.hd = entries[i].yt$hd;
			collection.add(this.video);
		}
		collection.trigger("completed");
	},
	
        //firebase: new Firebase("https://cicero.firebaseio.com/pois"),
	getPopular : function(){	
		var collection = this;
		var oReq = new XMLHttpRequest({ mozSystem: true });		
		oReq.onreadystatechange = function (event) {
		    var xhr = event.target;		    
		    if (xhr.readyState === 4 && xhr.status === 200) {							
				var data = JSON.parse(xhr.responseText);
				var feed = data.feed;
				var entries = feed.entry || [];														
				collection.fillVideo(entries, collection);
		    }
		};		
		oReq.open("get", 'https://gdata.youtube.com/feeds/api/standardfeeds/most_popular?alt=json&max-results=7', true);			
		oReq.send();
	},
	
	searchVideos : function(query, startIndex){
		var collection = this;
	        var oReq = new XMLHttpRequest({ mozSystem: true });		
		oReq.onreadystatechange = function (event) {
		    var xhr = event.target;		    
		    if (xhr.readyState === 4 && xhr.status === 200) {							
				var data = JSON.parse(xhr.responseText);
				var feed = data.feed;
				var entries = feed.entry || [];		
				collection.fillVideo(entries, collection);
		    }
		};		
		oReq.open("get", 'http://gdata.youtube.com/feeds/api/videos?alt=json&start-index='+startIndex+'&max-results=5&q='+query, true);			
		oReq.send();
	},
	
	relatedVideos : function(id, startIndex){
		var collection = this;
	        var oReq = new XMLHttpRequest({ mozSystem: true });		
		oReq.onreadystatechange = function (event) {
		    var xhr = event.target;		    
		    if (xhr.readyState === 4 && xhr.status === 200) {							
				var data = JSON.parse(xhr.responseText);
				var feed = data.feed;
				var entries = feed.entry || [];		
				collection.fillVideo(entries, collection);
		    }
		};		
		oReq.open("get", 'https://gdata.youtube.com/feeds/api/videos/'+id+'/related?v=2&start-index='+startIndex+'&max-results=5&alt=json', true);			
		oReq.send();
	},
	
      });

    return Videos;

  });

