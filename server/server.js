/*
 * server.js
 *
 * Author: Ryan Gourley
 * Date: 15 July 2014
 *
 * Functionality: Initializes the express module, starts a server listening on port 8080, and sets up a static path for loading the front end javascript files.
 * Use: Start the server with >node server.js
 */

//start server and load modules
var express 			 = require('express'); //framework
var path 					 = require('path');  //resolve changing folders
var morgan 				 = require('morgan'); //so we can log requests to the console
var methodOVerride = require('method-override'); //simulate DELETE and PUT
var bodyParser     = require('body-parser'); //pull info from html in POST
var favicon 			 = require('serve-favicon');
var app 					 = express();
app.use(favicon(path.resolve('../client/images/favicon.ico')));

//set up development stuff so that requests are logged and we can use a localhost
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOVerride());

//Database Connections (empty right now)
var models 				 = require('./api/database/models.js').val;
var dbconf 				 = require('./api/database/config.js').val;

//Routing
var routes 				 = require('./api/routes/main')(app);

//localhost set to port 8080
app.listen(8080 , function(err, succ){
	console.log('Listening on port 8080...');
});
