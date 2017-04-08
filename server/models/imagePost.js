var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ImagePostSchema = new Schema({
  date: String,
  description: String,
  imageLink: String,
  Tags: [{
    text : String
  }]
});

mongoose.model('ImagePost', ImagePostSchema);
