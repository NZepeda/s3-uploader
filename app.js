'use strict'

var express = require('express');
var app = express();

// Route for the uploading view
app.get('/upload', function(req, res){
	res.sendFile(__dirname + '/client/views/image-uploader.html');
});

app.get('/view', function(req, res){
    res.sendFile(__dirname + '/client/views/test.html');
})

app.use('/js', express.static(__dirname + "/client/js/"));
app.use('/css', express.static(__dirname + '/client/css/'));
app.use('/components', express.static(__dirname + '/client/components/'));

var port = process.env.PORT || 8000;

app.listen(port, function(req, res){
	console.log("I\'m listening");
});