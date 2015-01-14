<cfhttp url="http://www.omdbapi.com/?i=#id#&plot=full" method="GET" resolveurl="Yes" throwOnError="Yes"/>
<cfoutput>#CFHTTP.FileContent#</cfoutput>
<cfhttp url="http://www.omdbapi.com/?i=#id#&plot=full&r=xml" method="GET" resolveurl="Yes" throwOnError="Yes" PATH="d:\inetpub\wwwroot\cdh\mod2\xml\moviedb\" FILE="#id#.xml"/>