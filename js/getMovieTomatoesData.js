function getMovieTomatoesData (id) {
	var xmlURL = '', xmlURL2 = '';
	xmlURL = 'xml/tomatoes/' + id.replace('tt','') + '.json';
	xmlURL2 = 'http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?type=imdb&id=' + id.replace('tt','') + ' &apikey=bs7crnfq76tt2w3z66xs6sqx&callback=?';
	// alert(xmlURL);

	$.getJSON(xmlURL)
    .done(function(data) { searchCallback(data); console.log('getMovieTomatoesData success'); })
    .fail(function() {
		$.getJSON(xmlURL2)
			.done(function(data) { searchCallback(data); console.log('getMovieTomatoesData failover success'); })
			.fail(function() {getMovieTomatoesDataError() });
	});

	function searchCallback(data) {
		var movies = data.movies, tomatoesContainer = '';
		if (data.studio) {$("#studio").html(data.studio + '<br />');}
		if (data.ratings.critics_score > 59) {
			tomatoesContainer = 'Critics: <img src="images/tomatoes/fresh.png" width="14" /> ' + data.ratings.critics_score + '%';
		} else if (data.ratings.critics_score > 0) {
			tomatoesContainer = 'Critics: <img src="images/tomatoes/rotten.png" width="14" /> ' + data.ratings.critics_score + '%';
		}

		if (data.ratings.audience_score > 59) {
			tomatoesContainer += '&nbsp;&nbsp;&nbsp;Audience: <img src="images/tomatoes/popcorn.png" width="14" /> '+ data.ratings.audience_score + '%';
		} else  if (data.ratings.audience_score > 0){
			tomatoesContainer += '&nbsp;&nbsp;&nbsp;Audience: <img src="images/tomatoes/spilt.png" width="14" /> ' + data.ratings.audience_score + '%';
		}
		$("#Tomatoes").html(tomatoesContainer);
		if (data.mpaa_rating != '' && data.mpaa_rating != 'Unrated') {
			$("#rating").html('<img src="images/logo/rated/' + data.mpaa_rating + '.png" align=right/>');
		}

	}

}

function getMovieTomatoesDataError (XMLHttpRequest, textStatus, errorThrown, id) {
	// display error message regarding request results
	console.log('getMovieTomatoesData failover falire');
    alert('Tomatoes failure');
}