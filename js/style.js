/*
Here you can insert all function related to style manipulation through javascript
*/
function resizeBody(){
	var video_player = document.getElementById('video_player');
	var video_content = document.getElementById('content');
	lastW = $(window).width();
	if(video_player && window.pageYOffset<video_player.offsetTop+video_player.offsetHeight){ //we have to remember that the div containing the video is visible
		if($(window).height() >= $(window).width())
			{
				video_player.width =$(window).width()*95/100;
				video_player.style.height = "auto";
				video_content.style.height = video_player.offsetHeight;
			}
			
		else   {
			lastW = video_player.width;
			video_player.style.height =$(window).height();
			video_content.style.height = video_player.offsetHeight;
			video_player.width =$(window).width()*95/100;
			if(lastW != $(window).width()) window.scrollTo(0,video_player.offsetTop);
		}
	}
}

window.onload = function(){
	window.onscroll =function(e){
		var video_player = document.getElementById('video_player');
		var video_content = document.getElementById('content');
		if((window.pageYOffset>video_content.offsetTop+video_content.offsetHeight) && (video_player.style.position != "fixed") && (video_player.currentTime>0)){
			video_player.style.position = "fixed";
			video_player.style.left = "1px";
			video_player.style.bottom = "1px";
			video_player.width = document.body.offsetWidth/2;
			
		}
		else if(window.pageYOffset<=video_content.offsetTop+video_content.offsetHeight){
			video_player.style.position = "relative";
			video_player.width =$(window).width()*95/100;
			video_player.style.height = "auto";
		}
	};
};