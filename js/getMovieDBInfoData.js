function getMovieDBInfoData (id) {
	var xmlURL = '', xmlURL2 = '';
	xmlURL = 'json/moviedb/info/' + id + '.json';
	xmlURL2 = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=19ea661a075713d318c101d92da8e0a1&append_to_response=images&include_image_language=en,null';
	// alert(xmlURL);

	$.getJSON(xmlURL)
		.done(function(data) {parseAndDisplayMovieInfo(data, id); console.log('getMovieDBInfoData success'); })
		.fail(function() {
			$.getJSON(xmlURL2)
				.done(function(data) { parseAndDisplayMovieInfo(data, id); console.log('getMovieDBInfoData failover success'); })
				.fail(function() { getMovieDBInfoDataError(); });
	});
}

function parseAndDisplayMovieInfo(result, id) {
	var loopCount = 0, currentPhotoCount = 0, photoContainer = "", genre = '', detailsContent = '', screenBackgroundImage = '', budget = 0, revenue = 0;
	$('#movieDetailTitle').append($(result).attr("title"));
	
	$.each(result.genres, function(i, row) {
		 if (genre != '') {genre = genre + ', ' + row.name} else {genre = row.name}
	});
	if (genre != '') {detailsContent += genre + '<br />';}
	
	
	
	detailsContent += $(result).attr("release_date").substring(0, 4);
	detailsContent += '  &#149;  ' + $(result).attr("runtime") + ' minutes<br />';
	if ($(result).attr("budget") != 0) {
		budget = ($(result).attr("budget")/1000000).toFixed(1);
		detailsContent += 'Budget: $' + budget + 'm<br />';
	}
	if ($(result).attr("revenue") != 0) {
		revenue = ($(result).attr("revenue")/1000000).toFixed(1);
		detailsContent += 'Revenue: $' + revenue + 'm<br />';
	}
	// if ($(result.production_countries).attr('name') != undefined) {detailsContent += 'Country: ' + $(result.production_countries).attr('name') + '<br />';}
	if ($(result.belongs_to_collection).attr('name') != undefined) {detailsContent += 'Collection: ' + $(result.belongs_to_collection).attr('name') + '<br />';}
	if ($(result).attr("overview") != '') {$("#plot").html($(result).attr("overview"));} else {$("#overview").html('');}
	if ($(result).attr("tagline") != '') {$("#tagline").html('Tagline: ' + $(result).attr("tagline"));} else {$("#tagline").html('');}

	$('#poster').html('<img id=\"movieDetailPoster\" class=\"movieDetailPoster reflectBelow\" src=\"http://neo.mayo.edu/cdh/modProject/images/movies/photos/' + id + '/' + id + '.jpg' + '\"  onerror=\"imageError(this, \'posterLarge\',\'' + $(result).attr("poster_path") + '\');\" />');
	$("#detailsContent").html(detailsContent);
	
	photoContainer += '<div class=\"carousel-inner\" style=\"padding: 0;\"><div class="item active"><div class=\"row\">';
	$.each(result.images.backdrops, function(i, row) {
		if (currentPhotoCount < 8) {
			if (screenBackgroundImage == '' && moviePosterBackgroundFlag) {
				screenBackgroundImage = 'http://image.tmdb.org/t/p/original/' + row.file_path; document.body.style.backgroundImage = 'url(\'' + screenBackgroundImage + '\')';
			}
			if (i == 0 && result.images.backdrops.length > 8) {
				
			} else {
				loopCount++; currentPhotoCount++;
				
				
				photoContainer += '<div class=\"col-xs-3-photo\">';
				if (row.file_path != null) {
					// photoContainer += '<img class=\"moviePhoto reflectBelow2\" src=\"http://image.tmdb.org/t/p/w300' + row.file_path + '\" />';
					photoContainer += '<img class=\"moviePhoto reflectBelow2\" src=\"http://neo.mayo.edu/cdh/modProject/images/movies/photos/' + id + row.file_path + '\"  onerror=\"imageError(this, \'photos\',\'' + row.file_path + '\');\" />';
				}
				photoContainer += '</div>';
				if(loopCount == 4) {photoContainer += '</div></div><div><div class=\"row\">'; loopCount = 0;}
			}
		}
	});
	if ($(result.images.backdrops).length == 0) {$("#categoryTitlePhotos").html('');}
	photoContainer += '</div></div></div>';
	photoContainer += '</div>';
	$("#myCarouselPhotos").html(photoContainer);
	window.sessionStorage.setItem('imdb_id',$(result).attr("imdb_id"));
}

function getMovieDBInfoDataError (XMLHttpRequest, textStatus, errorThrown) {
	// display error message regarding request results
	console.log('getMovieDBInfoData failover failure');
    alert('getMovieDBInfoDataError failure');
}