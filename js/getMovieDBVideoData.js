function getMovieDBVideoInfoData (id) { 
	// alert(id);
	var xmlURL = '', xmlURL2 = '';

	xmlURL = 'json/moviedb/video/' + id + '.json';
	xmlURL2 = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=19ea661a075713d318c101d92da8e0a1&callback=?';

	$.getJSON(xmlURL)
    .done(function(data) { getMovieDBVideoInfoDataSuccess(data, id); console.log('getMovieDBVideoInfoData success'); })
    .fail(function() {
		$.getJSON(xmlURL2)
			.done(function(data) { getMovieDBVideoInfoDataSuccess(data, id); console.log('getMovieDBVideoInfoData failover success'); })
			.fail(function() { getMovieDBVideoInfoDataError() ; });
	});
}


function getMovieDBVideoInfoDataSuccess (result, id) {
	var site = '', trailerKey = 0, trailerId = '';;

	$.each(result.results, function(i, row) {
		if (i == 0) {trailerId = row.key; site = row.site;}
	});
	// alert(navigator.userAgent);
	// alert(navigator.userAgent.search("Windows"));
	if (isPhoneGap()) {
		trailerKey = '<div style=\"float: left;\"><img src=\"images/misc/play.png\" width=\"72\" tabindex=\"1\" id=\"playButton\" onclick=\"playVideo(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" /></div>';
			trailerKey += '<div class=\"transparentButton\" style=\"float: left;\"><a href=\"trailer.html?id=' + trailerId + '\"><img src=\"images/background/trailer-button-128.png\" width=\"72\" tabindex=\"1\" id=\"playButton\" ></a></div>';
	} else if (navigator.userAgent.search("iPad") > -1 || isMobileDevice()) {
		trailerKey = '<div style=\"float: left;\"><img src=\"images/misc/play.png\" width=\"72\" tabindex=\"1\" id=\"playButton\" 	onclick=\"window.location.assign(\'http://distribution.videos.mayo.edu:1935/vod/_definst_/library/clips/' + id + '.mp4/playlist.m3u8\')\" /></div>';
		trailerKey += '<div class=\"transparentButton\" style=\"float: left;\"><img src=\"images/background/trailer-button-128.png\" width=\"72\" tabindex=\"1\" id=\"playButton\"  onclick=\"window.location.assign(\'https://www.youtube.com/v/' + trailerId + '?rel=0&autoplay=1\')\" /></div>';
	} else {
		trailerKey = '<div style=\"float: left;\"><img src=\"images/misc/play.png\" tabindex=\"1\" id=\"playButton\" onclick=\"window.location.assign(\'http://rofiwa001a.mayo.edu/library/clips/' + id + '.mp4\')\"; /></div>';
		if (trailerId != '') {
			trailerKey += '<div class=\"transparentButton\"><img src=\"images/background/trailer-button-128.png\" width=\"128\" height=\"128\" tabindex=\"1\" id=\"playButton\" 	onclick=\"window.location.assign(\'https://www.youtube.com/v/' + trailerId + '?rel=0&autoplay=1\')\"; /></div>';
		}
	}
	// alert(trailerKey);
	// $("#trailerPlay").html(trailerKey);
	// document.getElementById('playButton').focus();
}

function getMovieDBVideoInfoDataError (XMLHttpRequest, textStatus, errorThrown) {
	// display error message regarding request results 
	console.log('getMovieDBVideoInfoData failover failure');
    // alert('getMovieDBVideoInfoDataError failure');
	showMessage('Trouble finding movie: getMovieDBVideoInfoDataError failure.','','Sorry, we are currently experiencing problems.');
}