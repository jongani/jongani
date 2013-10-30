console.log("\n -----------------------------------------------------------------")
console.log("  Starting JONGANI - the server for http://jongani.com/")
console.log("  For the latest visit https://github.com/jongani")
console.log(" -----------------------------------------------------------------\n")
console.log("  "+ new Date)
console.log("\n  Ctrl+C to close server\n")
console.log(" -----------------------------------------------------------------")

//NODE.js built ins
var http 		= require('http')				//HTTP


/* PREFLIGHT CHECKS */

var jongani 	= require('./jongani');


// check if config is correctly filled out

if ((jongani.config.secret == '')||(jongani.config.secret == undefined)) {
	console.log(" [FAIL] You must set a secret string in config.js before first run!")
	jongani.error = true;
}

// lets try to connect to the database

var mongojs;
var db;
try {	mongojs = require("mongojs");
} catch (err) {
	console.log(" [FAIL]\t Cannot load mongojs. \n\t Have you tried installing it? npm install mongojs")
	jongani.error = true;
}

if (mongojs != undefined) {
	console.log(" [ OK ]\t Module: mongojs")
	db = mongojs(jongani.config.databaseUrl, jongani.config.collections);	
	console.log(" [ OK ]\t DB: Connected to "+jongani.config.databaseUrl+"."+jongani.config.collections)
}

// test the db for sanity

// db.jongani.find( function(err, data) {
//  console.log(data);
// })

/********************************************************************************************/
// Okay lets load the rest
/********************************************************************************************/
//SWIG    TEMPLATING	http://paularmstrong.github.io/swig/docs/
var swig; 
try { 
	swig = require('swig');
} catch (err) {
	console.log(" [FAIL]\t Cannot load swig.\n\t Have you tried installing it? npm install swig")
	jongani.error = true;
}
if (swig != undefined) {
	console.log(" [ OK ]\t Module: swig")
}

/********************************************************************************************/
//FORMIDABLE   FORM PARSER https://github.com/felixge/node-formidable
var formidable; 
try { 
	formidable = require('formidable');
} catch (err) { 
	console.log(" [FAIL]\t Cannot load formidable.\n\t Have you tried installing it? npm install formidable")
	jongani.error = true;
}

if (formidable != undefined) {
	console.log(" [ OK ]\t Module: formidable")	
}
/********************************************************************************************/			
//SOCKET.io 
var socketio;
try {
	socketio = require('socket.io');
} catch (err) {
	console.log(" [FAIL]\t Cannot load socket.io.\n\t Have you tried installing it? npm install socket.io")
	jongani.error = true;
}

if (socketio != undefined) {
	console.log(" [ OK ]\t Module: socket.io")	
}
/********************************************************************************************/			
//SELF CHECK - CAN WE START?		
if (jongani.error == true) { 
	console.log(" [FAIL]\t Critical error(s) encountered, halting.")	
	return; //kicks us out
}
/********************************************************************************************/					

var webserver = http.createServer(function (req, res) {
	jongani.handler(req, res);	//in jongani.js
});	

//finally let the webserver listen on the correct port and domain
webserver.listen(jongani.config.port, jongani.config.domain);	

var io;
if (socketio != undefined) {
	io = socketio.listen(webserver, {log: 0});
	console.log(" [ OK ]\t Sockets: Listening")	
}
 

io.sockets.on('connection', function (socket) {

});

if (jongani.config.domain == undefined) {
	console.log(" [ OK ]\t Server running on localhost:"+jongani.config.port+"\n\n")	
} else {
	console.log(" [ OK ]\t Server running on "+jongani.config.domain+":"+jongani.config.port+"\n")	
}

console.log(" Have nice day.")	




