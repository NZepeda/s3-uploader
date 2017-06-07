var mongoose = require('mongoose');
Schema = mongoose.Schema;

var abioticSchema = new Schema({
    salinity: String,
    temperature: String
});

mongoose.model('AbioticData', abioticSchema);