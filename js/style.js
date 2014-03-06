/*
Here you can insert all function related to style manipulation through javascript
*/
function resizeBody(){
	var video_player = document.getElementById('video_player');
	lastW = $(window).width();
	if(video_player){
		if($(window).height() >= $(window).width())
			{
				video_player.width =$(window).width()*95/100;
				video_player.style.height = "auto";
			}
			
		else   {
			lastW = video_player.width;
			video_player.style.height =$(window).height();
			video_player.width =$(window).width()*95/100;
		}
	}
}