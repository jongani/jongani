module.exports = {
/******************************************************************************************
	Jongani configuration settings.

	This MUST be set before first run. It is a secret random machine password used to 
	encrypt sensitive database information by salting the hash with this string.         */

	//secret		: '1234567890abcdef!@#$%^&*()',		
	secret		: '1234567890abcdef!@#$%^&*()',		
	
	//For differentiating between different codebase versions. Just preempting this.
	version		: "0.0.1",

	//For differentiating between different apps
	name		: 'Jongani',

	//if undefined it runs on all available domains.
	domain		: undefined,	

	//HTTP is port 80
	port		: 80,				

	//MongoDB db
	databaseUrl	: "mydb",	//in the form of a connection string URI http://docs.mongodb.org/manual/reference/connection-string/	

	//MongoDB collection
	collections : ["jongani"],	//one or more collections

	/* ALL DONE. */
}