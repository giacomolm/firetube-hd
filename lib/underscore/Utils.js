define(["jquery", "models/Video"],
    function ($, Video){
	var Utils = function(){};		
	Utils.fetch_data = function(str){			
		if(str.substring(0,4)=="http" || str.substring(0,3)=="www"){
			//inizializzo la variabile result					
			var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
			var match = str.match(regExp);	
			if (match&&match[1].length==11){
				//$.support.cors = true;
				return match[1];
			}				
		} 		
	};
	
	Utils.display = function(id, collection){
		var oReq = new XMLHttpRequest({ mozSystem: true });
		var video_id = id;
		var temp_collection = collection; //in order to allow visibility inside the ready state method
		oReq.onreadystatechange = function (event) {
		    var xhr = event.target;
		    var results = xhr.responseText;
		    
		    if (xhr.readyState === 4 && xhr.status === 200 ) {
			    var videos = (JSON.parse(results)).videos;
			    if(videos && videos[0]){
				var video = new Video();
				video.id = 0;
				video.ext = videos[0].ext;
				video.urls = videos[0].formats;
				    
				var infoReq = new XMLHttpRequest({ mozSystem: true });
				infoReq.onreadystatechange = function (event) {
				    var xhr = event.target;
				    var data = xhr.responseText;
				    if (xhr.readyState === 4 && xhr.status === 200 ) {
					var entry = (JSON.parse(data)).entry;
					video.title = entry.title.$t;
					video.author = entry.author[0].uri.$t.substr(entry.author[0].uri.$t.lastIndexOf("/")+1);//entries[i].author[0].name.$t;
					video.thumbnail = entry.media$group.media$thumbnail[0].url;
					if(entry.yt$statistics!=undefined)	video.viewcount=  entry.yt$statistics.viewCount;
					temp_collection.add(video);
					temp_collection.trigger("completed");
				     }
				};
				infoReq.open("get", 'http://gdata.youtube.com/feeds/api/videos/'+video_id+'?v=2&alt=json', true);		
				infoReq.send();
				    
			    }
			}
		};
		oReq.open("get", 'http://youtube-dl.appspot.com/api/?url=http://www.youtube.com/watch?v='+id+'', true);		
		oReq.send();							
	};
	
	
	Utils.displayOnly = function(id, collection){
		var oReq = new XMLHttpRequest({ mozSystem: true });
		var video_id = id;
		var temp_collection = collection; //in order to allow visibility inside the ready state method
		oReq.onreadystatechange = function (event) {
		    var xhr = event.target;
		    var results = xhr.responseText;
		    
		    if (xhr.readyState === 4 && xhr.status === 200 ) {
			    var videos = (JSON.parse(results)).videos;
			    if(videos && videos[0]){
				var video = new Video();
				video.id = 0;
				video.ext = videos[0].ext;
				video.urls = videos[0].formats;
				temp_collection.add(video);
			    }
			    temp_collection.trigger("completed");
			}
		};
		oReq.open("get", 'http://youtube-dl.appspot.com/api/?url='+id, true);		
		oReq.send();							
	};
	
	Utils.setAppRouter = function(appRouter){
		Utils.appRouter = appRouter;
	};
	
	Utils.isALink = function(link){
		if(link.length>4 && (link.substring(0,4)=="http" || link.substring(0,3)=="www")) return true
		else return false;
	};
	
	Utils.getVideoPlayer = function(){
		return document.getElementById('video_player');
	};
	
	return Utils;
});
