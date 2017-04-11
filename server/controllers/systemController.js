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