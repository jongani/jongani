var url = require('url')
var path = require('path')
var fs = require('fs')					
var util = require('util')
/********************************************************************************************/
var jongani = {}

jongani.config 	= require('./config')
jongani.error = false;

//This handles new web requests. Its job is to respond with the correct data.
jongani.handler = function (req, res) {
	//check user?
	// anonymous
	// previous anonymous (ip/location)
	// bot/spider

	// loggedin 
	// user
	// admin

	//request

	// page
	// media
	// etc

	var filename = path.join(process.cwd()+"/static", url.parse(req.url).pathname);
	if (url.parse(req.url).pathname == "/") {
		res.end("main page")
	}
	//res.end("woot!")

fs.exists(filename, function(exists) {
		if (!exists) {
			//console.log("404:"+filename);		
			res.writeHead(404, {'Content-Type': 'text/html'});
		  	res.write('error 404');
		  	res.end();
		  	return;
		} 

		var stats = fs.statSync(filename);
		//console.log("STATS: "+stats.isDirectory());

		if (stats.isDirectory()) {
			res.writeHead(200, {'Content-Type':'text/html'})
			res.write('Are you lost?')
			res.end();
		} else {
			var mimeType = mimeTypes[path.extname(filename).split(".")[1]]
			res.writeHead(200, {'Content-Type': mimeType})
			var fileStream = fs.createReadStream(filename);
			fileStream.pipe(res);	
		}		
	});	//exists

}

module.exports = jongani;