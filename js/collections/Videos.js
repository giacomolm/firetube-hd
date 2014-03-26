define(["jquery", "underscore", "ractive", "models/Video", "utils"],
    function ($,_,Ractive,Video, Utils) {

    var Videos = Backbone.Collection.extend({
        model: Video,
	    
	initialize: function(type, query,  startIndex){
		//instanciate the desidered video collection  based on the type passed 
		this.query = query;
		if(type == "search"){
			this.searchVideos(query, startIndex);
		}
		else if(type=="related"){
			this.relatedVideos(query, startIndex);
		}
		else if(type=="channel"){
			this.searchChannel(query,startIndex);
		}
		else if(type=="popular"){
			this.getPopular(startIndex);
		}
		else if(type=="latest"){
			this.latestVideos(startIndex);
		}
	},    
	
	fillVideo: function(entries, collection){
		for(i=0; i<entries.length; i++){		
			this.video = new Video();
			this.video.id = i;
			this.video.thumbnail = entries[i].media$group.media$thumbnail[0].url
			this.video.title = entries[i].title.$t;
			this.video.link = entries[i].link[0].href;
			this.video.author = entries[i].author[0].uri.$t.substr(entries[i].author[0].uri.$t.lastIndexOf("/")+1);//entries[i].author[0].name.$t;
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
	
	getPopular : function(startIndex){	
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
		this.url = 'https://gdata.youtube.com/feeds/api/standardfeeds/most_popular?alt=json&start-index='+startIndex+'&max-results=5';
		oReq.open("get", this.url, true);			
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
		this.url = 'http://gdata.youtube.com/feeds/api/videos?alt=json&start-index='+startIndex+'&max-results=5&q='+query;
		oReq.open("get", this.url , true);			
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
		this.url = 'https://gdata.youtube.com/feeds/api/videos/'+id+'/related?v=2&start-index='+startIndex+'&max-results=5&alt=json';
		oReq.open("get", this.url, true);			
		oReq.send();
	},
	
	searchChannel: function(author, startIndex){
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
		oReq.open("get", 'http://gdata.youtube.com/feeds/api/videos?alt=json&start-index='+startIndex+'&max-results=5&author='+author, true);			
		oReq.send();
	},
	
	latestVideos: function(startIndex){
		var collection = this;
		var entries = new Array();
		var history = JSON.parse(Utils.getHistory());
		for(i=startIndex-5; i<Math.min(history.length,startIndex); i++){
			var infoReq = new XMLHttpRequest({ mozSystem: true });
			infoReq.onreadystatechange = function (event) {
			    var xhr = event.target;
			    var data = xhr.responseText;
			    if (xhr.readyState === 4 && xhr.status === 200 ) {
				var entry = (JSON.parse(data)).entry;
				entries[entries.length] = entry;
				if((entries.length == 5) || (((startIndex-5)+entries.length)==history.length)){
					collection.fillVideo(entries, collection);
				}
			     }
			};

			infoReq.open("get", 'http://gdata.youtube.com/feeds/api/videos/'+history[i]+'?v=2&alt=json', true);		
			infoReq.send();
		}
	}
      });

    return Videos;

  });

