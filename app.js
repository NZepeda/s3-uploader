'use strict'

var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var env = require('dotenv').config();

var mongo_user = process.env.DB_USER;
var mongo_pass = process.env.DB_PASSWORD;
var mongo_host = process.env.DB_HOST;
var mongo_db = process.env.DB_NAME;

require('./server/models/imagePost');
require('./server/models/tag');

var app = express();

var port = process.env.PORT || 8000;

// TODO: Dynamically create this url -- use dotenv
var mongoUri = buildMongoUrl(mongo_user, mongo_pass, mongo_host, mongo_db);

mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

require('./server/routes.js')(app);

app.listen(port, function(req, res){
	console.log("I\'m listening");
});

function buildMongoUrl(user, pass, host, db){
  return "mongodb://" + user + ":" + pass + "@" + host + "/" + db;
}
