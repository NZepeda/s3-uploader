var mongoose = require('mongoose');
Tag = mongoose.model('Tag');

var env = require('dotenv').config();
var access_key = process.env.ACCESS_KEY;
var secret_key = process.env.SECRET_KEY;

exports.getConfig = function(req, res){
    var data = {
        accessKey : access_key,
        secretKey : secret_key
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
}

exports.getTags = function(req, res){
  Tag.find({}, function(err, tags){
    if(err){
      res.status(500).send("Unable to retrive tags!");
    }
    else{
      console.log(tags);
      res.status(200).send(tags);
    }
  })
}
