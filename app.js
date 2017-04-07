'use strict'

var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

require('./server/models/imagePost');

var app = express();

var port = process.env.PORT || 8000;

// TODO: Dynamically create this url -- use dotenv
var mongoUri = 'mongodb://localhost/noderest';

mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

require('./server/routes.js')(app);


app.listen(port, function(req, res){
	console.log("I\'m listening");
});
