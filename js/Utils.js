(function(){
	var Utils = new Object();
	var fetch_data = function(str){		
		//$.support.cors = true;
		if(str.substring(0,4)=="http" || str.substring(0,3)=="www"){
			//inizializzo la variabile result
			result = false;

			var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
			var match = str.match(regExp);	
			if (match&&match[1].length==11){
				//$.support.cors = true;
				var oReq = new XMLHttpRequest({ mozSystem: true });
				oReq.onload = function() {    
			
					//data = this.responseText;
					//result = display(data, match[1]);
					//comportamento aggressivo -> forzo a ripetere la query se la richiesta in ajax non e andata a buon fine (result == false) e l'ultimo id memorizzato e diverso dall'ID corrente
					if(!result && currentID != lastID) {
						//fetch_data(str);
					}			
				}
				oReq.open("get", 'http://www.youtube.com/watch?client=mv-google&hl=it&gl=GB&v='+match[1]+'&nomobile=1', true);
				//oReq.open("get", 'http://www.youtube.com/get_video_info?video_id='+match[1]+'&eurl=http://localhost:8080/video-js/test.html', true);
				oReq.send();
			}	
			else{			
			}
			
		} 
		
	}
	return Utils;
});