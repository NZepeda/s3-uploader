'use strict'

var express = require('express');
var app = express();

// Route for the root index file

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + "/js/"));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/components', express.static(__dirname + '/components/'));

var port = process.env.PORT || 8000;

app.listen(port, function(req, res){
	console.log("I\'m listening");
});