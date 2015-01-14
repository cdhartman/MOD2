<cfset movieList = [
"0848228", "1731141", "1375666", "1194173", "0458339", "1345836", "1731141", "0058461", "2167202", "0903624", "1170358", "1392170", "1951264", "1375666", "1300854", "0790724", "0401729", "1210819", "1276104", "1229238", "1663662", "1408101", "1074638", "1245526", "1981115", "1270798",
"0317219", "1216475", "0085334", "0480242", "2387559", "0097239", "0319343", "0817177", "0425061", "1091751", "0472160", "1540128", "0815244",
"0317219", "1217209", "1216475", "0085334", "0042332", "0319343", "1731141", "1667889", "1277953", "0765128", "0114709", "0120363",
"0453562", "1385826", "0426931", "0878804", "1535109", "1731141", "0441007", "1454468", "0427309", "1454029", "1091751", "0415965", "2492916", "1659337", "1441951", "2140373", "1515091", "0462590", "0458352", "0083131", "0427152", "0983193", "0443272", "1482459", "tt0945513"
]>

<cfset movieList = [
"80274", "49040", "1771", "391", "49026", "146227", "49051", "57158", "70160", "101299", "75780", "57201", "68726", "54138", "37724", "39514", "76338", "24428", "27205", "68721", "49529", "59967", "56292", "49538", 
"920","49013", "850", "7211", "146239", "10719", "43949", "7985", "77875", "10760",
"109410","5123", "22881", "109424", "80274", "15568", "49047", "14047", "13579", "5126", "159151", "84892", "121826", "140823", "9762",
"920","49013", "850", "11224", "10719", "80274", "36970",
"403", "11665", "38050", "50014", "58574", "62177", "57800", "80321", "862", "863", "35056", "10890", "38778", "17578", "72976", "73723", "45612"
]>

<cfset movieList = [
"100402"
]>

<cfset getJSONFile = true>
<cfset getJSONTomatoesFile = true>
<cfset getJSONVideoFile = true>
<cfset getPoster = true>
<cfset getCastPhotos = true>
<cfset getPhotos = true>

<cfloop array=#movieList# index="id">
    <cfoutput>#id#<br></cfoutput>
	
	<cfif getJSONFile>
		<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\cast\#id#-cast.json">
		<cfif FileExists(filePath) eq 'Yes'>

		<cfelse> hey 667788
			<cfset movieurl = "http://api.themoviedb.org/3/movie/#id#/credits?api_key=19ea661a075713d318c101d92da8e0a1">
			
			<CFHTTP
				METHOD="Get"
				URL="#movieurl#"
				PATH="d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\cast\"
				FILE="#id#-cast.json"
				throwonerror="yes">
				<cfhttpparam type="Header" name="Accept-Encoding" value="deflate;q=0">
<cfhttpparam type="Header" name="TE" value="deflate;q=0">
				</cfhttp>
		</cfif>

		<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\info\#id#.json">
		<cfif FileExists(filePath) eq 'Yes'>
		<cfelse>
			<cfset movieurl = "https://api.themoviedb.org/3/movie/#id#?api_key=19ea661a075713d318c101d92da8e0a1&append_to_response=images">
			<CFHTTP
				METHOD="Get"
				URL="#movieurl#"
				PATH="d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\info\"
				FILE="#id#.json">
		</cfif>
	</cfif>
	
	<cfif getJSONTomatoesFile>
		<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\xml\tomatoes\#id#.json">
		<cfif FileExists(filePath) eq 'Yes'>
			hey
		<cfelse>hey2
			<cfset movieurl = "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?type=imdb&id=#id#&apikey=bs7crnfq76tt2w3z66xs6sqx&_prettyprint=true">
			<CFHTTP
				METHOD="Get"
				URL="#movieurl#"
				PATH="d:\inetpub\wwwroot\cdh\mod2\xml\tomatoes\"
				FILE="#id#.json">
		</cfif>
	</cfif>
	
	<cfif getJSONVideoFile>
		<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\video\#id#.json">
		<cfif FileExists(filePath) eq 'Yes'>
			hey3
		<cfelse>hey4
			<cfset movieurl = "https://api.themoviedb.org/3/movie/#id#/videos?api_key=19ea661a075713d318c101d92da8e0a1">
			<CFHTTP
				METHOD="Get"
				URL="#movieurl#"
				PATH="d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\video\"
				FILE="#id#.json">
		</cfif>
	</cfif>
	
	<!--- get poster --->
	<cfif getPoster>
		<cffile action = "read" 
			file = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\info\#id#.json" 
			variable = "Message">
			<cfset position = #find("poster_path",Message)#>
			<cfset positionBegin = #find(":",Message, position)# + 3 >
			<cfset positionEnd = #find(",",Message, positionBegin)#>
			<cfoutput>#positionBegin#, #positionEnd#, 
			#mid(Message, positionBegin, positionEnd - positionBegin -1)#</cfoutput><br />
			
			<cfset fileDirectory = "d:\inetpub\wwwroot\cdh\mod2\images\movies\photos\#id#\">
			<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\images\movies\photos\#id#\#mid(Message, positionBegin, positionEnd - positionBegin -1)#">
			<cfset fileSource = "http://image.tmdb.org/t/p/w300/#mid(Message, positionBegin, positionEnd - positionBegin -1)#">
			
			<cfif DirectoryExists(fileDirectory)>
			<cfelse>
				<cfdirectory action = "create" directory = "#fileDirectory#" >
			</cfif>

			<!---<cfif FileExists(filePath) eq 'Yes'>
			<cfelse>
				<cfhttp
				  url="http://image.tmdb.org/t/p/w300/#mid(Message, positionBegin, positionEnd - positionBegin -1)#"
				  getasbinary="yes"
				  path="#fileDirectory#"
				  file="#mid(Message, positionBegin, positionEnd - positionBegin -1)#">
			</cfif> --->
			<cfhttp
				  url="http://image.tmdb.org/t/p/w300/#mid(Message, positionBegin, positionEnd - positionBegin -1)#"
				  getasbinary="yes"
				  path="#fileDirectory#"
				  file="#id#.jpg">
	</cfif>
	<!--- end: get poster --->
	
	
	
	<!--- get cast photos --->
	<cfif getCastPhotos>
		<cfset fileDirectory = "d:\inetpub\wwwroot\cdh\mod2\images\movies\cast\#id#\">\
		<cfif not DirectoryExists(fileDirectory)>
			<cfdirectory action = "create" directory = "#fileDirectory#" >
			<cfset startPosition = 0>
			<cffile action = "read" 
				file = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\cast\#id#-cast.json" 
				variable = "Message">
			<cfset lengthOfFile = len(Message)>
			<cfset loopCount = 0>
			
			<cfloop condition = "startPosition LESS THAN lengthOfFile">
				<cfset loopCount = loopCount + 1>
				<cfset position = #find("profile_path", Message, startPosition)#>
				<cfset positionBegin = #find(":",Message, position)# + 3 >
				<cfset positionEnd = #find(",",Message, positionBegin)#>
				<cfif positionEnd neq 0>
					<!--- <br/><cfoutput>positionBegin:#positionBegin# | positionEnd: #positionEnd#</cfoutput> --->
					<cfset fileName =  #mid(Message, positionBegin, positionEnd - positionBegin - 2)#>
					<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\images\movies\cast\#id#\#fileName#">
					<!--- <br/><cfoutput>fileName:#fileName# | filePath: #filePath#</cfoutput> --->
				
				
					<cfif FileExists(filePath) eq 'Yes' or fileName does not contain "jpg">
					<cfelse>
						<cfhttp
						  url="http://image.tmdb.org/t/p/w150/#mid(Message, positionBegin, positionEnd - positionBegin - 2)#"
						  getasbinary="yes"
						  path="#fileDirectory#"
						  file="#mid(Message, positionBegin, positionEnd - positionBegin - 2)#">
					</cfif>
					<cfset startPosition = positionEnd>
				<cfelse>
					<cfset startPosition = lengthOfFile>
				</cfif>
				<cfif loopCount eq 6><cfset startPosition = lengthOfFile></cfif>
			</cfloop>
			
		</cfif>
	</cfif>
	<!--- end: get cast photos --->
	
	
	
	<!--- get photos --->
	<cfif getPhotos>
		<cfset fileDirectory = "d:\inetpub\wwwroot\cdh\mod2\images\movies\photos\#id#\">\
		<cfset startPosition = 0>
		<cffile action = "read" 
			file = "d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\info\#id#.json" 
			variable = "Message">
		<cfset lengthOfFile = len(Message)>
		<cfset loopCount = 0>
		
		<cfloop condition = "startPosition LESS THAN lengthOfFile-200">
			<cfset position = #find("file_path", Message, startPosition)#>
			<cfset positionBegin = #find(":",Message, position)# + 3 >
			<cfset positionEnd = #find(",",Message, positionBegin)#>
			<cfif positionEnd neq 0>
				
				<br/><cfoutput>positionBegin:#positionBegin# | positionEnd: #positionEnd# | startPosition: #startPosition# | lengthOfFile: #lengthOfFile#</cfoutput>
				<cfset fileName =  #mid(Message, positionBegin, positionEnd - positionBegin - 1)#>
				<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\images\movies\photos\#id#\#fileName#">
				<br/><cfoutput>fileName:#fileName# | filePath: #filePath#</cfoutput>
				<cfset loopCount = loopCount + 1>
			
				<cfif fileName does not contain "jpg">
				<cfelse>
					<cfhttp
					  url="http://image.tmdb.org/t/p/w300/#fileName#"
					  getasbinary="yes"
					  path="#fileDirectory#"
					  file="#fileName#">
				</cfif>
				<cfset startPosition = positionEnd>
				<cfif startPosition gt positionBegin></cfif>
			<cfelse>
				<cfset startPosition = lengthOfFile>
			</cfif>
			<cfif loopCount eq 8><cfset startPosition = lengthOfFile></cfif>
		</cfloop>
	</cfif>
	<!--- end: get photos --->
	
</cfloop>