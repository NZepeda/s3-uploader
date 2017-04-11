var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = function(app){

    //  Route for the image posts endpoint
    var imagePost = require('./controllers/imagePostController');
    var sysConfig = require('./controllers/systemController');

    // API paths
    app.post('/addNewImagePost', bodyParser.json(), imagePost.add);
    app.get('/getImagePosts', imagePost.findAll);
    app.post('/config', bodyParser.json(), sysConfig.getConfig)

    //Route for getting assets
    app.get('/upload', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../client/views/image-uploader.html'));
    });
    app.get('/view', function(req, res){
        res.sendFile(__dirname + '/../client/views/test.html');
    });

    // Static mapping redirects
    app.use('/js', express.static(__dirname + '/../client/js'));
    app.use('/css', express.static(__dirname + '/../client/css'));
    app.use('/components', express.static(__dirname + '/../client/components'));
    app.use('/scripts', express.static(__dirname + '/../node_modules'));
}
