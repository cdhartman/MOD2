function getMovieData (id) {
	var xmlURL = '';
	// xmlURL = 'xml/imdb/' + id2 + '.xml';
	// xmlURL = 'includes/getMovie.cfm?id=' + id;
	xmlURL = 'http://www.omdbapi.com/?i=' + id + '&plot=full';
	// alert(xmlURL);
	// getMoviePoster(id);
	
	$.ajax({
		url: xmlURL,
		dataType: "json",
		async: true,
		success: function (result) {
			ajax.parseJSON(result);
        },
		error: getMovieDataError
	});
	
	var ajax = {  
		parseJSON:function(result){
			// alert(result);
			// $('#movieDetailTitle').html($(result).attr("Title"));
			// $('#genre').html($(result).attr("Genre"));
			// $('#plot').html($(result).attr("Plot"));
			// $('#runtime').html($(result).attr("Runtime"));
			// $('#year').html($(result).attr("Year") + ' (' + $(result).attr("Country") + ')');
			// $('#rated').html('<img src=\"images/logo/rated/' + $(result).attr("Rated").replace(' ','').replace('/','') + '.png\" title=\"' + $(result).attr("Rated") + '\" />');
			
			// actors = $(result).attr("Actors");
			// actors = actors.replace(/\,/g, '<br>');
			// $('#actors').html(actors);
			
			writer = $(result).attr("Writer");
			writer = writer.replace(/\,/g, '<br>');
			// $('#writer').html(writer);
			
			director = $(result).attr("Director");
			director = director.replace(/\,/g, '<br>');
			//  $('#director').html(director);
			
			// $('#poster').html('<img class=\"movieDetailPoster\" src=\"images/movies/' + id + '.jpg\" />');
		}
		
	}
	
}

function getMovieDataError (XMLHttpRequest, textStatus, errorThrown) {
	// display error message regarding request results 
    alert('getMovieDataError failure' + XMLHttpRequest.status + textStatus + errorThrown);
}