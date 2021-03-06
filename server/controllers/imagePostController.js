// Houses all of our endpoints
var mongoose = require('mongoose'),
ImagePost = mongoose.model('ImagePost');

// Query mongodb to get a fullList of all of our images
exports.findAll = function(req, res){
    ImagePost.find({}, function(err, results){
      return res.send(JSON.stringify(results));
    });
};

// This should add to our mongo collection
exports.add = function(req, res){
    ImagePost.create(req.body, function(err, imagepost){
      if(err){
        res.send(500, "Unable to add image post");
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(imagepost);
    });
};

exports.findByPlateNumber = function(req, res){
  
  ImagePost.find({plateNumber: req.query.plate}, function(err, imageposts){
    if(err){
      res.send(500, "Unable to retrieve image posts");
    }
    else{
      return res.send(JSON.stringify(imageposts));
    }
  })
}
