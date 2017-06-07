// Model for a complete image post

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AnimalData = require('./animalData');
var AbioticData = require('./abioticData');

var ImagePostSchema = new Schema({
  abioticData: AbioticData,
  date: String,
  description: String,
  imageLink: String,
  plateNumber: Number,
  animalData: [AnimalData],
  notes: String
});

mongoose.model('ImagePost', ImagePostSchema);
