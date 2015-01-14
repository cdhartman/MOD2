<cfset filePath = "d:\inetpub\wwwroot\cdh\mod2\images\movies\#id#.jpg">
<cfif FileExists(filePath) eq 'Yes'>
<cfelse>
	<CFHTTP
		METHOD="Get"
		URL="#movieurl#"
		PATH="d:\inetpub\wwwroot\cdh\mod2\images\movies\"
		FILE="#id#.jpg">
</cfif>