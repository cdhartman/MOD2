function getMovieDBCastData (id) {
	var xmlURL = '', xmlURL2 = '';
	xmlURL = 'xml/moviedb/cast/' + id + '-cast.json'; dataType = 'json';
	xmlURL2 = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=19ea661a075713d318c101d92da8e0a1'; dataType = 'json';
	// alert(xmlURL);

	$.getJSON(xmlURL)
		.done(function(data) { parseAndDisplayCastInfo(data, id); console.log('getMovieDBCastData success'); })
		.fail(function() {
			$.getJSON(xmlURL2)
				.done(function(data) { parseAndDisplayCastInfo(data, id); console.log('getMovieDBCastData failover success'); })
				.fail(function() { getMovieDBCastDataError(); });
	});

}

function parseAndDisplayCastInfo(result, id) {
	
	var loopCount = 0, totalCastCount = 0, castContainer = "", directorContainer = "", writersContainer = '', additionalCastContainer = '';
	castContainer += '<div class=\"carousel-inner\" style=\"padding: 0;\"><div class="item active"><div class=\"row\" id=\"col-xs-3-cast\">';
	$.each(result.cast, function(i, row) {
		loopCount++;
		totalCastCount++
		// console.log(JSON.stringify(row));
		if (totalCastCount < 7) {
			castContainer += '<div class=\"col-xs-3-cast\">';
			if (row.profile_path != null) {
				// castContainer += '<div><img align=\"left\" class=\"castPhoto reflectBelow2\" src=\"http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w150' + row.profile_path + '\" height=\"278\" /></div>';
				castContainer += '<div><img align=\"left\" class=\"castPhoto reflectBelow2\" src=\"images/movies/cast/' + id + row.profile_path + '\" onerror=\"imageError(this, \'cast\',\'' + row.profile_path + '\');\" /></div>';
			} else {
				castContainer += '<div><img class=\"castPhoto\"src=\"images/misc/cast.png\" height=\"278\" /></div>';
			}
			castContainer += '<div class=\"col-xs-3-cast-label\">' + row.name + '';
			castContainer += '<br><span class=\"plain\" id=aaaa>' + row.character + '</span></div></div>';
		} else if (totalCastCount < 12) {
			additionalCastContainer += row.name + '<br />';
		} else if (totalCastCount == 12) {
			additionalCastContainer += '...';
		}
		if(loopCount == 6) {castContainer += '</div></div>'; loopCount = 0;}
		// if(totalCastCount > 6) {if (totalCastCount < 12) {additionalCastContainer += row.name + '<br />'; if (totalCastCount == 14) {additionalCastContainer += '...';}}}
	});
	
	var loopCountDirectors = 0, loopCountWriters = 0;
	$.each(result.crew, function(i, row) {
		if (row.job == 'Director') {
			if (directorContainer == '') {directorContainer = row.name} else {directorContainer += '<br />' + row.name};
		}
		if (row.department == 'Writing') {
			loopCountWriters++;
			if (loopCountWriters < 7) {
				if (writersContainer == '') {writersContainer = row.name + ' (' + row.job + ')'} else {writersContainer += '<br />' + row.name + ' (' + row.job + ')'};
				if (loopCountWriters == 6) {writersContainer += '<br />...';}
			}
		}
	});
	$('#director').html(directorContainer);
	if (loopCountWriters == 0) {$('#writerHeader').html('');}
	$('#writer').html(writersContainer);
	$('#additionalCastContainer').html(additionalCastContainer);
	
	castContainer += '</div></div></div>';
	// castContainer += '<a class=\"left carousel-control left-carousel-control\" href=\"#myCarouselCast\" data-slide=\"prev\"></a><a class=\"right carousel-control right-carousel-control\" href=\"#myCarouselCast\" data-slide=\"next\"></a>';
	castContainer += '</div>';
	// alert(castContainer)
	$("#myCarouselCast").html(castContainer);
	// $('.col-xs-3-cast-label').textfill();
	// adjustHeights('.col-xs-3-cast-label');
	initializeCarousel('myCarouselCast');
	// $('#cast-list').listview('refresh');
	// $( ".movieDetailBlock" ).resizable({});

}

function getMovieDBCastDataError (XMLHttpRequest, textStatus, errorThrown) {
	// display error message regarding request results
	console.log('getMovieDBCastData failover failure');
    alert('getMovieDBCastDataError failure');
}