<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\cast\#id#-cast.jsonp">
<cfif FileExists(filePath) eq 'Yes'>
<cfinclude template="../xml/moviedb/cast/#id#-cast.jsonp">
<cfelse>
	<cfset movieurl = "https://api.themoviedb.org/3/movie/#id#/credits?api_key=19ea661a075713d318c101d92da8e0a1">
	<CFHTTP
		METHOD="Get"
		URL="#movieurl#"
		PATH="d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\cast\"
		FILE="#id#-cast.jsonp">
</cfif>