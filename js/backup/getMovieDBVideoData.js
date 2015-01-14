function getMovieDBVideoInfoData (id) {
	var loopCount = 0, trailerContainer = '', site = '', trailerKey = '';

	if (navigator.userAgent.search("Firefox") != -1 || ((navigator.userAgent.search("Chrome") != -1) && (navigator.userAgent.search("Windows") != -1)) 
		|| ((navigator.userAgent.search("Safari") != -1) && (navigator.userAgent.search("Windows") != -1))  ) {
		trailerKey = '<div style=\"float: left;\"><img src=\"images/misc/play.png\" tabindex=\"1\" id=\"playButton\" onclick=\"window.location.assign(\'http://rofiwa001a.mayo.edu/library/clips/' + id + '.mp4\')\"; /></div>';
		trailerKey += '<div class=\"transparentButton\"><img src=\"images/background/trailer-button-128.png\" width=\"128\" height=\"128\" tabindex=\"1\" id=\"playButton\" onclick=\"window.location.assign(\'https://www.youtube.com/v/hIR8Ar-Z4hw?rel=0&autoplay=1\')\"; /></div>';
	} else if (navigator.userAgent.search("iPad") != -1) {
		trailerKey = '<div style=\"float: left;\"><img src=\"images/misc/play.png\" style=\"background-image:url(\'images/background/blue-button2.jpg\');\" width=\"72\" tabindex=\"1\" id=\"playButton\" 	onclick=\"window.location.assign(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" /></div>';
		trailerKey += '<div class=\"transparentButton\" style=\"float: left;\"><img src=\"images/background/trailer-button-128.png\" width=\"72\" tabindex=\"1\" id=\"playButton\"  onclick=\"window.location.assign(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" /></div>';
	} else {
		trailerKey = '<div style=\"float: left;\"><img src=\"images/misc/play.png\" style=\"background-image:url(\'images/background/blue-button2.jpg\');\" width=\"72\" tabindex=\"1\" id=\"playButton\" onclick=\"playVideo(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" /></div>';
		trailerKey += '<div class=\"transparentButton\" style=\"float: left;\"><img src=\"images/background/trailer-button-128.png\" width=\"72\" tabindex=\"1\" id=\"playButton\"  onclick=\"playVideo(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" /></div>';
	}
	// alert(trailerKey);
	$("#trailerPlay").html(trailerKey);
	document.getElementById('playButton').focus();
}

function getMovieDBVideoInfoDataError (XMLHttpRequest, textStatus, errorThrown) {
	// display error message regarding request results 
    alert('getMovieDBVideoInfoDataError failure' + XMLHttpRequest.status + textStatus + errorThrown);
}