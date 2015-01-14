function isMobileDevice() {
    if ((navigator.userAgent.search("Windows") > -1 || navigator.userAgent.search("Macintosh") > -1)) {
		return false;
	} else {
		return true;
	}
}

function isPhoneGap() {
    if (document.location.protocol == 'file:') { return true } else { return false };
}

function adjustHeights(elem) {
  var fontstep = 2;
  if ($(elem).height()>$(elem).parent().height() || $(elem).width()>$(elem).parent().width()) {
	$(elem).css('font-size',(($(elem).css('font-size').substr(0,2)-fontstep)) + 'px').css('line-height',(($(elem).css('font-size').substr(0,2))) + 'px');
	adjustHeights(elem);
  }
}
	
function KeyPressHappened(e)
{ alert('keypress');
  if (!e) e=window.event;
	alert('e.charCode: ' + e.charCode + 'e.keyCode: ' + e.keyCode);
}


function getURLParameter(sParam, defaultValue)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
	return defaultValue;
}

function imgPosterError(id){
    id.onerror = "";
    id.src = "images/movies/film-214x314.png";
    return true;
}

function imageError(id,type,path){
    id.onerror = "";
    // id.src = "images/misc/cast.png";
	if (type == 'cast') {
		id.src = "http://image.tmdb.org/t/p/w185/" + path + "jpg";
		console.log('imageError failure: ' + id + ', type: ' + type + ', path: ' + path);
	} else if (type == 'photos') {
		id.src = "http://image.tmdb.org/t/p/w300/" + path + "jpg";
		console.log('imageError failure: ' + id + ', type: ' + type + ', path: ' + path);
	} else if (type == 'posterLarge') {
		id.src = "http://image.tmdb.org/t/p/w396/" + path + "jpg";
		console.log('imageError failure: ' + id + ', type: ' + type + ', path: ' + path);
	} else if (type == 'poster') {
		id.src = "http://image.tmdb.org/t/p/w185/" + path + ".jpg";
		console.log('imageError failure: ' + id + ', type: ' + type + ', path: ' + path);
	}
    return true;
}

function loadHandlebarDataAndTemplate(dataSource, templateSource, templateTarget, targetContainer) {
	$('#' + templateTarget).html('').load(templateSource);
	$.getJSON( dataSource, function( json ) {
		var source = $("#" + templateTarget).html();
		var template = Handlebars.compile(source);
		$('#' + targetContainer).html(template(json));
	})
	.fail(function() { alert('getJSON request failed! ' + dataSource); })
}
		
function initializeDateTime(){
	getHours();getMinutes();getDate();
}
function monitorDateTime(){
	setInterval( function() {
		getMinutes();
		}, 5000
	);
}
function getHours(){
	// Create a newDate() object and extract the hours of the current time on the visitor's
	var hours = new Date().getHours();
	// Add a leading zero to the hours value
	$("#ampm").html(hours < 12 ? " AM" : " PM" );
	if (hours > 12) {hours = hours - 12;}
	$("#hours").html(hours);
	if (hours == 12) {getDate();};
}
function getMinutes(){
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	var minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
	if (minutes == 0) {getHours();};
}
function getDate(){
    // Create two variable with the names of the months and days in an array
	var monthNames = [ "Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]; 
	var dayNames= ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]

	// Create a newDate() object
	var newDate = new Date();
	// Extract the current date from Date object
	newDate.setDate(newDate.getDate());
	// Output the day, date, month and year
	$('#Date').html(dayNames[newDate.getDay()] + ' ' + monthNames[newDate.getMonth()] + " " + newDate.getDate() + ', ' + newDate.getFullYear());
}



function initializeCarousel (id) {
	$("#"+ + id).carousel({
		 interval : false,
		 pause: false
	 });
}

function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "")
}

function saveScrollPosition(scrollPosition){
	alert('saveScrollPosition: ' + $(window).scrollTop());
	// alert($(window).scrollTop());
	Set_Cookie(scrollPosition,$(window).scrollTop(), 360, '/');
}

function resetScrollPosition(scrollPosition){
	// alert('resetScrollPosition');
	Set_Cookie(scrollPosition,0, 360, '/');
}

function restoreScrollPosition(scrollPosition){
	// alert('restoreScrollPosition: ' + getCookie(scrollPosition));
	// $("body,html").scrollTop(getCookie(scrollPosition));
	// $(document).scrollTop( getCookie(scrollPosition), 0, {duration:150}).delay( 800 );
	setTimeout(function(){$(document).scrollTop( getCookie(scrollPosition), 0, {duration:150})}, 500);
}

function activeItem(category,row,item)
{	//alert(category + row + item);
	window.sessionStorage.setItem('category',category);
	window.sessionStorage.setItem('row',row);
	window.sessionStorage.setItem('item',item);
}


function navigationKeys () {
	$("body").keydown(function(e){
		var currentIndex = document.activeElement.tabIndex,
		row = document.activeElement.getAttribute('row'),
		column = document.activeElement.getAttribute('column'),
		genre = document.activeElement.getAttribute('genre');
		// beepOne.play();
		if (currentIndex > 100) {
			
			if (e.which == 40) {
				// down arrow key pressed
				newIndex = Math.floor(currentIndex/100)*100 + 110 + (currentIndex % 10);
				// alert(currentIndex + ' | ' + newIndex);
				$('[tabindex=' + newIndex + ']').focus();
				$('#myCarouselAction').carousel(0); $('#myCarouselComedy').carousel(0); $('#myCarouselDrama').carousel(0); $('#myCarouselFamily').carousel(0);
			} else if (e.which == 38) {
				// up arrow key pressed
				newIndex = Math.floor(currentIndex/100)*100 - 90 + (currentIndex % 10);
				// alert(currentIndex + ' | ' + newIndex);
				$('[tabindex=' + newIndex + ']').focus();
				$('#myCarouselAction').carousel(0); $('#myCarouselComedy').carousel(0); $('#myCarouselDrama').carousel(0); $('#myCarouselFamily').carousel(0);
			} else if (e.which == 39) {
				// right arrow key pressed
				if (column == 8) {
					$('#myCarousel' + genre).carousel('next');currentIndex +=2;
				}
				newIndex = currentIndex + 1; $('[tabindex=' + newIndex + ']').focus();
			} else if (e.which == 37) {
				// alert('left arrow key pressed'); // left arrow key pressed 
				if (column == 1) {
					$('#myCarousel' + genre).carousel('prev');currentIndex += -2;
				}
				newIndex = currentIndex - 1; $('[tabindex=' + newIndex + ']').focus();
			}
		}
	});
}

function showMessage(message, callback, title, buttonName){

	title = title || "default title";
	buttonName = buttonName || 'OK';

	if(navigator.notification && navigator.notification.alert){

		navigator.notification.alert(
			message,    // message
			callback,   // callback
			title,      // title
			buttonName  // buttonName
		);

	}else{

		alert(message);
		callback();
	}

}