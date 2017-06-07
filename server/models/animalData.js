// Mongo model used for the AnimalData Tag

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var tagSchema = new Schema({
  animalName: String,
  percentage: Number,
  tagName: String,
  type: String
});

mongoose.model('AnimalDataTag', tagSchema);
