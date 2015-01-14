function getMovieByCategories (category, targetContainer) {
	var xmlURL = '', xmlURL2 = '';
	xmlURL = 'json/categories/' + category + '.json'; dataType = 'json';
	xmlURL2 = 'https://api.themoviedb.org/3/movie/' + category + '/credits?api_key=19ea661a075713d318c101d92da8e0a1'; dataType = 'json';
	// alert(xmlURL);

	$.getJSON(xmlURL)
		.done(function(data) { parseAndDisplayCategoryMovies(data, category, targetContainer); console.log('getMovieByCategories success'); })
		.fail(function() {
			$.getJSON(xmlURL2)
				.done(function(data) { parseAndDisplayCastInfo(data, category); console.log('getMovieByCategories failover success'); })
				.fail(function() { getMovieByCategoriesError(); });
	});

}

function parseAndDisplayCategoryMovies(result, category, targetContainer) {
	
	var loopCount = 0, outputContainer = "", genre = '', sectionNumber = '', rowNumber = '';
	genre = result.genre;
	sectionNumber = result.section;
	outputContainer += '\n\t';
	outputContainer += '<div class="carousel-inner">';
	outputContainer += '\n\t';
	// outputContainer += genre + sectionNumber + result.movies[0].row;
	
	$(result.movies).each(function(rowIndex, row1){
		outputContainer += '\t'
		if (rowIndex == 0) {outputContainer += '<div class=\"item active\">'; } else {outputContainer += '\n\t\t<div class=\"item\">'};
		outputContainer += '\n\t\t\t<div class=\"row\">\n'
		rowNumber = row1.row;
		$(row1.titles).each(function(columnIndex, row2){
			if (rowIndex == 0 && columnIndex == 0) {// outputContainer += row2.title + row2.movieDBID + row2.imdbID;
				outputContainer += '\t\t\t\t';
				outputContainer += '<div class=\"col-xs-3-prev\"></div>';
				outputContainer += '\n';
			} else if (columnIndex == 0) {// outputContainer += row2.title + row2.movieDBID + row2.imdbID;
				outputContainer += '\t\t\t\t';
				outputContainer += '<div class=\"col-xs-3-prev\" onclick=\"activeItem(\'' + genre + '\',\'' + row2.rowTarget + '\',\'' + sectionNumber + rowIndex + '8\')\">';
				outputContainer += '\n\t\t\t\t\t';
				outputContainer += '<a href=\"#myCarousel' + genre + '\" data-slide=\"prev\" tabindex=\"' + sectionNumber + rowNumber + columnIndex + '\" genre=\"' + genre + '\" row=\"' + rowNumber + '\" column=\"0\" id=\"' + genre + 'PrevRow2\">';
				outputContainer += '\n\t\t\t\t\t';
				outputContainer += '<img src=\"images/movies/photos/' + row2.movieDBID + '/' + row2.movieDBID + '.jpg\" class=\"movieArt previousMovieGroup\" onerror=\"imgPosterError(this);\" />';
				outputContainer += '</a>';
				outputContainer += '\n\t\t\t\t';
				outputContainer += '</div>';
				outputContainer += '\n\t';
				
			} else if(columnIndex == 9) {
				outputContainer += '\t\t\t\t';
				outputContainer += '<div class=\"col-xs-3-next\" onclick=\"activeItem(\'' + genre + '\',\'' + row2.rowTarget + '\',\'' + sectionNumber + row2.rowTarget + '1\');\">';
				outputContainer += '\n\t\t\t\t\t';
				outputContainer += '<a href=\"#myCarousel' + genre + '\" data-slide=\"next\" tabindex=\"' + sectionNumber + rowNumber + columnIndex + '\" id=\"' + genre + 'NextRow1\" genre=\"' + genre + '\" row=\"' + rowNumber + '\" column=\"9\" class=\"nextMovieGroup thumbnail\">';
				outputContainer += '\n\t\t\t\t\t';
				outputContainer += '<img src=\"images/movies/photos/' + row2.movieDBID + '/' + row2.movieDBID + '.jpg\" class=\"movieArt nextMovieGroup\" onerror=\"imgPosterError(this);\" /></a>';
				outputContainer += '\n\t\t\t\t';
				outputContainer += '</div>';
				outputContainer += '\n\t\t\t';
				outputContainer += '</div>';
				outputContainer += '\n\t\t\t';
				
			} else {
				outputContainer += '\t\t\t\t';
				outputContainer += '<div class=\"col-xs-3\">\n';
				outputContainer += '\t\t\t\t\t';
				outputContainer += '<a href="movie.html?id1=' + row2.imdbID + '=&id2=' + row2.movieDBID + '&c=' + genre 
					+ '\" class=\"thumbnail\" tabindex=\"' + sectionNumber + rowNumber + columnIndex + '\" genre=\"' + genre + '\" row=\"' + rowNumber + '\" column=\"' + columnIndex + '\" id=\"' + genre + 'Row' + rowNumber + 'Item' + columnIndex + '\"'
					+ 'onclick=\"activeItem(\'' + genre + '\',\'' + rowNumber + '\',\'' + sectionNumber + rowNumber + columnIndex + '\');\">';
				outputContainer += '\n\t\t\t\t\t\t';
				outputContainer += '<img src=\"images/movies/photos/' + row2.movieDBID + '/' + row2.movieDBID + '.jpg\" class=\"movieArt\" onerror=\"imageError(this,\'poster\');\" />';
				outputContainer += '\n\t\t\t\t\t';
				outputContainer += '</a>\n';
				outputContainer += '\t\t\t\t\t';
				outputContainer += '<div class=\"movieTitle\">' + formatMovieTitle(row2.title) + ' <span class=\"fullMovie\">' + row2.format + '</span></div>\n';
				outputContainer += '\t\t\t\t';
				outputContainer += '</div>\n';
			}
		});
		outputContainer += '\n\t\t\t';
		outputContainer += '</div>';
	});
	// $.each(result.movies.titles, function(i, row) {
		//outputContainer += 'e';
	// });
	outputContainer += '\n\t\t</div>\n\t\t';
	$("#" + targetContainer).html(outputContainer);

}

function formatMovieTitle (title) {
	if (title.length > 18) {title = title.substring(0, 18) + '...';}
	return title;
}

function getMovieByCategoriesError (XMLHttpRequest, textStatus, errorThrown) {
	// display error message regarding request results
	console.log('getMovieByCategoriesError failover failure');
    alert('getMovieByCategoriesError failure');
}