var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var tagSchema = new Schema({
  text: String
});

mongoose.model('Tag', tagSchema);
